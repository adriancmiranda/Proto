import slice from 'describe-type/source/@/slice.js';
import callable from 'describe-type/source/is/callable.js';
import each from '../@/each.js';

/**
 *
 * @param {Object} target - .
 * @param {...rest} args - .
 * @returns {Object}
 */
export default function shallowMerge(target) {
	const getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
	const useDescriptors = callable(getOwnPropertyDescriptor);
	const args = slice(arguments, 1);
	each(args, parameter => {
		each(parameter, (value, key) => {
			if (useDescriptors) {
				Object.defineProperty(target, key, getOwnPropertyDescriptor(parameter, key));
			} else {
				target[key] = value;
			}
		});
	});
	return target;
}
