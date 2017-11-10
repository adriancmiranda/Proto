import { objectHasOwnProperty } from 'describe-type/source/@/built-in.js';

/**
 *
 * @param {Object} context - .
 */
export default function flush(context) {
	for (const key in context) {
		if (objectHasOwnProperty.call(context, key)) {
			delete context[key];
		}
	}
}
