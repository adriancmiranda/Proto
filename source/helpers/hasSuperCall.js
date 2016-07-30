/* global define */
define([
	'./isFunction',
	'../common/reSuper'
], function(isFunction, reSuper){
	'use strict';

	function hasSuperCall(fn){
		return isFunction(fn) && reSuper.test(fn.toString());
	}

	return hasSuperCall;
});
