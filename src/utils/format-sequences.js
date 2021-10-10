const _lodash = require('lodash')

const { GAP_SYMBOL } = require('../constants')

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
      GAP_SYMBOL
    )
    const mostRepeatedValue = _lodash.head(
      _lodash(positionValues).countBy().entries().maxBy(_lodash.last)
    )

    if (mostRepeatedValue !== undefined) {
      consensus.push(mostRepeatedValue)
    } else {
      consensus.push(GAP_SYMBOL)
    }
  }

  return consensus.join('')
}

const formatSequence = (sequence, maxSequenceLength) => {
  const trailingLength = maxSequenceLength - sequence.length

  for (let trailingIndex = 0; trailingIndex < trailingLength; trailingIndex++) {
    sequence.push(GAP_SYMBOL)
  }

  return sequence
}

const formatSequences = (sequencesDictionary) => {
  const sequences = Object.values(sequencesDictionary).map(
    ({ sequenceValues }) => sequenceValues
  )
  const maxSequenceLength = Math.max(...sequences.map((seq) => seq.length))

  sequences.map((sequence) => formatSequence(sequence, maxSequenceLength))

  let lastEmptyColumnIndex = 0
  for (let columnIndex = 0; columnIndex < maxSequenceLength; columnIndex++) {
    const columnValues = sequences.map(
      (sequence) => sequence[columnIndex] || GAP_SYMBOL
    )

    _lodash.remove(columnValues, (value) => value === GAP_SYMBOL)
    if (columnValues.length === 0) {
      lastEmptyColumnIndex = columnIndex
    } else {
      break
    }
  }

  Object.keys(sequencesDictionary).forEach((key) => {
    sequencesDictionary[key].sequenceValues = sequencesDictionary[
      key
    ].sequenceValues.slice(lastEmptyColumnIndex + 1)
  })

  return sequencesDictionary
}

module.exports = { formatSequences, consensusSequence }
