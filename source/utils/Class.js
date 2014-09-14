'use strict';

// Based on Alex Arnell's and John Resig's inheritance implementation.

var Class = (function () {
	// The base Subclass implementation (does nothing).
	function Subclass() {
		// N/A
	}

	// Create a new Class that inherits from this class.
	function create() {
	}

	function extend(source) {
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
			this.prototype[property] = value;
		}
	}

	return {
		create: create,
		extends: extend,
		implements: implement
	};
})();