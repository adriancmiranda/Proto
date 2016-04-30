define([
	'./common/uid',
	'./common/ctor',
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
	uid,
	ctor,
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

	Proto.create = Object.create || create;
	Proto.implements = implement;
	Proto.unbindAll = unbindAll;
	Proto.bindAll = bindAll;
	Proto.unbind = unbind;
	Proto.bind = bind;
	Proto.overload = overload;
	Proto.copyShallowObjectsFrom = copyShallowObjectsFrom;
	Proto.shallowMerge = shallowMerge;
	Proto.merge = merge;
	Proto.flush = flush;
	Proto.keys = keys;
	Proto.copy = copy;
	Proto.ape = ape;

	Proto.of = function(value, qualified){
		var type = toStr(value);
		if(qualified && type === '[object Object]'){
			return value.constructor.toString().replace(reFnDeclaration, '$1') || 'Object';
		}
		return type.replace(reObjectWrapper, '');
	};

	Proto.extends = function(proto, properties){
		var Caste, Constructor, Objs, Impl, Super = this;

		enableSuperMethods(Super, proto);

		Constructor = function(){
			return Super.apply(this, arguments);
		};

		if(proto && proto.hasOwnProperty('constructor')){
			Constructor = proto.constructor;
		}

		shallowMerge(Constructor, Super, properties);

		Caste = function(){
			this.constructor = Constructor;
		};

		Caste.prototype = Super.prototype;
		Constructor.prototype = Constructor.create(Caste.prototype);

		if(proto){
			Objs = copyShallowObjectsFrom(Constructor.prototype);
			shallowMerge(Constructor.prototype, proto, { $protoID:++uid });
			merge(Constructor.prototype, Objs);
		}

		if(proto && proto.hasOwnProperty('implements')){
			Impl = implement(proto.implements);
			Constructor.prototype = extend(Constructor.prototype, Impl);
			delete proto.implements;
		}

		Constructor.super = Super.prototype;
		Super.extends = Constructor.extends;
		return Constructor;
	};

	Proto.prototype.toImplement = function(list){
		return extend(this.prototype, implement(list));
	};

	Proto.prototype.overload = function(name, fn){
		return overload(this.prototype, name, fn);
	};

	Proto.prototype.setOptions = function(options){
		this.options = shallowMerge({}, this.defaults, options);
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
