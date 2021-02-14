"use strict"

const { findBestNeighbor } = require("./enhancers/find-best-neighbor")
const { clone } = require("../../utils/clone")
const { shouldTakeBestNeighbor, shouldIterate } = require("./utils")

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
  const { createInitialState, measureStateEnergy } = problem
  const initialState = createInitialState()
  const initialEnergy = measureStateEnergy(initialState)

  let currentState = clone(initialState)
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
    })

    const takeBestNeighbor = shouldTakeBestNeighbor(
      bestNeighborEnergy,
      currentEnergy,
      currentTemperature
    )
    if (takeBestNeighbor) {
      currentState = clone(bestNeighborState)
      currentEnergy = bestNeighborEnergy
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
