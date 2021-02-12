"use strict"

const { DELETE_SYMBOL, PROBABILITY_POSITION_BEGIN } = require("../constants")

const addDeletion = (sequence) => {
  let position
  if (Math.random() < PROBABILITY_POSITION_BEGIN) {
    position = 0
  } else {
    position = sequence.length
  }

  sequence.splice(position, 0, DELETE_SYMBOL)

  return sequence
}

const removeDeletion = (sequence) => {
  let position
  if (Math.random() < PROBABILITY_POSITION_BEGIN) {
    position = sequence.indexOf(DELETE_SYMBOL)
  } else {
    position = sequence.lastIndexOf(DELETE_SYMBOL)
  }

  if (position >= 0) {
    sequence.splice(position, 1)
  }

  return sequence
}

module.exports = { removeDeletion, addDeletion }
