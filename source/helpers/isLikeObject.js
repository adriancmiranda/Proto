define(function(){
	'use strict';

	function isLikeObject(value){
		return value === Object(value);
	}

	return isLikeObject;
});
