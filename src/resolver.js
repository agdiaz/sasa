'use strict'

const times = require('lodash/times')

const {
  formatSequences,
  consensusSequence,
} = require('./utils/format-sequences')

const resolveProblemWith = ({
  problem,
  algorithm,
  parameters,
  executionTimes,
}) => {
  const executionResults = times(executionTimes, () => {
    const problemToResolve = problem(parameters.files)
    const solution = algorithm({ problem: problemToResolve, parameters })

    return {
      ...solution,
      initialState: formatSequences(solution.initialState),
      finalState: formatSequences(solution.finalState),
      initialSequence: consensusSequence(solution.initialState),
      finalSequence: consensusSequence(solution.finalState),
    }
  })

  return executionResults
}

module.exports = { resolveProblemWith }
