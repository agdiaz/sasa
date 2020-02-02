'use strict';

const energyOf = (alignment, sequences) => {
  if (alignment.length === 0) {
    return sequences.map(seq => seq.length).reduce((a, b) => a + b);
  }

  const positionEnergies = alignment.map((value, position) => {
    const valuesAtSamePosition = sequences.map(seq => seq[position]);

    return valuesAtSamePosition.filter(v => v !== value).length / sequences.length;
  });
  return Math.round(positionEnergies.reduce((a, b) => a + b));
};

module.exports = energyOf;
