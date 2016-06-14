/* global define */
define(function(){
	'use strict';

	function getChild(parent, protoProps){
		if(protoProps && protoProps.hasOwnProperty('constructor')){
			return protoProps.constructor;
		}
		return function Proto(){
			return parent.apply(this, arguments);
		};
	}

	return getChild;
});
