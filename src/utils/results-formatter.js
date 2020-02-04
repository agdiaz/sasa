'use strict';
const _lodash = require('lodash');

module.exports = ({ sequences, executionResult }) => {
  const alignedSequence = executionResult.finalState;
  const maxLength = Math.max(...sequences.map(sequence =>
    sequence.set[0].seq.length));
  const chunkedSequences = sequences.map(sequence =>
    _lodash.chunk(sequence.set[0].seq.toString(), 50));
  const chunkedResult = _lodash.chunk(alignedSequence, 50);
  const iterations = _lodash.range(0, Math.ceil(maxLength / 50));

  console.log('BEST SEQUENCE');
  console.log('INITIAL ENERGY', executionResult.initialEnergy.toFixed(5));
  console.log('FINAL ENERGY  ', executionResult.finalEnergy.toFixed(5));

  iterations.forEach(it => {
    console.log('FROM-TO:', it * 50, ((it + 1) * 50) - 1);
    if (it % 2 === 0) {
      console.log('      0         1         2         3         4');
    } else {
      console.log('      5         6         7         8         9');
    }
    console.log('      01234567890123456789012345678901234567890123456789');
    let alignmentLogSeq = '';
    if (it < chunkedResult.length) {
      alignmentLogSeq = chunkedResult[it].join('').toString();
    }

    console.log('\x1b[31mCONSE', alignmentLogSeq, '\x1b[0m');

    chunkedSequences.forEach((seq, index) => {
      let logSeq = '';
      if (it < seq.length) {
        logSeq = seq[it].join('').toString();
      }
      console.log(
        '\x1b[33m' + (1 + index).toString().padStart(5, 'SEQ00'), logSeq,
      );
    });

    console.log('\x1b[0m');
  });
};
