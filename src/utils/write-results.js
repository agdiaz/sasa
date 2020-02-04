'use strict';

const fs = require('fs');
const _lodash = require('lodash');
const { parse } = require('json2csv');

const resultsFormatter = require('./results-formatter');

const writeResults = ({ results, sequences, outputFolder }) => {
  const resultsFilename = `${outputFolder}/results.csv`;
  const resultsSortedByLowestEnergy = _lodash.orderBy(results, result => result.finalEnergy, 'asc');

  fs.writeFileSync(resultsFilename, parse(resultsSortedByLowestEnergy));

  const bestResultFilename = `${outputFolder}/best.json`;
  const bestResult = resultsSortedByLowestEnergy[0];
  fs.writeFileSync(bestResultFilename, JSON.stringify(bestResult));

  resultsFormatter({ sequences, executionResult: bestResult });
};

module.exports = writeResults;
