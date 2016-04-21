define(function(){
	'use strict';

	return function(fn){
		return function(){
			return Function.call.apply(fn, arguments);
		};
	};
});
