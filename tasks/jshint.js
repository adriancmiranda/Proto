module.exports = function(grunt, opts){
	'use strict';

	// Stylish reporter for JSHint.
	// @see https://github.com/sindresorhus/jshint-stylish
	var stylish = require('jshint-stylish');

	// Validate files with JSHint.
	// @see https://github.com/gruntjs/grunt-contrib-jshint
	return({
		options:{
			camelcase:true,
			reporter:stylish,
			quotmark:true,
			trailing:true,
			browser:true,
			latedef:true,
			bitwise:false,
			unused:false,
			eqeqeq:true,
			esnext:true,
			newcap:true,
			strict:false,
			indent:2,
			immed:true,
			noarg:true,
			curly:true,
			undef:true,
			node:true,
			expr:true
		},
		all:{
			options:{
				ignores:['<%= scaffold.source %>/wrap/opening.js', '<%= scaffold.source %>/wrap/closure.js'],
				predef:['require', 'define']
			},
			src:['gruntfile.js', '<%= scaffold.source %>/**/*.js']
		},
		dist:{
			src:'<%= scaffold.static %>/<%= name %>.js'
		}
	});
};
