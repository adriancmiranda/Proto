/* global define */
define([
	'./isFunction',
	'./hasSuperCall',
	'./createSuperMethod'
], function(isFunction, hasSuperCall, createSuperMethod){
	'use strict';

	function injectSuperMethod(parent, proto, fn, key){
		if(hasSuperCall(fn) && isFunction(parent)){
			proto[key] = createSuperMethod(key, fn, parent.prototype[key]);
		}
	}

	return injectSuperMethod;
});
