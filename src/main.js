'use strict';

const simulatedAnnealing = require('./simulated-annealing');
const { findInitialState, findNextState, energyOf } = require('./sequence-alignment');
const { mapPathsToSequences } = require('./utils/fasta-reader');

const run = ({ initialTemperature, iterationsLimit, files, isDebugging = false }) => {
  let executionResult;
  let sequences;

  try {
    if (isDebugging) console.debug('Mapping paths to sequences');
    sequences = mapPathsToSequences(files, isDebugging);
    
    executionResult = simulatedAnnealing({ 
      initialTemperature, 
      iterationsLimit,
      problem: sequences,
      findInitialState,
      findNextState,
      energyOf,
      isDebugging
    });
  } catch(error) {
    console.error(error);
    throw new Error('An uncatched error appeared. The program will be closed with an error code');
  }

  return { files, sequences, executionResult };
};

module.exports = run;
