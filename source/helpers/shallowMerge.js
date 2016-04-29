define(['../common/slice'], function(slice){
	'use strict';

	function shallowMerge(target){
		var params = slice(arguments, 1);
		for(var id = 0; id < params.length; id++){
			var source = params[id];
			if(source){
				for(var prop in source){
					target[prop] = source[prop];
				}
			}
		}
		return target;
	}

	return shallowMerge;
});
