module.exports = function(grunt, opts){
	'use strict';

	// Remove the source map comment; it causes way too many problems.
	// The map file is still generated for manual associations
	// https://github.com/jquery/jquery/issues/1707
	return({
		scripts:{
			src:'<%= scaffold.static %>/{,*/}*.min.js'
		}
	});
};
