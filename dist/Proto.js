//     Proto.js v0.0.6-alpha

//     (c) 2015-2016 Adrian C. Miranda
//     Proto may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://ambox.github.io
(function(global, name, version, factory){
	'use strict';

	/* globals define:false, module:false */
	if(typeof module === 'object' && typeof module.exports === 'object'){

		// Set up for Node.js or CommonJS.
		module.exports = factory(global, exports, name, version);

	}else if(typeof define === 'function' && define.amd){

		// Next for module appropriately for the environment. Start with AMD.
		define(['exports'], function(exports){
			return factory(global, exports, name, version);
		});

	}else{

		// Finally, as a browser global.
		global[name] = factory(global, {}, name, version);

	}

}(this, 'Proto', 'v0.0.6-alpha', function(global, exports, name, version){
	'use strict';

	// Helpers
	// -------

	function ape(fn){
		return function(){
			return Function.call.apply(fn, arguments);
		};
	}

	var ctor = function noop(){};

	var isArray = Array.isArray;

	var reSuper = /\bsuper\b/;

	var reObjectWrapper = /^(\[object(\s|\uFEFF|\xA0))|(\])$/g;

	var reFnDeclaration = /^.*function\s([^\s]*|[^\(]*)\([^\x00]+$/;

	var slice = ape(Array.prototype.slice);

	var toStr = ape(Object.prototype.toString);

	function copy(proto){
		var Proto = function(){};
		Proto.prototype = proto.prototype || proto;
		return new Proto();
	}

	function isObject(value){
		return toStr(value) === '[object Object]';
	}

	function extend(proto, parent){
		if(proto && parent){
			proto = copy(proto);
			parent = copy(parent);
			for(var key in parent){
				if(isObject(parent[key])){
					extend(proto[key], parent[key]);
				}else{
					proto[key] = parent[key];
				}
			}
			return proto;
		}
		return proto || parent || {};
	}

	function merge(target){
		var params = slice(arguments);
		for(var id = 1, source; id < params.length; id++){
			source = params[id];
			for(var property in source){
				if(source.hasOwnProperty(property)){
					if(isObject(source[property]) && isObject(target[property])){
						merge(target[property], source[property]);
					}else{
						target[property] = source[property];
					}
				}
			}
		}
		return target;
	}

	function isLikeObject(value){
		return value === Object(value);
	}

	function create(proto, properties){
		var instance, property, Proto = function(){};
		Proto.prototype = proto;
		instance = new Proto();
		if(isLikeObject(properties)){
			for(property in properties){
				if(properties.hasOwnProperty(property)){
					instance[property] = properties[property].value;
				}
			}
		}
		return instance;
	}

	function shallowMerge(target){
		var params = slice(arguments);
		for(var id = 1, source; id < params.length; id++){
			source = params[id];
			for(var property in source){
				if(source.hasOwnProperty(property)){
					target[property] = source[property];
				}
			}
		}
		return target;
	}

	function copyShallowObjectsFrom(proto){
		var copy = {};
		for(var key in proto){
			if(isObject(proto[key])){
				copy[key] = proto[key];
			}
		}
		return copy;
	}

	function isFunction(value){
		return typeof value === 'function';
	}

	function implement(list){
		var proto = {}, collection = {};
		list = isArray(list)? list : [list];
		for(var id = 0, item; id < list.length; id++){
			item = list[id];
			if(isFunction(item)){
				item = item.prototype;
			}
			for(var key in item){
				if(key !== 'constructor'){
					proto[key] = item[key];
				}
			}
			if(proto.implements){
				collection = implement(proto.implements);
			}else{
				collection = extend(collection, proto);
			}
		}
		return collection;
	}

	function createSuperMethod(name, action, value){
		var pointer = isFunction(value)? value : function $super(){
			return value;
		};
		return function(){
			this.super = pointer;
			return action.apply(this, arguments);
		};
	}

	function enableSuperMethods(parent, proto){
		for(var key in proto){
			if(isFunction(proto[key]) && reSuper.test(proto[key].toString())){
				proto[key] = createSuperMethod(key, proto[key], parent.prototype[key]);
			}
		}
		return proto;
	}


	// Proto
	// -----

	exports = {
		// Proto version
		VERSION:version,

		create:Object.create || create,

		// Improved Backbone.js's extend
		extends:function(protoProps, staticProps){
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
			child.prototype = new Surrogate();
			// child.prototype = exports.create(Surrogate.prototype);

			// Adds implementations to the `__proto__` itself before inherit.
			if(protoProps && protoProps.hasOwnProperty('implements')){
				implementations = implement(protoProps.implements);
				child.prototype = extend(child.prototype, implementations);
				delete protoProps.implements;
			}

			// Add prototype properties (instance properties) to the subclass,
			// if supplied. Extends the objects too.
			if(protoProps){
				childObjects = copyShallowObjectsFrom(child.prototype);
				shallowMerge(child.prototype, protoProps);
				merge(child.prototype, childObjects);
			}

			// Set a convenience property in case the parent's prototype is needed
			// later.
			child.super = parent.prototype;

			// Proto instances length.
			exports.size = (exports.size || 0) + 1;

			return child;
		}
	};


	// Externalize
	// -----------

	return exports;
}));
