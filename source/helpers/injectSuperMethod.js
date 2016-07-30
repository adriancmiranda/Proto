/* global define */
define([
	'./isFunction',
	'./hasSuperCall'
], function(isFunction, hasSuperCall){
	'use strict';

	function injectSuperMethod(parent, proto, fn, key){
		if(hasSuperCall(fn) && isFunction(parent)){
			proto[key] = createSuperMethod(key, fn, parent.prototype[key]);
		}
	}

	return injectSuperMethod;
});
