module.exports = function(grunt, opts){
	'use strict';

	// Run predefined tasks whenever watched file patterns are added, changed or deleted.
	// @see https://www.npmjs.com/package/grunt-contrib-watch
	return({
		files:['<%= jshint.all.src %>'],
		tasks:['dev']
	});
};