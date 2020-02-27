'use strict';

module.exports = {
  DEFAULT_TEMP: 5,
  DEFAULT_ITERATIONS: 5000,
  COOLING_RATE: 1 - 0.003,
  DELETE_SYMBOL: '-',
  EVENTS: {
    EXECUTION_STARTED: 'executionStarted',
    EXECUTION_COMPLETED: 'executionCompleted',
  },
};
