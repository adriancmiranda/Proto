/*!
 * 
 * ~~~~ Proto v1.1.0
 * 
 * @commit d3352bbeba9e778027e387fa3d0cd65c5db48745
 * @moment Friday, November 10, 2017 11:58 AM
 * @homepage https://github.com/adriancmiranda/Proto
 * @author Adrian C. Miranda
 * @license (c) 2016-2020 Adrian C. Miranda
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Proto = factory());
}(this, (function () { 'use strict';

	// prototypes
	var ObjectProto = Object.prototype;

	// built-in method(s)
	var objectHasOwnProperty = ObjectProto.hasOwnProperty;
	var objectToString = ObjectProto.toString;

	/**
	 *
	 * @function
	 * @memberof has
	 * @param {Object|Function} context
	 * @param {any} key
	 * @returns {Boolean}
	 */
	function ownProperty(context, key) {
		if (context == null) { return false; }
		return objectHasOwnProperty.call(context, key);
	}

	/* eslint-disable no-restricted-syntax */
	/**
	 *
	 * @function
	 * @memberof utility
	 * @param {Object} context
	 * @param {Boolean} getNum
	 * @returns {Array}
	 */
	function keys(object, getEnum) {
		if (object == null) { return []; }
		if (Object.keys && !getEnum) {
			return Object.keys(object);
		}
		var properties = [];
		for (var key in object) {
			if (getEnum || ownProperty(object, key)) {
				properties[properties.length] = key;
			}
		}
		return properties;
	}

	/**
	 *
	 * @function
	 * @memberof is
	 * @param {Function} expect
	 * @param {any} value
	 * @returns {Boolean}
	 */
	function a(expected, value) {
		if (expected == null || value == null) { return value === expected; }
		if (value.constructor === expected) { return true; }
		if (value.constructor === undefined) { return expected === Object; }
		return expected === Function && (
			value.constructor.name === 'GeneratorFunction' ||
			value.constructor.name === 'AsyncFunction'
		);
	}

	/**
	 *
	 * @function
	 * @memberof is
	 * @param {any} value
	 * @returns {Boolean}
	 */
	function array(value) {
		return a(Array, value);
	}

	/**
	 *
	 * @function
	 * @memberof is
	 * @param {any} value
	 * @returns {Boolean}
	 */
	function string(value) {
		return typeof value === 'string' || value instanceof String;
	}

	/**
	 *
	 * @function
	 * @memberof is
	 * @param {any} value
	 * @returns {Boolean}
	 */
	function arraylike(value) {
		return array(value) || string(value) || (
			(!!value && typeof value === 'object' && typeof value.length === 'number') &&
			(value.length === 0 || (value.length > 0 && (value.length - 1) in value))
		);
	}

	/**
	 * The `intOf()` function parses a string argument and returns an integer of the
	 * specified radix (the base in mathematical numeral systems).
	 *
	 * @function
	 * @memberof to
	 *
	 * @param {Number|String|Object} value - The value to parse.
	 * If the string argument is not a string, then it is converted to a string
	 * (using the ToString abstract operation).
	 * Leading whitespace in the string argument is ignored.
	 *
	 * @param {any} radix - An integer between 2 and 36 that represents
	 * the radix (the base in mathematical numeral systems) of the above mentioned string.
	 * Specify 10 for the decimal numeral system commonly used by humans. Always specify
	 * this parameter to eliminate reader confusion and to guarantee predictable behavior.
	 * Different implementations produce different results when a radix is not specified,
	 * usually defaulting the value to 10.
	 *
	 * @returns {Number} An integer number parsed from the given string.
	 * If the first character cannot be converted to a number, 0 is returned.
	 *
	 * min: -2147483647
	 * max: 2147483647
	 */
	function intOf(value, radix) {
		return 0 | parseInt(value, radix);
	}

	/**
	 *
	 * @function
	 * @memberof utility
	 * @param {Object} context
	 * @param {Boolean} getNum
	 * @returns {Array}
	 */
	function mod(index, min, max) {
		min = intOf(min);
		max = intOf(max) || min || 1;
		index = intOf(index);
		var value = index % max;
		return value < min ? (value + max) : value;
	}

	/**
	 *
	 * @function
	 * @memberof utility
	 * @param {arraylike} value
	 * @param {int} startIndex
	 * @param {int} endIndex
	 * @returns {Array}
	 */
	function slice(list, startIndex, endIndex) {
		var range = [];
		if (arraylike(list)) {
			var size = list.length;
			var start = mod(startIndex, 0, size);
			var end = mod(endIndex, 0, size) || size;
			if (string(list)) {
				range = '';
				while (start < end) {
					range += list[start];
					start += 1;
				}
				return range;
			}
			while (start < end) {
				range[range.length] = list[start];
				start += 1;
			}
		}
		return range;
	}

	/**
	 *
	 * @function
	 * @memberof is
	 * @param {any} value
	 * @returns {Boolean}
	 */
	function object(value) {
		return a(Object, value);
	}

	/**
	 *
	 * @function
	 * @memberof is
	 * @param {any} value
	 * @returns {Boolean}
	 */
	function callable(value) {
		return a(Function, value);
	}

	// pattern(s)

	var reFunctionName = /\s*function\s+([^(\s]*)\s*/;

	/**
	 *
	 * @function
	 * @memberof to
	 * @param {any} value
	 * @returns {Boolean}
	 */
	function stringOf(value, force) {
		var ctor = value != null && value.constructor;
		if (ctor && force) {
			if (!ctor.name || ctor.name === 'Object') {
				var matches = ctor.toString().match(reFunctionName);
				return matches ? matches[1] : '';
			}
			return ctor.name;
		}
		return slice(objectToString.call(value), 8, -1);
	}

	/**
	 *
	 * @function
	 * @memberof is
	 * @param {any} value
	 * @returns {Boolean}
	 */
	function primitive(value) {
		if (value == null) { return true; }
		if (callable(value.valueOf)) { value = value.valueOf(); }
		if (callable(value) || typeof value === 'object') {
			return false;
		}
		return true;
	}

	/**
	 *
	 * @function
	 * @memberof is
	 * @param {any}
	 * @returns {Boolean}
	 */
	function exotic(value) {
		return primitive(value) === false;
	}

	/* eslint-disable no-restricted-syntax */
	/**
	 *
	 * @function
	 * @param {any} value
	 * @param {Function} cmd
	 * @param {any} context
	 * @param {Boolean} getEnum
	 * @returns {?}
	 */
	function eachProperty(value, cmd, context, getEnum) {
		var i = 0;
		var isFn = callable(value);
		for (var key in value) {
			if (getEnum || ownProperty(value, key)) {
				if (isFn === false || (key !== 'prototype' && key !== 'length' && key !== 'name')) {
					var item = value[key];
					var resolve = cmd.call(context || item, item, key, value, i += 1);
					if (resolve !== undefined) {
						return resolve;
					}
				}
			}
		}
		return undefined;
	}

	/**
	 *
	 * @function
	 * @param {Array|arraylike} value
	 * @param {Function} cmd
	 * @param {any} context
	 * @returns {?}
	 */
	function eachValue(value, cmd, context, keepReverse) {
		if (value == null) { return undefined; }
		var l = (0 | value.length) - 1;
		for (var index = l; index > -1; index -= 1) {
			var i = keepReverse ? index : l - index;
			var item = value[i];
			var resolve = cmd.call(context || item, item, i, value, i);
			if (resolve !== undefined) {
				return resolve;
			}
		}
		return undefined;
	}

	/* eslint-disable no-restricted-syntax */
	/**
	 *
	 * @function
	 * @param {any} value
	 * @param {Function} cmd
	 * @param {Object} context
	 * @param {Boolean} keepReverseOrGetEnum
	 * @returns {?}
	 */
	function each(value, cmd, context, keepReverseOrGetEnum) {
		if (array(value)) { return eachValue(value, cmd, context, keepReverseOrGetEnum); }
		return eachProperty(value, cmd, context, keepReverseOrGetEnum);
	}

	/**
	 *
	 * @function
	 * @param {Object} proto - The object which should be the prototype of the newly-created object.
	 * @param {Object} properties - Optional. If specified and not undefined, an object whose
	 * enumerable own properties (that is, those properties defined upon itself and not enumerable
	 * properties along its prototype chain) specify property descriptors to be added to the
	 * newly-created object, with the corresponding property names. These properties correspond to
	 * the second argument of `Object.defineProperties()`.
	 * @returns {Object}
	 */
	function create(proto, properties) {
		if (callable(Object.create)) {
			return Object.create(proto, properties);
		}
		if (proto === null) { return {}; }
		var Instance = function () {};
		Instance.prototype = proto;
		proto = new Instance();
		each(properties, function (value, property) {
			proto[property] = value.value;
		});
		return proto;
	}

	/**
	 *
	 * @param {Object} context - .
	 * @returns {Object}
	 */
	function copy(proto) {
		var Copy = function () {};
		Copy.prototype = (proto && proto.prototype) || proto;
		return new Copy();
	}

	/**
	 *
	 * @param {Object} proto - .
	 * @param {Object} parent - .
	 * @returns {Object}
	 */
	function extend(proto, parent) {
		if (proto && parent) {
			proto = copy(proto);
			parent = copy(parent);
			each(parent, function (value, key) {
				if (object(value)) {
					extend(proto[key], value);
				} else {
					proto[key] = value;
				}
			}, null, true);
			return proto;
		}
		return proto || parent || {};
	}

	/**
	 *
	 * @param {Object} root - .
	 * @param {Array} list - .
	 * @returns {Object}
	 */
	function implement(root, list) {
		var proto = {};
		var collection = {};
		each(array(list) ? list : [list], function (item) {
			if (callable(item)) {
				item = item.prototype;
			}
			each(item, function (value, key) {
				if (!root[key]) {
					proto[key] = value;
				}
			}, null, true);
			if (proto.implements) {
				collection = implement(root, proto.implements);
			} else {
				collection = extend(collection, proto);
			}
		});
		return collection;
	}

	/**
	 *
	 * @param {Function} cmd - .
	 * @param {any} context - .
	 * @returns {any}
	 */
	function apply(cmd, context, args) {
		var $ = arraylike(args) ? args : [];
		switch ($.length) {
			case 0: return cmd.call(context);
			case 1: return cmd.call(context, $[0]);
			case 2: return cmd.call(context, $[0], $[1]);
			case 3: return cmd.call(context, $[0], $[1], $[2]);
			case 4: return cmd.call(context, $[0], $[1], $[2], $[3]);
			case 5: return cmd.call(context, $[0], $[1], $[2], $[3], $[4]);
			case 6: return cmd.call(context, $[0], $[1], $[2], $[3], $[4], $[5]);
			case 7: return cmd.call(context, $[0], $[1], $[2], $[3], $[4], $[5], $[6]);
			case 8: return cmd.call(context, $[0], $[1], $[2], $[3], $[4], $[5], $[6], $[7]);
			case 9: return cmd.call(context, $[0], $[1], $[2], $[3], $[4], $[5], $[6], $[7], $[8]);
			default: return cmd.apply(context, $);
		}
	}

	/**
	 *
	 * @param {Function} cmd - .
	 * @param {Object} context - .
	 * @param {...rest} ...args - .
	 * @returns {Function}
	 */
	function proxy(cmd, context) {
		var args = slice(arguments, 2);
		var fn = function $proxy() {
			return apply(cmd, context, args.concat(slice(arguments)));
		};
		fn.__bind__ = fn.__bind__ || cmd;
		return fn;
	}

	/**
	 *
	 * @param {Function} cmd - .
	 * @returns {Function}
	 */
	function unproxy(cmd) {
		var cache = cmd.__bind__;
		delete cmd.__bind__;
		return cache;
	}

	/**
	 *
	 * @param {Function} cmd - .
	 * @param {Object} context - .
	 * @param {Array} methods - .
	 * @returns {Object}
	 */
	function mapContext(cmd, context, methods) {
		var names = methods.length ? methods : keys(context, true);
		eachValue(names, function (method) {
			if (callable(context[method])) {
				context[method] = cmd(context[method], context);
			}
		});
		return context;
	}

	/**
	 *
	 * @param {Object} context - .
	 * @param {Array|...rest} ...methods - .
	 * @returns {Object}
	 */
	function proxyAll(context, methods) {
		var args = array(methods) ? methods : slice(arguments, 1);
		return mapContext(proxy, context, args);
	}

	/**
	 *
	 * @param {Object} context - .
	 * @param {Array|...rest} ...methods - .
	 * @returns {Object}
	 */
	function unproxyAll(context, methods) {
		var args = array(methods) ? methods : slice(arguments, 1);
		return mapContext(unproxy, context, args);
	}

	/**
	 *
	 * @param {Object} target - .
	 * @param {String} name - .
	 * @param {Function} cmd - .
	 */
	function overload(target, name, cmd) {
		var cache = target[name];
		target[name] = function () {
			if (cmd.length === arguments.length) {
				return apply(cmd, this, arguments);
			} else if (callable(cache)) {
				return apply(cache, this, arguments);
			}
			return undefined;
		};
	}

	/**
	 *
	 * @param {Object} proto - .
	 * @returns {Object}
	 */
	function copyShallowObjectsFrom(proto) {
		var copy = {};
		each(proto, function (value, key) {
			if (object(value)) {
				copy[key] = value;
			}
		}, null, true);
		return copy;
	}

	/**
	 *
	 * @param {Object} target - .
	 * @param {...rest} args - .
	 * @returns {Object}
	 */
	function shallowMerge(target) {
		var args = slice(arguments, 1);
		each(args, function (parameter) {
			each(parameter, function (value, key) {
				target[key] = value;
			});
		});
		return target;
	}

	/**
	 *
	 * @param {Object} context - .
	 */
	function flush(context) {
		for (var key in context) {
			if (objectHasOwnProperty.call(context, key)) {
				delete context[key];
			}
		}
	}

	/**
	 *
	 * @param {Function} cmd - .
	 * @param {Object} context - .
	 * @returns {Function}
	 */
	function ape(cmd, context) {
		return function $ape() {
			apply(cmd, context, arguments);
		};
	}

	/**
	 *
	 * @param {Function} overwrite - .
	 * @param {Function} target - .
	 * @param {...rest} args - .
	 * @returns {Function}
	 */
	function merge(overwrite, target) {
		var args = slice(arguments, 2);
		each(args, function (parameter) {
			each(parameter, function (value, key) {
				if (object(value) && object(target[key])) {
					merge(overwrite, target[key], value);
				} else if (overwrite || !target[key]) {
					target[key] = value;
				}
			}, null, true);
		});
		return target;
	}

	// pattern(s)
	var reSuper = /\bsuper\b/;

	/**
	 *
	 * @param {Function} cmd - .
	 * @returns {Boolean}
	 */
	function hasSuperCall(cmd) {
		return callable(cmd) && reSuper.test(cmd.toString());
	}

	/**
	 *
	 * @param {String} name - .
	 * @param {Function} action - .
	 * @param {any} value - .
	 * @returns {Function}
	 */
	function createSuperMethod(name, action, value) {
		var pointer = callable(value) ? value : function $super() {
			return value;
		};
		return function Proto() {
			this.super = pointer;
			return apply(action, this, arguments);
		};
	}

	/**
	 *
	 * @param {Object} parent - .
	 * @param {Object} proto - .
	 * @param {Function} cmd - .
	 * @param {String} key - .
	 */
	function injectSuperMethod(parent, proto, cmd, key) {
		if (hasSuperCall(cmd)) {
			proto[key] = createSuperMethod(key, cmd, parent[key]);
		}
	}

	/**
	 *
	 * @param {String} name - .
	 * @param {Function} action - .
	 * @param {any} value - .
	 * @returns {Function}
	 */
	function enableSuperMethods(parent, proto) {
		if (ownProperty(proto, 'constructor') === false) {
			proto.constructor = function Proto() {};
		}
		each(proto, proxy(injectSuperMethod, null, parent.prototype, proto));
		return proto;
	}

	/**
	 *
	 * @param {Function} parent - .
	 * @param {Object} protoProps - .
	 * @returns {Boolean}
	 */
	function getChild(parent, protoProps) {
		if (ownProperty(protoProps, 'constructor')) {
			return protoProps.constructor;
		}
		return function Proto() {
			return apply(parent, this, arguments);
		};
	}

	/**
	 *
	 * @param {Function} Proto - .
	 * @param {Function} parent - .
	 * @param {Object} protoProps - .
	 * @param {Object} staticProps - .
	 * @returns {Object}
	 */
	var numInstances = 0;
	function inherit(Proto, parent, protoProps, staticProps) {
		var child = getChild(parent, protoProps);

		shallowMerge(child, parent, staticProps);

		var Surrogate = function () { this.constructor = child; };
		Surrogate.prototype = parent instanceof Proto ? null : parent.prototype;
		child.prototype = create(Surrogate.prototype);

		Proto.size = numInstances;
		numInstances += 1;

		if (protoProps && ownProperty(protoProps, 'implements')) {
			var implementations = implement(Proto.prototype, protoProps.implements);
			child.prototype = extend(child.prototype, implementations);
			delete protoProps.implements;
		}

		if (protoProps) {
			var childObjects = copyShallowObjectsFrom(child.prototype);
			shallowMerge(child.prototype, protoProps, { $protoID: Proto.size });
			merge(false, child.prototype, childObjects);
		}

		child.super = parent.prototype;

		return child;
	}

	function Proto(parent, protoProps, staticProps) {
		return Proto.extends(parent, protoProps, staticProps);
	}

	Proto.VERSION = '1.1.0';
	Proto.size = 0;
	Proto.create = create;
	Proto.each = each;
	Proto.implements = implement;
	Proto.unproxyAll = unproxyAll;
	Proto.proxyAll = proxyAll;
	Proto.unproxy = unproxy;
	Proto.proxy = proxy;
	Proto.overload = overload;
	Proto.copyShallowObjects = copyShallowObjectsFrom;
	Proto.shallowMerge = shallowMerge;
	Proto.flush = flush;
	Proto.keys = keys;
	Proto.copy = copy;
	Proto.ape = ape;
	Proto.isArray = array;
	Proto.isLikeObject = exotic;
	Proto.isObject = object;
	Proto.isFunction = callable;
	Proto.isString = string;
	Proto.of = stringOf;
	Proto.merge = proxy(merge, null, true);

	Proto.extends = function () {
		var args = slice(arguments);
		var hasParent = callable(args[0]);
		var parent = hasParent ? args[0] : this;
		var protoProps = hasParent ? args[1] : args[0];
		var staticProps = hasParent ? args[2] : args[1];
		enableSuperMethods(parent, protoProps);
		return inherit(Proto, parent, protoProps, staticProps);
	};

	Proto.prototype = {

		option: function option(options) {
			if (string(options) && this.options) {
				return this.options[options];
			} else if (exotic(options)) {
				this.options = merge(true, {}, this.defaults, options);
			}
			return exotic(this.options) ? this.options : {};
		},

		implement: function implement$1(list) {
			return extend(this, implement(this, list));
		},

		overload: function overload$1(name, cmd) {
			overload(this.prototype, name, cmd);
			return this;
		},

		unproxyAll: function unproxyAll$1() {
			return unproxyAll(this, slice(arguments));
		},

		proxyAll: function proxyAll$1() {
			return proxyAll(this, slice(arguments));
		},

		unproxy: function unproxy$1(cmd) {
			return unproxy(cmd);
		},

		proxy: function proxy$1(cmd, context) {
			return proxy(cmd, context || this);
		},

		flush: function flush$1() {
			flush(this);
		},
	};

	return Proto;

})));
