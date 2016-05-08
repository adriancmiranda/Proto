/* global define */
define(function(){
	'use strict';

	function eachProperty(value, fn, ctx, args){
		for(var id in value){
			if(getEnum || value.hasOwnProperty(key)){
				if(fn.call(ctx || value[id], value[id], id, args) === false){
					break;
				}
			}
		}
	}

	return eachProperty;
});
