/* global define */
define([
	'./keys',
	'./bind',
	'./isFunction',
	'../common/slice',
	'../common/isArray'
], function(keys, bind, isFunction, slice, isArray){
	'use strict';

	function bindAll(context, methods){
		methods = isArray(methods)? methods : slice(arguments, 1);
		methods = methods.length? methods : keys(context, true);
		for(var id = 0; id < methods.length; id++){
			if(isFunction(context[methods[id]])){
				context[methods[id]] = bind(context[methods[id]], context);
			}
		}
		return context;
	}

	return bindAll;
});
