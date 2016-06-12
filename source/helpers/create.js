/* global define */
define(['./each', './copy', './isFunction', './isLikeObject'], function(each, copy, isFunction, isLikeObject){
	'use strict';

	function create(proto, properties){
		proto = copy(proto);
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
