define([
	'./common/slice',
	'./common/isArray',
	'./common/toStr',
	'./common/reSuper',
	'./common/reFnDeclaration',
	'./common/reObjectWrapper',
	'./helpers/ape',
	'./helpers/isFunction',
	'./helpers/isLikeObject',
	'./helpers/isObject',
	'./helpers/copy',
	'./helpers/create',
	'./helpers/extend',
	'./helpers/merge',
	'./helpers/shallowMerge',
	'./helpers/copyShallowObjectsFrom',
	'./helpers/keys',
	'./helpers/overload',
	'./helpers/implement',
	'./helpers/flush',
	'./helpers/bind',
	'./helpers/unbind',
	'./helpers/bindAll',
	'./helpers/unbindAll',
	'./helpers/createSuperMethod',
	'./helpers/enableSuperMethods'
], function(
	slice,
	isArray,
	toStr,
	reSuper,
	reFnDeclaration,
	reObjectWrapper,
	ape,
	isFunction,
	isLikeObject,
	isObject,
	copy,
	create,
	extend,
	merge,
	shallowMerge,
	copyShallowObjectsFrom,
	keys,
	overload,
	implement,
	flush,
	bind,
	unbind,
	bindAll,
	unbindAll,
	createSuperMethod,
	enableSuperMethods
){
	'use strict';


	// Proto
	// -----

	function Proto(){
		if(isFunction(this.initialize)){
			return this.initialize.apply(this, arguments);
		}
		return this;
	}

	Proto.implementations = 0;
	Proto.instances = 0;
	Proto.size = 0;

	Proto.create = Object.create || create;
	Proto.implements = implement;
	Proto.unbindAll = unbindAll;
	Proto.bindAll = bindAll;
	Proto.unbind = unbind;
	Proto.bind = bind;
	Proto.overload = overload;
	Proto.copyShallowObjectsFrom = copyShallowObjectsFrom;
	Proto.shallowMerge = shallowMerge;
	Proto.flush = flush;
	Proto.keys = keys;
	Proto.copy = copy;
	Proto.ape = ape;

	Proto.merge = function(target){
		return merge.apply(merge, [true, target].concat(slice(arguments)));
	};

	Proto.of = function(value, qualified){
		var type = toStr(value);
		if(qualified && type === '[object Object]'){
			return value.constructor.toString().replace(reFnDeclaration, '$1') || 'Object';
		}
		return type.replace(reObjectWrapper, '');
	};

	// Improved Backbone.js's extend
	Proto.extends = function(protoProps, staticProps){
		// Wrap calls to `super` on object methods.
		enableSuperMethods(this, protoProps);

		// Create a default constructor.
		var parent = this;
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
		Surrogate.prototype = parent.prototype || null;
		child.prototype = Proto.create(Surrogate.prototype);
		Proto.instances++;

		// Adds implementations to the `__proto__` itself before inherit.
		if(protoProps && protoProps.hasOwnProperty('implements')){
			implementations = implement(Proto.prototype, protoProps.implements);
			child.prototype = extend(child.prototype, implementations);
			delete protoProps.implements;
			Proto.implementations++;
			Proto.instances--;
		}

		// Proto extends length.
		Proto.size = Proto.instances + Proto.implementations;

		// Add prototype properties (instance properties) to the subclass,
		// if supplied. Extends the objects too.
		if(protoProps){
			childObjects = copyShallowObjectsFrom(child.prototype);
			shallowMerge(child.prototype, protoProps, { $protoID:Proto.size });
			merge(false, child.prototype, childObjects);
		}

		// Set a convenience property in case the parent's prototype is needed
		// later.
		child.super = parent.prototype;

		return child;
	};

	Proto.prototype.toImplement = function(list){
		return extend(this, implement(this, list));
	};

	Proto.prototype.overload = function(name, fn){
		return overload(this.prototype, name, fn);
	};

	Proto.prototype.setOptions = function(options){
		this.options = merge({}, this.defaults, options);
		return this.options;
	};

	Proto.prototype.getOptions = function(){
		return isLikeObject(this.options)? this.options : {};
	};

	Proto.prototype.getOption = function(optionName){
		if(optionName && isLikeObject(this.options)){
			return this.options[optionName];
		}
	};

	Proto.prototype.get = function(optionName){
		return this.getOption(optionName) || this[optionName];
	};

	Proto.prototype.unbindAll = function(){
		return unbindAll(this, slice(arguments));
	};

	Proto.prototype.bindAll = function(){
		return bindAll(this, slice(arguments));
	};

	Proto.prototype.unbind = function(fn){
		return unbind(fn);
	};

	Proto.prototype.bind = function(fn, context){
		return bind(fn, context || this);
	};

	Proto.prototype.flush = function(){
		flush(this);
	};

	return Proto;
});
