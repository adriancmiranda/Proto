/* global define */
define([
	'./each',
	'./bind',
	'./injectSuperMethod'
], function(each, bind, injectSuperMethod){
	'use strict';

	function enableSuperMethods(parent, proto){
		if(proto && !proto.hasOwnProperty('constructor')){
			proto.constructor = function Proto(){};
		}
		each(proto, bind(injectSuperMethod, null, parent.prototype, proto));
		return proto;
	}

	return enableSuperMethods;
});
