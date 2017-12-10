import ownProperty from 'describe-type/source/has/ownProperty.js';
import injectSuperMethod from './injectSuperMethod.js';
import proxy from '../context/proxy.js';
import each from '../@/each.js';

/**
 *
 * @param {String} name - .
 * @param {Function} action - .
 * @param {any} value - .
 * @returns {Function}
 */
export default function enableSuperMethods(parent, proto) {
	if (ownProperty(proto, 'constructor') === false) {
		proto.constructor = function Proto() {};
	}
	each(proto, proxy(injectSuperMethod, null, parent.prototype, proto));
	return proto;
}
