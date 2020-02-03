'use strict';

const { plot } = require('nodeplotlib');

const plotLogs = (initialConditions, logs) => {
  const { initialAlignmentLength, initialEnergy } = initialConditions;
  const temperatureData = {x: [], y: [], type: 'line', name: 'temperature' };
  const energyData = {x: [], y: [], type: 'line', name: 'energy' };
  const alignData = {x: [], y: [], type: 'line', name: 'align' };
  const initialEnergyDate = {
    x: [], y: [], type: 'line', name: 'INITIAL ENERGY'
  };
  const initialLenght = {x: [], y: [], type: 'line', name: 'INITIAL LENGTH' };

  logs.forEach(log => {
    const {
      currentTime,
      currentTemperature,
      currentAlignmentLength,
      currentEnergy,
    } = log;

    temperatureData.x.push(currentTime);
    energyData.x.push(currentTime);
    alignData.x.push(currentTime);
    initialEnergyDate.x.push(currentTime);
    initialLenght.x.push(currentTime);

    temperatureData.y.push(currentTemperature);
    energyData.y.push(currentEnergy);
    alignData.y.push(currentAlignmentLength);
    initialEnergyDate.y.push(initialEnergy);
    initialLenght.y.push(initialAlignmentLength);
  });

  plot([
    temperatureData, energyData, alignData, initialEnergyDate, initialLenght
  ]);
};

module.exports = plotLogs;
