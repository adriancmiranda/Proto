module.exports = function bower(grunt, opts){
	'use strict';

	// Install Bower packages. Smartly.
	// @see https://www.npmjs.com/package/grunt-bower-task
	return({
		options:{
			targetDir: '<%= scaffold.source %>/vendors',
			layout: 'byType',
			install: true,
			verbose: false,
			cleanTargetDir: false,
			cleanBowerDir: true,
			bowerOptions: {}
		},
		install:{}
	});
};
