/* jshint maxcomplexity:6 */
/* global define */
define([
	'./common/slice',
	'./common/isArray',
	'./common/toStr',
	'./common/reSuper',
	'./common/reFnDeclaration',
	'./common/reObjectWrapper',
	'./common/numInstances',
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
	'./helpers/enableSuperMethods',
	'./helpers/inherit'
], function(
	slice,
	isArray,
	toStr,
	reSuper,
	reFnDeclaration,
	reObjectWrapper,
	numInstances,
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
	enableSuperMethods,
	inherit
){
	'use strict';


	// Proto
	// -----

	function Proto(parent, protoProps, staticProps){
		return Proto.extends(parent, protoProps, staticProps);
	}

	Proto.size = 0;
	Proto.create = Object.create;
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

		implement:function(list){
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
