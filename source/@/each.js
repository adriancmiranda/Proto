/* eslint-disable no-restricted-syntax */
import arraylike from 'describe-type/source/is/arraylike.js';
import eachProperty from './eachProperty.js';
import eachValue from './eachValue.js';

/**
 *
 * @function
 * @param {any} value
 * @param {Function} cmd
 * @param {Object} context
 * @param {Boolean} keepReverseOrGetEnum
 * @returns {?}
 */
export default function each(value, cmd, context, keepReverseOrGetEnum) {
	if (arraylike(value)) return eachValue(value, cmd, context, keepReverseOrGetEnum);
	return eachProperty(value, cmd, context, keepReverseOrGetEnum);
}
