'use strict';

const _lodash = require('lodash');
const { DELETE_SYMBOL } = require('../constants');

const addDeletion = (state, sequenceIndex) => {
  const sequence = state[sequenceIndex];
  const randomSplitter = Math.random();

  let position;
  if (randomSplitter < 0.5) {
    position = 0;
  } else {
    position = sequence.length;    
  }
  
  sequence.splice(position, 0, DELETE_SYMBOL);

  return state;
};

const removeDeletion = (state, sequenceIndex) => {
  const sequence = state[sequenceIndex];

  let position;
  if (Math.random() < 0.5) {
    position = sequence.indexOf(DELETE_SYMBOL);
  } else {
    position = sequence.lastIndexOf(DELETE_SYMBOL);
  }

  if (position >= 0) {
    sequence.splice(position, 1);
  }

  return state;
};

module.exports = { removeDeletion, addDeletion };
