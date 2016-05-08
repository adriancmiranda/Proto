/* global define */
define([
	'./each',
	'./keys',
	'./bind',
	'./isFunction',
	'../common/slice',
	'../common/isArray'
], function(each, keys, bind, isFunction, slice, isArray){
	'use strict';

	function bindAll(context, methods){
		methods = isArray(methods)? methods : slice(arguments, 1);
		methods = methods.length? methods : keys(context, true);
		each(methods, function(method, key){
			if(isFunction(context[method])){
				context[method] = bind(context[method], context);
			}
		});
		return context;
	}

	return bindAll;
});
