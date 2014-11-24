'use strict';

function functionHelper() {
	var extensions = {};

	// Delegates to **ECMAScript 5**'s native `Function.bind` if available.
	if (!nativeBind) {
		extensions.bind = function (context) {
			return bindFn(this, context);
		};
	}

	extensions.argumentNames = function () {
		var names = this.toString().match(/^[\s\(]*function[^(]*\(([^)]*)\)/)[1]
		.replace(/\/\/.*?[\r\n]|\/\*(?:.|[\r\n])*?\*\//g, '')
		.replace(/\s+/g, '').split(',');
		return names.length === 1 && !names[0] ? [] : names;
	};

	extensions.wrap = function (wrapper) {
		var methodCaller = this;
		return function () {
			var args = update([methodCaller.bind(this)], arguments);
			return wrapper.apply(this, args);
		};
	};

	return extensions;
}

apply(FuncProto, functionHelper());
