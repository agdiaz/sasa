'use strict';
const DEFAULT_TEMP = 5000;
const DEFAULT_ITERATIONS = 10;

console.log("Welcome to SASA!");

const program = require('commander');
const collectFiles = require('./src/utils/command-utils');
const run = require('./src/main');
const resultsFormatter = require('./src/utils/results-formatter');
const timestamp = new Date().toISOString();

program
  .version('0.0.1')
  .requiredOption('-i, --input <file>', 'path to input file', collectFiles, [])
  .option('-d, --debug [flag]', 'Output extra debugging', false)
  .option('-t, --temperature [temp]', 'Initial temperature of the model', DEFAULT_TEMP)
  .option('-l, --limit [number]', 'Max number of iterations', DEFAULT_ITERATIONS)
  .parse(process.argv);

if (program.debug) console.log(program.opts());

const results = run({ 
  files: program.input,
  initialTemperature: program.temperature,
  iterationsLimit: program.limit,
  isDebugging: program.debug
});

resultsFormatter(results);

console.log('SASA finished');
process.exit(0);
