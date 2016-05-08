define(function(){
	'use strict';

	function each(value, fn, ctx, getEnum){
		var ctr, ix = 0, isFn = isFunction(value);
		for(var key in value){
			if(getEnum || value.hasOwnProperty(key)){
				ctr = isFn? key !== 'prototype' && key !== 'length' && key !== 'name' : true;
				if((ctr && fn.call(ctx||value[key], value[key], key, ix++, value)) === false){
					break;
				}
			}
		}
	}

	return each;
});
