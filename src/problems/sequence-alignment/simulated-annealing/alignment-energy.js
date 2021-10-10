'use strict'

const { times, remove } = require('lodash')
const {
  GAP_SYMBOL,
  // GAP_SYMBOL_PENALTY,
  ALL_GAP_SYMBOL_PENALTY,
} = require('../../../constants')
const BLOSSUM_62 = require('../../../constants/blossum-62')
const pairwise = require('../../../utils/pairwise')

const multipleAlignmentWithBlossum62Quality = (sequencesDictionary) => {
  const sequences = Object.values(sequencesDictionary).map(
    ({ sequenceValues }) => sequenceValues
  )
  const sequenceLengths = sequences.map((s) => s.length)
  const columns = Math.max(...sequenceLengths)

  let substitutionCost = 0,
    gapCost = 0

  times(columns, (columnIndex) => {
    const positionValues = sequences.map(
      (seq) => seq[columnIndex] || GAP_SYMBOL
    )

    pairwise(positionValues).forEach(([a, b]) => {
      substitutionCost -= BLOSSUM_62[a][b]
    })

    const columnGaps = remove(positionValues, (v) => v === GAP_SYMBOL)
    if (positionValues.length === 0) {
      gapCost += ALL_GAP_SYMBOL_PENALTY * columnGaps.length
    } else {
      // gapCost += GAP_SYMBOL_PENALTY * columnGaps.length
    }
  })

  return substitutionCost + gapCost
}

module.exports = {
  multipleAlignmentWithBlossum62Quality,
}
