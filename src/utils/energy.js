'use strict';
const _lodash = require('lodash');

const energyOf = (alignment, sequences) => {
  // if (alignment.length === 0) {
  //   return sequences.map(seq => seq.length).reduce((a, b) => a + b);
  // }
  const maxSequenceLength = Math.max(alignment.length, ...sequences.map(s => s.length));
  const positionEnergies =_lodash.range(0, maxSequenceLength).map(position => {
    if (position >= alignment.length) {
      return 1;
    } else {
      const alignmentValue = alignment[position];
      const valuesAtSamePosition = sequences.map(seq => seq[position]);

      return valuesAtSamePosition.filter(v => v !== alignmentValue).length / sequences.length;
    }
  });

  return _lodash.sum(positionEnergies);
};

module.exports = energyOf;
