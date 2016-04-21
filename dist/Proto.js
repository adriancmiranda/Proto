(function(global, factory){
	'use strict';

	var $ = global.jQuery || global.Zepto || global.ender || global.$;
	if(typeof module === 'object' && typeof module.exports === 'object'){
		module.exports = factory(global, $, true);
	}else{
		factory(global, $);
	}

}(typeof window !== 'undefined' ? window : this, function(window, $, nodeEnv){

//|-----------------------------------------------------------------------------
//|
//| Adrian C. Miranda
//|
//| .-------------------------------------------------------------------.
//| | NAMING CONVENTIONS:                                               |
//| |-------------------------------------------------------------------|
//| | Singleton-literals and prototype objects      | PascalCase        |
//| |-------------------------------------------------------------------|
//| | Functions and public variables                | camelCase         |
//| |-------------------------------------------------------------------|
//| | Global variables and constants                | UPPERCASE         |
//| |-------------------------------------------------------------------|
//| | Private variables                             | _underscorePrefix |
//| '-------------------------------------------------------------------'
//|
//| Comment syntax for the entire project follows JSDoc:
//| @see http://code.google.com/p/jsdoc-toolkit/wiki/TagReference
//|
//|-----------------------------------------------------------------------------
//| Utilities
//'-----------------------------------------------------------------------------

	var ape = function(fn){
		return function(){
			return Function.call.apply(fn, arguments);
		};
	};

	var uid = 0;
	
	var slice = ape(Array.prototype.slice);
	
	var hasProp = ape(Object.prototype.hasOwnProperty);
	
	var toString = ape(Object.prototype.toString);

	var patterns = {
		objWrap:/^(\[object(\s|\uFEFF|\xA0))|(\])$/g,
		fnDecl:/^.*function\s([^\s]*|[^\(]*)\([^\x00]+$/
	};

	var create = (typeof Object.create === 'function' && Object.create ||
		function(obj, props){
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
		}
	);

	var overload = function(target, name, fn){
		var cacheFn = target[name];
		target[name] = function(){
			if(fn.length === arguments.length){
				return fn.apply(this, arguments);
			}else if(typeof(cacheFn) === 'function'){
				return cacheFn.apply(this, arguments);
			}
		};
	};

	var merge = function(target){
		var params = slice(arguments);
		for(var id = 1, source; id < params.length; id++){
			source = params[id];
			for(var property in source){
				if(hasProp(source, property)){
					target[property] = source[property];
				}
			}
		}
		return target;
	};

	var keys = function(object, getEnum){
		var properties = [];
		for(var property in object){
			if(getEnum || hasProp(object, property)){
				properties.push(property);
			}
		}
		return properties;
	};

	var bind = function(fn, context){
		var args = slice(arguments, 2);
		var proxy = function(){
			return fn.apply(context, args.concat(slice(arguments)));
		};
		proxy.__originalFn__ = proxy.__originalFn__ || fn;
		return proxy;
	};
	
	var unbind = function(fn, context){
		var originalFn = fn.__originalFn__;
		delete(fn.__originalFn__);
		return originalFn;
	};

	var bindAll = function(context, methods){
		methods = Array.isArray(methods)? methods : slice(arguments, 1);
		methods = methods.length? methods : keys(context, true);
		for(var id = 0; id < methods.length; id++){
			if(typeof context[methods[id]] === 'function'){
				context[methods[id]] = bind(context[methods[id]], context);
			}
		}
		return context;
	};

	var unbindAll = function(context, methods){
		methods = Array.isArray(methods)? methods : slice(arguments, 1);
		methods = methods.length? methods : keys(context, true);
		for(var id = 0; id < methods.length; id++){
			if(typeof context[methods[id]] === 'function'){
				context[methods[id]] = unbind(context[methods[id]], context);
			}
		}
		return context;
	};

	var flush = function(obj){
		for(var key in obj){
			if(hasProp(obj, key)){
				delete obj[key];
			}
		}
	};

//|-----------------------------------------------------------------------------
//| Proto
//'-----------------------------------------------------------------------------

	function Proto(Fn){
		if(typeof this.initialize === 'function'){
			this.cid = ++uid;
			return this.initialize.apply(this, arguments);
		}
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
	}

	Proto.overload = overload;
	Proto.hasProp = hasProp;
	Proto.create = create;
	Proto.merge = merge;
	Proto.flush = flush;
	Proto.keys = keys;
	Proto.bind = bind;
	Proto.unbind = unbind;
	Proto.bindAll = bindAll;
	Proto.unbindAll = unbindAll;
	Proto.ape = ape;

	Proto.of = function(value, qualified){
		var type = toString(value);
		if(qualified && type === '[object Object]'){
			return value.constructor.toString().replace(patterns.fnDecl, '$1') || 'Object';
		}
		return type.replace(patterns.objWrap, '');
	};

	Proto.extends = function(proto, properties){
		var parent = this;
		var Proto = function(){
			return parent.apply(this, arguments);
		};
		if(proto && hasProp(proto, 'constructor')){
			Proto = proto.constructor;
		}
		merge(Proto, parent, properties);
		var Caste = function(){ this.constructor = Proto; };
		Caste.prototype = parent.prototype;
		Proto.prototype = create(Caste.prototype);
		proto && merge(Proto.prototype, proto);
		Proto.super = parent.prototype;
		parent.extends = Proto.extends;
		return Proto;
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
		this.prototype = create(superclass.prototype, {
			constructor:{
				value:this,
				enumerable:false,
				writable:true,
				configurable:true
			}
		});
		return this;
	};

	Proto.prototype.hasProp = function(prop){
		return hasProp(this, prop);
	};

	Proto.prototype.public = function(name, definition){
		if(typeof name === 'string'){
			this.prototype[name] = definition;
		}else if(Object(name) === name){
			for(var key in name){
				if(hasProp(name, key)){
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
				if(hasProp(name, key)){
					this[key] = name[key];
				}
			}
		}
		return this;
	};

	Proto.prototype.charge = function(name, fn){
		overload(this.prototype, name, fn);
		return this;
	};

	Proto.prototype.outrun = function(name, fn){
		overload(this, name, fn);
		return this;
	};

	Proto.prototype.flush = function(){
		flush(this);
	};

	Proto.prototype.toString = function(){
		return '[object '+ Proto.of(this, true) +']';
	};


//|-----------------------------------------------------------------------------
//| Expose `Proto` identifier, even in AMD and CommonJS for browser emulators.
//'-----------------------------------------------------------------------------

	if(!nodeEnv){
		window.Proto = Proto;
	}


//|-----------------------------------------------------------------------------
//| Expose `Proto` identifier, even in query plugins.
//'-----------------------------------------------------------------------------

	if($ && $.fn === Object($.fn)){
		$.fn.Proto = Proto;
	}

	return Proto;
}));
