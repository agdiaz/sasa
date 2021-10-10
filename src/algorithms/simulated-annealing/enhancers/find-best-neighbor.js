const cloneDeep = require('lodash/cloneDeep')
const { shouldTakeBestNeighbor } = require('../utils')

const findBestNeighbor = ({
  problem,
  currentState,
  currentEnergy,
  currentTemperature,
  neighborIterations,
}) => {
  const { createNeighborState, measureStateEnergy } = problem

  let currentNeighborState = cloneDeep(currentState)
  let currentNeighborEnergy = currentEnergy

  for (
    let neighborIterationIndex = 0;
    neighborIterationIndex < neighborIterations;
    neighborIterationIndex++
  ) {
    const newNeighborState = createNeighborState(currentNeighborState)
    const newNeighborEnergy = measureStateEnergy(newNeighborState)

    const takeBestNeighbor = shouldTakeBestNeighbor(
      newNeighborEnergy,
      currentNeighborEnergy,
      currentTemperature
    )

    if (takeBestNeighbor) {
      currentNeighborState = cloneDeep(newNeighborState)
      currentNeighborEnergy = newNeighborEnergy
    }
  }

  return {
    bestNeighborState: currentNeighborState,
    bestNeighborEnergy: currentNeighborEnergy,
  }
}

module.exports = { findBestNeighbor }
