define(function(){
	'use strict';

	return(typeof Object.create === 'function' && Object.create ||
    function(obj, props){
      var instance, prop;
      function Proto(){}
      Proto.prototype = obj;
      instance = new Proto();
      if(typeof props === 'object'){
        for(prop in props){
          if(props.hasOwnProperty((prop))){
            instance[prop] = props[prop].value;
          }
        }
      }
      return instance;
    }
  );
});
