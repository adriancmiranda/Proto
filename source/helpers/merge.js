define(['./isObject', '../common/slice'], function(isObject, slice){
	'use strict';

	function merge(overwrite, target){
		var params = slice(arguments);
		for(var id = 2, source; id < params.length; id++){
			source = params[id];
			for(var property in source){
				if(source.hasOwnProperty(property)){
					if(isObject(source[property]) && isObject(target[property])){
						merge(overwrite, target[property], source[property]);
					}else if(overwrite || !target[property]){
						target[property] = source[property];
					}
				}
			}
		}
		return target;
	}

	return merge;
});
