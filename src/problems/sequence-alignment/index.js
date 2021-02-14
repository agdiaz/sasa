const {
  PROBABILITY_REMOVE_DELETION,
  PROBABILITY_ADD_DELETION,
} = require("../../constants")
const {
  energyByGroupingAndDeletions,
} = require("./simulated-annealing/alignment-energy")
const {
  addDeletion,
  removeDeletion,
} = require("./simulated-annealing/alignment-modifier")
const { initAlignment } = require("./simulated-annealing/alignment-initializer")

const { mapPathsToSequences } = require("../../utils/fasta-reader")
const { clone } = require("../../utils/clone")

const sequenceAlignment = (sequencesFiles) => {
  const sequenceFastas = mapPathsToSequences(sequencesFiles)
  const sequencesDictionary = buildSequencesDictionary(sequenceFastas)
  const sequences = Object.values(sequencesDictionary).map(
    ({ sequenceValues }) => sequenceValues
  )

  const createInitialAlignment = () => initAlignment(sequences)

  const createNeighborAlignment = (currentSequences) => {
    const changedSequences = clone(currentSequences)

    changedSequences.forEach((state) => {
      const random = Math.random()

      if (random < PROBABILITY_ADD_DELETION) {
        return addDeletion(state)
      } else if (random < PROBABILITY_REMOVE_DELETION) {
        return removeDeletion(state)
      } else {
        return state
      }
    })

    return changedSequences
  }

  const measureAlignmentEnergy = (currentSequences) => {
    return energyByGroupingAndDeletions(currentSequences)
  }

  return {
    createInitialState: createInitialAlignment,
    createNeighborState: createNeighborAlignment,
    measureStateEnergy: measureAlignmentEnergy,
  }
}

const buildSequencesDictionary = (sequenceFastas) => {
  return sequenceFastas.map((fasta) => ({
    header: fasta.set[0].header,
    originalSequence: fasta.set[0].seq,
    sequenceValues: fasta.set[0].seq.split(""),
  }))
}

module.exports = { sequenceAlignment }
