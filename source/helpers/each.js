/* global define */
define(['./isFunction', './iteraction'], function(isFunction, iteraction){
	'use strict';

	function each(value, fn, ctx, getEnum){
		var ctr, index = 0, isFn = isFunction(value);
		for(var key in value){
			ctr = isFn? key !== 'prototype' && key !== 'length' && key !== 'name' : true;
			if(ctr && iteraction(ctx, key, value, index++, getEnum, fn) === false){
				break;
			}
		}
	}

	return each;
});
