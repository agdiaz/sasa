'use strict';

const collect = (value, previous = []) => previous.concat([value]);

module.exports = collect;