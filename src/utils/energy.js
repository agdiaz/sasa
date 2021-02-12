'use strict';

const _lodash = require('lodash');
const { DELETE_SYMBOL } = require('../constants');

const energyOf = (sequences) => {
  const maxSequenceLength = Math.max(...sequences.map(s => s.length));
  let totalEnergy = 0;

  for (let positionIndex = 0; positionIndex < maxSequenceLength; positionIndex++) {
    const positionValues = sequences.map(seq => seq[positionIndex]);
    const deletionCount = positionValues.filter(v => v === DELETE_SYMBOL).length

    const groups = Object.keys(_lodash.countBy(positionValues)).length;

    totalEnergy += (groups - 1) + deletionCount;
  }

  return totalEnergy;
}

module.exports = energyOf;
