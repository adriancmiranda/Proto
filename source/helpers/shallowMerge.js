define(['../common/slice'], function(slice){
	'use strict';

	function shallowMerge(target){
		var params = slice(arguments);
		for(var id = 1, source; id < params.length; id++){
			source = params[id];
			for(var property in source){
				if(source.hasOwnProperty(property)){
					target[property] = source[property];
				}
			}
		}
		return target;
	}

	return shallowMerge;
});
