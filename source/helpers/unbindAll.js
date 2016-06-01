/* global define */
define([
	'./unbind',
	'./mapContext'
], function(unbind, mapContext){
	'use strict';

	function unbindAll(context, methods){
		return mapContext(unbind, context, methods);
	}

	return unbindAll;
});
