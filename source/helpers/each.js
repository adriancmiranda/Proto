define(function(){
	'use strict';

	function each(obj, callback, params){
    for(var key in obj){
      value = callback.call(obj[key], key, params);
      if(value === false){
        break;
      }
    }
	}

	return each;
});
