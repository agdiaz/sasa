"use strict"

const { range } = require("lodash")
const async = require('async');

const { mapPathsToSequences } = require("../utils/fasta-reader")
const { simulatedAnnealing, simulatedAnnealingAsync } = require("../simulated-annealing")
const formatSequences = require("../utils/format-sequences")

class Resolver {
  constructor({ parameters, options }) {
    this.sequences = mapPathsToSequences(parameters.files, options.isDebugging)
    this.sequencesStrings = this.sequences.map((seq) =>
      seq.set[0].seq.toString()
    )
    this.simulatedAnnealingArgs = {
      sequences: this.sequencesStrings,
      initialTemperature: parameters.initialTemperature,
      iterationsLimit: parameters.iterationsLimit,
      isDebugging: options.isDebugging,
    }
  }

  async runSimulatedAnnealing(times) {
    const executionResultsPromises = range(0, times).map((time) => {
      return simulatedAnnealingAsync(this.simulatedAnnealingArgs)
    })

    const results = await Promise.all(executionResultsPromises)

    return results.map(solution =>({
      ...solution,
      initialState: formatSequences(solution.initialState),
      finalState: formatSequences(solution.finalState),
    }))
  }
}

module.exports = Resolver
