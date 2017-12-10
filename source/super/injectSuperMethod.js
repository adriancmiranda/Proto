import hasSuperCall from './hasSuperCall';
import createSuperMethod from './createSuperMethod';

/**
 *
 * @param {Object} parent - .
 * @param {Object} proto - .
 * @param {Function} cmd - .
 * @param {String} key - .
 */
export default function injectSuperMethod(parent, proto, cmd, key) {
	if (hasSuperCall(cmd)) {
		proto[key] = createSuperMethod(key, cmd, parent);
	}
}
