define([
	'./extend',
	'./isFunction',
	'../common/isArray'
], function(extend, isFunction, isArray){
	'use strict';

	function implement(root, list){
		var proto = {}, collection = {};
		list = isArray(list)? list : [list];
		for(var id = 0, item; id < list.length; id++){
			item = list[id];
			if(isFunction(item)){
				item = item.prototype;
			}
			for(var key in item){
				if(!root[key]){
					proto[key] = item[key];
				}
			}
			if(proto.implements){
				collection = implement(root, proto.implements);
			}else{
				collection = extend(collection, proto);
			}
		}
		return collection;
	}

	return implement;
});
