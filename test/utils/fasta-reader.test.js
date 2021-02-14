const { mapPathsToSequences } = require("../../src/utils/fasta-reader")
const path = require("path")

test("Testing the fasta library", () => {
  const samplePath = path.resolve("./samples/emboss_cons.fasta")
  const [sequence] = mapPathsToSequences([samplePath])

  const { header } = sequence.set[0]

  expect(header).toEqual("EMBOSS_001")
})
