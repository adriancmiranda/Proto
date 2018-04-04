const Git = require('git-revision-webpack-plugin');
const { resolve, parse } = require('path');
const { as } = require('describe-type');
const { aliases } = require('./@common/aliases');
const { params } = require('./@common/env');
const { args } = require('./@common/argv');
const banner = require('./@common/banner');

exports.pack = require('../package.json');

exports.source = parse(exports.pack.module);

exports.source.path = resolve(exports.source.dir);

exports.env = params(process.env);

exports.argv = args(process.argv);

exports.git = new Git({ lightweightTags: true, branch: true });

exports.git.commithash = as(String, exports.git.commithash, exports.git) || '';

exports.git.version = as(String, exports.git.version, exports.git) || exports.pack.version;

exports.flag = banner(exports.pack, exports.git);

exports.aliases = aliases(exports.source.path);

exports.REPLACE_ENV = object => Object.assign({}, object, {
	__ENV__: exports.env.NODE_ENV || 'development',
	__COMMIT__: exports.git.commithash,
	__VERSION__: exports.pack.version,
});
