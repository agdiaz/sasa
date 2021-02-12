'use strict';

const { DELETE_SYMBOL } = require('../constants');

const addDeletion = (sequence) => {
  const randomSplitter = Math.random();

  let position;
  if (randomSplitter < 0.5) {
    position = 0;
  } else {
    position = sequence.length;    
  }
  
  sequence.splice(position, 0, DELETE_SYMBOL);

  return sequence;
};

const removeDeletion = (sequence) => {
  let position;
  if (Math.random() < 0.5) {
    position = sequence.indexOf(DELETE_SYMBOL);
  } else {
    position = sequence.lastIndexOf(DELETE_SYMBOL);
  }

  if (position >= 0) {
    sequence.splice(position, 1);
  }

  return sequence;
};

module.exports = { removeDeletion, addDeletion };
