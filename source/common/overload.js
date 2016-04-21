define(function(){
	'use strict';

	return function(target, name, fn){
		var cacheFn = target[name];
		target[name] = function(){
			if(fn.length === arguments.length){
				return fn.apply(this, arguments);
			}else if(typeof(cacheFn) === 'function'){
				return cacheFn.apply(this, arguments);
			}
		};
	};
});
