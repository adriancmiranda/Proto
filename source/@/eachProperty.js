/* eslint-disable no-restricted-syntax */
import ownProperty from 'describe-type/source/has/ownProperty.js';
import callable from 'describe-type/source/is/callable.js';

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
	const isFn = callable(value);
	for (const key in value) {
		if (getEnum || ownProperty(value, key)) {
			if (isFn === false || key !== 'prototype' && key !== 'length' && key !== 'name') {
				const item = value[key];
				const resolve = cmd.call(context || item, item, key, value, i += 1);
				if (resolve !== undefined) {
					return resolve;
				}
			}
		}
	}
	return undefined;
}
