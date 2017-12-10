import keys from 'describe-type/source/@/keys.js';
import apply from 'describe-type/source/@/apply.js';
import slice from 'describe-type/source/@/slice.js';
import any from 'describe-type/source/is/any.js';
import array from 'describe-type/source/is/array.js';
import arraylike from 'describe-type/source/is/arraylike.js';
import object from 'describe-type/source/is/object.js';
import callable from 'describe-type/source/is/callable.js';
import number from 'describe-type/source/is/number.js';
import integer from 'describe-type/source/is/int.js';
import string from 'describe-type/source/is/string.js';
import instanceOf from 'describe-type/source/is/instanceOf.js';
import stringOf from 'describe-type/source/built-in/stringOf.js';
import each from './@/each.js';
import ape from './@/ape.js';
import create from './body/create.js';
import implement from './body/implement.js';
import overload from './body/overload.js';
import copyShallowObjectsFrom from './body/copyShallowObjectsFrom.js';
import shallowMerge from './body/shallowMerge.js';
import flush from './body/flush.js';
import copy from './body/copy.js';
import merge from './body/merge.js';
import extend from './body/extend.js';
import inherit from './body/inherit.js';
import enableSuperMethods from './super/enableSuperMethods.js';
import proxy from './context/proxy.js';
import unproxy from './context/unproxy.js';
import proxyAll from './context/proxyAll.js';
import unproxyAll from './context/unproxyAll.js';

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
Proto.is = create(null);
Proto.is.instanceOf = instanceOf;
Proto.is.any = any;
Proto.is.string = string;
Proto.is.array = array;
Proto.is.arraylike = arraylike;
Proto.is.number = number;
Proto.is.object = object;
Proto.is.integer = integer;
Proto.is.callable = callable;
Proto.of = stringOf;
Proto.merge = proxy(merge, null, true);
Proto.ape = ape;

Proto.invoke = function (cmd, context, args) {
	return callable(cmd) ? apply(cmd, context, args) : undefined;
};

Proto.extends = function () {
	const args = slice(arguments);
	const hasParent = any(Function, args[0]);
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
		} else if (instanceOf(Object, options)) {
			this.options = merge(true, {}, this.defaults, options);
		}
		return instanceOf(Object, this.options) ? this.options : {};
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
