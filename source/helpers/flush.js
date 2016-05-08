/* global define */
define(function(){
	'use strict';

	function flush(object){
		for(var key in object){
			if(object.hasOwnProperty(key)){
				delete object[key];
			}
		}
	}

	return flush;
});
