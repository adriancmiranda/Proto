/* global define */
define([
	'./hasSuperCall',
	'./createSuperMethod'
], function(hasSuperCall, createSuperMethod){
	'use strict';

	function injectSuperMethod(parent, proto, fn, key){
		if(hasSuperCall(fn)){
			proto[key] = createSuperMethod(key, fn, parent[key]);
		}
	}

	return injectSuperMethod;
});
