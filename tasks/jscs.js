module.exports = function(grunt, opts){
	'use strict';

	// Grunt task for checking JavaScript Code Style with jscs.
	// @see https://www.npmjs.com/package/grunt-jscs-checker
	return({
		options:{
			excludeFiles:['<%= scaffold.source %>/wrap/opening.js', '<%= scaffold.source %>/wrap/closure.js']
		},
		src:'<%= scaffold.source %>/**/*.js',
		gruntfile:'gruntfile.js'
	});
};
