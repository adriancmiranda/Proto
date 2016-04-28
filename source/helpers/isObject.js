define(['../common/toString'], function(toString){
	'use strict';

	function isObject(value){
		return toString(value) === '[object Object]';
	}

	return isObject;
});
