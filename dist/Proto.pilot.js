//     Proto.js v1.0.3

//     (c) 2015-2016 Adrian C. Miranda
//     Proto may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://ambox.github.io
(function(global, name, version, factory){
  'use strict';

  /* globals define:false, module:false */
  if(typeof module === 'object' && typeof module.exports === 'object'){

    // Set up for Node.js or CommonJS.
    global[name] = module.exports = factory(global, exports, name, version);

  }else if(typeof define === 'function' && define.amd){

    // Next for module appropriately for the environment. Start with AMD.
    define(['exports'], function(exports){
      return factory(global, exports, name, version);
    });

  }else{

    // Finally, as a browser global.
    global[name] = factory(global, {}, name, version);

  }

}(typeof window !== 'undefined'? window : this, 'Proto', '1.0.3', function(global, exports, name, version){
  'use strict';

  // Helpers
  // -------

  function ape(fn){
    return function(){
      return Function.call.apply(fn, arguments);
    };
  }

  var slice = ape(Array.prototype.slice);

  var isArray = Array.isArray;

  var toStr = ape(Object.prototype.toString);

  var reSuper = /\bsuper\b/;

  var reFnDeclaration = /^.*function\s([^\s]*|[^\(]*)\([^\x00]+$/;

  var reObjectWrapper = /^(\[object(\s|\uFEFF|\xA0))|(\])$/g;

  var numInstances = 0;

  function isLikeObject(value){
    return value === Object(value);
  }

  function isObject(value){
    return toStr(value) === '[object Object]';
  }

  function isFunction(value){
    return typeof value === 'function';
  }

  function isString(value){
    return typeof value === 'string';
  }

  function iteraction(ctx, key, value, index, getEnum, fn){
    if(getEnum || value.hasOwnProperty(key)){
      return fn.call(ctx || value[key], value[key], key, index, value);
    }
  }

  function each(value, fn, ctx, getEnum){
    var ctr, index = 0, isFn = isFunction(value);
    for(var key in value){
      ctr = isFn? key !== 'prototype' && key !== 'length' && key !== 'name' : true;
      if(ctr && iteraction(ctx, key, value, index++, getEnum, fn) === false){
        break;
      }
    }
  }

  function copy(child){
    var Clone = function(){};
    Clone.prototype = child && child.prototype || child;
    return new Clone();
  }

  function create(child, properties){
    if(child === null){return {};}
    var Child = function(){};
    Child.prototype = child;
    child = new Child();
    each(properties, function(value, property){
      child[property] = value.value;
    });
    return child;
  }

  if(!isFunction(Object.create)){
    Object.create = create;
  }

  function merge(overwrite, target){
    var args = slice(arguments, 2);
    each(args, function(parameter){
      each(parameter, function(value, key){
        if(isObject(value) && isObject(target[key])){
          merge(overwrite, target[key], value);
        }else if(overwrite || !target[key]){
          target[key] = value;
        }
      }, null, true);
    });
    return target;
  }

  function shallowMerge(target){
    var args = slice(arguments, 1);
    each(args, function(parameter){
      each(parameter, function(value, key){
        target[key] = value;
      });
    });
    return target;
  }

  function copyShallowObjectsFrom(child){
    var copy = {};
    each(child, function(value, key){
      if(isObject(value)){
        copy[key] = value;
      }
    }, null, true);
    return copy;
  }

  function keys(object, getEnum){
    var properties = [];
    each(object, function(value, key){
      properties.push(key);
    }, null, getEnum);
    return properties;
  }

  function overload(target, name, fn){
    var cache = target[name];
    target[name] = function(){
      if(fn.length === arguments.length){
        return fn.apply(this, arguments);
      }else if(isFunction(cache)){
        return cache.apply(this, arguments);
      }
    };
  }

  function flush(object){
    for(var key in object){
      if(object.hasOwnProperty(key)){
        delete object[key];
      }
    }
  }

  function bind(fn, context){
    var args = slice(arguments, 2);
    var proxy = function(){
      return fn.apply(context, args.concat(slice(arguments)));
    };
    proxy.__bind__ = proxy.__bind__ || fn;
    return proxy;
  }

  function unbind(fn){
    var cache = fn.__bind__;
    delete fn.__bind__;
    return cache;
  }

  function mapContext(fn, context, methods){
    methods = methods.length? methods : keys(context, true);
    each(methods, function(method){
      if(isFunction(context[method])){
        context[method] = fn(context[method], context);
      }
    });
    return context;
  }

  function bindAll(context, methods){
    methods = isArray(methods)? methods : slice(arguments, 1);
    return mapContext(bind, context, methods);
  }

  function unbindAll(context, methods){
    methods = isArray(methods)? methods : slice(arguments, 1);
    return mapContext(unbind, context, methods);
  }

  function createSuperMethod(action, value){
    var pointer = isFunction(value)? value : function $super(){
      return value;
    };
    return function Class(){
      this.super = pointer;
      return action.apply(this, arguments);
    };
  }

  function hasSuperCall(fn){
    return isFunction(fn) && reSuper.test(fn.toString());
  }

  function injectMethod(parent, child, fn, key){
    if(hasSuperCall(fn) && isLikeObject(parent)){
      child[key] = createSuperMethod(fn, parent[key]);
    }else{
      child[key] = fn;
    }
  }

  function inherit(Proto, parent, child){
    var caste = child;
    child = createSuperMethod(child, parent);
    shallowMerge(child, caste);
    shallowMerge(child.prototype, caste.prototype);
    flush(caste);

    shallowMerge(child, parent);

    var Surrogate = function(){ this.constructor = child; };
    Surrogate.prototype = parent instanceof Proto? null : parent.prototype;
    child.prototype = Object.create(Surrogate.prototype);
    child.super = parent.prototype;
    return child;
  }


  // Proto
  // -----

  function Proto(caste){
    if(this instanceof Proto){
      Proto.size = numInstances++;
      caste = createSuperMethod(caste, null);
      caste.prototype.$protoID = Proto.size;
      caste.prototype.toString = this.toString;
      caste.prototype.toString = this.toString;
      caste.prototype.flush = this.flush;
      caste.overload = this.overload;
      caste.extends = this.extends;
      caste.public = this.public;
      return caste;
    }
    return new Proto(caste);
  }

  Proto.size = 0;
  Proto.create = Object.create;
  Proto.each = each;
  Proto.unbindAll = unbindAll;
  Proto.bindAll = bindAll;
  Proto.unbind = unbind;
  Proto.bind = bind;
  Proto.overload = overload;
  Proto.copyShallowObjects = copyShallowObjectsFrom;
  Proto.shallowMerge = shallowMerge;
  Proto.flush = flush;
  Proto.keys = keys;
  Proto.copy = copy;
  Proto.ape = ape;
  Proto.isArray = isArray;
  Proto.isLikeObject = isLikeObject;
  Proto.isObject = isObject;
  Proto.isFunction = isFunction;
  Proto.isString = isString;
  Proto.merge = bind(merge, null, true);

  Proto.of = function(value, qualified){
    var type = toStr(value);
    if(qualified && type === '[object Object]'){
      return value.constructor.toString().replace(reFnDeclaration, '$1') || 'Object';
    }
    return type.replace(reObjectWrapper, '');
  };

  Proto.prototype = {

    option:function(options){
      if(isString(options) && this.options){
        return this.options[options];
      }else if(isLikeObject(options)){
        this.options = merge(true, {}, this.defaults, options);
      }
      return isLikeObject(this.options)? this.options : {};
    },

    define:function(){
      var args = slice(arguments);
      var definitions = Object.create(null);
      if(args.length === 2 && isString(args[0])){
        definitions[args[0]] = args[1];
      }else if(args.length === 1){
        definitions = args[0];
      }
      Object.defineProperties(this.prototype, definitions);
      return this;
    },

    public:function(name, definition){
      if(isString(name)){
        injectMethod(this.super, this.prototype, definition, name);
      }else if(isLikeObject(name)){
        each(name, function(value, key){
          this.public(key, value);
        }, this, true);
      }
      return this;
    },

    overload:function(name, fn){
      overload(this.prototype, name, fn);
      return this;
    },

    extends:function(parent){
      return inherit(Proto, parent, this);
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


  // Externalize
  // -----------

  exports[name] = Proto;
  exports[name].VERSION = version;

  return Proto;
}));
