/* global define */
define([
	'./bind',
	'./mapContext
], function(bind, mapContext){
	'use strict';

	function bindAll(context, methods){
		return mapContext(bind, context, methods);
	}

	return bindAll;
});
