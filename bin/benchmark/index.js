const { resolve } = require('path');
const { sync } = require('glob');
const { argv } = require('../config');
const spawn = require('../@common/spawn');

const files = Array.isArray(argv.f) ? `{${argv.f.join(',')}}` : argv.f || '**/*';
sync(resolve(`test/benchmark/${files}.bench.js`)).forEach(file => {
	spawn.sync('babel-node', ['--presets', 'env', file]);
});
