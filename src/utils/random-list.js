'use strict';

const randomList = (count, min, max) => {
  let result = [];

  for(let i = 0; i < count; i++) {
    const jitter = (Math.random() * (max - min)) + (Math.random() * count);
    const randomNumber = min + (Math.random() * (max - min));
    const randomNumberWithJitter = (Math.random() > 0.5) ? randomNumber + jitter : randomNumber - jitter;

    result.push(randomNumberWithJitter);
  }

  return result;
};

module.exports = randomList;
