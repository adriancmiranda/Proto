define(['./slice'], function(slice){
	'use strict';

	return function(fn, context){
		var args = slice(arguments, 2);
		var proxy = function(){
			return fn.apply(context, args.concat(slice(arguments)));
		};
		proxy.__originalFn__ = proxy.__originalFn__ || fn;
		return proxy;
	};
});
