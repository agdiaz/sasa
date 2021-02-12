const { DELETE_SYMBOL } = require("../constants");

const formatSequences = (sequences) => {
  const maxSequenceLength = Math.max(...sequences.map(seq => seq.length));

  return sequences.map(seq => {
    trailingLength = maxSequenceLength - seq.length;

    for(let i = 0; i < trailingLength; i++) {
      seq.push(DELETE_SYMBOL);
    }

    return seq;
  })
};

module.exports = formatSequences;