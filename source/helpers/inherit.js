/* global define */
define([
	'./merge',
	'./create',
	'./extend',
	'./implement',
	'./shallowMerge',
	'./enableSuperMethods',
	'./copyShallowObjectsFrom'
], function(merge, create, extend, implement, shallowMerge, enableSuperMethods, copyShallowObjectsFrom){
	'use strict';

	function inherit(parent, protoProps, staticProps){
		// Wrap calls to `super` on object methods.
		enableSuperMethods(parent, protoProps);

		// Create a default constructor.
		var child = function(){ return parent.apply(this, arguments); };
		var childObjects, implementations;

		// The constructor function for the new subclass is either defined by you
		// (the "constructor" property in your `extend` definition), or defaulted
		// by us to simply call the parent's constructor.
		if(protoProps && protoProps.hasOwnProperty('constructor')){
			child = protoProps.constructor;
		}

		// Add static properties to the constructor function, if supplied.
		shallowMerge(child, parent, staticProps);

		// Set the prototype chain to inherit from `parent`, without calling
		// `parent`'s constructor function.
		var Surrogate = function(){ this.constructor = child; };
		Surrogate.prototype = parent instanceof Proto? null : parent.prototype;
		child.prototype = Proto.create(Surrogate.prototype);
		numProtoInstances++;

		// Adds implementations to the `__proto__` itself before inherit.
		if(protoProps && protoProps.hasOwnProperty('implements')){
			implementations = implement(Proto.prototype, protoProps.implements);
			child.prototype = extend(child.prototype, implementations);
			delete protoProps.implements;
			numProtoImplementations++;
			numProtoInstances--;
		}

		// Proto extends length.
		numProto = numProtoInstances + numProtoImplementations;

		// Add prototype properties (instance properties) to the subclass,
		// if supplied. Extends the objects too.
		if(protoProps){
			childObjects = copyShallowObjectsFrom(child.prototype);
			shallowMerge(child.prototype, protoProps, { $protoID:numProto });
			merge(false, child.prototype, childObjects);
		}

		// Set a convenience property in case the parent's prototype is needed
		// later.
		child.super = parent.prototype;

		return child;
	}

	return inherit;
});
