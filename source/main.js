define([
	'./common/slice',

	'./common/toStr',
	'./common/uid',

	'./common/ctor',
	'./common/isArray',
	'./common/reSuper',
	'./common/reFnDeclaration',
	'./common/reObjectWrapper',

	'./common/reFnDeclaration',
	'./common/reObjectWrapper',
	'./helpers/create',
	'./helpers/extend',
	'./helpers/merge',
	'./helpers/shallowMerge',
	'./helpers/copyShallowObjectsFrom',
	'./helpers/overload',
	'./helpers/implement',
	'./helpers/createSuperMethod',
	'./helpers/enableSuperMethods'
], function(
	uid,
	toStr,
	reFnDeclaration,
	reObjectWrapper,
	create,
	extend,
	merge,
	shallowMerge,
	copyShallowObjectsFrom,
	overload,
	implement,
	createSuperMethod,
	enableSuperMethods
){
	'use strict';


	// Proto
	// -----

	var Proto = {
		// Proto version
    VERSION:version,// jshint ignore:line

    // Utility to merge deep objects.
    merge:merge,

    // Object.create with fallback for ancient browsers.
    create:Object.create || create,

    // Improved Backbone.js's extend
    extends:function(protoProps, staticProps){
      // Wrap calls to `super` on object methods.
      enableSuperMethods(this, protoProps);

      // Create a default constructor.
      var parent = this;
      var child = function(){ return parent.apply(this, arguments); };
      var childObjects, implementations;

      // The constructor function for the new subclass is either defined by you
      // (the "constructor" property in your `extend` definition), or defaulted
      // by us to simply call the parent's constructor.
      if(protoProps && protoProps.hasOwnProperty('constructor')){
        child = protoProps.constructor;
      }

      // Add static properties to the constructor function, if supplied.
      shallowMerge(child, parent, staticProps);

      // Set the prototype chain to inherit from `parent`, without calling
      // `parent`'s constructor function.
      var Surrogate = function(){ this.constructor = child; };
      Surrogate.prototype = parent.prototype || null;
      child.prototype = Proto.create(Surrogate.prototype);

      // Adds implementations to the `__proto__` itself before inherit.
      if(protoProps && protoProps.hasOwnProperty('implements')){
        implementations = implement(protoProps.implements);
        child.prototype = extend(child.prototype, implementations);
        delete protoProps.implements;
      }

      // Add prototype properties (instance properties) to the subclass,
      // if supplied. Extends the objects too.
      if(protoProps){
        childObjects = copyShallowObjectsFrom(child.prototype);
        shallowMerge(child.prototype, protoProps, { $protoID:++uid });
        merge(child.prototype, childObjects);
      }

      // Set a convenience property in case the parent's prototype is needed
      // later.
      child.super = parent.prototype;

      return child;
    },

    of:function(value, qualified){
      var type = toStr(value);
      if(qualified && type === '[object Object]'){
        return value.constructor.toString().replace(reFnDeclaration, '$1') || 'Object';
      }
      return type.replace(reObjectWrapper, '');
    }
  };

	return Proto;
});
