/* global define */
define(function(){
	'use strict';

	function eachProperty(value, fn, ctx, getEnum){
		var index = 0;
		for(var key in value){
			if(getEnum || value.hasOwnProperty(key)){
				if(fn.call(ctx || value[key], value[key], key, index++, value) === false){
					break;
				}
			}
		}
	}

	return eachProperty;
});
