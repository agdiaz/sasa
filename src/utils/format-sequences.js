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

const formatSequences = (sequencesDictionary) => {
  let sequences = Object.values(sequencesDictionary).map(
    ({ sequenceValues }) => sequenceValues
  )

  const leftPadding = getLeftPadding(sequences)
  if (leftPadding >= 0) {
    Object.keys(sequencesDictionary).forEach((key) => {
      sequencesDictionary[key].sequenceValues = trimLeftPadding(
        sequencesDictionary[key].sequenceValues,
        leftPadding + 1
      )
    })
  }

  sequences = Object.values(sequencesDictionary).map(
    ({ sequenceValues }) => sequenceValues
  )

  const rightPadding = getRightPadding(sequences)

  if (rightPadding < Math.max(...sequences.map((seq) => seq.length))) {
    Object.keys(sequencesDictionary).forEach((key) => {
      sequencesDictionary[key].sequenceValues = trimRightPadding(
        sequencesDictionary[key].sequenceValues,
        rightPadding
      )
    })
  }

  sequences = Object.values(sequencesDictionary).map(
    ({ sequenceValues }) => sequenceValues
  )
  const maxSequenceLength = Math.max(...sequences.map((seq) => seq.length))
  Object.keys(sequencesDictionary).forEach((key) => {
    const sequence = sequencesDictionary[key].sequenceValues
    formatSequence(sequence, maxSequenceLength)
  })

  return sequencesDictionary
}

const getLeftPadding = (sequences) => {
  const maxSequenceLength = Math.max(...sequences.map((seq) => seq.length))
  let lastEmptyColumnIndex = -1

  for (let columnIndex = 0; columnIndex < maxSequenceLength; columnIndex++) {
    const columnValues = sequences.map(
      (sequence) => sequence[columnIndex] || GAP_SYMBOL
    )
    const gapCount = columnValues.filter((value) => value === GAP_SYMBOL).length

    if (columnValues.length !== gapCount) break

    lastEmptyColumnIndex = columnIndex
  }

  return lastEmptyColumnIndex
}

const getRightPadding = (sequences) => {
  const maxSequenceLength = Math.max(...sequences.map((seq) => seq.length))
  let firstEmptyColumnIndex = maxSequenceLength

  for (
    let columnIndex = maxSequenceLength - 1;
    columnIndex > -1;
    columnIndex--
  ) {
    const columnValues = sequences.map(
      (sequence) => sequence[columnIndex] || GAP_SYMBOL
    )
    const gapCount = columnValues.filter((value) => value === GAP_SYMBOL).length

    if (columnValues.length !== gapCount) break

    firstEmptyColumnIndex = columnIndex
  }

  return firstEmptyColumnIndex
}

const trimLeftPadding = (sequence, trimIndex) => {
  if (trimIndex < 0) return sequence

  return sequence.slice(trimIndex)
}

const trimRightPadding = (sequence, trimIndex) => {
  if (trimIndex > sequence.length) return sequence

  return sequence.slice(0, trimIndex)
}

const formatSequence = (sequence, maxSequenceLength) => {
  const trailingLength = maxSequenceLength - sequence.length

  for (let trailingIndex = 0; trailingIndex < trailingLength; trailingIndex++) {
    sequence.push(GAP_SYMBOL)
  }

  return sequence
}

module.exports = { formatSequences, consensusSequence }
