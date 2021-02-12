'use strict';

const { countBy } = require('lodash');
const { DELETE_SYMBOL } = require('../constants');

const energyOf = (sequences) => {
  const maxSequenceLength = Math.max(...sequences.map(s => s.length));
  let totalEnergy = 0;

  for (let positionIndex = 0; positionIndex < maxSequenceLength; positionIndex++) {
    const positionValues = sequences.map(seq => seq[positionIndex]);
    const deletionCount = positionValues.filter(v => v === DELETE_SYMBOL).length

    const groups = Object.keys(countBy(positionValues)).length;

    totalEnergy += (groups - 1) + ((deletionCount / positionValues.length) * (maxSequenceLength - positionIndex));
  }

  return totalEnergy;
}

module.exports = energyOf;
