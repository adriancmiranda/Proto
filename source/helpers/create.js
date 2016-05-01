define(['./isLikeObject'], function(isLikeObject){
	'use strict';

	function create(proto, properties){
		var instance, property, Proto = function(){};
		Proto.prototype = proto;
		instance = new Proto();
		if(isLikeObject(properties)){
			for(property in properties){
				if(properties.hasOwnProperty(property)){
					instance[property] = properties[property].value;
				}
			}
		}
		return instance;
	}

	return create;
});
