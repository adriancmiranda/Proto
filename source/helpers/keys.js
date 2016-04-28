define(function(){
	'use strict';

	function keys(object, getEnum){
		var properties = [];
		for(var key in object){
			if(getEnum || object.hasOwnProperty(key)){
				properties.push(key);
			}
		}
		return properties;
	}

	return keys;
});
