import object from 'describe-type/source/is/object.js';
import each from '../@/each.js';
import copy from './copy.js';

/**
 *
 * @param {Object} proto - .
 * @param {Object} parent - .
 * @returns {Object}
 */
export default function extend(proto, parent) {
	if (proto && parent) {
		proto = copy(proto);
		parent = copy(parent);
		each(parent, (value, key) => {
			if (object(value)) {
				extend(proto[key], value);
			} else {
				proto[key] = value;
			}
		}, null, true);
		return proto;
	}
	return proto || parent || {};
}
