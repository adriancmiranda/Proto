const base = require('./base.config');

module.exports = config => {
  const settings = Object.assign(base, {
    browsers: ['Chrome', 'Firefox'],
    singleRun: true,
    concurrency: 2,
    captureTimeout: 4*60*1000,
    browserDisconnectTimeout: 10000,
    browserNoActivityTimeout: 4*60*1000,
    browserDisconnectTolerance: 1,
    reporters: ['spec'],
    plugins: base.plugins.concat([
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-spec-reporter',
    ]),
  });
  if (process.env.TRAVIS) {
    settings.browsers = ['Chrome_travis_ci'];
    settings.customLaunchers = {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox'],
      },
    };
  }
  config.set(settings);
};
