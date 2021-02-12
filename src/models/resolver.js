'use strict';

const _lodash = require('lodash');

const { mapPathsToSequences } = require('../utils/fasta-reader');
const simulatedAnnealing = require('../simulated-annealing');
const { EVENTS } = require('../constants');

class Resolver {
  constructor({ parameters, options}) {
    this.eventEmitter = options.eventEmitter;
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
      const startTime = new Date();
      this.eventEmitter.emit(EVENTS.EXECUTION_STARTED, {
        execution: time,
        startTime: startTime,
      });

      const solution = simulatedAnnealing({ sequences: this.sequencesStrings, ...this.simulatedAnnealingArgs });

      this.eventEmitter.emit(EVENTS.EXECUTION_COMPLETED, {
        execution: time,
        startTime: startTime,
        endTime: new Date(),
        sequences: this.sequencesStrings,
        ...solution,
      });

      return solution;
    });

    return executionResults;
  };
};

module.exports = Resolver;
