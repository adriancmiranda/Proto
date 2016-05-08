/* global define */
define(function(){
	'use strict';

	function unbind(fn){
		var cache = fn.__bind__;
		delete fn.__bind__;
		return cache;
	}

	return unbind;
});
