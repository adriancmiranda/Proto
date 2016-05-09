/* global define */
define(['./each', './isObject'], function(each, isObject){
	'use strict';

	function copyShallowObjectsFrom(proto){
		var copy = {};
		each(proto, function(value, key){
			if(isObject(value)){
				copy[key] = value;
			}
		}, null, true);
		return copy;
	}

	return copyShallowObjectsFrom;
});
