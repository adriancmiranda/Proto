// Based on Alex Arnell's inheritance implementation.
// --------------------------------------------------

var Class = function () {

	function Subclass() {
		// The base Subclass implementation (does nothing).
	}

	function create() {
		var parent, properties, id;
		parent = null;
		properties = toArray(arguments);
		if (isFunction(properties[0])) {
			parent = properties.shift();
		}
		function Caste() {
			if (isFunction(this.initialize)) {
				this.initialize.apply(this, arguments);
			}
		}
		Object.extend(Caste, Class.Methods);
		Caste.superclass = parent;
		Caste.subclasses = [];
		if (parent) {
			Subclass.prototype = parent.prototype;
			Caste.prototype = new Subclass();
			parent.subclasses.push(Caste);
		}
		for (id = 0; id < properties.length; id++) {
			Caste.implement(properties[id]);
		}
		if (!typeOf(Caste.prototype.initialize)) {
			Caste.prototype.initialize = Ctor;
		}
		Caste.prototype.constructor = Caste;
		return Caste;
	}

	function implement(source) {
		var ancestor, properties, id, value, valueOf, toString;
		ancestor = this.superclass && this.superclass.prototype;
		properties = Object.keys(source);
		if (IS_DONTENUM_BUGGY) {
			if (source.toString !== ObjProto.toString) {
				properties.push('toString');
			}
			if (source.valueOf !== ObjProto.valueOf) {
				properties.push('valueOf');
			}
		}
		for (id = 0; id < properties.length; id++) {
			if (ancestor && isFunction(source[properties[id]]) && /^\$super$/g.test(source[properties[id]].argumentNames()[0])) {
				value = function (fn) {
					return function () {
						return ancestor[fn].apply(this, arguments);
					};
				};
				valueOf = function (fn) {
					return function () {
						return fn.valueOf.call(fn);
					};
				};
				toString = function (fn) {
					return function () {
						return fn.toString.call(fn);
					};
				};
				value = value(properties[id]).wrap(source[properties[id]]);
				value.valueOf = valueOf(source[properties[id]]);
				value.toString = toString(source[properties[id]]);
			}
			this.prototype[properties[id]] = value;
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
}();

// Externalize
window.Class = Class;
window.Class.getDefinitionName = getDefinitionName;
window.Class.typeOf = typeOf;
window.Class.bind = bindFn;
window.Class.bindAll = bindAll;
window.Class.isObject = isObject;
window.Class.isString = isString;
window.Class.isNumber = isNumber;
window.Class.isUint = isUint;
window.Class.isInt = isInt;
window.Class.isDate = isDate;
window.Class.isArray = isArray;
window.Class.isArrayLike = isArrayLike;
window.Class.isFunction = isFunction;
window.Class.isRegExp = isRegExp;
window.Class.isBoolean = isBoolean;
window.Class.isElement = isElement;
window.Class.isFile = isFile;
window.Class.isWindow = isWindow;
window.Class.toFloat = toFloat;
window.Class.toUint = toUint;
window.Class.toArray = toArray;
window.Class.toInt = toInt;
