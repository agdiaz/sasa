'use strict'
const _lodash = require('lodash')

module.exports = ({ executionResult }) => {
  const sequences = executionResult.finalState

  const initialAlignedSequence = executionResult.initialSequence
  const alignedSequence = executionResult.finalSequence
  const maxLength = Math.max(...sequences.map((sequence) => sequence.length))
  const chunkedSequences = sequences.map((sequence) =>
    _lodash.chunk(sequence, 50)
  )
  const chunkedInitialAlignedSequence = _lodash.chunk(
    initialAlignedSequence,
    50
  )
  const chunkedAlignedSequence = _lodash.chunk(alignedSequence, 50)
  const iterations = _lodash.range(0, Math.ceil(maxLength / 50))

  console.log('RESULTS')
  console.log('FIRST ENERGY', executionResult.initialEnergy.toFixed(5))
  console.log('FINAL ENERGY  ', executionResult.finalEnergy.toFixed(5))

  iterations.forEach((it) => {
    console.log('FROM-TO:', it * 50, (it + 1) * 50 - 1)
    if (it % 2 === 0) {
      console.log('      0         1         2         3         4')
    } else {
      console.log('      5         6         7         8         9')
    }
    console.log('      01234567890123456789012345678901234567890123456789')

    let firstAlignmentLogSeq = ''
    if (it < chunkedInitialAlignedSequence.length) {
      firstAlignmentLogSeq = chunkedInitialAlignedSequence[it]
        .join('')
        .toString()
    }

    console.log('\x1b[31mFIRST', firstAlignmentLogSeq, '\x1b[0m')

    let alignmentLogSeq = ''
    if (it < chunkedAlignedSequence.length) {
      alignmentLogSeq = chunkedAlignedSequence[it].join('').toString()
    }

    console.log('\x1b[32mCONSE', alignmentLogSeq, '\x1b[0m')

    chunkedSequences.forEach((seq, index) => {
      let logSeq = ''
      if (it < seq.length) {
        logSeq = seq[it].join('').toString()
      }
      console.log(
        '\x1b[33m' + (1 + index).toString().padStart(5, 'SEQ00'),
        logSeq
      )
    })

    console.log('\x1b[0m')
  })
}
