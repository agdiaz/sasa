'use strict'

const { countBy, sum } = require('lodash')
const { DELETE_SYMBOL } = require('../../../constants')

const quadraticEnergy = (center, position, deletionProportion) => {
  return deletionProportion * Math.pow((position - center), 2) 
}

const energyByGroupingAndDeletions = (initialSequencesDictionary, sequencesDictionary) => {
  const initialSequences = Object.values(initialSequencesDictionary).map(
    ({ sequenceValues }) => sequenceValues
  )

  const sequences = Object.values(sequencesDictionary).map(
    ({ sequenceValues }) => sequenceValues
  )
  const sequenceLengths = sequences.map((s) => s.length)
  const initialSequenceLengths = initialSequences.map((s) => s.length)
  const maxTheoreticalLength = sum(initialSequenceLengths)
  
  const maxSequenceLength = Math.max(...sequenceLengths)
  const center = maxSequenceLength / 2.0

  let totalEnergy = 0
  for (
    let positionIndex = 0;
    positionIndex < maxSequenceLength;
    positionIndex++
  ) {
    const positionValues = sequences.map((seq) => seq[positionIndex] || DELETE_SYMBOL)
    const deletionCount = positionValues.filter((v) => v === DELETE_SYMBOL)
      .length

    const groups = Object.keys(countBy(positionValues)).length
    const q = quadraticEnergy(center, positionIndex, deletionCount / positionValues.length)

    totalEnergy += groups + (groups === positionValues.length ? 50 : 0)
  }

  return totalEnergy + Math.abs(maxTheoreticalLength - maxSequenceLength)
}

module.exports = { energyByGroupingAndDeletions }
