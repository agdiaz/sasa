'use strict';

const simulatedAnnealing = require('./src/simulated-annealing');
const randomList = require('./src/utils/random-list');
const plotProblem = require('./src/utils/plot-problem');

const findInitialState = (problem) => {
  return lodash.sample(problem);
}
const findNextState = (problem, _state) => {
  return lodash.sample(problem);
}
const energyOf = state => state;

console.log('Starting SASA');

const problem = randomList(250, 10, 25);
const result = simulatedAnnealing({ 
  problem, 
  initialTemperature: 1000, 
  iterationsLimit: 100, 
  findInitialState, 
  findNextState, 
  energyOf 
});

plotProblem(problem, result);

console.log('Ending SASA', result);
