const {
  PROBABILITY_REMOVE_DELETION,
  PROBABILITY_ADD_DELETION,
} = require('../../constants')
const {
  energyByGroupingAndDeletions,
} = require('./simulated-annealing/alignment-energy')
const {
  addDeletion,
  removeDeletion,
} = require('./simulated-annealing/alignment-modifier')
const { initAlignment } = require('./simulated-annealing/alignment-initializer')

const { mapPathsToSequences } = require('../../utils/fasta-reader')
const cloneDeep = require('lodash/cloneDeep')

const sequenceAlignment = (sequencesFiles) => {
  const sequenceFastas = mapPathsToSequences(sequencesFiles)
  const sequencesDictionary = buildSequencesDictionary(sequenceFastas)

  const createInitialAlignment = () => initAlignment(sequencesDictionary)

  const createNeighborAlignment = (currentSequencesDictionary) => {
    const changedSequences = cloneDeep(currentSequencesDictionary)

    Object.values(changedSequences).forEach((sequence) => {
      const random = Math.random()

      if (random < PROBABILITY_ADD_DELETION) {
        return addDeletion(sequence)
      } else if (random < PROBABILITY_REMOVE_DELETION) {
        return removeDeletion(sequence)
      } else {
        return sequence
      }
    })

    return changedSequences
  }

  const measureAlignmentEnergy = (currentSequencesDictionary) =>
    energyByGroupingAndDeletions(currentSequencesDictionary)

  return {
    createInitialState: createInitialAlignment,
    createNeighborState: createNeighborAlignment,
    measureStateEnergy: measureAlignmentEnergy,
  }
}

const buildSequencesDictionary = (sequenceFastas) => {
  return sequenceFastas.reduce((dictionary, fasta) => {
    dictionary[fasta.set[0].header] = {
      header: fasta.set[0].header,
      originalSequence: fasta.set[0].seq,
      sequenceValues: fasta.set[0].seq.split(''),
    }

    return dictionary
  }, {})
}

module.exports = { sequenceAlignment }
