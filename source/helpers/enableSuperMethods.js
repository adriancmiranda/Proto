/* global define */
define([
	'./each',
	'./isFunction',
	'./createSuperMethod',
	'../common/reSuper'
], function(each, isFunction, createSuperMethod, reSuper){
	'use strict';

	function enableSuperMethods(parent, proto){
		if(proto && !proto.hasOwnProperty('constructor')){
      proto.constructor = function Proto(){};
    }
		each(proto, function(value, key){
			if(isFunction(value) && reSuper.test(value.toString())){
				proto[key] = createSuperMethod(key, value, parent.prototype[key]);
			}
		});
		return proto;
	}

	return enableSuperMethods;
});
