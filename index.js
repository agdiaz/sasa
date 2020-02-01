'use strict';
console.log("Welcome to SASA!");

const program = require('commander');
const collectFiles = require('./src/utils/command-utils');

program
  .version('0.0.1')
  .option('-d, --debug', 'Output extra debugging')
  .requiredOption('-i, --input <file>', 'path to input file', collectFiles)
  .parse(process.argv);

if (program.debug) console.log(program.opts());

console.log('SASA finished. Good bye!');
process.exit(0);
