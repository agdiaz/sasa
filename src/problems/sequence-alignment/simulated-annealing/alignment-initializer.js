const cloneDeep = require('lodash/cloneDeep')

const { DELETE_SYMBOL } = require('../../../constants')

const initAlignment = (sequencesDictionary) => {
  const initialAlignment = cloneDeep(sequencesDictionary)
  Object.keys(initialAlignment).forEach((sequenceKey) => {
    addPadding(initialAlignment[sequenceKey].sequenceValues)
  })

  return initialAlignment
}

const addPadding = (sequence) => {
  const padding = Math.floor(Math.random() * sequence.length)

  for (let paddingIndex = 0; paddingIndex < padding; paddingIndex++) {
    sequence.unshift(DELETE_SYMBOL)
  }

  return sequence
}

module.exports = { initAlignment }
