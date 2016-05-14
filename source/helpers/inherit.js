/* global define */
define([
	'./merge',
	'./extend',
	'./implement',
	'./shallowMerge',
	'./enableSuperMethods',
	'./copyShallowObjectsFrom',
	'../common/numInstances'
], function(merge, extend, implement, shallowMerge, enableSuperMethods, copyShallowObjectsFrom, numInstances){
	'use strict';

	function getChild(parent, protoProps){
		if(protoProps && protoProps.hasOwnProperty('constructor')){
			return protoProps.constructor;
		}
		return function(){
			return parent.apply(this, arguments);
		};
	}

	function inherit(Proto, parent, protoProps, staticProps){
		var child = getChild(parent, protoProps),
		Surrogate, childObjects, implementations;

		shallowMerge(child, parent, staticProps);

		Surrogate = function(){ this.constructor = child; };
		Surrogate.prototype = parent instanceof Proto? null : parent.prototype;
		child.prototype = Proto.create(Surrogate.prototype);
		Proto.size = numInstances++;

		if(protoProps && protoProps.hasOwnProperty('implements')){
			implementations = implement(Proto.prototype, protoProps.implements);
			child.prototype = extend(child.prototype, implementations);
			delete protoProps.implements;
		}

		if(protoProps){
			childObjects = copyShallowObjectsFrom(child.prototype);
			shallowMerge(child.prototype, protoProps, { $protoID:Proto.size });
			merge(false, child.prototype, childObjects);
		}

		child.super = parent.prototype;

		return child;
	}

	return inherit;
});
