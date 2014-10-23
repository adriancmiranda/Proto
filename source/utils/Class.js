'use strict'; 

// Based on Alex Arnell's inheritance implementation.

var Class = (function () {

	function Subclass() {
		// The base Subclass implementation (does nothing).
	}

	function create() {
		var parent, properties, id;
		id = -1;
		parent = null;
		properties = iterate(arguments);
		if (typeOf(properties[0]) === 'function') {
			parent = properties.shift();
		}
		function Caste() {
			if (typeOf(this.initialize) === 'function') {
				this.initialize.apply(this, arguments);
			}
		}
		Object.extend(Caste, Class.Methods);
		Caste.superclass = parent;
		Caste.subclasses = [];
		if (parent) {
			Subclass.prototype = parent.prototype;
			Caste.prototype = new Subclass;
			parent.subclasses.push(Caste);
		}
		while (++id < properties.length) {
			Caste.implement(properties[id]);
		}
		if (!typeOf(Caste.prototype.initialize)) {
			Caste.prototype.initialize = function () {
				// No Operation
			};
		}
		Caste.prototype.constructor = Caste;
		return Caste;
	}

	function mutate(items) {
		// N/A yet.
	}

	function implement(source) {
		var ancestor, properties, id, property, value, method;
		ancestor = this.superclass && this.superclass.prototype;
		properties = Object.keys(source);
		id = -1;
		if (IS_DONTENUM_BUGGY) {
			if (source.toString != Object.prototype.toString) {
				properties.push('toString');
			}
			if (source.valueOf != Object.prototype.valueOf) {
				properties.push('valueOf');
			}
		}
		while (++id < properties.length) {
			property = properties[id];
			value = source[property];
			if (property === 'implements') {
				if (typeOf(value) === 'function') {
					// N/A yet.
				} else {
					// N/A yet.
				}
			}
			if (ancestor && typeOf(value) === 'function' && /\$super/g.test(value.argumentNames()[0])) {
				method = value;
				value = (function (fn) {
					return function () {
						return ancestor[fn].apply(this, arguments);
					};
				})(property).wrap(method);
				value.valueOf = (function (method) {
					return function () {
						return method.valueOf.call(method);
					};
				})(method);
				value.toString = (function (method) {
					return function () {
						return method.toString.call(method);
					};
				})(method);
			}
			this.prototype[property] = value;
		}
		return this;
	}

	return {
		create: create,
		Methods: {
			extend: Object.extend,
			implement: implement
		}
	};

}());

// Externalize
Class.getDefinitionName = getDefinitionName;
Class.typeOf = typeOf;
Class.isUndefined = isUndefined;
Class.isDefined = isDefined;
Class.isObject = isObject;
Class.isString = isString;
Class.isNumber = isNumber;
Class.isUint = isUint;
Class.isInt = isInt;
Class.isDate = isDate;
Class.isArray = isArray;
Class.isArrayLike = isArrayLike;
Class.isFunction = isFunction;
Class.isRegExp = isRegExp;
Class.isBoolean = isBoolean;
Class.isElement = isElement;
Class.isFile = isFile;
Class.isWindow = isWindow;
