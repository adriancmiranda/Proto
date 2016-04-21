define(function(){
	'use strict';
	
	return function(fn, context){
		var originalFn = fn.__originalFn__;
		delete(fn.__originalFn__);
		return originalFn;
	};
});
