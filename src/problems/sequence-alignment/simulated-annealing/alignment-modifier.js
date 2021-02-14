'use strict'

const {
  DELETE_SYMBOL,
  PROBABILITY_POSITION_HEAD,
  PROBABILITY_POSITION_TRAIL,
} = require('../../../constants')

const addDeletion = (sequence) => {
  let position
  const random = Math.random()
  if (random < PROBABILITY_POSITION_HEAD) {
    position = 0
  } else if (random < PROBABILITY_POSITION_TRAIL) {
    position = sequence.sequenceValues.length
  } else {
    position = Math.floor(Math.random() * sequence.sequenceValues.length)
  }

  sequence.sequenceValues.splice(position, 0, DELETE_SYMBOL)

  return sequence
}

const removeDeletion = (sequence) => {
  let position
  if (Math.random() < PROBABILITY_POSITION_HEAD) {
    position = sequence.sequenceValues.indexOf(DELETE_SYMBOL)
  } else {
    position = sequence.sequenceValues.lastIndexOf(DELETE_SYMBOL)
  }

  if (position >= 0) {
    sequence.sequenceValues.splice(position, 1)
  }

  return sequence
}

module.exports = { removeDeletion, addDeletion }
