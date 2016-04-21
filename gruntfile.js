// Generated on 2015-08-24 using generator-ambox-lib 0.0.0
module.exports = function (grunt) {
	'use strict';

	// Globbing
	// for performance reasons we're only matching one level down:
	// 'test/spec/{,*/}*.js'

	// use this if you want to recursively match all subfolders:
	// 'test/spec/**/*.js'

	var pack = grunt.file.readJSON('package.json');
	var loadGruntConfig = require('load-grunt-config');
	var loadGruntTasks = require('load-grunt-tasks');
	var path = require('path');
	var fs = require('fs');

	// Load multiple grunt tasks using globbing patterns
	// @see https://www.npmjs.com/package/load-grunt-tasks
	loadGruntTasks(grunt);

	// Remove the source map comment; it causes way too many problems.
	// The map file is still generated for manual associations
	// https://github.com/jquery/jquery/issues/1707
	grunt.registerMultiTask('sourcemap', 'Remove the source map comment', function(){
		this.files.forEach(function(file){
			file.src.filter(function(filepath){
				var re = /\/\/# sourceMappingURL=\S+/;
				var text = fs.readFileSync(filepath, 'utf8').replace(re, '');
				fs.writeFileSync(filepath, text);
			});
		});
	});

	// Grunt plugin that lets you break up your Gruntfile config by task
	// @see https://www.npmjs.com/package/load-grunt-config
	loadGruntConfig(grunt, {
		data:pack,
		configPath:path.join(process.cwd(), pack.scaffold.tasks),
		loadGruntTasks:{
			config:pack,
			scope:'devDependencies'
		}
	});
};
