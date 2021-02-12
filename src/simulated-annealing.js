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
  const executionLogs = [];
  const isStillHot = (currentTemperature, currentIteration) => currentTemperature > LOWEST_TEMP && currentIteration < iterationsLimit;
  
  const initialState = findInitialAlignment(sequences); // 9 14 20
  const initialEnergy = energyOfMatches(initialState);

  let currentState = initialState.map(identity);
  let currentEnergy = initialEnergy;

  for (let currentTemperature = initialTemperature, currentIteration = 0; isStillHot(currentTemperature, currentIteration); currentTemperature *= COOLING_RATE, currentIteration++) {
    executionLogs.push({ currentTemperature, currentIteration, currentEnergy });
    
    const { bestNeighborState, bestNeighborEnergy } = findBestNeighbor(currentState, currentEnergy);
    
    // console.log({ currentTemperature, currentIteration, currentEnergy, bestNeighborEnergy })

    if (bestNeighborEnergy < currentEnergy) {
      console.log('replacing', { initialEnergy, currentEnergy, bestNeighborEnergy });
      currentState = bestNeighborState.map(identity);
      currentEnergy = bestNeighborEnergy;
    } else {
      const qExp = (-1.0 * (bestNeighborEnergy - currentEnergy) / currentTemperature);
      const q = Math.pow(Math.E, qExp);

      if (Math.random() < q) {
        console.log('replacing by q', { currentState, bestNeighborState });
        currentState = bestNeighborState.map(identity);
        currentEnergy = bestNeighborEnergy;
      }
    }
  }

  const solution = {
    initialState,
    initialEnergy,
    initialSequence: consensusSequence(initialState).join(''),
    finalState: currentState,
    finalSequence: consensusSequence(currentState).join(''),
    finalEnergy: currentEnergy,
    finalEnergyCalc: energyOfMatches(currentState),
    executionLogs,
  };

  console.log(solution);
  return solution;
};

module.exports = simulatedAnnealing;
