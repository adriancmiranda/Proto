module.exports = function(grunt, opts){
	'use strict';

	// Connect middleware for adding the livereload script to the response.
	// @see https://github.com/intesso/connect-livereload
	var port = 35729;
	var connection = require('connect-livereload')({ port: port });
	var mountFolder = function(connect, dir) {
		return connect.static(require('path').resolve(dir));
	};

	// Run predefined tasks whenever watched file patterns are added, changed or deleted.
	// @see https://www.npmjs.com/package/grunt-contrib-watch
	return({
		options:{
			livereload:{ port:port }
		},
		files:['<%= jshint.all.src %>'],
		tasks:['dev']
	});
};
