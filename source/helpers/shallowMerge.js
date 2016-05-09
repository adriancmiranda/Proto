/* global define */
define(['./each', '../common/slice'], function(each, slice){
	'use strict';

	function shallowMerge(target){
		var args = slice(arguments, 1);
		each(args, function(parameter){
			each(parameter, function(value, key){
				target[key] = value;
			});
		});
		return target;
	}

	return shallowMerge;
});
