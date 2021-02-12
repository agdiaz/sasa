'use strict';

const { DELETE_SYMBOL_PENALTY, DELETE_SYMBOL } = require('../constants');

const energyOf = (consensusSequence, sequences) => {
  const maxSequenceLength = Math.max(consensusSequence.length, ...sequences.map(s => s.length));
  let positionEnergies = 0;

  for (let positionIndex = 0; positionIndex < maxSequenceLength; positionIndex++) {
    if (positionIndex < consensusSequence.length) {
      const targetValue = consensusSequence[positionIndex];

      if (targetValue === DELETE_SYMBOL || targetValue === 'n') {
        positionEnergies += DELETE_SYMBOL_PENALTY;
      } else {
        const positionValues = sequences.map(seq => seq[positionIndex]).filter(value => value !== targetValue);
        positionEnergies += positionValues.length;
      }
    } else {
      positionEnergies += DELETE_SYMBOL_PENALTY;
    }
  }

  return positionEnergies;
};

module.exports = energyOf;
