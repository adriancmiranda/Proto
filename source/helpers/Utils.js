'use strict';

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
