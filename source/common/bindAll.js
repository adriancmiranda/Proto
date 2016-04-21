define([
	'./bind',
	'./slice',
	'./keys'
], function(bind, slice, keys){
	'use strict';

	return function(context, methods){
		methods = Array.isArray(methods)? methods : slice(arguments, 1);
		methods = methods.length? methods : keys(context, true);
		for(var id = 0; id < methods.length; id++){
			if(typeof context[methods[id]] === 'function'){
				context[methods[id]] = bind(context[methods[id]], context);
			}
		}
		return context;
	};
});
