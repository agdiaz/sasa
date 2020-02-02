'use strict';

const { plot } = require('nodeplotlib');

const plotLogs = (logs) => {
  const temperatureData = {x: [], y: [], type: 'line', name: 'temperature' };
  logs.forEach(({ currentTime, currentTemperature }) => {
    temperatureData.x.push(currentTime);
    temperatureData.y.push(currentTemperature);
  });

  const energyData = {x: [], y: [], type: 'line', name: 'energy' };
  logs.forEach(({ currentTime, currentEnergy }) => {
    energyData.x.push(currentTime);
    energyData.y.push(currentEnergy);
  });

  const alignData = {x: [], y: [], type: 'line', name: 'align' };
  logs.forEach(({ currentTime, currentAlignmentLength }) => {
    alignData.x.push(currentTime);
    alignData.y.push(currentAlignmentLength);
  });

  plot([temperatureData, energyData, alignData]);
};

module.exports = plotLogs;
