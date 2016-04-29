define(function(){
	'use strict';

	function eachProperty(value, fn, ctx, args){
		for(var id in value){
			value = fn.call(ctx || value[id], value[id], id, args);
			if(value === false){
				break;
			}
		}
	}

	return eachProperty;
});
