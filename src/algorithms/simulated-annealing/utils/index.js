const probabilityOfChoosingBadNeighbor = (
  bestNeighborEnergy,
  currentEnergy,
  currentTemperature
) => {
  const qExp = (currentEnergy - bestNeighborEnergy) / currentTemperature

  return Math.pow(Math.E, qExp)
}

const shouldTakeBestNeighbor = (
  bestNeighborEnergy,
  currentEnergy,
  currentTemperature
) => {
  return (
    bestNeighborEnergy < currentEnergy ||
    Math.random() <
      probabilityOfChoosingBadNeighbor(
        bestNeighborEnergy,
        currentEnergy,
        currentTemperature
      )
  )
}

const shouldIterate = (
  currentTemperature,
  currentIteration,
  currentEnergy,
  iterationsLimit,
  lowestTemp
) =>
  currentEnergy > 0 &&
  currentTemperature > lowestTemp &&
  currentIteration < iterationsLimit

module.exports = {
  shouldTakeBestNeighbor,
  shouldIterate,
}
