//     Proto.js v1.0.3

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

}(this, 'Proto', '1.0.3', function(global, exports, name, version){
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

	var numInstances = 0;

	function isLikeObject(value){
		return value === Object(value);
	}

	function isObject(value){
		return toStr(value) === '[object Object]';
	}

	function isFunction(value){
		return typeof value === 'function';
	}

	function isString(value){
		return typeof value === 'string';
	}

	function iteraction(ctx, key, value, index, getEnum, fn){
		if(getEnum || value.hasOwnProperty(key)){
			return fn.call(ctx || value[key], value[key], key, index, value);
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
		Proto.prototype = proto && proto.prototype || proto;
		return new Proto();
	}

	function create(proto, properties){
		if(proto === null){return {};}
		var Proto = function(){};
		Proto.prototype = proto;
		proto = new Proto();
		each(properties, function(value, property){
			proto[property] = value.value;
		});
		return proto;
	}

	if(!isFunction(Object.create)){
		Object.create = create;
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
		var args = slice(arguments, 1);
		each(args, function(parameter){
			each(parameter, function(value, key){
				target[key] = value;
			});
		});
		return target;
	}

	function copyShallowObjectsFrom(proto){
		var copy = {};
		each(proto, function(value, key){
			if(isObject(value)){
				copy[key] = value;
			}
		}, null, true);
		return copy;
	}

	function keys(object, getEnum){
		var properties = [];
		each(object, function(value, key){
			properties.push(key);
		}, null, getEnum);
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

	function mapContext(fn, context, methods){
		methods = methods.length? methods : keys(context, true);
		each(methods, function(method){
			if(isFunction(context[method])){
				context[method] = fn(context[method], context);
			}
		});
		return context;
	}

	function bindAll(context, methods){
		methods = isArray(methods)? methods : slice(arguments, 1);
		return mapContext(bind, context, methods);
	}

	function unbindAll(context, methods){
		methods = isArray(methods)? methods : slice(arguments, 1);
		return mapContext(unbind, context, methods);
	}

	function createSuperMethod(name, action, value){
		var pointer = isFunction(value)? value : function $super(){
			return value;
		};
		return function Proto(){
			this.super = pointer;
			return action.apply(this, arguments);
		};
	}

	function enableSuperMethods(parent, proto){
		if(proto && !proto.hasOwnProperty('constructor')){
      proto.constructor = function Proto(){};
    }
		each(proto, function(value, key){
			if(isFunction(value) && reSuper.test(value.toString())){
				proto[key] = createSuperMethod(key, value, parent.prototype[key]);
			}
		});
		return proto;
	}

	function getChild(parent, protoProps){
		if(protoProps && protoProps.hasOwnProperty('constructor')){
			return protoProps.constructor;
		}
		return function Proto(){
			return parent.apply(this, arguments);
		};
	}

	function inherit(Proto, parent, protoProps, staticProps){
		var child = getChild(parent, protoProps),
		Surrogate, childObjects, implementations;

		shallowMerge(child, parent, staticProps);

		Surrogate = function(){ this.constructor = child; };
		Surrogate.prototype = parent instanceof Proto? null : parent.prototype;
		child.prototype = Object.create(Surrogate.prototype);
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


	// Proto
	// -----

	function Proto(parent, protoProps, staticProps){
		return Proto.extends(parent, protoProps, staticProps);
	}

	Proto.size = 0;
	Proto.create = Object.create;
	Proto.each = each;
	Proto.implements = implement;
	Proto.unproxyAll = unbindAll;
	Proto.proxyAll = bindAll;
	Proto.unproxy = unbind;
	Proto.proxy = bind;
	Proto.overload = overload;
	Proto.copyShallowObjects = copyShallowObjectsFrom;
	Proto.shallowMerge = shallowMerge;
	Proto.flush = flush;
	Proto.keys = keys;
	Proto.copy = copy;
	Proto.ape = ape;
	Proto.isArray = isArray;
	Proto.isLikeObject = isLikeObject;
	Proto.isObject = isObject;
	Proto.isFunction = isFunction;
	Proto.isString = isString;

	Proto.extends = function(){
		var args = slice(arguments),
		hasParent = isFunction(args[0]),
		parent = hasParent? args[0] : this,
		protoProps = hasParent? args[1] : args[0],
		staticProps = hasParent? args[2] : args[1];
		enableSuperMethods(parent, protoProps);
		return inherit(Proto, parent, protoProps, staticProps);
	};

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

	Proto.prototype = {

		option:function(options){
			if(isString(options) && this.options){
				return this.options[options];
			}else if(isLikeObject(options)){
				this.options = merge(true, {}, this.defaults, options);
			}
			return isLikeObject(this.options)? this.options : {};
		},

		implement:function(list){
			return extend(this, implement(this, list));
		},

		overload:function(name, fn){
			return overload(this.prototype, name, fn);
		},

		unproxyAll:function(){
			return unbindAll(this, slice(arguments));
		},

		proxyAll:function(){
			return bindAll(this, slice(arguments));
		},

		unproxy:function(fn){
			return unbind(fn);
		},

		proxy:function(fn, context){
			return bind(fn, context || this);
		},

		flush:function(){
			flush(this);
		}
	};


	// Externalize
	// -----------

	exports[name] = Proto;
	exports[name].VERSION = version;

	return Proto;
}));
