/* global define */
define(['./each'], function(each){
	'use strict';

	function keys(object, getEnum){
		var properties = [];
		each(object, function(value, key){
			properties.push(key);
		}, null, getEnum);
		return properties;
	}

	return keys;
});
