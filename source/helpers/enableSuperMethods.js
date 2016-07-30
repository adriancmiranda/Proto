/* global define */
define([
	'./each',
	'./hasSuperCall',
	'./createSuperMethod'
], function(each, hasSuperCall, createSuperMethod){
	'use strict';

	function enableSuperMethods(parent, proto){
		if(proto && !proto.hasOwnProperty('constructor')){
			proto.constructor = function Proto(){};
		}
		each(proto, function(value, key){
			if(hasSuperCall(value)){
				proto[key] = createSuperMethod(key, value, parent.prototype[key]);
			}
		});
		return proto;
	}

	return enableSuperMethods;
});
