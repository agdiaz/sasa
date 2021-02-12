'use strict';

const energyOf = require('../../src/utils/energy');
const { consensusSequence } = require('../../src/models/problem');

test('the energy of alignment is 0 when is full equals', () => {
  const sequences = [
    ['A', 'B', 'C', 'D'], ['A', 'B', 'C', 'D'], ['A', 'B', 'C', 'D'],
  ];

  const sequence = consensusSequence(sequences);
  const expectedEnergy = energyOf(sequences);

  expect(expectedEnergy).toBe(0);
});

test('the energy of alignment is 0 when is full equals', () => {
  const sequences = [
    ['-', 'B', 'C', 'D'], ['A', 'B', 'C', 'D'], ['A', 'B', 'C', 'D'],
  ];

  const sequence = consensusSequence(sequences);
  const expectedEnergy = energyOf(sequences);

  expect(expectedEnergy).toBe(2);
});

test('weird case', () => {
  const sequences = [
    [
      '-', '-', '-', '-', '-', '-', '-', '-',
      '-', 'A', 'G', 'C', 'C', 'C', 'T', 'C',
      'C', 'A', '-', '-', '-', '-', '-', '-',
      '-', '-', '-', '-', '-', '-', '-', '-',
      '-', '-', '-', '-', '-', '-', '-', '-',
      '-', '-', '-', '-', '-', '-', '-', '-',
      '-', '-'
    ],
    [
      '-', '-', '-', '-', '-', '-', '-', '-',
      '-', '-', '-', '-', '-', '-', '-', '-',
      '-', '-', '-', '-', '-', 'A', 'G', 'C',
      'C', 'C', 'T', 'C', 'C', 'A', '-', '-',
      '-', '-', '-', '-', '-', '-', '-', '-',
      '-', '-', '-', '-', '-', '-', '-', '-',
      '-', '-'
    ],
    [
      '-', '-', '-', '-', '-', '-', '-', '-',
      '-', '-', '-', '-', '-', '-', '-', '-',
      '-', '-', '-', '-', '-', '-', '-', '-',
      '-', '-', 'A', 'G', 'C', 'C', 'C', 'T',
      'C', 'C', 'A', '-', '-', '-', '-', '-',
      '-', '-', '-', '-', '-', '-', '-', '-',
      '-', '-'
    ]
  ];

  const sequence = consensusSequence(sequences);
  const expectedEnergy = energyOf(sequences);

  expect(expectedEnergy).toBe(149);
});

test('what is happening here', () => {
  const sequences = [
    ['-', '-', '-', '-', '-', '-', '-', 'A', 'G', 'C', 'C', 'C', 'T', 'C', 'C', 'A', '-', '-', '-'],
    ['-', '-', '-', 'A', 'G', 'C', 'C', 'C', 'T', 'C', 'C', 'A', '-', '-', '-', '-', '-', '-', '-'],
    ['-', '-', '-', 'A', 'G', 'C', 'C', 'C', 'T', 'C', 'C', 'A', '-', '-', '-', '-', '-', '-', '-'],
  ];

  const sequence = consensusSequence(sequences);
  const expectedEnergy = energyOf(sequences);

  expect(expectedEnergy).toBe(41);
});
