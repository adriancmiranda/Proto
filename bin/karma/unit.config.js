const base = require('./base.config');

module.exports = config => {
  config.set(Object.assign(base, {
    browsers: ['Chrome', 'Firefox', 'Safari'],
    reporters: ['progress'],
    singleRun: true,
    captureTimeout: 4*60*1000,
    browserDisconnectTimeout: 10000,
    browserNoActivityTimeout: 4*60*1000,
    browserDisconnectTolerance: 3,
    plugins: base.plugins.concat([
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-safari-launcher',
    ]),
  }));
};
