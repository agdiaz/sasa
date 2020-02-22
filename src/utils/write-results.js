'use strict';

const fs = require('fs');
const _lodash = require('lodash');
const { parse } = require('json2csv');

const resultsFormatter = require('./results-formatter');

const writeResults = ({ results, sequences, outputFolder }) => {
  const resultsSortedByLowestEnergy = _lodash.orderBy(results, result => result.finalEnergy, 'asc').map(r => {
    return _lodash.pick(r, ["initialState", "initialEnergy", "finalState", "finalEnergy"]);
  });

  const resultsFilename = `${outputFolder}/results.csv`;
  fs.writeFileSync(resultsFilename, parse(resultsSortedByLowestEnergy));

  const bestResult = resultsSortedByLowestEnergy[0];
  const bestResultFilename = `${outputFolder}/best.json`;
  fs.writeFileSync(bestResultFilename, JSON.stringify(bestResult));

  results.forEach((result, index) => {
    const performanceFilename = `${outputFolder}/performance_${result.finalEnergy}_${index}.csv`;
    fs.writeFileSync(performanceFilename, parse(result.executionLogs));
  });

  const energies = resultsSortedByLowestEnergy.map(result => result.finalEnergy);
  const bestEnergy = _lodash.head(energies);
  const worstEnergy = _lodash.last(energies);

  console.log(`Process finished. Range of energies: [${bestEnergy}-${worstEnergy}])\n`);
  resultsFormatter({ sequences, executionResult: bestResult });
};

module.exports = writeResults;
