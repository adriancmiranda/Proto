define(['../common/slice'], function(slice){
	'use strict';

	function bind(fn, context){
		var args = slice(arguments, 2);
		var proxy = function(){
			return fn.apply(context, args.concat(slice(arguments)));
		};
		proxy.__bind__ = proxy.__bind__ || fn;
		return proxy;
	}

	return bind;
});
