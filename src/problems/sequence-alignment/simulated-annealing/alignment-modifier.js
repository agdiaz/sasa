'use strict'

const {
  GAP_SYMBOL,
  PROBABILITY_POSITION_HEAD,
  PROBABILITY_POSITION_TRAIL,
} = require('../../../constants')

const addDeletion = (sequence) => {
  let gapIndex
  const random = Math.random()
  if (random < PROBABILITY_POSITION_HEAD) {
    gapIndex = 0
  } else if (random < PROBABILITY_POSITION_TRAIL) {
    gapIndex = sequence.sequenceValues.length - 1
  } else {
    gapIndex = Math.floor(Math.random() * sequence.sequenceValues.length)
  }

  sequence.sequenceValues.splice(gapIndex, 0, GAP_SYMBOL)

  return sequence
}

const removeDeletion = (sequence) => {
  let gapIndex
  if (Math.random() < PROBABILITY_POSITION_HEAD) {
    gapIndex = sequence.sequenceValues.indexOf(GAP_SYMBOL)
  } else {
    gapIndex = sequence.sequenceValues.lastIndexOf(GAP_SYMBOL)
  }

  if (gapIndex >= 0) {
    sequence.sequenceValues.splice(gapIndex, 1)
  }

  return sequence
}

module.exports = { removeDeletion, addDeletion }
