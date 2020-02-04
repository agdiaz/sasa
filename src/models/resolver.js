'use strict';

const _lodash = require('lodash');

const Problem = require('./problem');
const { mapPathsToSequences } = require('../utils/fasta-reader');
const simulatedAnnealing = require('../simulated-annealing');

class Resolver {
  constructor({ parameters, options, ...args}) {
    this.eventEmitter = options.eventEmitter;
    this.otherArgs = args;
    this.sequences = mapPathsToSequences(parameters.files, options.isDebugging);
    this.simulatedAnnealingArgs = {
      parameters: {
        initialTemperature: parameters.initialTemperature,
        iterationsLimit: parameters.iterationsLimit,
        isDebugging: options.isDebugging
      }
    };
  }

  // { files, sequences, executionResult }
  runSimulatedAnnealing(times) {
    const executionResults = _lodash.range(0, times).map(time => {
      this.eventEmitter.emit('executionStarted', {
        execution: time,
        startTime: new Date()
      });

      const problem = new Problem({ sequences: this.sequences });
      const result = simulatedAnnealing({ problem, ...this.simulatedAnnealingArgs });

      this.eventEmitter.emit('executionCompleted', {
        execution: time,
        endTime: new Date(),
        sequences: problem.sequencesContentsSplitedByPosition.map(seq => seq.join('').toString()),
        ...result
      });

      return result;
    });

    return executionResults;
  };
};

module.exports = Resolver;
