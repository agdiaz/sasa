'use strict';

const { COOLING_RATE } = require('./constants');
const COOLING_CONSTANT = 1 - COOLING_RATE;

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
    currentTemperature *= COOLING_CONSTANT, currentTime++
  ) {
    const currentEnergy = energyOf(problem, currentState);
    const nextState = findNextState(problem, currentState);
    const nextStateEnergy = energyOf(problem, nextState);

    const deltaEnergy = nextStateEnergy - currentEnergy;

    if (deltaEnergy < 0) {
      currentState = nextState;
    } else {
      const qExp = -(deltaEnergy * 1.0 / currentTemperature * 1.0);
      const q = Math.min(1.0, Math.pow(Math.E, qExp));

      // if (q < Math.random()) currentState = nextState;
      if (Math.random() < q) currentState = nextState;
    }

    if (isDebugging) console.debug({
      currentTime,
      currentTemperature,
      currentEnergy,
      currentAlignmentLength: currentState.length
    });
  }

  return currentState;
};

module.exports = simulatedAnnealing;
