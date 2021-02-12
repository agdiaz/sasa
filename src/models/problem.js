'use strict';

const _lodash = require('lodash');

const { addDeletion, removeDeletion } = require('../utils/change-state-generator');
const energyOfMatches = require('../utils/energy');

const { DELETE_SYMBOL } = require('../constants');

class Problem {
  constructor({ sequences }) {
    this.sequences = sequences;
    this.sequencesContentsSplittedByPosition = this.sequences.map(seq => seq.split(''));
    this.initialState = this.findInitialAlignment();
    // this.initialSequence = this.consensusSequence(this.initialState);
    // this.initialEnergy = this.energyOf(this.initialSequence, this.initialState);
  }

  findInitialAlignment() {
    let initial = this.shuffle(this.sequencesContentsSplittedByPosition);
    return this.addPadding(initial);
  }

  shuffle(sequences) {
    return _lodash.shuffle(sequences);
  }

  addPadding(sequences) {
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

  consensusSequence(sequences) {
    const sequenceLengths = sequences.map(seq => seq.length);
    const maxSequenceLength = Math.max(...sequenceLengths);
    const consensus = [];
    
    for (let index = 0; index < maxSequenceLength; index++) {
      const positionValues = _lodash.without(sequences.map(seq => seq[index]), undefined, null, DELETE_SYMBOL);
      const mostRepeatedValue = _lodash.head(_lodash(positionValues).countBy().entries().maxBy(_lodash.last));
      
      if (mostRepeatedValue !== undefined) {
        consensus.push(mostRepeatedValue);
      } else {
        consensus.push('n');
      }
    }

    return consensus;
  }

  findNextState(state) {
    const nextState = [...state];
    const randomSequenceIndex = Math.floor(Math.random() * state.length);
    
    if (Math.random() < 0.33) {
      return addDeletion(nextState, randomSequenceIndex)
    } else {
      return removeDeletion(nextState, randomSequenceIndex)
    }
  };

  energyOf(stateSequences) {
    const sequence = this.consensusSequence(stateSequences);
    
    return energyOfMatches(sequence, stateSequences);
  };
};

module.exports = Problem;
