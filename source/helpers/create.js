/* global define */
define(['./copy', './isLikeObject'], function(copy, isLikeObject){
	'use strict';

	function create(proto, properties){
		proto = copy(proto);
		if(isLikeObject(properties)){
			for(var property in properties){
				if(properties.hasOwnProperty((property))){
					proto[property] = properties[property].value;
				}
			}
		}
		return proto;
	}

	return create;
});
