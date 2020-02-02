'use strict';

const fs = require('fs');
const { FastaUtils } = require('bioseq-ts');
const simulatedAnnealing = require('./simulated-annealing');
const { findInitialState, findNextState, energyOf } = require('./sequence-alignment');

const mapPathsToSequences = (files, isDebugging = false) => {
  return files.map(filePath => {
    const sequenceData = fs.readFileSync(filePath).toString();
    const bioSeqSet = new FastaUtils().parse(sequenceData);
    
    if (isDebugging) console.debug(bioSeqSet);

    return bioSeqSet;
  })
}

const run = ({ initialTemperature, iterationsLimit, files, isDebugging = false }) => {
  let executionResult;

  try {
    if (isDebugging) console.debug('Mapping paths to sequences');
    const sequences = mapPathsToSequences(files, isDebugging);
    
    executionResult = simulatedAnnealing({ 
      initialTemperature, 
      iterationsLimit,
      problem: sequences,
      findInitialState,
      findNextState,
      energyOf
    });
  } catch(error) {
    console.error(error);
    throw new Error('An uncatched error appeared. The program will be closed with an error code');
  }

  return { files, initialTemperature, iterationsLimit, executionResult };
};

module.exports = run;
