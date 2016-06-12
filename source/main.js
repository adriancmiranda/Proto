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
	'./helpers/isString',
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
	isString,
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
	Proto.each = each;
	Proto.implements = implement;
	Proto.unproxyAll = unbindAll;
	Proto.proxyAll = bindAll;
	Proto.unproxy = unbind;
	Proto.proxy = bind;
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

		option:function(options){
			if(isLikeObject(options)){
				this.options = merge(true, {}, this.defaults, options);
			}else if(isString(options) && this.options){
				return this.options[options];
			}
			return this.options;
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

	return Proto;
});
