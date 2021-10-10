'use strict'

const fs = require('fs')
const { orderBy, pick, groupBy } = require('lodash')
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

  const finalEnergies = groupBy(resultsSortedByLowestEnergy, 'finalEnergy')
  console.log(
    `Unique results: ${Object.keys(finalEnergies).length} out of ${
      resultsSortedByLowestEnergy.length
    } potential ones`
  )
  console.log('Final energies: ', Object.keys(finalEnergies))

  const msaFilename = `${outputFolder}/msa.fasta`
  const bestResult = sortedResults[0]

  const outputMSA = Object.entries(bestResult.finalState)
    .map(([entry, value]) => `>${entry}\n ${value.sequenceValues.join('')}`)
    .join('\n')
    .concat('\n')

  fs.writeFileSync(msaFilename, outputMSA)

  resultsFormatter({ executionResult: bestResult })

  console.log(`Best MSA result (${bestResult.finalEnergy}):\n${outputMSA}`)
}

module.exports = writeResults
