const path = require('path');
const { pathExistsSync, readJsonSync } = require('fs-extra');
const stripJsonComments = require('strip-json-comments');
const readYamlSync = require('./readYamlSync');
const as = require('./as');

module.exports = (file, defaultValue) => {
	let returnedConfig;
	if (pathExistsSync(`${file}.js`)) {
		returnedConfig = require(`${file}.js`);
	} else if (pathExistsSync(file)) {
		returnedConfig = readJsonSync(file, { throws: false });
		if (returnedConfig) returnedConfig = stripJsonComments(returnedConfig);
		else returnedConfig = readYamlSync(file);
	} else if (pathExistsSync(`${file}.json`)) {
		returnedConfig = readJsonSync(`${file}.json`, { throws: false });
		if (returnedConfig) returnedConfig = stripJsonComments(returnedConfig);
	} else if (pathExistsSync(`${file}.yaml`)) {
		returnedConfig = readYamlSync(`${file}.yaml`);
	} else if (pathExistsSync(`${file}.yml`)) {
		returnedConfig = readYamlSync(`${file}.yml`);
	}
	return as(Object, returnedConfig, defaultValue);
};
