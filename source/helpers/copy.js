define(function(){
	'use strict';

	function copy(proto){
		var Proto = function(){};
		Proto.prototype = proto.prototype || proto;
		return new Proto();
	}

	return copy;
});
