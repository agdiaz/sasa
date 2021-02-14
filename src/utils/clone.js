const identity = (iterable) => iterable.slice()

const clone = (iterable) => iterable.map(identity)

module.exports = { clone }
