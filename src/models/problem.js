'use strict';

const _lodash = require('lodash');

const { addDeletion, removeDeletion } = require('../utils/change-state-generator');
const identity = require('../utils/clone-array');

const { DELETE_SYMBOL } = require('../constants');

const addPadding = (sequences) => {
  let currentPadding = 0;

  sequences.forEach(seq => {
    const deltaPadding = Math.floor(Math.random() * seq.length);

    for(let paddingIndex = 0; paddingIndex < currentPadding; paddingIndex++) {
      seq.unshift(DELETE_SYMBOL);
    }

    currentPadding += deltaPadding;
  });

  return sequences;
}

const findInitialAlignment = (sequences) => addPadding(_lodash.shuffle(sequences.map(seq => seq.split(''))));

const consensusSequence = (sequences) => {
  const sequenceLengths = sequences.map(seq => seq.length);
  const maxSequenceLength = Math.max(...sequenceLengths);
  const consensus = [];
  
  for (let index = 0; index < maxSequenceLength; index++) {
    const positionValues = _lodash.without(sequences.map(seq => seq[index]), undefined, null, DELETE_SYMBOL);
    const mostRepeatedValue = _lodash.head(_lodash(positionValues).countBy().entries().maxBy(_lodash.last));
    
    if (mostRepeatedValue !== undefined) {
      consensus.push(mostRepeatedValue);
    } else {
      consensus.push(DELETE_SYMBOL);
    }
  }

  return consensus;
}

const changeSequences = (sequences) => {
  const changedSequences = sequences.map(identity);
  
  changedSequences.forEach((state) => {
    const random = Math.random();

    if (random < 0.50) {
      return addDeletion(state)
    } else if (random < 1) {
      return removeDeletion(state)
    } else {
      return state;
    }
  })

  return changedSequences;
};

module.exports = {
  findInitialAlignment,
  consensusSequence,
  changeSequences,
};
