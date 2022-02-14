const {
  PROBABILITY_REMOVE_DELETION,
  PROBABILITY_ADD_DELETION,
} = require('../../constants')
const {
  multipleAlignmentWithBlossum62Quality,
} = require('./simulated-annealing/alignment-energy')
const {
  addGap,
  removeGap,
} = require('./simulated-annealing/alignment-modifier')
const { initAlignment } = require('./simulated-annealing/alignment-initializer')
const { formatSequences } = require('../../utils/format-sequences')
const cloneDeep = require('lodash/cloneDeep')

const sequenceAlignment = (sequencesDictionary) => {
  const createInitialAlignment = () => {
    const initialSequences = initAlignment(sequencesDictionary)
    // formatSequences(initialSequences)
    return initialSequences
  }

  const createNeighborAlignment = (currentSequencesDictionary) => {
    const neighborSequences = cloneDeep(currentSequencesDictionary)
    const randomIndex = Math.floor(
      Math.random() * Object.keys(currentSequencesDictionary).length
    )
    const randomKey = Object.keys(currentSequencesDictionary)[randomIndex]
    const randomSequence = neighborSequences[randomKey]

    const modificationChance = Math.random()
    if (modificationChance < PROBABILITY_ADD_DELETION) {
      addGap(randomSequence)
    } else if (modificationChance < PROBABILITY_REMOVE_DELETION) {
      removeGap(randomSequence)
    } // else: keep the sequence as it is

    formatSequences(neighborSequences)
    return neighborSequences
  }

  const measureAlignmentEnergy = (currentSequencesDictionary) =>
    multipleAlignmentWithBlossum62Quality(currentSequencesDictionary)

  return {
    createInitialState: createInitialAlignment,
    createNeighborState: createNeighborAlignment,
    measureStateEnergy: measureAlignmentEnergy,
  }
}

module.exports = { sequenceAlignment }
