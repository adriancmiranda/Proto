define(['../common/toStr'], function(toStr){
	'use strict';

	function isObject(value){
		return toStr(value) === '[object Object]';
	}

	return isObject;
});
