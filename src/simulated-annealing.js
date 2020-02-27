'use strict';

const { COOLING_RATE } = require('./constants');

const simulatedAnnealing = ({ problem, parameters }) => {
  const executionLogs = [];
  const { initialTemperature, iterationsLimit} = parameters;
  const isStillHot = (currentTemperature, currentTime) => currentTemperature > 0.1 && currentTime < iterationsLimit;

  let currentState = problem.initialState;
  let currentEnergy = problem.initialEnergy;
  let currentTemperature, currentTime;

  for (
    currentTemperature = initialTemperature, currentTime = 0;
    isStillHot(currentTemperature, currentTime);
    currentTemperature *= COOLING_RATE, currentTime++
  ) {
    executionLogs.push({ currentTemperature, currentTime, currentEnergy });

    let newState = currentState;
    let newEnergy = currentEnergy;

    for(let i = 0; i < 50; i++) {
      const nextState = problem.findNextState(newState);
      const nextStateEnergy = problem.energyOf(nextState);
      const deltaEnergy = nextStateEnergy - newEnergy;

      if (deltaEnergy <= 0) {
        newState = nextState;
        newEnergy = nextStateEnergy;
      }
    }

    if (newEnergy - currentEnergy <= 0) {
      currentState = newState;
      currentEnergy = newEnergy;
    } else {
      const qExp = (-1.0 * (newEnergy - currentEnergy) / currentTemperature);
      const q = Math.pow(Math.E, qExp);

      if (q > Math.random()) {
        currentState = newState;
        currentEnergy = newEnergy;
      }
    }
  };

  const solution = {
    initialState: problem.initialState.join(''),
    initialEnergy: problem.initialEnergy,
    finalState: currentState.join(''),
    finalEnergy: currentEnergy,
    executionLogs,
  };

  return solution;
};

module.exports = simulatedAnnealing;
