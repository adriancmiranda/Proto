define([
  './common/uid',
  './common/ctor',
  './common/slice',
  './common/isArray',
  './common/toString',
  './common/reSuper',
  './common/reObjectAssessor',
  './common/reFnDeclaration',
  './common/reObjectWrapper',
  './helpers/ape',
  './helpers/isUndefined',
  './helpers/isString',
  './helpers/isFunction',
  './helpers/isLikeObject',
  './helpers/isObject',
  './helpers/copy',
  './helpers/create',
  './helpers/extend',
  './helpers/merge',
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
  './native/Function'
], function(
  uid,
  ctor,
  slice,
  isArray,
  toString,
  reSuper,
  reObjectAssessor,
  reFnDeclaration,
  reObjectWrapper,
  ape,
  isUndefined,
  isString,
  isFunction,
  isLikeObject,
  isObject,
  copy,
  create,
  extend,
  merge,
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
  Proto.merge = merge;
  Proto.flush = flush;
  Proto.keys = keys;
  Proto.copy = copy;
  Proto.ape = ape;

  Proto.of = function(value, qualified){
    var type = toString(value);
    if(qualified && type === '[object Object]'){
      return value.constructor.toString().replace(reFnDeclaration, '$1') || 'Object';
    }
    return type.replace(reObjectWrapper, '');
  };

  Proto.extends = function(proto, properties){
		var Caste, Constructor, Impl, Super = this;

		enableSuperMethods(Super, proto);

		Constructor = function(){
			return Super.apply(this, arguments);
		};

		if(proto && proto.hasOwnProperty('constructor')){
			Constructor = proto.constructor;
		}

		merge(Constructor, Super, properties);

		Caste = function(){
			this.constructor = Constructor;
		};

		Caste.prototype = Super.prototype;
		Constructor.prototype = Constructor.create(Caste.prototype);
		proto && merge(Constructor.prototype, proto, { $protoID:++uid });

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
  	this.options = merge({}, this.defaults, options);
    return this.options;
  };

  Proto.prototype.getOptions = function(){
    return isLikeObject(this.options)? this.options : {};
  };

  Proto.prototype.unbindAll = function(){
    return unbindAll(this, slice(arguments));
  };

  Proto.prototype.bindAll = function(){
    return bindAll(this, slice(arguments));
  };

  Proto.prototype.flush = function(){
    flush(this);
  };

  return Proto;
});
