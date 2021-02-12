'use strict';
const fs = require('fs');

const { EVENTS } = require('../constants');

// const eventsLog = [];
// let initialConditions;

// eventEmitter.addListener('readyToStart', (event) => {
//   initialConditions = event;
// });

// eventEmitter.addListener('iterationCompleted', (event) => {
//   eventsLog.push(event);
//   if (program.debug) console.debug('iterationCompleted', event);
// });

const listenToExecutions = (eventEmitter, outputFolder) => {
  if (!fs.existsSync(outputFolder)){
    console.log('Creating output folder');
    fs.mkdirSync(outputFolder, { recursive: true });
  }

  eventEmitter.on(EVENTS.EXECUTION_STARTED, (eventArgs) => {
    console.log(EVENTS.EXECUTION_STARTED, eventArgs);
  });

  eventEmitter.on(EVENTS.EXECUTION_COMPLETED, (eventArgs) => {
    const { execution } = eventArgs;
    const filename = `${outputFolder}/execution_${execution.toString().padStart(3, '0')}.json`;

    if (fs.existsSync(filename)) {
      fs.appendFileSync(filename, JSON.stringify(eventArgs));
    } else {
      fs.writeFileSync(filename, JSON.stringify(eventArgs));
    };
  });
};

module.exports = listenToExecutions;
