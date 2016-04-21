define(['./hasProp'], function(hasProp){
	'use strict';

	return function(obj){
		for(var key in obj){
			if(hasProp(obj, key)){
				delete obj[key];
			}
		}
	};
});
