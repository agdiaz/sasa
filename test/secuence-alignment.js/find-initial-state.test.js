'use strict';

const { findInitialState } = require('../../src/sequence-alignment');
const { mapPathsToSequences} = require('../../src/utils/fasta-reader');

const files = [
  './examples/example_00_a.fa',
  './examples/example_00_b.fa',
];

test('the energy of alignment is 0 when is full equals', () => {
  const sequences = mapPathsToSequences(files);
  const initialState = findInitialState(sequences)

  expect(initialState).toBeDefined();
});
