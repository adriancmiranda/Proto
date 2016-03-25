module.exports = function(grunt, opts){
	'use strict';

	// Validate JSON
	// @see https://www.npmjs.com/package/jsonlint
	return({
		pkg:{
			src:[__dirname +'/../package.json']
		}
	});
};