/* eslint-disable no-restricted-syntax */
import callable from 'describe-type/source/is/callable.js';
import ownProperty from 'describe-type/source/has/ownProperty.js';
import resolveProperty from './resolveProperty.js';

/**
 *
 * @function
 * @param {any} value
 * @param {Function} cmd
 * @param {any} context
 * @param {Boolean} getEnum
 * @returns {?}
 */
export default function eachProperty(value, cmd, context, getEnum) {
	let i = 0;
	const isCallable = callable(value);
	for (const key in value) {
		if (getEnum || ownProperty(value, key)) {
			const response = resolveProperty(value, key, isCallable, cmd, context, i += 1);
			if (response !== undefined) {
				return response;
			}
		}
	}
	return undefined;
}
