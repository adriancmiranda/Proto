import apply from 'describe-type/source/@/apply.js';
import ownProperty from 'describe-type/source/has/ownProperty.js';
import callable from 'describe-type/source/is/callable.js';
import proxy from '../context/proxy.js';

/**
 *
 * @param {Function} parent - .
 * @param {Object} protoProps - .
 * @returns {Boolean}
 */
export default function ensureConstructor(parent, protoProps) {
	if (ownProperty(protoProps, 'constructor')) {
		const ctor = protoProps.constructor;
		if (ctor.prototype === undefined && callable(ctor)) {
			return proxy(ctor, protoProps);
		}
		return ctor;
	}
	return function Proto() {
		return apply(parent, this, arguments);
	};
}
