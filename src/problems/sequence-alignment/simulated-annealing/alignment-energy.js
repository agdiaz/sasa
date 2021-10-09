'use strict'

const { countBy, sum, times, remove } = require('lodash')
const {
  GAP_SYMBOL,
  GAP_SYMBOL_PENALTY,
  ALL_GAP_SYMBOL_PENALTY,
} = require('../../../constants')

const quadraticEnergy = (center, position, deletionProportion) => {
  return deletionProportion / Math.pow(position - center, 2)
}

const energyByGroupingAndDeletions = (
  initialSequencesDictionary,
  sequencesDictionary
) => {
  const initialSequences = Object.values(initialSequencesDictionary).map(
    ({ sequenceValues }) => sequenceValues
  )

  const sequences = Object.values(sequencesDictionary).map(
    ({ sequenceValues }) => sequenceValues
  )

  const initialSequenceLengths = initialSequences.map((s) => s.length)
  const sequenceLengths = sequences.map((s) => s.length)

  const maxTheoreticalLength = sum(initialSequenceLengths)
  const maxSequenceLength = Math.max(...sequenceLengths)

  const center = maxSequenceLength / 2.0

  let totalEnergy = 0
  for (
    let positionIndex = 0;
    positionIndex < maxSequenceLength;
    positionIndex++
  ) {
    const positionValues = sequences.map(
      (seq) => seq[positionIndex] || GAP_SYMBOL
    )
    const deletionCount = positionValues.filter((v) => v === GAP_SYMBOL).length

    const groups = Object.keys(countBy(positionValues)).length
    const q = quadraticEnergy(
      center,
      positionIndex,
      deletionCount / positionValues.length
    )
    totalEnergy += groups + q + (groups === positionValues.length ? 50 : 0)
  }

  return totalEnergy + Math.abs(maxTheoreticalLength - maxSequenceLength)
}

const multipleAlignmentQuality = (
  initialSequencesDictionary,
  sequencesDictionary
) => {
  const sequences = Object.values(sequencesDictionary).map(
    ({ sequenceValues }) => sequenceValues
  )
  const sequenceLengths = sequences.map((s) => s.length)
  const columns = Math.max(...sequenceLengths)

  let gapCost = 0
  let substitutionCost = 0

  times(columns, (columnIndex) => {
    const positionValues = sequences.map(
      (seq) => seq[columnIndex] || GAP_SYMBOL
    )

    const columnGaps = remove(positionValues, (v) => v === GAP_SYMBOL)

    if (positionValues.length === 0) {
      gapCost += ALL_GAP_SYMBOL_PENALTY + GAP_SYMBOL_PENALTY * columnGaps.length
    } else {
      gapCost += GAP_SYMBOL_PENALTY * columnGaps.length

      const substitutions = countBy(positionValues)
      substitutionCost += Object.keys(substitutions).length - 1
    }
  })

  return substitutionCost + gapCost
}

module.exports = { energyByGroupingAndDeletions, multipleAlignmentQuality }
