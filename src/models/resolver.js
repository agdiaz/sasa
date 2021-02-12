'use strict';

const _lodash = require('lodash');

const { mapPathsToSequences } = require('../utils/fasta-reader');
const simulatedAnnealing = require('../simulated-annealing');
const { EVENTS } = require('../constants');
const formatSequences = require('../utils/format-sequences');

class Resolver {
  constructor({ parameters, options}) {
    this.sequences = mapPathsToSequences(parameters.files, options.isDebugging);
    this.sequencesStrings = this.sequences.map(seq => seq.set[0].seq.toString());
    this.simulatedAnnealingArgs = {
      parameters: {
        initialTemperature: parameters.initialTemperature,
        iterationsLimit: parameters.iterationsLimit,
        isDebugging: options.isDebugging,
      },
    };
  }

  runSimulatedAnnealing(times) {
    const executionResults = _lodash.range(0, times).map(time => {
      const solution = simulatedAnnealing({ sequences: this.sequencesStrings, ...this.simulatedAnnealingArgs });
      
      return { 
        ...solution,
        initialState: formatSequences(solution.initialState),
        finalState: formatSequences(solution.finalState),
      }
    });

    return executionResults;
  };
};

module.exports = Resolver;
