const {
  PROBABILITY_REMOVE_DELETION,
  PROBABILITY_ADD_DELETION,
} = require('../../constants')
const {
  multipleAlignmentQuality,
} = require('./simulated-annealing/alignment-energy')
const {
  addDeletion,
  removeDeletion,
} = require('./simulated-annealing/alignment-modifier')
const { initAlignment } = require('./simulated-annealing/alignment-initializer')

const cloneDeep = require('lodash/cloneDeep')

const sequenceAlignment = (sequenceFastas) => {
  const sequencesDictionary = buildSequencesDictionary(sequenceFastas)

  const createInitialAlignment = () => initAlignment(sequencesDictionary)

  const createNeighborAlignment = (currentSequencesDictionary) => {
    const neighborSequences = cloneDeep(currentSequencesDictionary)
    const randomIndex = Math.floor(
      Math.random() * Object.keys(currentSequencesDictionary).length
    )
    const randomKey = Object.keys(currentSequencesDictionary)[randomIndex]
    const randomSequence = neighborSequences[randomKey]

    const modificationChance = Math.random()
    if (modificationChance < PROBABILITY_ADD_DELETION) {
      addDeletion(randomSequence)
    } else if (modificationChance < PROBABILITY_REMOVE_DELETION) {
      removeDeletion(randomSequence)
    } // else: keep the sequence as it is

    return neighborSequences
  }

  const measureAlignmentEnergy = (currentSequencesDictionary) =>
    multipleAlignmentQuality(sequencesDictionary, currentSequencesDictionary)

  return {
    createInitialState: createInitialAlignment,
    createNeighborState: createNeighborAlignment,
    measureStateEnergy: measureAlignmentEnergy,
  }
}

const buildSequencesDictionary = (sequenceFastas) => {
  return sequenceFastas.reduce((dictionary, fasta) => {
    dictionary[fasta.set[0].header] = {
      originalSequence: fasta.set[0].seq,
      sequenceValues: fasta.set[0].seq.split(''),
    }

    return dictionary
  }, {})
}

module.exports = { sequenceAlignment }