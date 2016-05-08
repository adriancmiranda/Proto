/* global define */
define(['./each', './isObject', '../common/slice'], function(each, isObject, slice){
	'use strict';

	function merge(overwrite, target){
		var args = slice(arguments, 2);
		each(args, function(parameter){
			each(parameter, function(value, key){
				if(isObject(value) && isObject(target[key])){
					merge(overwrite, target[key], value);
				}else if(overwrite || !target[key]){
					target[key] = value;
				}
			}, null, true);
		});
		return target;
	}

	return merge;
});
