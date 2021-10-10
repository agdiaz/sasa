const {
  formatSequences,
  consensusSequence,
} = require('./utils/format-sequences')
const { simulatedAnnealing } = require('./algorithms/simulated-annealing')
const { sequenceAlignment } = require('./problems/sequence-alignment')

const worker = async ({ parameters, sequenceFastas, executionTime }) => {
  if (parameters.isDebugging) {
    console.debug(`[Execution #${executionTime + 1}] Resolving problem...`)
  }

  const problem = sequenceAlignment(sequenceFastas)
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
    finalState: formatSequences(solution.finalState),
    initialSequence: consensusSequence(solution.initialState),
    finalSequence: consensusSequence(solution.finalState),
  }
}

module.exports = worker
