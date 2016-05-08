/* global define */
define(['./isFunction'], function(isFunction){
	'use strict';

	function overload(target, name, fn){
		var cache = target[name];
		target[name] = function(){
			if(fn.length === arguments.length){
				return fn.apply(this, arguments);
			}else if(isFunction(cache)){
				return cache.apply(this, arguments);
			}
		};
	}

	return overload;
});
