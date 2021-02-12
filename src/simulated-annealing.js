'use strict';

const { COOLING_RATE, INNER_ITERATIONS, LOWEST_TEMP } = require('./constants');
const { findInitialAlignment, consensusSequence, changeSequences } = require('./models/problem');
const energyOfMatches = require('./utils/energy');
const identity = require('./utils/clone-array');

const findBestNeighbor = (currentState, currentEnergy) => {
  let bestNeighborState = currentState.map(identity);
  let bestNeighborEnergy = currentEnergy;

  for(let _innerIteration = 0; _innerIteration < INNER_ITERATIONS; _innerIteration++) {
    const neighborState = changeSequences(bestNeighborState);
    const neighborEnergy = energyOfMatches(neighborState);

    if (neighborEnergy < bestNeighborEnergy) {
      bestNeighborState = neighborState.map(identity);
      bestNeighborEnergy = energyOfMatches(bestNeighborState);
    }
  }

  return { bestNeighborState, bestNeighborEnergy };
}

const simulatedAnnealing = ({ sequences, parameters: { initialTemperature, iterationsLimit} }) => {
  const isStillHot = (currentTemperature, currentIteration) => currentTemperature > LOWEST_TEMP && currentIteration < iterationsLimit;
  
  const initialState = findInitialAlignment(sequences);
  const initialEnergy = energyOfMatches(initialState);

  let currentState = initialState.map(identity);
  let currentEnergy = initialEnergy;

  for (let currentTemperature = initialTemperature, currentIteration = 0; isStillHot(currentTemperature, currentIteration); currentTemperature *= COOLING_RATE, currentIteration++) {
    const { bestNeighborState, bestNeighborEnergy } = findBestNeighbor(currentState, currentEnergy);

    if (bestNeighborEnergy < currentEnergy) {
      currentState = bestNeighborState.map(identity);
      currentEnergy = bestNeighborEnergy;
    } else {
      const qExp = (-1.0 * (bestNeighborEnergy - currentEnergy) / currentTemperature);
      const q = Math.pow(Math.E, qExp);

      if (Math.random() < q) {
        currentState = bestNeighborState.map(identity);
        currentEnergy = bestNeighborEnergy;
      }
    }

    if (currentEnergy <= 0) break;
  }

  const solution = {
    initialState,
    initialEnergy,
    initialSequence: consensusSequence(initialState).join(''),
    finalState: currentState,
    finalEnergy: currentEnergy,
    finalSequence: consensusSequence(currentState).join(''),
  };

  return solution;
};

module.exports = simulatedAnnealing;
