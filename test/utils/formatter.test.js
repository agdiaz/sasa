const { formatSequences } = require('../../src/utils/format-sequences')

test('Testing the formatter', () => {
  const sequences = {
    S1: {
      sequenceValues: ['-', '-', 'A', 'B', 'C', '-'],
    },
    S2: {
      sequenceValues: ['-', 'A', 'A', 'B', '-'],
    },
    S3: {
      sequenceValues: ['-', '-', 'A', 'B', 'C', '-', '-', '-', '-'],
    },
  }
  formatSequences(sequences)

  expect(sequences['S1'].sequenceValues).toEqual(['-', 'A', 'B', 'C'])
  expect(sequences['S2'].sequenceValues).toEqual(['A', 'A', 'B', '-'])
  expect(sequences['S3'].sequenceValues).toEqual(['-', 'A', 'B', 'C'])
})

test('Testing the formatter with a dummy scenario', () => {
  const sequences = {
    S1: {
      sequenceValues: ['-', '-', 'A', 'B', 'C', '-', '-'],
    },
    S2: {
      sequenceValues: ['-', '-', 'D', 'E', 'F', '-', '-'],
    },
    S3: {
      sequenceValues: ['-', '-', 'G', 'H', 'I', '-', '-'],
    },
  }

  formatSequences(sequences)

  expect(sequences['S1'].sequenceValues).toEqual(['A', 'B', 'C'])
  expect(sequences['S2'].sequenceValues).toEqual(['D', 'E', 'F'])
  expect(sequences['S3'].sequenceValues).toEqual(['G', 'H', 'I'])
})

test('Testing the formatter with a dummy scenario', () => {
  const sequences = {
    S1: {
      sequenceValues: ['-', '-', 'A', 'B', 'C', '-', '-', '-', '-'],
    },
    S2: {
      sequenceValues: ['-', '-', 'D', 'E', 'F', '-', '-'],
    },
    S3: {
      sequenceValues: ['-', '-', '-', '-', 'G', 'H', 'I', '-', '-'],
    },
  }

  formatSequences(sequences)

  expect(sequences['S1'].sequenceValues).toEqual(['A', 'B', 'C', '-', '-'])
  expect(sequences['S2'].sequenceValues).toEqual(['D', 'E', 'F', '-', '-'])
  expect(sequences['S3'].sequenceValues).toEqual(['-', '-', 'G', 'H', 'I'])
})
