const {
  formatSequences,
  consensusSequence,
} = require('./utils/format-sequences')
const { simulatedAnnealing } = require('./algorithms/simulated-annealing')
const { sequenceAlignment } = require('./problems/sequence-alignment')
const {
  mapPathsToSequences,
  buildSequencesDictionary,
} = require('./utils/fasta-reader')

const worker = async ({ parameters, executionTime }) => {
  const sequenceFastas = mapPathsToSequences(parameters.files)
  const sequencesDictionary = buildSequencesDictionary(sequenceFastas)

  if (parameters.isDebugging) {
    console.debug(
      `[Execution #${executionTime + 1}] Starting to resolve a problem of ${
        Object.keys(sequencesDictionary).length
      } sequences`,
      sequencesDictionary
    )
  }

  const problem = sequenceAlignment(sequencesDictionary)
  if (parameters.isDebugging) {
    console.debug(
      `[Execution #${executionTime + 1}] Problem ready to be resolved`
    )
  }

  const solution = simulatedAnnealing({ problem, parameters })

  if (parameters.isDebugging) {
    console.debug(
      `[Execution #${executionTime + 1}] Solution found: energy from ${
        solution.initialEnergy
      } to ${solution.finalEnergy}`
    )
  }

  return {
    ...solution,
    initialState: formatSequences(solution.initialState),
    finalState: solution.finalState,
    initialSequence: consensusSequence(solution.initialState),
    finalSequence: consensusSequence(solution.finalState),
  }
}

module.exports = worker
