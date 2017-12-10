import object from 'describe-type/source/is/object.js';
import each from './each.js';

/**
 *
 * @param {Object} proto - .
 * @returns {Object}
 */
export default function copyShallowObjectsFrom(proto) {
	const copy = {};
	each(proto, (value, key) => {
		if (object(value)) {
			copy[key] = value;
		}
	}, null, true);
	return copy;
}
