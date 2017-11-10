import apply from 'describe-type/source/@/apply.js';
import callable from 'describe-type/source/is/callable.js';

/**
 *
 * @param {String} name - .
 * @param {Function} action - .
 * @param {any} value - .
 * @returns {Function}
 */
export default function createSuperMethod(name, action, value) {
	const pointer = callable(value) ? value : function $super() {
		return value;
	};
	return function Proto() {
		this.super = pointer;
		return apply(action, this, arguments);
	};
}
