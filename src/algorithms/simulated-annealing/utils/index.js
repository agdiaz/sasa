const probabilityOfChoosingBadNeighbor = (
  newNeighborEnergy,
  currentEnergy,
  currentTemperature
) => {
  const exponent = (currentEnergy - newNeighborEnergy) / currentTemperature

  return Math.pow(Math.E, exponent)
}

const shouldTakeBestNeighbor = (
  newNeighborEnergy,
  currentEnergy,
  currentTemperature
) => {
  return (
    newNeighborEnergy < currentEnergy ||
    Math.random() <
      probabilityOfChoosingBadNeighbor(
        newNeighborEnergy,
        currentEnergy,
        currentTemperature
      )
  )
}

const shouldIterate = (
  currentTemperature,
  currentIteration,
  iterationsLimit,
  lowestTemp
) => currentTemperature > lowestTemp && currentIteration < iterationsLimit

module.exports = {
  shouldTakeBestNeighbor,
  shouldIterate,
}
