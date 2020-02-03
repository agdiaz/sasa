'use strict';
const events = require('events');

const { DEFAULT_TEMP, DEFAULT_ITERATIONS } = require('./src/constants');

console.log('Welcome to SASA!');

const program = require('commander');
const collectFiles = require('./src/utils/command-utils');
const run = require('./src/main');
const resultsFormatter = require('./src/utils/results-formatter');
const eventEmitter = new events.EventEmitter();
const plotLogs = require('./src/utils/plot-logs');

program
  .version('0.0.1')
  .requiredOption('-i, --input <file>', 'path to input file', collectFiles, [])
  .option('-d, --debug [flag]', 'Output extra debugging', false)
  .option('-t, --temperature [temp]', 'Initial temperature of the model',
    DEFAULT_TEMP)
  .option('-l, --limit [number]', 'Max number of iterations',
    DEFAULT_ITERATIONS)
  .parse(process.argv);

if (program.debug) console.log(program.opts());

const eventsLog = [];
let initialConditions;
eventEmitter.addListener('iterationCompleted', (event) => {
  eventsLog.push(event);
  if (program.debug) console.debug('iterationCompleted', event);
});
eventEmitter.addListener('readyToStart', (event) => {
  initialConditions = event;
});


const results = run({
  files: program.input,
  initialTemperature: program.temperature,
  iterationsLimit: program.limit,
  isDebugging: program.debug,
  eventEmitter,
});

resultsFormatter(results);

console.log('SASA finished. Opening results...');
plotLogs(initialConditions, eventsLog);

console.log('Press any key to continue.');
process.stdin.once('data', () => {
  eventEmitter.removeAllListeners();
  process.exit(0);
});
