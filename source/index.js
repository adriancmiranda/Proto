import keys from 'describe-type/source/@/keys.js';
import slice from 'describe-type/source/@/slice.js';
import array from 'describe-type/source/is/array.js';
import object from 'describe-type/source/is/object.js';
import string from 'describe-type/source/is/string.js';
import callable from 'describe-type/source/is/callable.js';
import stringOf from 'describe-type/source/built-in/stringOf.js';
import exotic from 'describe-type/source/is/exotic.js';
import create from './@/create.js';
import each from './@/each.js';
import implement from './@/implement.js';
import proxy from './@/proxy.js';
import unproxy from './@/unproxy.js';
import proxyAll from './@/proxyAll.js';
import unproxyAll from './@/unproxyAll.js';
import overload from './@/overload.js';
import copyShallowObjectsFrom from './@/copyShallowObjectsFrom.js';
import shallowMerge from './@/shallowMerge.js';
import flush from './@/flush.js';
import copy from './@/copy.js';
import ape from './@/ape.js';
import merge from './@/merge.js';
import enableSuperMethods from './@/enableSuperMethods.js';
import extend from './@/extend.js';
import inherit from './@/inherit.js';

export default function Proto(parent, protoProps, staticProps) {
	return Proto.extends(parent, protoProps, staticProps);
}

Proto.VERSION = '__VERSION__';
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
	const args = slice(arguments);
	const hasParent = callable(args[0]);
	const parent = hasParent ? args[0] : this;
	const protoProps = hasParent ? args[1] : args[0];
	const staticProps = hasParent ? args[2] : args[1];
	enableSuperMethods(parent, protoProps);
	return inherit(Proto, parent, protoProps, staticProps);
};

Proto.prototype = {

	option(options) {
		if (string(options) && this.options) {
			return this.options[options];
		} else if (exotic(options)) {
			this.options = merge(true, {}, this.defaults, options);
		}
		return exotic(this.options) ? this.options : {};
	},

	implement(list) {
		return extend(this, implement(this, list));
	},

	overload(name, cmd) {
		overload(this.prototype, name, cmd);
		return this;
	},

	unproxyAll() {
		return unproxyAll(this, slice(arguments));
	},

	proxyAll() {
		return proxyAll(this, slice(arguments));
	},

	unproxy(cmd) {
		return unproxy(cmd);
	},

	proxy(cmd, context) {
		return proxy(cmd, context || this);
	},

	flush() {
		flush(this);
	},
};
