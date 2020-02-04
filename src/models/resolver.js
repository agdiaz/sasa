'use strict';

const _lodash = require('lodash');

const Problem = require('./problem');
const { mapPathsToSequences } = require('../utils/fasta-reader');
const simulatedAnnealing = require('../simulated-annealing');
const { EVENTS } = require('../constants');

class Resolver {
  constructor({ parameters, options, ...args}) {
    this.eventEmitter = options.eventEmitter;
    this.otherArgs = args;
    this.sequences = mapPathsToSequences(parameters.files, options.isDebugging);
    this.sequencesStrings = this.sequences.map(seq => seq.set[0].seq.toString());
    this.simulatedAnnealingArgs = {
      parameters: {
        initialTemperature: parameters.initialTemperature,
        iterationsLimit: parameters.iterationsLimit,
        isDebugging: options.isDebugging
      }
    };
  }

  runSimulatedAnnealing(times) {
    const executionResults = _lodash.range(0, times).map(time => {
      const startTime = new Date();
      this.eventEmitter.emit(EVENTS.EXECUTION_STARTED, {
        execution: time,
        startTime: startTime
      });

      const problem = new Problem({ sequences: this.sequences });
      const result = simulatedAnnealing({ problem, ...this.simulatedAnnealingArgs });

      this.eventEmitter.emit(EVENTS.EXECUTION_COMPLETED, {
        execution: time,
        startTime: startTime,
        endTime: new Date(),
        sequences: this.sequencesStrings,
        ...result
      });

      return result;
    });

    return executionResults;
  };
};

module.exports = Resolver;
