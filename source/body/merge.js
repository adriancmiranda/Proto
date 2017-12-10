import slice from 'describe-type/source/@/slice.js';
import object from 'describe-type/source/is/object.js';
import callable from 'describe-type/source/is/callable.js';
import each from '../@/each';

/**
 *
 * @param {Function} overwrite - .
 * @param {Function} target - .
 * @param {...rest} args - .
 * @returns {Function}
 */
export default function merge(overwrite, target) {
	const getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
	const useDescriptors = callable(getOwnPropertyDescriptor);
	const args = slice(arguments, 2);
	each(args, parameter => {
		each(parameter, (value, key) => {
			if (object(value) && object(target[key])) {
				merge(overwrite, target[key], value);
			} else if (overwrite || !target[key]) {
				if (useDescriptors) {
					Object.defineProperty(target, key, getOwnPropertyDescriptor(parameter, key));
				} else {
					target[key] = value;
				}
			}
		}, null, true);
	});
	return target;
}
