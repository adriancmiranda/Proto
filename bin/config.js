const getRepoInfo = require('git-repo-info');
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

exports.git = getRepoInfo();

exports.git.commithash = exports.git.abbreviatedSha;

exports.git.version = exports.git.tag || exports.pack.version;

exports.flag = banner(exports.pack, exports.git);

exports.aliases = aliases(exports.source.path);

exports.REPLACE_ENV = object => Object.assign({}, object, {
	__ENV__: exports.env.NODE_ENV || 'development',
	__COMMIT__: exports.git.commithash,
	__VERSION__: exports.pack.version,
});
