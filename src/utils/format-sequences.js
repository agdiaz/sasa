const _lodash = require('lodash')

const { DELETE_SYMBOL } = require('../constants')

const consensusSequence = (sequencesDictionary) => {
  const sequences = Object.values(sequencesDictionary).map(
    ({ sequenceValues }) => sequenceValues
  )

  const sequenceLengths = sequences.map((seq) => seq.length)
  const maxSequenceLength = Math.max(...sequenceLengths)
  const consensus = []

  for (let index = 0; index < maxSequenceLength; index++) {
    const positionValues = _lodash.without(
      sequences.map((seq) => seq[index]),
      undefined,
      null,
      DELETE_SYMBOL
    )
    const mostRepeatedValue = _lodash.head(
      _lodash(positionValues).countBy().entries().maxBy(_lodash.last)
    )

    if (mostRepeatedValue !== undefined) {
      consensus.push(mostRepeatedValue)
    } else {
      consensus.push(DELETE_SYMBOL)
    }
  }

  return consensus.join('')
}

const formatSequence = (sequence, maxSequenceLength) => {
  const trailingLength = maxSequenceLength - sequence.length

  for (let trailingIndex = 0; trailingIndex < trailingLength; trailingIndex++) {
    sequence.push(DELETE_SYMBOL)
  }

  return sequence
}

const formatSequences = (sequencesDictionary) => {
  const sequences = Object.values(sequencesDictionary).map(
    ({ sequenceValues }) => sequenceValues
  )
  const maxSequenceLength = Math.max(...sequences.map((seq) => seq.length))

  sequences.map((sequence) => formatSequence(sequence, maxSequenceLength))

  return sequencesDictionary
}

module.exports = { formatSequences, consensusSequence }
