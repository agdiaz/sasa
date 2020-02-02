'use strict';

const { COOLING_RATE } = require('./constants');

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
  if (isDebugging) console.debug('initialState', { currentState });
  let currentTemperature, currentTime;

  for(
    currentTemperature = initialTemperature, currentTime = 0;
    currentTemperature > 1 && currentTime < iterationsLimit;
    currentTemperature *= 1.0 - COOLING_RATE, currentTime++
  ) {
    let currentEnergy = energyOf(problem, currentState);

    // let state;
    // for(let iteration = 0; iteration < iterationsLimit; iteration++) {
    const nextState = findNextState(problem, currentState);
    const nextStateEnergy = energyOf(problem, nextState);
    const deltaEnergy = nextStateEnergy - currentEnergy;

    if (deltaEnergy <= 0) {
      // state = nextState;
      currentState = nextState;
    } else {
      const qExp = -(deltaEnergy / currentTemperature);
      const q = Math.min(1, Math.pow(Math.E, qExp));

      if (Math.random() < q) {
        // state = nextState;
        currentState = nextState;
      }
    }
    // }

    // currentState = state;
    if (isDebugging) console.debug({ currentTime, currentTemperature, currentState, currentEnergy });
  }

  return currentState;
};

module.exports = simulatedAnnealing;
