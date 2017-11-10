const { env } = require('./config');
const rollup = require('./rollup');

module.exports = ([{
  module: 'Proto',
  source: 'source/index',
  output: 'dist/Proto',
  format: env.FORMATS,
}]).map(file => rollup(file));
