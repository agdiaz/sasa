'use strict'
const { sample } = require('lodash')

const {
  GAP_SYMBOL,
  PROBABILITY_POSITION_HEAD,
  PROBABILITY_POSITION_TRAIL,
} = require('../../../constants')

const addGap = (sequence) => {
  let gapIndex
  const random = Math.random()
  if (random < PROBABILITY_POSITION_HEAD) {
    gapIndex = 0
  } else if (random < PROBABILITY_POSITION_TRAIL) {
    gapIndex = sequence.sequenceValues.length - 1
  } else {
    gapIndex = Math.floor(Math.random() * sequence.sequenceValues.length - 1)
  }

  sequence.sequenceValues.splice(gapIndex, 0, GAP_SYMBOL)

  return sequence
}

const removeGap = (sequence) => {
  const gapIndex = sample(indexesOf(sequence.sequenceValues, GAP_SYMBOL))

  if (gapIndex >= 0) {
    sequence.sequenceValues.splice(gapIndex, 1)
  }

  return sequence
}

const indexesOf = (sequence, char) => {
  const indexes = []
  for (let i = 0; i < sequence.length; i++) {
    if (sequence[i] === char) indexes.push(i)
  }

  return indexes
}

module.exports = { removeGap, addGap }
