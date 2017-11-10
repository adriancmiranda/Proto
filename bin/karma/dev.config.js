const base = require('./base.config');

module.exports = config => {
  config.set(Object.assign(base, {
    browsers: ['Chrome'],
    reporters: ['spec', 'kjhtml'],
    plugins: base.plugins.concat([
      'karma-chrome-launcher',
      'karma-spec-reporter',
      'karma-jasmine-html-reporter',
    ]),
  }));
};
