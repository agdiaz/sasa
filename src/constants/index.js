"use strict"

module.exports = {
  DEFAULT_TEMP: 10,
  DEFAULT_ITERATIONS: 5000,
  COOLING_RATE: 1 - 0.003,
  LOWEST_TEMP: 0.01,
  INNER_ITERATIONS: 50,
  DELETE_SYMBOL: "-",
  DELETE_SYMBOL_PENALTY: 200,
  PROBABILITY_ADD_DELETION: 0.75,
  PROBABILITY_REMOVE_DELETION: 0.95,
  PROBABILITY_POSITION_BEGIN: 0.6,
}
