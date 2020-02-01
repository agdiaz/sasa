'use strict';
const lodash = require('lodash');
const COOLING_RATE = 0.003;

const findInitialState = (problem) => {
  return lodash.sample(problem);
}
const findNextState = (problem, state) => {
  return lodash.sample(problem);
}
const energyOf = state => state;

const simulatedAnnealing = ({ problem, initialTemperature, iterationsLimit }) => {
  let currentState = findInitialState(problem);
  let temperature = initialTemperature;
  let time = 0;

  while(temperature > 1) {
    let state = currentState;
    let iteration = 0;
    
    while(iteration < iterationsLimit) {
      const nextState = findNextState(problem, state);
      const deltaEnergy = energyOf(nextState) - energyOf(state);
      
      if (deltaEnergy < 0) {
        state = nextState;
      } else {
        const qExp = ((-1) * deltaEnergy) / temperature;
        const q = lodash.min([1, Math.pow(Math.E, qExp)]);

        if (Math.random() < q) {
          state = nextState;
        }
      }

      iteration++;
    }

    currentState = state;
    temperature *= 1.0 - COOLING_RATE
    time++;
    console.log({ time, temperature, currentState });
  }

  return currentState;
};

module.exports = simulatedAnnealing;