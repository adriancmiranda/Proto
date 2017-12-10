import callable from 'describe-type/source/is/callable.js';

/**
 *
 * @param {any} value - .
 * @returns {Function}
 */
export default function createSuperPointer(value) {
	return callable(value) ? value : function $super() {
		return value;
	};
}
