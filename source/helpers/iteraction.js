/* global define */
define(function(){
	'use strict';

	function iteraction(ctx, key, value, index, getEnum, fn){
		if(getEnum || value.hasOwnProperty(key)){
			return fn.call(ctx || value[key], value[key], key, index, value);
		}
	}

	return iteraction;
});
