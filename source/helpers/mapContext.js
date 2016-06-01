/* global define */
define([
	'./each',
	'./keys',
	'./isFunction',
	'../common/slice',
	'../common/isArray'
], function(each, keys, isFunction, slice, isArray){
	'use strict';

	function mapContext(fn, context, methods){
		methods = isArray(methods)? methods : slice(arguments, 1);
		methods = methods.length? methods : keys(context, true);
		each(methods, function(method){
			if(isFunction(context[method])){
				context[method] = fn(context[method], context);
			}
		});
		return context;
	}

	return bindAll;
});
