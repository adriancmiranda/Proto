module.exports = function jshint(grunt, opts){
	'use strict';

	// Stylish reporter for JSHint.
	// @see https://github.com/sindresorhus/jshint-stylish
	var stylish = require('jshint-stylish');

	// Validate files with JSHint.
	// @see https://github.com/gruntjs/grunt-contrib-jshint
	return({
		options:{
			reporter:stylish,
			maxcomplexity:4,
			camelcase:true,
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
			mocha:true,
			node:true,
			expr:true
		},
		all:{
			options:{
				ignores:['<%= scaffold.source %>/wrap/opening.js', '<%= scaffold.source %>/wrap/closure.js'],
				predef:['require', 'define']
			},
			src:[
				'gruntfile.js',
				'<%= scaffold.tasks %>/{,*/}*.js',
				'<%= scaffold.source %>/**/*.js',
				'<%= scaffold.test %>/{,*/}*.js'
			]
		},
		dist:{
			src:'<%= scaffold.static %>/<%= name %>.js'
		}
	});
};
