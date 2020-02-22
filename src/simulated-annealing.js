'use strict';

const { COOLING_RATE } = require('./constants');

const simulatedAnnealing = ({ problem, parameters }) => {
  const executionLogs = [];
  const { initialTemperature, iterationsLimit} = parameters;
  const isStillHot = (currentTemperature, currentTime) => currentTemperature > 1 && currentTime < iterationsLimit;

  let currentState = problem.initialState;
  let currentEnergy = problem.initialEnergy;
  let currentTemperature, currentTime;

  for (
    currentTemperature = initialTemperature, currentTime = 0;
    isStillHot(currentTemperature, currentTime);
    currentTemperature *= COOLING_RATE, currentTime++
  ) {
    executionLogs.push({ currentTemperature, currentTime, currentEnergy });

    const nextState = problem.findNextState(currentState);
    const nextStateEnergy = problem.energyOf(nextState);
    const deltaEnergy = nextStateEnergy - currentEnergy;

    if (deltaEnergy < 0) {
      currentState = nextState;
      currentEnergy = nextStateEnergy;
    } else {
      const qExp = -1.0 * (deltaEnergy / currentTemperature);
      const q = Math.min(1.0, Math.pow(Math.E, qExp));

      if (Math.random() < q) {
        currentState = nextState;
        currentEnergy = nextStateEnergy;
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
