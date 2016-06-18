/* global define */
define(['./each', './isFunction', './isLikeObject'], function(each, isFunction, isLikeObject){
	'use strict';

	function create(proto, properties){
		if(proto === null){return {};}
		var Proto = function(){};
		Proto.prototype = proto;
		proto = new Proto();
		each(properties, function(value, property){
			proto[property] = value.value;
		});
		return proto;
	}

	if(!isFunction(Object.create)){
		Object.create = create;
	}

	return create;
});
