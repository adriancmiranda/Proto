import array from 'describe-type/source/is/array.js';
import callable from 'describe-type/source/is/callable.js';
import each from '../@/each.js';
import extend from './extend.js';

/**
 *
 * @param {Object} root - .
 * @param {Array} list - .
 * @returns {Object}
 */
export default function implement(root, list) {
	const proto = {};
	let collection = {};
	each(array(list) ? list : [list], item => {
		if (callable(item)) {
			item = item.prototype;
		}
		each(item, (value, key) => {
			if (!root[key]) {
				proto[key] = value;
			}
		}, null, true);
		if (proto.implements) {
			collection = implement(root, proto.implements);
		} else {
			collection = extend(collection, proto);
		}
	});
	return collection;
}
