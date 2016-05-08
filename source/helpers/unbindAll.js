/* global define */
define([
	'./each',
	'./keys',
	'./unbind',
	'./isFunction',
	'../common/slice',
	'../common/isArray'
], function(each, keys, unbind, isFunction, slice, isArray){
	'use strict';

	function unbindAll(context, methods){
		methods = isArray(methods)? methods : slice(arguments, 1);
		methods = methods.length? methods : keys(context, true);
		each(methods, function(method, key){
			if(isFunction(context[method])){
				context[method] = unbind(context[method], context);
			}
		});
		return context;
	}

	return unbindAll;
});
