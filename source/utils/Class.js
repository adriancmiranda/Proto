'use strict';

// Based on Alex Arnell's and John Resig's inheritance implementation.

window.Class = (function () {
	function Subclass() {
		// The base Subclass implementation (does nothing).
	}

	function create() {
		return extend(arguments);
	}

	function extend() {
		var parent, properties, id;
		id = -1;
		parent = null;
		properties = iterate(arguments);
		if (typeOf(properties[0]) === 'function') {
			parent = properties.shift();
		}
		function caste() {
			if (typeOf(this.initialize) === 'function') {
				this.initialize.apply(this, arguments);
			}
		}
		Object.extend(caste, { implement: implement });
		caste.superclass = parent;
		caste.subclasses = [];
		if (parent) {
			Subclass.prototype = parent.prototype;
			caste.prototype = new Subclass;
			parent.subclasses.push(caste);
		}
		while (++id < properties.length) {
			caste.implement(properties[id]);
		}
		if (!typeOf(caste.prototype.initialize)) {
			caste.prototype.initialize = function () {
				// No Operation
			};
		}
		caste.prototype.constructor = caste;
		return caste;
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
			if (ancestor && typeOf(value) === 'function' && value.argumentNames()[0] === '$super') {
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
		extend: extend,
		implement: implement
	};
}());