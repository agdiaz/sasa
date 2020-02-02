'use strict';

const lodash = require('lodash');
const COOLING_RATE = 0.003;

const simulatedAnnealing = ({ 
  initialTemperature, 
  iterationsLimit, 
  problem, 
  findInitialState, 
  findNextState, 
  energyOf,
  isDebugging 
}) => {
  let currentState = findInitialState(problem);
  let currentTemperature = initialTemperature;
  let time = 0;

  while(currentTemperature > 1) {
    let state = currentState;
    let currentEnergy = energyOf(problem, state);
    
    for(let iteration = 0; iteration < iterationsLimit; iteration++) {
      const nextState = findNextState(problem, state);
      const nextStateEnergy = energyOf(problem, nextState);
      const deltaEnergy = nextStateEnergy - currentEnergy;
      
      if (deltaEnergy < 0) {
        state = nextState;
      } else {
        const qExp = -(deltaEnergy / currentTemperature);
        const q = Math.min(1, Math.pow(Math.E, qExp));

        if (Math.random() < q) {
          state = nextState;
        }
      }
    }

    currentState = state;
    currentTemperature *= 1.0 - COOLING_RATE
    time++;
    
    if (isDebugging) console.debug({ time, currentTemperature, currentState, currentEnergy });
  }

  return currentState;
};

module.exports = simulatedAnnealing;
