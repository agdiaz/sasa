const {
  addDeletion,
  removeDeletion,
} = require("../../src/problems/sequence-alignment/simulated-annealing/alignment-modifier")

test("Add a deletion", () => {
  const sequence = ["A", "C", "G", "T"]
  const originalSequenceLength = sequence.length
  const changedSequence = addDeletion(sequence)

  expect(changedSequence.length).toBe(originalSequenceLength + 1)
})

test("Remove a deletion", () => {
  const sequence = ["A", "C", "G", "T", "-"]
  const originalSequenceLength = sequence.length
  const changedSequence = removeDeletion(sequence)

  expect(changedSequence.length).toBe(originalSequenceLength - 1)
})

test("No remove deletion if there is no one present", () => {
  const sequence = ["A", "C", "G", "T"]
  const originalSequenceLength = sequence.length
  const changedSequence = removeDeletion(sequence)

  expect(changedSequence.length).toBe(originalSequenceLength)
})
