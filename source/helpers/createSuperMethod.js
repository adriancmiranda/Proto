define(['./isFunction', '../common/ctor'], function(isFunction, ctor){
	'use strict';

	function createSuperMethod(name, action, pointer){
		pointer = isFunction(pointer)? pointer : ctor;
		return function(){
			this.super = pointer;
			return action.apply(this, arguments);
		};
	}

	return createSuperMethod;
});
