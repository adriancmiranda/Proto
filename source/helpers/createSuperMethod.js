define(['./isFunction', '../common/ctor'], function(isFunction, ctor){
	'use strict';

	function createSuperMethod(name, action, value){
		var pointer = isFunction(value)? value : function $super(){
			return value;
		};
		return function(){
			this.super = pointer;
			return action.apply(this, arguments);
		};
	}

	return createSuperMethod;
});
