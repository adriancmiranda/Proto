'use strict';

extend(Function.prototype, (function() {
	var slice = Array.prototype.slice;

	function bind(context) {
		var method, args, bound, noop;
		if (arguments.length < 2 && !typeOf(arguments[0])) {
			return this;
		}
		if (!typeOf(this) === 'function') {
			throw new TypeError('The object is not callable.');
		}
		method = this;
		args = slice.call(arguments, 1);
		noop = function () {};
		bound = function () {
			var params, instance;
			params = merge(args, arguments);
			instance = this instanceof bound ? this : context;
			return method.apply(instance, params);
		};
		noop.prototype = this.prototype;
		bound.prototype = new noop();
		return bound;
	}

	function argumentNames() {
		var names = this.toString().match(/^[\s\(]*function[^(]*\(([^)]*)\)/)[1]
		.replace(/\/\/.*?[\r\n]|\/\*(?:.|[\r\n])*?\*\//g, '')
		.replace(/\s+/g, '').split(',');
		return names.length == 1 && !names[0] ? [] : names;
	}

	function update(array, args) {
		var arrayLength, length;
		arrayLength = array.length;
		length = args.length;
		while (length--) {
			array[arrayLength + length] = args[length];
		}
		return array;
	}

	function merge(array, args) {
		array = slice.call(array, 0);
		return update(array, args);
	}

	function wrap(wrapper) {
		var methodCaller = this;
		return function () {
			var args = update([methodCaller.bind(this)], arguments);
			return wrapper.apply(this, args);
		};
	}

	var extensions = {
		argumentNames: argumentNames,
		wrap: wrap
	};

	if (!Function.prototype.bind) {
	    extensions.bind = bind;
	}
	
	return extensions;
})());
