const base = require('./base.config');

module.exports = config => {
  const options = Object.assign(base, {
    singleRun: true,
    browsers: ['PhantomJS'],
    reporters: ['spec', 'coverage'],
    coverageReporter: {
      reporters: [
        { type: 'lcov', dir: '../coverage', subdir: '.' },
        { type: 'text-summary', dir: '../coverage', subdir: '.' },
      ],
    },
    plugins: base.plugins.concat([
      'karma-spec-reporter',
      'karma-coverage',
      'karma-phantomjs-launcher',
    ]),
  });
  config.set(options);
};
