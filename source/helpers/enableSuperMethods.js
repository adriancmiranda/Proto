/* global define */
define([
	'./isFunction',
	'./createSuperMethod',
	'../common/reSuper'
], function(isFunction, createSuperMethod, reSuper){
	'use strict';

	function enableSuperMethods(parent, proto){
		for(var key in proto){
			if(isFunction(proto[key]) && reSuper.test(proto[key].toString())){
				proto[key] = createSuperMethod(key, proto[key], parent.prototype[key]);
			}
		}
		return proto;
	}

	return enableSuperMethods;
});
