'use strict';

const { COOLING_RATE, INNER_ITERATIONS, LOWEST_TEMP } = require('./constants');

const simulatedAnnealing = ({ problem, parameters }) => {
  const executionLogs = [];
  const { initialTemperature, iterationsLimit} = parameters;
  const isStillHot = (currentTemperature, currentIteration) => currentTemperature > LOWEST_TEMP && currentIteration < iterationsLimit;

  let currentState = problem.initialState;
  let currentEnergy = problem.energyOf(problem.initialState);

  for (
    let currentTemperature = initialTemperature, currentIteration = 0;
    isStillHot(currentTemperature, currentIteration);
    currentTemperature *= COOLING_RATE, currentIteration++
  ) {
    executionLogs.push({ currentTemperature, currentIteration, currentEnergy });

    let bestNeighborState = currentState;
    let bestNeighborEnergy = currentEnergy;

    for(let _innerIteration = 0; _innerIteration < INNER_ITERATIONS; _innerIteration++) {
      const neighborState = problem.findNextState(bestNeighborState);
      const neighborEnergy = problem.energyOf(neighborState);

      if (neighborEnergy < bestNeighborEnergy) {
        bestNeighborState = neighborState;
        bestNeighborEnergy = neighborEnergy;
      }
    }

    if (bestNeighborEnergy < currentEnergy) {
      currentState = bestNeighborState;
      currentEnergy = bestNeighborEnergy;
    } else {
      const qExp = (-1.0 * (bestNeighborEnergy - currentEnergy) / currentTemperature);
      const q = Math.pow(Math.E, qExp);

      if (Math.random() < q) {
        currentState = bestNeighborState;
        currentEnergy = bestNeighborEnergy;
      }
    }
  };

  const solution = {
    initialState: problem.initialState,
    initialSequence: problem.consensusSequence(problem.initialState).join(''),
    initialEnergy: problem.energyOf(problem.initialState),
    finalState: currentState,
    finalSequence: problem.consensusSequence(currentState).join(''),
    finalEnergy: currentEnergy,
    executionLogs,
  };

  return solution;
};

module.exports = simulatedAnnealing;
