'use strict';

const _lodash = require('lodash');

const energyOf = (alignment, sequences) => {
  const countOfSequences = sequences.length;
  const maxSequenceLength = Math.max(alignment.length, ...sequences.map(s => s.length));

  const positionEnergies = _lodash.range(0, maxSequenceLength).map(position => {
    if (position >= alignment.length) {
      return 1;
    }

    const alignmentValue = alignment[position];
    const valuesAtSamePosition = sequences.map(seq => seq[position]);

    return valuesAtSamePosition.filter(v => (v !== alignmentValue)).length / countOfSequences;
  });

  return _lodash.sum(positionEnergies);
};

module.exports = energyOf;
