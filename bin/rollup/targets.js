const { is, as } = require('describe-type');
const { env, flag } = require('../config');

const defaultFormats = ['iife', 'umd', 'amd', 'cjs'];

const target = (name, outputPath, format) => ({
  sourcemap: env.MINIFY,
  file: `${outputPath}.${format}${env.MINIFY ? '.min' : ''}.js`,
  banner: env.SIGN && !env.MINIFY ? flag : '',
  indent: env.INDENT,
  format,
  name,
});

exports.parseFormats = ({ formats }) => {
  formats = is.string(formats) ? [formats] : formats;
  formats = as(Array, formats, defaultFormats);
  return formats;
};

exports.hasFormat = (file, format) => {
  const formats = exports.parseFormats(file);
  return formats.indexOf(format) !== -1;
};

exports.parseOutput = ({ module, output, formats }) => {
  formats = exports.parseFormats({ formats });
  return formats.map(format => target(module, output, format));
};
