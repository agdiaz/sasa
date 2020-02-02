'use strict';
const _lodash = require('lodash');

const findInitialState = (sequences) => {
  const maxLength = Math.max(...sequences.map(sequence => sequence.set[0].seq.length));
  const initialState = Array(maxLength);
  
  for(let index = 0; index < maxLength; index++) {
    const randomSequence = _lodash.sample(sequences);
    
    initialState[index] = randomSequence.set[0].seq[index] || '-';
  }

  return initialState;
};

const findNextState = (sequences, state) => {
  return state;
};

const energyOf = state => {
  return state.length;
};

module.exports = {
  findInitialState,
  findNextState,
  energyOf
};
