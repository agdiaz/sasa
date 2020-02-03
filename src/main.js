'use strict';

const simulatedAnnealing = require('./simulated-annealing');
const {
  findInitialState,
  findNextState,
  energyOf,
} = require('./sequence-alignment');
const { mapPathsToSequences } = require('./utils/fasta-reader');

const run = (args) => {
  const {
    initialTemperature,
    iterationsLimit,
    files,
    isDebugging = false,
    eventEmitter,
  } = args;
  let executionResult;
  let sequences;

  try {
    sequences = mapPathsToSequences(files, isDebugging);

    executionResult = simulatedAnnealing({
      initialTemperature,
      iterationsLimit,
      problem: sequences,
      findInitialState,
      findNextState,
      energyOf,
      eventEmitter,
    });
  } catch (error) {
    console.error(error);
    throw new Error(
      'An uncatched error. The program will be closed with an error code',
    );
  }

  return { files, sequences, executionResult };
};

module.exports = run;
