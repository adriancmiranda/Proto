//     Proto.js v0.1.0

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

}(this, 'Proto', '0.1.0', function(global, exports, name, version){
	'use strict';

	// Helpers
	// -------

	function ape(fn){
		return function(){
			return Function.call.apply(fn, arguments);
		};
	}

	var slice = ape(Array.prototype.slice);

	var isArray = Array.isArray;

	var toStr = ape(Object.prototype.toString);

	var reSuper = /\bsuper\b/;

	var reFnDeclaration = /^.*function\s([^\s]*|[^\(]*)\([^\x00]+$/;

	var reObjectWrapper = /^(\[object(\s|\uFEFF|\xA0))|(\])$/g;

	function isLikeObject(value){
		return value === Object(value);
	}

	function isObject(value){
		return toStr(value) === '[object Object]';
	}

	function isFunction(value){
		return typeof value === 'function';
	}

	function iteraction(ctx, key, value, index, getEnum, fn){
		if(getEnum || value.hasOwnProperty(key)){
			return fn.call(ctx||value[key], value[key], key, index, value);
		}
	}

	function each(value, fn, ctx, getEnum){
		var ctr, index = 0, isFn = isFunction(value);
		for(var key in value){
			ctr = isFn? key !== 'prototype' && key !== 'length' && key !== 'name' : true;
			if(ctr && iteraction(ctx, key, value, index++, getEnum, fn) === false){
				break;
			}
		}
	}

	function copy(proto){
		var Proto = function(){};
		Proto.prototype = proto.prototype || proto;
		return new Proto();
	}

	function create(proto, properties){
		proto = copy(proto);
		if(isLikeObject(properties)){
			for(var property in properties){
				if(properties.hasOwnProperty((property))){
					proto[property] = properties[property].value;
				}
			}
		}
		return proto;
	}

	function extend(proto, parent){
		if(proto && parent){
			proto = copy(proto);
			parent = copy(parent);
			each(parent, function(value, key){
				if(isObject(value)){
					extend(proto[key], value);
				}else{
					proto[key] = value;
				}
			}, null, true);
			return proto;
		}
		return proto || parent || {};
	}

	function merge(overwrite, target){
		var args = slice(arguments, 2);
		each(args, function(parameter){
			each(parameter, function(value, key){
				if(isObject(value) && isObject(target[key])){
					merge(overwrite, target[key], value);
				}else if(overwrite || !target[key]){
					target[key] = value;
				}
			}, null, true);
		});
		return target;
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

	function keys(object, getEnum){
		var properties = [];
		for(var key in object){
			if(getEnum || object.hasOwnProperty(key)){
				properties.push(key);
			}
		}
		return properties;
	}

	function overload(target, name, fn){
		var cache = target[name];
		target[name] = function(){
			if(fn.length === arguments.length){
				return fn.apply(this, arguments);
			}else if(isFunction(cache)){
				return cache.apply(this, arguments);
			}
		};
	}

	function implement(root, list){
		var proto = {}, collection = {};
		each(isArray(list)? list : [list], function(item){
			if(isFunction(item)){
				item = item.prototype;
			}
			each(item, function(value, key){
				if(!root[key]){
					proto[key] = value;
				}
			}, null, true);
			if(proto.implements){
				collection = implement(root, proto.implements);
			}else{
				collection = extend(collection, proto);
			}
		});
		return collection;
	}

	function flush(object){
		for(var key in object){
			if(object.hasOwnProperty(key)){
				delete object[key];
			}
		}
	}

	function bind(fn, context){
		var args = slice(arguments, 2);
		var proxy = function(){
			return fn.apply(context, args.concat(slice(arguments)));
		};
		proxy.__bind__ = proxy.__bind__ || fn;
		return proxy;
	}

	function unbind(fn){
		var cache = fn.__bind__;
		delete fn.__bind__;
		return cache;
	}

	function bindAll(context, methods){
		methods = isArray(methods)? methods : slice(arguments, 1);
		methods = methods.length? methods : keys(context, true);
		each(methods, function(method, key){
			if(isFunction(context[method])){
				context[method] = bind(context[method], context);
			}
		});
		return context;
	}

	function unbindAll(context, methods){
		methods = isArray(methods)? methods : slice(arguments, 1);
		methods = methods.length? methods : keys(context, true);
		each(methods, function(method, key){
			if(isFunction(context[method])){
				context[method] = unbind(context[method], context);
			}
		});
		return context;
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
	Proto.iterate = each;
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
		this.options = merge(true, {}, this.defaults, options);
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


	// Externalize
	// -----------

	exports[name] = Proto;
	exports[name].VERSION = version;

	return Proto;
}));
