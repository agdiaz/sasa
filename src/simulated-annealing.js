'use strict';
// const events = require('events');
// const eventEmitter = new events.EventEmitter();

const { COOLING_RATE } = require('./constants');
const COOLING_CONSTANT = 1 - COOLING_RATE;

const simulatedAnnealing = ({
  initialTemperature,
  iterationsLimit,
  problem,
  findInitialState,
  findNextState,
  energyOf,
  eventEmitter,
}) => {
  let currentState = findInitialState(problem);
  let currentTemperature, currentTime;
  let currentEnergy;

  eventEmitter.emit('readyToStart', {
    initialAlignmentLength: currentState.length,
    initialEnergy: energyOf(problem, currentState),
  });

  for (
    currentTemperature = initialTemperature, currentTime = 0;
    currentTemperature > 1 && currentTime < iterationsLimit;
    currentTemperature *= COOLING_CONSTANT, currentTime++
  ) {
    currentEnergy = energyOf(problem, currentState);
    const nextState = findNextState(problem, currentState);
    const nextStateEnergy = energyOf(problem, nextState);

    const deltaEnergy = nextStateEnergy - currentEnergy;

    if (deltaEnergy < 0) {
      currentState = nextState;
    } else {
      const qExp = -(deltaEnergy * 1.0 / currentTemperature * 1.0);
      const q = Math.min(1.0, Math.pow(Math.E, qExp));

      // if (q < Math.random()) currentState = nextState;
      if (Math.random() < q) currentState = nextState;
    }

    eventEmitter.emit('iterationCompleted', {
      currentTime,
      currentTemperature,
      currentEnergy,
      currentAlignmentLength: currentState.length,
    });
  }

  return { currentState, currentEnergy };
};

module.exports = simulatedAnnealing;
