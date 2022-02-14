'use strict'

const fs = require('fs')
const { orderBy, pick, groupBy } = require('lodash')
const { parse } = require('json2csv')

const resultsFormatter = require('./results-formatter')

const writeResults = ({ results, outputFolder, msaFile, isDebugging }) => {
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

  const msaFilename = `${outputFolder}/${msaFile}`
  const bestResult = sortedResults[0]

  Object.entries(bestResult.finalState).forEach(([entry, value]) => {
    const line = `>${entry}\n${value.sequenceValues.join('')}\n`
    fs.appendFileSync(msaFilename, line)
  })

  console.log('MSA in fasta format ready:', msaFilename)

  if (isDebugging) {
    resultsFormatter({ executionResult: bestResult })

    console.log(`Best MSA result (${bestResult.finalEnergy})`)

    const msaContentReader = fs.createReadStream(msaFilename)

    // Read and display the file data on console
    msaContentReader.on('data', function (chunk) {
      console.log(chunk.toString())
    })
  }
}

module.exports = writeResults
