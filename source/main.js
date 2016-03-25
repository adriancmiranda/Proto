
define([
	'./common/patterns'
], function(patterns){
	'use strict';

	var Proto = function(Fn){
		if(this instanceof Proto){
			if(typeof Fn === 'function'){
				Fn.prototype.toString = this.toString;
				Fn.prototype.flush = this.flush;
				Fn.extends = this.extends;
				Fn.public = this.public;
				Fn.static = this.static;
				Fn.charge = this.charge;
				Fn.outrun = this.outrun;
			}
			return Fn;
		}
		return new Proto(Fn);
	};

	Proto.ape = function(fn){
		return function(){
			return Function.call.apply(fn, arguments);
		};
	};

	Proto.of = function(value, qualified){
		if(value){
			var type = Object.prototype.toString.call(value);
			if(qualified && type === '[object Object]'){
				return value.constructor.toString().replace(patterns.fnDecl, '$1') || 'Object';
			}
			return type.replace(patterns.objWrap, '');
		}
		return value;
	};

	Proto.create = (create || function(obj, props){
		var instance, prop;
		function Proto(){}
		Proto.prototype = obj;
		instance = new Proto();
		if(typeof props === 'object'){
			for(prop in props){
				if(props.hasOwnProperty((prop))){
					instance[prop] = props[prop].value;
				}
			}
		}
		return instance;
	});

	Proto.keys = function keys(object, getEnum){
		var properties = [];
		for(var key in object){
			if(getEnum || object.hasOwnProperty(key)){
				properties.push(key);
			}
		}
		return properties;
	};

	Proto.bind = function(fn, context){
		var args = Array.prototype.slice.call(arguments, 2);
		var proxy = function(){
			return fn.apply(context, args.concat(Array.prototype.slice.call(arguments)));
		};
		proxy.__originalFn__ = proxy.__originalFn__ || fn;
		return proxy;
	};

	Proto.unbind = function(fn){
		var originalFn = fn.__originalFn__;
		delete(fn.__originalFn__);
		return originalFn;
	};

	Proto.bindAll = function(context, methods){
		methods = Array.isArray(methods)? methods : Array.prototype.slice.call(arguments, 1);
		methods = methods.length? methods : Proto.keys(context, true);
		for(var id = 0; id < methods.length; id++){
			if(typeof context[methods[id]] === 'function'){
				context[methods[id]] = Proto.bind(context[methods[id]], context);
			}
		}
		return context;
	};

	Proto.unbindAll = function(context, methods){
		methods = Array.isArray(methods)? methods : Array.prototype.slice.call(arguments, 1);
		methods = methods.length? methods : Proto.keys(context, true);
		for(var id = 0; id < methods.length; id++){
			if(typeof context[methods[id]] === 'function'){
				context[methods[id]] = Proto.unbind(context[methods[id]], context);
			}
		}
		return context;
	};

	Proto.overload = function(target, name, fn){
		var cache = target[name];
		target[name] = function(){
			if(fn.length === arguments.length){
				return fn.apply(this, arguments);
			}else if(typeof(cache) === 'function'){
				return cache.apply(this, arguments);
			}
		};
	};

	Proto.hasProp = Proto.ape(Object.prototype.hasOwnProperty);

	Proto.prototype.hasProp = function(prop){
		return Proto.hasProp(this, prop);
	};

	Proto.prototype.extends = function(superclass){
		if(typeof superclass !== 'function'){
			return this;
		}
		this.super = superclass;
		if(nodeEnv){
			require('util').inherits(this, superclass);
			return this;
		}
		this.prototype = Proto.create(superclass.prototype, {
			constructor:{
				value:this,
				enumerable:false,
				writable:true,
				configurable:true
			}
		});
		return this;
	};

	Proto.prototype.public = function(name, definition){
		if(typeof name === 'string'){
			this.prototype[name] = definition;
		}else if(Object(name) === name){
			for(var key in name){
				if(name.hasOwnProperty(key)){
					this.prototype[key] = name[key];
				}
			}
		}
		return this;
	};

	Proto.prototype.static = function(name, definition){
		if(typeof name === 'string'){
			this[name] = definition;
		}else if(Object(name) === name){
			for(var key in name){
				if(name.hasOwnProperty(key)){
					this[key] = name[key];
				}
			}
		}
		return this;
	};

	Proto.prototype.charge = function(name, fn){
		Proto.overload(this.prototype, name, fn);
		return this;
	};

	Proto.prototype.outrun = function(name, fn){
		Proto.overload(this, name, fn);
		return this;
	};

	Proto.prototype.flush = function(){
		for(var key in this){
			if(this.hasOwnProperty(key)){
				delete(this[key]);
			}
		}
	};

	Proto.prototype.toString = function(){
		return '[object '+ Proto.of(this, true) +']';
	};

	return Proto;
});