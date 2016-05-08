module.exports = function compareSize(grunt, opts){
	'use strict';

	// GZIP in pure JavaScript (works in the browser)
	// @see https://www.npmjs.com/package/gzip-js
	var gzip = require('gzip-js');

	// Compare file sizes on this branch to master
	// @see https://www.npmjs.com/package/grunt-compare-size
	return({
		files:['<%= scaffold.static %>/<%= name %>.js', '<%= scaffold.static %>/<%= name %>.min.js'],
		options:{
			cache:'.sizecache.json',
			compress:{
				gz:function(contents){
					return gzip.zip(contents, {}).length;
				}
			}
		}
	});
};
