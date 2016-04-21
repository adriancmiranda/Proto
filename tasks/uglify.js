module.exports = function(grunt, opts){
	'use strict';

	// Minify files with UglifyJS
	// @see https://www.npmjs.com/package/grunt-contrib-uglify
	return({
		all:{
			files:{
				'<%= scaffold.static %>/<%= name %>.min.js':['<%= scaffold.static %>/<%= name %>.js']
			},
			options:{
				preserveComments:false,
				sourceMap:true,
				sourceMapName:'<%= scaffold.static %>/<%= name %>.min.map',
				report:'min',
				beautify:{ ascii_only:true },// jshint ignore:line
				banner:'// <%= name %>@v<%= version %>, <%= license %> licensed. <%= homepage %>',
				compress:{
					hoist_funs:false,// jshint ignore:line
					loops:false,
					unused:false
				}
			}
		}
	});
};
