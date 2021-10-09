'use strict'

const { findBestNeighbor } = require('./enhancers/find-best-neighbor')
const cloneDeep = require('lodash/cloneDeep')
const { shouldTakeBestNeighbor, shouldIterate } = require('./utils')

const simulatedAnnealing = ({
  problem,
  parameters: {
    initialTemperature,
    iterationsLimit,
    neighborIterations,
    coolingRate,
    lowestTemp,
    isDebugging,
  },
}) => {
  const { createInitialState, measureStateEnergy } = problem
  const initialState = createInitialState()
  const initialEnergy = measureStateEnergy(initialState)

  let currentState = cloneDeep(initialState)
  let currentEnergy = initialEnergy

  for (
    let currentTemperature = initialTemperature, currentIteration = 0;
    shouldIterate(
      currentTemperature,
      currentIteration,
      currentEnergy,
      iterationsLimit,
      lowestTemp
    );
    currentTemperature *= coolingRate, currentIteration++
  ) {
    const { bestNeighborState, bestNeighborEnergy } = findBestNeighbor({
      neighborIterations,
      problem,
      currentState,
      currentEnergy,
      currentTemperature,
    })

    currentState = cloneDeep(bestNeighborState)
    currentEnergy = bestNeighborEnergy

    if (isDebugging) {
      console.debug({
        currentIteration,
        currentTemperature,
        initialEnergy,
        currentEnergy,
      })
    }
  }

  return {
    initialState,
    initialEnergy,
    finalState: currentState,
    finalEnergy: currentEnergy,
  }
}

module.exports = { simulatedAnnealing }
