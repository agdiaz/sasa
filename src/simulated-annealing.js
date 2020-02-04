'use strict';
// const events = require('events');
// const eventEmitter = new events.EventEmitter();

const { COOLING_RATE } = require('./constants');

const simulatedAnnealing = ({ problem, parameters }) => {
  const { initialTemperature, iterationsLimit} = parameters;
  const isStillHot = (currentTemperature, currentTime) =>  currentTemperature > 1 && currentTime < iterationsLimit;

  let currentState = problem.initialState;
  let currentEnergy = problem.energyOf(currentState);

  // eventEmitter.emit('readyToStart', {
  //   initialAlignmentLength: currentState.length,
  //   initialEnergy: currentEnergy,
  // });

  let currentTemperature, currentTime;
  for (
    currentTemperature = initialTemperature, currentTime = 0;
    isStillHot(currentTemperature, currentTime);
    currentTemperature *= COOLING_RATE, currentTime++
  ) {
    const nextState = problem.findNextState(currentState);
    const nextStateEnergy = problem.energyOf(nextState);
    const deltaEnergy = nextStateEnergy - currentEnergy;

    if (deltaEnergy < 0) {
      currentState = nextState;
      currentEnergy = nextStateEnergy;
    } else {
      const qExp = -1.0 * (deltaEnergy / currentTemperature);
      const q = Math.min(1.0, Math.pow(Math.E, qExp));

      if (Math.random() < q) {
        currentState = nextState;
        currentEnergy = nextStateEnergy;
      }
    }
    // eventEmitter.emit('iterationCompleted', {
    //   currentTime,
    //   currentTemperature,
    //   currentEnergy,
    //   currentAlignmentLength: currentState.length,
    // });
  }

  return {
    initialState: problem.initialState,
    initialEnergy: problem.initialEnergy,
    finalState: currentState.join(''),
    finalEnergy: currentEnergy
  };
};

module.exports = simulatedAnnealing;
