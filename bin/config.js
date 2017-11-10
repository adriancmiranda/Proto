const Git = require('git-revision-webpack-plugin');
const { resolve, dirname } = require('path');
const { aliases } = require('./@common/aliases');
const { params } = require('./@common/env');
const { args } = require('./@common/argv');
const banner = require('./@common/banner');

exports.pack = require('../package.json');

exports.source = resolve(dirname(exports.pack.module));

exports.git = new Git({ lightweightTags: true, branch: true });

exports.env = params(process.env);

exports.argv = args(process.argv);

exports.flag = banner(exports.pack, exports.git);

exports.aliases = aliases(exports.source);

exports.vars = {
	__ENV__: exports.env.NODE_ENV || 'development',
	__COMMIT__: exports.git.commithash(),
	__VERSION__: exports.pack.version,
};
