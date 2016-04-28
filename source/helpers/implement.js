define([
	'./merge',
	'./isFunction',
	'../common/isArray'
], function(merge, isFunction, isArray){
	'use strict';

	function implement(list){
		var proto = {}, collection = {};
		list = isArray(list)? list : [list];
		for(var id = 0, item; id < list.length; id++){
			item = list[id];
			if(isFunction(item)){
				item = item.prototype;
			}
			for(var key in item){
				if(key !== 'constructor'){
					proto[key] = item[key];
				}
			}
			if(proto.implements){
				collection = implement(proto.implements);
			}else{
				collection = merge(collection, proto);
			}
		}
		return collection;
	}

	return implement;
});
