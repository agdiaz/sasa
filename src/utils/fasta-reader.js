'use strict';

const fs = require('fs');
const { FastaUtils } = require('bioseq-ts');

const mapPathsToSequences = (filePaths, isDebugging = false) => {
  const fastaSequences = [];

  filePaths.forEach(filePath => {
    const fileStats = fs.lstatSync(filePath);

    if (fileStats.isDirectory()) {
      const folderFiles = fs.readdirSync(filePath).map(folderFileName => `${filePath}/${folderFileName}`);

      mapPathsToSequences(folderFiles, isDebugging).forEach(seq => {
        fastaSequences.push(seq);
      });
    } else {
      const sequenceData = fs.readFileSync(filePath).toString();
      const bioSeqSet = new FastaUtils().parse(sequenceData);

      if (isDebugging) console.debug(bioSeqSet);

      fastaSequences.push(bioSeqSet);
    }
  });

  return fastaSequences;
};

module.exports = { mapPathsToSequences };
