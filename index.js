'use strict';
console.log("Welcome to SASA!");

const program = require('commander');
const collectFiles = require('./src/utils/command-utils');
const run = require('./src/main');
const timestamp = new Date().toISOString();

program
  .version('0.0.1')
  .requiredOption('-i, --input <file>', 'path to input file', collectFiles, [])
  .option('-d, --debug [flag]', 'Output extra debugging', false)
  .option('-t, --temperature [temp]', 'Initial temperature of the model', 1000)
  .option('-l, --limit [number]', 'Max number of iterations', 100)
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
