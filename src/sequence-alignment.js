'use strict';
const _lodash = require('lodash');
const randomIndel = require('./utils/indel');
const energyOfMatches = require('./utils/energy');

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
  const nextState = [...state];
  const randomIndex = Math.floor(Math.random() * state.length);
  const indelFunction = randomIndel();

  return indelFunction(sequences, nextState, randomIndex);
};

const energyOf = (sequences, state) => {
  const arrayedSequences = sequences.map(seq => seq.set[0].seq.split(''));
  
  return energyOfMatches(state, arrayedSequences);
};

module.exports = {
  findInitialState,
  findNextState,
  energyOf
};
