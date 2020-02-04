'use strict';

const _lodash = require('lodash');
const { maxLength } = require('./fasta-reader');
const { DELETE_SYMBOL } = require('../constants');

const findElement = (sequences, position) => {
  if (position >= Math.max(...sequences.map(seq => seq.length))) {
    return DELETE_SYMBOL;
  }

  const originalElements = sequences.map(sequence =>
    sequence.set[0].seq[position]);
  const validOriginalElements = _lodash.remove(originalElements,
    elem => !!elem);
  const newElement = _lodash.sample(validOriginalElements);

  return newElement;
};

const addInsert = count => (sequences, state, position) => {
  const newElement = findElement(sequences, position);
  if (newElement !== DELETE_SYMBOL) {
    const inserts = _lodash.repeat(newElement, count).split('');
    state.splice(position, 0, ...inserts);
  }

  return state;
};

const addDelete = count => (_sequences, state, position) => {
  const deletes = _lodash.repeat(DELETE_SYMBOL, count).split('');
  state.splice(position, 0, ...deletes);

  return state;
};

const keepElement = (_sequences, state, _position) => {
  return state;
};

const changeElement = (sequences, state, position) => {
  let newElement = findElement(sequences, position);
  if (newElement !== DELETE_SYMBOL) {
    state[position] = newElement;
  }

  return state;
};

const removeElement = count => (_sequences, state, position) => {
  state.splice(position, count);

  return state;
};

const changeStateGenerator = () => {
  const dice = Math.ceil(Math.random() * 12);
  const count = Math.ceil(Math.random() * 2);

  switch (dice) {
    case 1:
    case 2:
      return removeElement(count);
    case 3:
    case 4:
    case 5:
      return changeElement;
    case 6:
    case 7:
      return addInsert(count);
    case 8:
      return addDelete(1);
    default:
      return keepElement;
  }
};

module.exports = changeStateGenerator;
