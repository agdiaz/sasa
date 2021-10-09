'use strict'
console.log('Welcome to SASA (Simulated Annealing Sequence Alignment) Tool')

const moment = require('moment')
const program = require('commander')

const {
  DEFAULT_TEMP,
  DEFAULT_MAX_ITERATIONS,
  DEFAULT_NEIGHBOR_EXECUTIONS,
  DEFAULT_RUNS,
  COOLING_RATE,
  LOWEST_TEMP,
} = require('./src/constants')
const executionDateTime = moment().format('YYYY_MM_DD_HH_mm_ss')

const collectFiles = require('./src/utils/command-utils')
const writeResults = require('./src/utils/write-results')

const { resolveProblemWith } = require('./src/resolver')
const { simulatedAnnealing } = require('./src/algorithms/simulated-annealing')
const { sequenceAlignment } = require('./src/problems/sequence-alignment')

program
  .version('0.0.1')
  .requiredOption('-i, --input <file>', 'path to input file', collectFiles, [])
  .option('-d, --debug [flag]', 'Output extra debugging', false)
  .option(
    '-t, --temperature [temp]',
    'Initial temperature of the model',
    DEFAULT_TEMP
  )
  .option(
    '-l, --limit [number]',
    'Max number of iterations',
    DEFAULT_MAX_ITERATIONS
  )
  .option(
    '-e, --executions [number]',
    'Number of executions of the algorithm',
    DEFAULT_RUNS
  )
  .option(
    '-n, --neighbor-iterations [number]',
    'Number of executions of algorithm',
    DEFAULT_NEIGHBOR_EXECUTIONS
  )
  .option(
    '-c, --cooling-rate [number]',
    'Number of executions of algorithm',
    COOLING_RATE
  )
  .option(
    '-z, --lowest-temp [number]',
    'Number of executions of algorithm',
    LOWEST_TEMP
  )
  .option(
    '-o, --output <folder>',
    'Path to output folder',
    `./output/sasa-${executionDateTime}`
  )
  .parse(process.argv)

if (program.debug) console.log(program.opts())
if (program.executions <= 0) {
  console.log('Invalid count of executions. It must be greater that 1')
  process.abort()
}

const parameters = {
  files: program.input,
  initialTemperature: program.temperature,
  iterationsLimit: program.limit,
  executions: program.executions,
  neighborIterations: program.neighborIterations,
  coolingRate: program.coolingRate,
  lowestTemp: program.lowestTemp,
  isDebugging: program.debug,
}

const executionTimes = parseInt(program.executions)
const results = resolveProblemWith({
  problem: sequenceAlignment,
  algorithm: simulatedAnnealing,
  parameters,
  executionTimes,
})

writeResults({
  outputFolder: program.output,
  results,
})
