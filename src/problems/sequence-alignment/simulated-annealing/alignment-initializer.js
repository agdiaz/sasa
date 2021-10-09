const cloneDeep = require('lodash/cloneDeep')

const { GAP_SYMBOL } = require('../../../constants')

const initAlignment = (sequencesDictionary) => {
  const initialAlignment = cloneDeep(sequencesDictionary)

  Object.keys(initialAlignment).forEach((sequenceKey) => {
    addPadding(initialAlignment[sequenceKey].sequenceValues)
  })

  return initialAlignment
}

const addPadding = (sequence) => {
  const paddingCount = Math.floor(Math.random() * sequence.length)

  for (let paddingIndex = 0; paddingIndex < paddingCount; paddingIndex++) {
    sequence.unshift(GAP_SYMBOL)
  }

  return sequence
}

module.exports = { initAlignment }
