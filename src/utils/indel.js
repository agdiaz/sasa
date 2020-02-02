'use strict';

const _lodash = require('lodash');
const { maxLength } = require('./fasta-reader');

const DELETE_SYMBOL = '-';

const findElement = (sequences, position) => {
  if (position >= maxLength(sequences)) {
    return DELETE_SYMBOL;
  }

  const originalElements = sequences.map(sequence => sequence.set[0].seq[position]);
  const validOriginalElements = _lodash.remove(originalElements, elem => !!elem);
  const newElement = _lodash.sample(validOriginalElements);

  return newElement;
}

const addInsert = count => (sequences, state, position) => {
  const newElement = findElement(sequences, position);
  const inserts = _lodash.repeat(newElement, count).split('');
  state.splice(position, 0, ...inserts);

  return state;
}

const addDelete = count => (_sequences, state, position) => {
  const deletes = _lodash.repeat(DELETE_SYMBOL, count).split('');
  state.splice(position, 0, ...deletes);

  return state;
}

const keepElement = (_sequences, state, _position) => {
  return state;
}

const changeElement = (sequences, state, position) => {
  let newElement = findElement(sequences, position);
  state[position] = newElement;

  return state;
}

const removeElement = count => (_sequences, state, position) => {
  state.splice(position, count);

  return state;
}

const randomIndel = () => {
  const dice = Math.ceil(Math.random() * 5);
  const count = Math.ceil(Math.random() * 2);

  switch (dice) {
    case 1:
      return addInsert(count);
    case 2:
      return addDelete(count);
    case 3:
      return removeElement(count);
    case 4:
      return changeElement;
    case 5:
    default:
      return keepElement;
  }
};

module.exports = randomIndel;