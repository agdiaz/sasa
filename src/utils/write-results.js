'use strict';

const fs = require('fs');
const _lodash = require('lodash');

const resultsFormatter = require('./results-formatter');

const writeResults = ({ results, sequences, outputFolder }) => {
  const resultsFilename = `${outputFolder}/results.md`;
  const resultsSortedByLowestEnergy = _lodash.orderBy(results, result => result.finalEnergy, 'asc');

  fs.writeFileSync(resultsFilename, JSON.stringify(resultsSortedByLowestEnergy));

  const bestResultFilename = `${outputFolder}/best.md`;
  const bestResult = resultsSortedByLowestEnergy[0];
  const formattedOutput = resultsFormatter({ sequences, executionResult: bestResult });

  fs.writeFileSync(bestResultFilename, JSON.stringify(bestResult));
};

module.exports = writeResults;
