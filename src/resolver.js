'use strict'

const times = require('lodash/times')
const Piscina = require('piscina')
const { resolve } = require('path')

const { isMainThread } = require('worker_threads')

const resolveProblemWith = async ({ parameters }) => {
  const piscina = new Piscina({
    filename: resolve(__dirname, 'worker.js'),
  })

  if (isMainThread) {
    const workers = times(parameters.executions, (executionTime) => {
      console.log('Triggering new process', {
        executionTime,
        parameters,
      })

      return piscina.run({ parameters, executionTime })
    })

    return await Promise.all(workers)
  } else {
    return await Promise.all([])
  }
}

module.exports = { resolveProblemWith }
