/* global define */
define(['./each', './copy', './isLikeObject'], function(each, copy, isLikeObject){
	'use strict';

	function create(proto, properties){
		proto = copy(proto);
		each(properties, function(value, property){
			proto[property] = value.value;
		});
		return proto;
	}

	return create;
});
