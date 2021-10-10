'use strict'

const { findBestNeighbor } = require('./enhancers/find-best-neighbor')
const cloneDeep = require('lodash/cloneDeep')
const { shouldIterate } = require('./utils')

const simulatedAnnealing = ({
  problem,
  parameters: {
    initialTemperature,
    iterationsLimit,
    neighborIterations,
    coolingRate,
    lowestTemp,
  },
}) => {
  const initialTime = new Date()
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
  }

  return {
    initialTime,
    initialState,
    initialEnergy,
    finalState: currentState,
    finalEnergy: currentEnergy,
    finalTime: new Date(),
  }
}

module.exports = { simulatedAnnealing }
