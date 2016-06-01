/* global define */
define([
	'./bind',
	'./mapContext',
	'../common/slice',
	'../common/isArray'
], function(bind, mapContext, slice, isArray){
	'use strict';

	function bindAll(context, methods){
		methods = isArray(methods)? methods : slice(arguments, 1);
		return mapContext(bind, context, methods);
	}

	return bindAll;
});
