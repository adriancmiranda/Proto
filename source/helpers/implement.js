define([
	'./extend',
	'./isFunction'
], function(extend, isFunction){
	'use strict';

	function implement(list){
		list = [].concat(list);
		var proto = {}, collection = {};
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
				collection = extend(collection, proto);
			}
		}
		return collection;
	}

	return implement;
});
