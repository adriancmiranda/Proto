/* jshint maxcomplexity:6 */
/* global define */
define([
	'./common/slice',
	'./common/isArray',
	'./common/toStr',
	'./common/reSuper',
	'./common/reFnDeclaration',
	'./common/reObjectWrapper',
	'./common/numProtoImplementations',
	'./common/numProtoExtensions',
	'./common/numProtoInstances',
	'./common/numProto',
	'./helpers/ape',
	'./helpers/isLikeObject',
	'./helpers/isObject',
	'./helpers/isFunction',
	'./helpers/each',
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
	numProtoImplementations,
	numProtoExtensions,
	numProtoInstances,
	numProto,
	ape,
	isLikeObject,
	isObject,
	isFunction,
	each,
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

	function inherit(parent, protoProps, staticProps){
		enableSuperMethods(parent, protoProps);

		var child = function(){ return parent.apply(this, arguments); };
		var childObjects, implementations;

		if(protoProps && protoProps.hasOwnProperty('constructor')){
			child = protoProps.constructor;
		}

		shallowMerge(child, parent, staticProps);

		var Surrogate = function(){ this.constructor = child; };
		Surrogate.prototype = parent instanceof Proto? null : parent.prototype;// jshint ignore:line
		child.prototype = Proto.create(Surrogate.prototype);// jshint ignore:line
		numProtoInstances++;

		if(protoProps && protoProps.hasOwnProperty('implements')){
			implementations = implement(Proto.prototype, protoProps.implements);// jshint ignore:line
			child.prototype = extend(child.prototype, implementations);
			delete protoProps.implements;
			numProtoImplementations++;
			numProtoInstances--;
		}

		numProto = numProtoInstances + numProtoImplementations;

		if(protoProps){
			childObjects = copyShallowObjectsFrom(child.prototype);
			shallowMerge(child.prototype, protoProps, { $protoID:numProto });
			merge(false, child.prototype, childObjects);
		}

		child.super = parent.prototype;

		return child;
	}


	// Proto
	// -----

	function Proto(parent){// jshint ignore:line
		var args = slice(arguments);
		var hasParent = isFunction(args[0]);
		var protoProps = hasParent? args[1] : args[0];
		var staticProps = hasParent? args[2] : args[1];
		parent = hasParent? args.shift() : Proto;
		return inherit(parent, protoProps, staticProps);
	}

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

	Proto.extends = function(protoProps, staticProps){
		var extension = inherit(this, protoProps, staticProps);
		numProtoExtensions++;
		return extension;
	};

	Proto.prototype = {
		toImplement:function(list){
			return extend(this, implement(this, list));
		},

		overload:function(name, fn){
			return overload(this.prototype, name, fn);
		},

		setOptions:function(options){
			this.options = merge(true, {}, this.defaults, options);
			return this.options;
		},

		getOptions:function(){
			return isLikeObject(this.options)? this.options : {};
		},

		getOption:function(optionName){
			if(optionName && isLikeObject(this.options)){
				return this.options[optionName];
			}
		},

		get:function(optionName){
			return this.getOption(optionName) || this[optionName];
		},

		unbindAll:function(){
			return unbindAll(this, slice(arguments));
		},

		bindAll:function(){
			return bindAll(this, slice(arguments));
		},

		unbind:function(fn){
			return unbind(fn);
		},

		bind:function(fn, context){
			return bind(fn, context || this);
		},

		flush:function(){
			flush(this);
		}
	};

	return Proto;
});
