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

  Proto.extends = function(proto, staticProperties){
    var Caste, Constructor, Implementations, Super = this;

    enableSuperMethods(Super, proto);

    Constructor = function(){
      return Super.apply(this, arguments);
    };

    if(proto && proto.hasOwnProperty('constructor')){
      Constructor = proto.constructor;
    }

    merge(Constructor, Super, staticProperties);

    Caste = function(){ this.constructor = Constructor; };
    Caste.prototype = Super.prototype;
    Constructor.prototype = Proto.create(Caste.prototype);

    if(proto && proto.hasOwnProperty('implements')){
      Implementations = implement(proto.implements);
      merge(Constructor.prototype, Implementations);
      delete proto.implements;
    }

    proto && merge(Constructor.prototype, proto, {
      $protoID:++uid
    });

    Constructor.super = Super.prototype;
    Super.extends = Proto.extends;
    return Constructor;
  };

  Proto.prototype.toImplement = function(list){
    return merge(this.prototype, implement(list));
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
