/* global define */
define([
	'./each',
	'./extend',
	'./isFunction',
	'../common/isArray'
], function(each, extend, isFunction, isArray){
	'use strict';

	function implement(root, list){
		var proto = {}, collection = {};
		each(isArray(list)? list : [list], function(item){
			if(isFunction(item)){
				item = item.prototype;
			}
			each(item, function(value, key){
				if(!root[key]){
					proto[key] = value;
				}
			}, null, true);
			if(proto.implements){
				collection = implement(root, proto.implements);
			}else{
				collection = extend(collection, proto);
			}
		});
		return collection;
	}

	return implement;
});
