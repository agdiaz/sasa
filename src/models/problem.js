'use strict';

const _lodash = require('lodash');

const changeStateGenerator = require('../utils/change-state-generator');
const energyOfMatches = require('../utils/energy');

const { DELETE_SYMBOL } = require('../constants');

class Problem {
  constructor({ sequences }) {
    this.sequences = sequences;
    this.sequencesContentsSplitedByPosition = sequences.map(seq => seq.set[0].seq.split(''));
    this.initialState = this.findInitialState();
    this.initialEnergy = this.energyOf(this.initialState);
  }

  findInitialState() {
    const sequenceLengths = this.sequencesContentsSplitedByPosition.map(seq => seq.length);
    const maxSequenceLength = Math.max(...sequenceLengths);
    const initialState = Array(maxSequenceLength);

    for (let index = 0; index < maxSequenceLength; index++) {
      const randomSequence = _lodash.sample(this.sequencesContentsSplitedByPosition);
      const possibleValues = (index < randomSequence.length)
        ? [randomSequence[index], DELETE_SYMBOL]
        : [DELETE_SYMBOL];

      initialState[index] = _lodash.sample(possibleValues);
    }

    return initialState;
  };

  findNextState(state) {
    const nextState = [...state];
    const randomIndex = Math.floor(Math.random() * state.length);
    const changeState = changeStateGenerator();

    return changeState(this.sequences, nextState, randomIndex);
  };

  energyOf(state) {
    return energyOfMatches(state, this.sequencesContentsSplitedByPosition);
  };
};

module.exports = Problem;
