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

  const msaFilename = `${outputFolder}/msa.fasta`
  const bestResult = sortedResults[0]

  const outputFasta = Object.entries(bestResult.finalState)
    .map(([file, value]) => `>${file}\n ${value.sequenceValues.join('')}`)
    .join('\n')

  fs.writeFileSync(msaFilename, outputFasta)

  resultsFormatter({ executionResult: bestResult })

  console.log('MSA result')
  console.log(outputFasta)
}

module.exports = writeResults
