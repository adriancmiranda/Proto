/* global define */
define([
	'./unbind',
	'./mapContext',
	'../common/slice',
	'../common/isArray'
], function(unbind, mapContext, slice, isArray){
	'use strict';

	function unbindAll(context, methods){
		methods = isArray(methods)? methods : slice(arguments, 1);
		return mapContext(unbind, context, methods);
	}

	return unbindAll;
});
