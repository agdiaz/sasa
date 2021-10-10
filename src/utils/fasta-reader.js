'use strict'

const fs = require('fs')
const resolve = require('path')

const { FastaUtils } = require('bioseq-ts')

const mapPathsToSequences = (filePaths) => {
  const fastaSequences = []

  filePaths.forEach((filePath) => {
    const fileStats = fs.lstatSync(filePath)

    if (fileStats.isDirectory()) {
      const folderFiles = fs
        .readdirSync(filePath)
        .map((folderFileName) => resolve.join(filePath, folderFileName))

      mapPathsToSequences(folderFiles).forEach((seq) => {
        fastaSequences.push(seq)
      })
    } else {
      const sequenceData = fs.readFileSync(filePath).toString()
      const bioSeqSet = new FastaUtils().parse(sequenceData)

      fastaSequences.push(bioSeqSet)
    }
  })

  return fastaSequences
}

module.exports = { mapPathsToSequences }
