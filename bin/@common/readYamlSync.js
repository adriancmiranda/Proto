const fs = require('fs-extra');
const YAML = require('js-yaml');

module.exports = (filepath, options) => {
	try {
		const opts = Object.assign({ schema: YAML.DEFAULT_FULL_SCHEMA }, options);
		return YAML.safeLoad(fs.readFileSync(filepath, opts));
	} catch (error) {}
	return null;
};
