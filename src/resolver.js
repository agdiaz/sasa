'use strict'

const times = require('lodash/times')
const Piscina = require('piscina')
const { resolve } = require('path')
const { mapPathsToSequences } = require('./utils/fasta-reader')

const resolveProblemWith = async ({ parameters }) => {
  const sequenceFastas = mapPathsToSequences(parameters.files)

  const piscina = new Piscina({
    filename: resolve(__dirname, 'worker.js'),
  })
  const workers = times(parameters.executions, (executionTime) =>
    piscina.run({ parameters, sequenceFastas, executionTime })
  )

  return await Promise.all(workers)
}

module.exports = { resolveProblemWith }
