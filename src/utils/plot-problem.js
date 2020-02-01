'use strict';
const { plot, stack } = require('nodeplotlib');
const lodash = require('lodash');

const plotProblem = (problem, result) => {
  const resultData = { x: [problem.indexOf(result)], y: [result], type: 'scatter', name: 'result' };
  
  const plotData = {x: [], y: [], type: 'line', name: 'problem' };
  problem.forEach((value, index) => {
    plotData.x.push(index);
    plotData.y.push(value);
  });

  const realResult = lodash.min(problem);
  const realResultData = { x: [problem.indexOf(realResult)], y: [realResult], type: 'scatter', name: 'real result' }; 

  plot([plotData, resultData, realResultData]);
};

module.exports = plotProblem;
