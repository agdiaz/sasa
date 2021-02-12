'use strict';
const fs = require('fs');

const { EVENTS } = require('../constants');

const listenToExecutions = (eventEmitter, outputFolder) => {
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
