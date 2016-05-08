/* global define */
define(['./each', './copy', './isObject'], function(each, copy, isObject){
	'use strict';

	function extend(proto, parent){
		if(proto && parent){
			proto = copy(proto);
			parent = copy(parent);
			each(parent, function(value, key){
				if(isObject(value)){
					extend(proto[key], value);
				}else{
					proto[key] = value;
				}
			}, null, true);
			return proto;
		}
		return proto || parent || {};
	}

	return extend;
});
