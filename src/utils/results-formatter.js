'use strict';
const _lodash = require('lodash');

module.exports = ({ sequences, executionResult: alignedSequence }) => {
  const maxLength = Math.max(...sequences.map(sequence => sequence.set[0].seq.length));
  const positions = _lodash.range(maxLength).map(n => n+1);

  console.log('POS', positions.join(''));
  console.log('ALG', alignedSequence.join(''));
  sequences.forEach((seq, index) => {
    console.log(index.toString().padStart(3), seq.set[0].seq.toString());
  });
};