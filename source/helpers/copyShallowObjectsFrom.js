/* global define */
define(['./isObject'], function(isObject){
	'use strict';

	function copyShallowObjectsFrom(proto){
		var copy = {};
		for(var key in proto){
			if(isObject(proto[key])){
				copy[key] = proto[key];
			}
		}
		return copy;
	}

	return copyShallowObjectsFrom;
});
