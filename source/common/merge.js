define(['./slice', './hasProp'], function(slice, hasProp){
	'use strict';

	return function(target){
		var params = slice(arguments);
		for(var id = 1, source; id < params.length; id++){
			source = params[id];
			for(var property in source){
				if(hasProp(source, property)){
					target[property] = source[property];
				}
			}
		}
		return target;
	};
});
