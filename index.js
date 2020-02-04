'use strict';
console.log('Welcome to SASA!');

const events = require('events');
const moment = require('moment');
const program = require('commander');

const { DEFAULT_TEMP, DEFAULT_ITERATIONS } = require('./src/constants');

const listenToExecutions = require('./src/utils/listener');
const collectFiles = require('./src/utils/command-utils');
const Resolver = require('./src/models/resolver');
const resultsFormatter = require('./src/utils/results-formatter');
const executionDatetime = moment().format('YYYY_MM_DD_HH_mm_ss');
// const plotLogs = require('./src/utils/plot-logs');

program
  .version('0.0.1')
  .requiredOption('-i, --input <file>', 'path to input file', collectFiles, [])
  .option('-d, --debug [flag]', 'Output extra debugging', false)
  .option('-t, --temperature [temp]', 'Initial temperature of the model', DEFAULT_TEMP)
  .option('-l, --limit [number]', 'Max number of iterations', DEFAULT_ITERATIONS)
  .option('-e, --executions [number]', 'Number of executions of algorithm', 1)
  .option('-o, --output <folder>', 'Path to output folder', `./sasa-${executionDatetime}`)
  .parse(process.argv);

if (program.debug) console.log(program.opts());
if (program.executions <= 0) {
  console.log('Invalid count of executions. It must be greater that 1');
  process.abort();
}

const eventEmitter = new events.EventEmitter();
listenToExecutions(eventEmitter, program.output);

const results = new Resolver({
  parameters: {
    files: program.input,
    initialTemperature: program.temperature,
    iterationsLimit: program.limit,
  },
  options: {
    isDebugging: program.debug,
    eventEmitter,
  }
}).runSimulatedAnnealing(program.executions);

// resultsFormatter(results);

// console.log(results.executionResult.currentState.join('').toString());

// plotLogs(initialConditions, eventsLog);

console.log('SASA finished. Press any key to continue.');
process.stdin.once('data', () => {
  eventEmitter.removeAllListeners();
  process.exit(0);
});
