const flow = require('rollup-plugin-flow');
const nodeResolve = require('rollup-plugin-node-resolve');
const es3 = require('rollup-plugin-es3');
const cjs = require('rollup-plugin-commonjs');
const optimizeJs = require('rollup-plugin-optimize-js');
const gzip = require('rollup-plugin-gzip');
const uglify = require('rollup-plugin-uglify');
const buble = require('rollup-plugin-buble');
const alias = require('rollup-plugin-alias');
const replace = require('rollup-plugin-replace');
const { minify } = require('uglify-es');
const { env, aliases, flag, vars } = require('../config');
const targets = require('./targets');
const watch = require('./watch');

module.exports = file => ({
  watch,
  indent: env.INDENT,
  name: !!file.module && file.module,
  banner: env.SIGN ? flag : '',
  input: `${file.source}.js`,
  sourcemap: env.MINIFY,
  output: targets(env, file.output, file.format),
  plugins: [
    replace(vars),
    flow({ all: false, pretty: true }),
    nodeResolve({ jsnext: true, main: true, browser: true }),
    cjs(),
    buble(),
    es3(['defineProperty', 'freeze']),
    alias(Object.assign({ resolve: ['.js', '.json'] }, aliases)),
  ].concat(file.plugins || []).concat(env.MINIFY ? [
    uglify({ output: { preamble: flag, ascii_only: true } }, minify),
    optimizeJs(),
  ].concat(env.GZIP ? [gzip()] : []) : []),
});
