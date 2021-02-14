const energyOf = require("../../src/problems/sequence-alignment/simulated-annealing/alignment-energy")

test("Trivial energy calc", () => {
  const sequence1 = ["A", "C", "T", "G"]
  const sequence2 = ["A", "C", "T", "G"]

  const energy = energyOf([sequence1, sequence2])

  expect(energy).toBe(0)
})

test("Even mostly trivial energy calc", () => {
  const sequence1 = ["A", "C", "T", "G"]
  const sequence2 = ["A", "C", "T"]

  const energy = energyOf([sequence1, sequence2])

  expect(energy).toBe(1)
})

test("Sequences with deletions energy calc", () => {
  const sequence1 = ["A", "C", "T", "G"]
  const sequence2 = ["A", "C", "-", "G"]

  const energy = energyOf([sequence1, sequence2])

  expect(energy).toBe(2)
})
