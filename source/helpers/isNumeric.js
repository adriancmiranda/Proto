define(function(){
	'use strict';

	function isNumeric(value){
		return !isNaN(parseFloat(value)) && isFinite(value);
	}

	return isNumeric;
});
