/* global define */
define(['./copy', './isObject'], function(copy, isObject){
	'use strict';

	function extend(proto, parent){
		if(proto && parent){
			proto = copy(proto);
			parent = copy(parent);
			for(var key in parent){
				if(isObject(parent[key])){
					extend(proto[key], parent[key]);
				}else{
					proto[key] = parent[key];
				}
			}
			return proto;
		}
		return proto || parent || {};
	}

	return extend;
});
