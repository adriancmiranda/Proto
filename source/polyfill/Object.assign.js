import { objectHasOwnProperty } from 'describe-type/source/@/built-in.js';

/**
 *
 * @name Object.assign
 * @function
 * @global
 * @param {target}
 * @param {...sources}
 * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 */
export default Object.assign || function assign(target, ...rest) {
	if (target == null) {
		throw new TypeError('Cannot convert undefined or null to object');
	}
	for (let index = 1; index < rest.length; index += 1) {
		const source = rest[index];
		if (source != null) {
			for (const key in source) {
				if (objectHasOwnProperty.call(source, key)) {
					target[key] = source[key];
				}
			}
		}
	}
	return target;
}
