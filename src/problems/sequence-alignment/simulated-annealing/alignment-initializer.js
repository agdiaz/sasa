const shuffle = require("lodash/shuffle")

const { DELETE_SYMBOL } = require("../../../constants")

const initAlignment = (sequences) => {
  const shuffledSequences = shuffle(sequences)

  return addPadding(shuffledSequences)
}

const addPadding = (sequences) => {
  let currentPadding = 0

  sequences.forEach((seq) => {
    const deltaPadding = Math.floor(Math.random() * seq.length)

    for (let paddingIndex = 0; paddingIndex < currentPadding; paddingIndex++) {
      seq.unshift(DELETE_SYMBOL)
    }

    currentPadding += deltaPadding
  })

  return sequences
}

module.exports = { initAlignment }
