'use strict';
const _lodash = require('lodash');

const findElement = (sequences, position) => {
  const originalElements = sequences.map(sequence => sequence.set[0].seq[position]);
  const validOriginalElements = _lodash.remove(originalElements, elem => !!elem);
  const newElement = _lodash.sample(validOriginalElements) || '-';

  return newElement;
}

const addInsert = count => (sequences, state, position) => {
  const newElement = findElement(sequences, position);
  const inserts = _lodash.repeat(newElement, count).split('');
  state.splice(position, 0, ...inserts);
  
  return state;
}

const addDelete = count => (_sequences, state, position) => {
  const deletes = _lodash.repeat('-', count).split('');
  state.splice(position, 0, ...deletes);
  
  return state;
}

const keepElement = (_sequences, state, _position) => {
  return state;
}

const changeElement = (sequences, state, position) => {
  const newElement = findElement(sequences, position);
  state[position] = newElement;

  return state;
}

const removeElement = count => (_sequences, state, position) => {
  state.splice(position, count);

  return state;
}

const randomIndel = () => {
  const dice = Math.ceil(Math.random() * 8);

  switch (dice) {
    case 1:
      return addInsert(1);
    case 2:
      return keepElement;
    case 3: 
      return addDelete(1);
    case 4: 
      return keepElement;
    case 5: 
      return removeElement(1);
    case 6: 
      return keepElement;
    case 7:
      return changeElement;
    case 8:
      return removeElement(2);
    default:
      break;
  }
};

module.exports = randomIndel;