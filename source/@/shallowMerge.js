import slice from 'describe-type/source/@/slice.js';
import each from './each.js';

/**
 *
 * @param {Object} target - .
 * @param {...rest} args - .
 * @returns {Object}
 */
export default function shallowMerge(target) {
	const args = slice(arguments, 1);
	each(args, parameter => {
		each(parameter, (value, key) => {
			target[key] = value;
		});
	});
	return target;
}
