define(['./hasProp'], function(hasProp){
	'use strict';

	return function(object, getEnum){
		var properties = [];
		for(var property in object){
			if(getEnum || hasProp(object, property)){
				properties.push(property);
			}
		}
		return properties;
	};
});
