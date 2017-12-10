/* eslint-disable no-proto */
import './Object.assign.js';

/**
 *
 * @name Object.setPrototypeOf
 * @function
 * @param {Object} target - .
 * @param {Object} source - .
 * @returns {Object}
 */
export default Object.setPrototypeOf || function setPrototypeOf(target, source) {
	if (target == null) {
		throw new TypeError('Object.setPrototypeOf called on null or undefined');
	}
	if ({ __proto__: [] } instanceof Array) {
		target.__proto__ = source;
		return target;
	}
	return Object.assign(target, source);
};
