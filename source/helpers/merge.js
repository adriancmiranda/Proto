define(['./isObject', '../common/slice'], function(isObject, slice){
	'use strict';

	function merge(target){
		var params = slice(arguments);
		for(var id = 1, source; id < params.length; id++){
			source = params[id];
			for(var property in source){
				if(source.hasOwnProperty(property)){
					if(isObject(source[property]) && isObject(target[property])){
						target[property] = merge(target[property], source[property]);
					}else{
						target[property] = source[property];
					}
				}
			}
		}
		return target;
	}

	return merge;
});
