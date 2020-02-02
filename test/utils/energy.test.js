const energyOf = require('../../src/utils/energy');

test('the energy of alignment is 0 when is full equals', () => {
  const alignment = ['A', 'B', 'C', 'D'];
  const sequences = [['A', 'B', 'C', 'D'], ['A', 'B', 'C', 'D'], ['A', 'B', 'C', 'D']];

  expect(energyOf(alignment, sequences)).toBe(0);
});

test('the energy of alignment is MAX when is empty', () => {
  const alignment = [];
  const sequences = [['A', 'B', 'C', 'D'], ['A', 'B'], ['A', 'B', 'C']];

  expect(energyOf(alignment, sequences)).toBe(4 + 2 + 3);
});

test('energy of alignment of 1 element', () => {
  const alignment = ['A'];
  const sequences = [['A'], ['B'], ['C']];

  expect(energyOf(alignment, sequences)).toBe(Math.round(2/3));
});

test('energy of alignment of 2 elements', () => {
  const alignment = ['A', 'C'];
  const sequences = [['A', 'A'], ['B', 'B'], ['C', 'C']];

  expect(energyOf(alignment, sequences)).toBe(Math.round(2/3 + 2/3));
});

test('energy of alignment of 3 element', () => {
  const alignment = ['A', 'C', 'X'];
  const sequences = [['A', 'A', 'Y'], ['B', 'B', 'Y'], ['C', 'C', 'Y']];

  expect(energyOf(alignment, sequences)).toBe(Math.round(7/3));
});

test('energy of alignment of 3 elements with variant lengths', () => {
  const alignment = ['A', 'C', 'X'];
  const sequences = [['A', 'A', 'Y'], ['B'], ['C', 'C']];

  expect(energyOf(alignment, sequences)).toBe(Math.round(2/3 + 2/3 + 1));
});

test('energy of alignment of 3 elements with variant lengths and deletes', () => {
  const alignment = ['A', '-', 'C'];
  const sequences = [['A', 'B', 'C'], ['A', 'B', 'C'], ['A', 'B', 'C']];

  expect(energyOf(alignment, sequences)).toBe(Math.round(1));
});
