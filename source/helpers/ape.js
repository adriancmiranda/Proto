/* global define */
define(function(){
	'use strict';

	function ape(fn){
		return function(){
			return Function.call.apply(fn, arguments);
		};
	}

	return ape;
});
