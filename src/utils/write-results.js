'use strict'

const fs = require('fs')
const { orderBy, pick } = require('lodash')
const { parse } = require('json2csv')

const resultsFormatter = require('./results-formatter')

const writeResults = ({ results, outputFolder }) => {
  if (!fs.existsSync(outputFolder)) {
    console.log('Creating output folder', outputFolder)
    fs.mkdirSync(outputFolder, { recursive: true })
  }

  const sortedResults = orderBy(results, (result) => result.finalEnergy, 'asc')

  const resultsSortedByLowestEnergy = sortedResults.map((result, execution) => {
    return {
      execution,
      ...pick(result, [
        'initialEnergy',
        'finalEnergy',
        'initialSequence',
        'finalSequence',
      ]),
    }
  })

  const resultsFilename = `${outputFolder}/results.csv`
  fs.writeFileSync(resultsFilename, parse(resultsSortedByLowestEnergy))

  const bestResult = sortedResults[0]

  resultsFormatter({ executionResult: bestResult })
}

module.exports = writeResults
