'use strict';

const simulatedAnnealing = require('./src/simulated-annealing');
const randomList = require('./src/utils/random-list');
const plotProblem = require('./src/utils/plot-problem');

console.log('Starting SASA');

const problem = randomList(250, 10, 25);
const result = simulatedAnnealing({ problem, initialTemperature: 1000, iterationsLimit: 100 });
plotProblem(problem, result);

console.log('Ending SASA', result);
