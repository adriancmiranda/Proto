import apply from 'describe-type/source/@/apply.js';
import createSuperPointer from './createSuperPointer.js';

/**
 *
 * @param {String} name - .
 * @param {Function} action - .
 * @param {any} value - .
 * @returns {Function}
 */
export default function createSuperMethod(name, action, value) {
	const pointer = createSuperPointer(value);
	return function Proto() {
		this.super = pointer;
		return apply(action, this, arguments);
	};
}
