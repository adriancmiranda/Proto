/* global define */
define([
	'./each',
	'./keys',
	'./isFunction'
], function(each, keys, isFunction){
	'use strict';

	function mapContext(fn, context, methods){
		methods = methods.length? methods : keys(context, true);
		each(methods, function(method){
			if(isFunction(context[method])){
				context[method] = fn(context[method], context);
			}
		});
		return context;
	}

	return mapContext;
});
