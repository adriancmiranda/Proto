const { lstatSync, readdirSync } = require('fs');
const { join, sep } = require('path');

exports.isDirectory = srcpath =>
	lstatSync(srcpath).isDirectory()
;

exports.isFile = srcpath =>
	lstatSync(srcpath).isFile()
;

exports.flatten = lists =>
	lists.reduce((a, b) => a.concat(b), [])
;

exports.dirs = (srcpath, options = { includeOwn: true }) => {
	const content = readdirSync(srcpath).map(name => join(srcpath, name));
	const dirs = content.filter(exports.isDirectory);
	return options.includeOwn ? [srcpath, ...dirs] : dirs;
};

exports.tree = (srcpath, options = { includeOwn: false }) => {
	const dirs = exports.dirs(srcpath, { includeOwn: false });
	const tree = exports.flatten(dirs.map(src => exports.tree(src, options)));
	return options.includeOwn ? [srcpath, ...tree] : tree;
};

exports.aliases = (srcpath, options = { includeOwn: true, recursively: false, main: '', prefix: '' }) => {
	const aliases = Object.create(null);
	exports[options.recursively ? 'tree' : 'dirs'](srcpath, options).forEach(path => {
		const slug = path.slice(srcpath.length + 1).replace(new RegExp(`\\${sep}`), '-');
		const key = options.prefix ? options.prefix + slug.replace(new RegExp(`^\\${options.prefix}`), '') : slug;
		aliases[`${key}` || '~'] = options.main ? join(path, options.main) : path;
	});
	return aliases;
};
