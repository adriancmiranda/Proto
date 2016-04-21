define([
	'./common/ape',
	'./common/uid',
	'./common/slice',
	'./common/hasProp',
	'./common/toString',
	'./common/patterns',
	'./common/create',
	'./common/overload',
	'./common/merge',
	'./common/keys',
	'./common/bind',
	'./common/unbind',
	'./common/bindAll',
	'./common/unbindAll',
	'./common/flush'
], function(
	ape,
	uid,
	slice,
	hasProp,
	toString,
	patterns,
	create,
	overload,
	merge,
	keys,
	bind,
	unbind,
	bindAll,
	unbindAll,
	flush
){
	'use strict';

//|-----------------------------------------------------------------------------
//| Proto
//'-----------------------------------------------------------------------------

	var Proto = function(Fn){
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
	};

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
		Proto.super = parent.prototype || function(){};
		parent.extends = Proto.extends;
		return Proto;
	};

	Proto.prototype.extends = function(superclass){
		if(typeof superclass !== 'function'){
			return this;
		}
		this.super = superclass;
		if(nodeEnv){// jshint ignore:line
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

	return Proto;
});
