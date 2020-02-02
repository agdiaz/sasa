const fs = require('fs');
const { FastaUtils } = require('bioseq-ts');

const mapPathsToSequences = (files, isDebugging = false) => {
  return files.map(filePath => {
    const sequenceData = fs.readFileSync(filePath).toString();
    const bioSeqSet = new FastaUtils().parse(sequenceData);
    
    if (isDebugging) console.debug(bioSeqSet);

    return bioSeqSet;
  })
};

const maxLength = sequences => {
  const lengths = sequences.map(sequence => sequence.set[0].seq.length)

  return Math.max(...lengths);
}

module.exports = {
  mapPathsToSequences,
  maxLength
};