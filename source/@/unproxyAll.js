import slice from 'describe-type/source/@/slice.js';
import array from 'describe-type/source/is/array.js';
import mapContext from './mapContext.js';
import unproxy from './unproxy.js';

/**
 *
 * @param {Object} context - .
 * @param {Array|...rest} ...methods - .
 * @returns {Object}
 */
export default function unproxyAll(context, methods) {
	const args = array(methods) ? methods : slice(arguments, 1);
	return mapContext(unproxy, context, args);
}
