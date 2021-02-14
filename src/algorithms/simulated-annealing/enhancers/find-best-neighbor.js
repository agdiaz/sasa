const cloneDeep = require('lodash/cloneDeep')

const findBestNeighbor = ({
  problem,
  currentState,
  currentEnergy,
  neighborIterations,
}) => {
  const { createNeighborState, measureStateEnergy } = problem

  let bestNeighborState = cloneDeep(currentState)
  let bestNeighborEnergy = currentEnergy

  for (let iteration = 0; iteration < neighborIterations; iteration++) {
    const neighborState = createNeighborState(bestNeighborState)
    const neighborEnergy = measureStateEnergy(neighborState)

    if (neighborEnergy < bestNeighborEnergy) {
      bestNeighborState = cloneDeep(neighborState)
      bestNeighborEnergy = neighborEnergy
    }
  }

  return { bestNeighborState, bestNeighborEnergy }
}

module.exports = { findBestNeighbor }
