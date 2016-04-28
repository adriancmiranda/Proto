define(['../helpers/bind', '../helpers/unbind'], function(bind, unbind){
	'use strict';


	// Overrides
	// ---------

	Function.prototype.bind = function(context){
		return bind(this, context);
	};

	Function.prototype.unbind = function(){
		return unbind(this);
	};

	return Function;
});
