'use strict';

// Class - Utilities methods

var DONT_ENUMS, IS_DONTENUM_BUGGY;
DONT_ENUMS = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'];
IS_DONTENUM_BUGGY = (function () {
	for (var property in { toString: 1 }) {
		if (property === 'toString') {
			return false;
		}
	}
	return true;
}());

function iterate(iterable) {
	var length, results;
	if (!typeOf(iterable)) {
		return [];
	}
	if ('toArray' in Object(iterable)) {
		return iterable.toArray();
	}
	length = iterable.length || 0;
	results = new Array(length);
	while (length--) {
		results[length] = iterable[length];
	}
	return results;
}

function extend(destination, source) {
	for (var property in source) {
		destination[property] = source[property];
	}
	return destination;
}

// Class - Static methods

function getDefinitionName(value, strict) {
	if (value === false) {
		return 'Boolean';
	}
	if (value === '') {
		return 'String';
	}
	if (value === 0) {
		return 'Number';
	}
	if (value && value.constructor) {
		var name = (value.constructor.toString() || Object.prototype.toString.apply(value)).replace(/^.*function([^\s]*|[^\(]*)\([^\x00]+$/, '$1').replace(/^(\[object\s)|]$/g, '').replace(/\s+/, '') || 'Object';
		if (strict !== true) {
			if (!/^(Boolean|RegExp|Number|String|Array|Date)$/.test(name)) {
				return 'Object';
			}
		}
		return name;
	}
	return value;
}

function typeOf(value, strict) {
	var type = typeof value;
	if (value === false) {
		return 'boolean';
	}
	if (value === '') {
		return 'string';
	}
	if (value && type === 'object') {
		type = getDefinitionName(value, strict);
		type = String(type).toLowerCase();
	}
	if (type === 'number' && !window.isNaN(value) && window.isFinite(value)) {
		if (strict === true && window.parseFloat(value) === window.parseInt(value, 10)) {
			return value < 0 ? 'int' : 'uint';
		}
		return 'number';
	}
	return value ? type : value;
}

// Class - Other static methods

function isUndefined(value) {
	return !typeOf(value);
}

function isDefined(value) {
	return !isUndefined(value);
}

function isObject(value) {
	return typeOf(value) === 'object';
}

function isEmptyObject(value) {
	for (var property in value) {
		if (Object.prototype.hasOwnProperty.call(value, property)) {
			return false;
		}
	}
	return true;
}

function isString(value) {
	return typeOf(value) === 'string';
}

function isNumber(value) {
	return typeOf(value) === 'number';
}

function isUint(value) {
	return typeOf(value, true) === 'uint';
}

function isInt(value) {
	return typeOf(value, true) === 'int';
}

function isDate(value) {
	return typeOf(value) === 'date';
}

function isArray(value) {
	return typeOf(value) === 'array';
}

function isArrayLike(value) {
	if (value == null || isWindow(value)) {
		return false;
	}
	var length = value.length;
	if (value.nodeType === 1 && length) {
		return true;
	}
	return isString(value) || isArray(value) || length === 0 || isUint(length) && length > 0 && (length - 1) in value;
}

function isFunction(value) {
	return typeOf(value) === 'function';
}

function isRegExp(value) {
	return typeOf(value) === 'regexp';
}

function isBoolean(value) {
	return typeOf(value) === 'boolean';
}

function isElement(value) {
	return !!(value && (value.nodeName || (isFunction(value.on) && isFunction(value.find) && isFunction(value.eq) && isFunction(value.css))));
}

function isFile(value) {
	return typeOf(value, true) === 'file';
}

function isWindow(value) {
	return value && value.document && value.location && value.alert && value.setInterval && value.setTimeout;
}
