'use strict';
const _lodash = require('lodash');
const randomIndel = require('./utils/indel');
const energyOfMatches = require('./utils/energy');
const { maxLength } = require('./utils/fasta-reader');

const findInitialState = (sequences) => {
  const maxPosition = maxLength(sequences);
  const initialState = Array(maxPosition);
  
  for(let index = 0; index < maxPosition; index++) {
    const randomSequence = _lodash.sample(sequences);
    const possibleValues = (index < randomSequence.set[0].seq.length) 
      ? [randomSequence.set[0].seq[index], '-']
      : ['-'];
 
    initialState[index] = _lodash.sample(possibleValues);
  }

  return initialState;randomSequence.set[0].seq.length
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
