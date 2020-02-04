'use strict';

module.exports = {
  DEFAULT_TEMP: 1000,
  DEFAULT_ITERATIONS: 500000,
  COOLING_RATE: 1 - 0.0003,
  DELETE_SYMBOL: '-',
  EVENTS: {
    EXECUTION_STARTED: 'executionStarted',
    EXECUTION_COMPLETED: 'executionCompleted',
  },
};
