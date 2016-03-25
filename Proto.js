(function(global, factory){
	'use strict';

	var create = typeof Object.create === 'function' && Object.create;

	if(typeof module === 'object' && typeof module.exports === 'object'){
		module.exports = global.document? factory(global, create, true) : function(window){
			if(!window.document){
				throw new Error('Proto requires a window with a document');
			}
			return factory(window, create);
		};
	}else factory(global, create);

}(typeof window !== 'undefined' ? window : this, function(window, create, nodeEnv){

	var re = {
		objWrap:/^(\[object(\s|\uFEFF|\xA0))|(\])$/g,
		fnDecl:/^.*function\s([^\s]*|[^\(]*)\([^\x00]+$/
	};

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
				return value.constructor.toString().replace(re.fnDecl, '$1') || 'Object';
			}
			return type.replace(re.objWrap, '');
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

	Proto.keys = (Object.keys || function(obj){
		var keys = [];
		for(var key in obj){
			if(obj.hasOwnProperty(key)){
				keys.push(key);
			}
		}
		return keys;
	});

	Proto.rebind = function(context){
		var methods = Array.prototype.slice.call(arguments, 1);
		for(var id = 0; id < methods.length; id++){
			if(typeof context[methods[id]] === 'function'){
				context[methods[id]] = Proto.bind(context[methods[id]], context);
			}
		}
		return context;
	};

	Proto.bind = function(fn, context){
		var args = Array.prototype.slice.call(arguments, 2);
		var proxy = function(){
			return fn.apply(context, args.concat(Array.prototype.slice.call(arguments)));;
		};
		proxy.__originalFn__ = proxy.__originalFn__ || fn;
		return proxy;
	};

	Proto.unbind = function(fn){
		var originalFn = fn.__originalFn__;
		delete(fn.__originalFn__);
		return originalFn;
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
		if(typeof superclass !== 'function')return this;
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

	if(!nodeEnv){
		window.Proto = Proto;
	}

	return Proto;
}));