'use strict';
console.log("Welcome to SASA!");

const program = require('commander');
const collectFiles = require('./src/utils/command-utils');
const run = require('./src/main');
const timestamp = new Date().toISOString();

program
  .version('0.0.1')
  .option('-d, --debug', 'Output extra debugging')
  .option('-t, --temperature', 'Initial temperature of the model', 1000)
  .option('-l, --limit', 'Max number of iterations', 100)
  .requiredOption('-i, --input <file>', 'path to input file', collectFiles, [])
  .parse(process.argv);

if (program.debug) console.log(program.opts());

const results = run({ 
  files: program.input,
  initialTemperature: program.temperature,
  iterationsLimit: program.limit,
  isDebugging: program.debug
});

console.log('SASA finished', { ...results, timestamp });
process.exit(0);
