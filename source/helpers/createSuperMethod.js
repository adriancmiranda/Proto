/* global define */
define(['./isFunction'], function(isFunction){
	'use strict';

	function createSuperMethod(name, action, value){
		var pointer = isFunction(value)? value : function $super(){
			return value;
		};
		return function __super__(){
			this.super = pointer;
			return action.apply(this, arguments);
		};
	}

	return createSuperMethod;
});
