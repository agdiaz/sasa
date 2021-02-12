'use strict';

module.exports = {
  DEFAULT_TEMP: 10,
  DEFAULT_ITERATIONS: 5000,
  COOLING_RATE: 1 - 0.003,
  LOWEST_TEMP: 0.01,
  INNER_ITERATIONS: 5,
  DELETE_SYMBOL: '-',
  DELETE_SYMBOL_PENALTY: 200,
  EVENTS: {
    EXECUTION_STARTED: 'executionStarted',
    EXECUTION_COMPLETED: 'executionCompleted',
  },
};
