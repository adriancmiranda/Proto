/* global define */
define([
	'./keys',
	'./unbind',
	'./isFunction',
	'../common/slice',
	'../common/isArray'
], function(keys, unbind, isFunction, slice, isArray){
	'use strict';

	function unbindAll(context, methods){
		methods = isArray(methods)? methods : slice(arguments, 1);
		methods = methods.length? methods : keys(context, true);
		for(var id = 0; id < methods.length; id++){
			if(isFunction(context[methods[id]])){
				context[methods[id]] = unbind(context[methods[id]], context);
			}
		}
		return context;
	}

	return unbindAll;
});
