import callable from 'describe-type/source/is/callable.js';
import each from './each.js';

/**
 *
 * @function
 * @param {Object} proto - The object which should be the prototype of the newly-created object.
 * @param {Object} properties - Optional. If specified and not undefined, an object whose
 * enumerable own properties (that is, those properties defined upon itself and not enumerable
 * properties along its prototype chain) specify property descriptors to be added to the
 * newly-created object, with the corresponding property names. These properties correspond to
 * the second argument of `Object.defineProperties()`.
 * @returns {Object}
 */
export default function create(proto, properties) {
	if (callable(Object.create)) {
		return Object.create(proto, properties);
	}
	if (proto === null) return {};
	const Instance = function () {};
	Instance.prototype = proto;
	proto = new Instance();
	each(properties, (value, property) => {
		proto[property] = value.value;
	});
	return proto;
}
