/* global define */
define(function(){
	'use strict';

	function eachIndex(value, fn, ctx, args){
		for(var id = 0, ln = value.length; id < ln;){
			value = fn.call(ctx || value[id], value[id], id, id++, value, args);
			if(value === false){
				break;
			}
		}
	}

	return eachIndex;
});
