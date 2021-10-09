const pairwise = (list) => {
  if (list.length < 2) {
    return []
  }

  const first = list[0],
    rest = list.slice(1),
    pairs = rest.map((x) => [first, x])

  return pairs.concat(pairwise(rest))
}

module.exports = pairwise
