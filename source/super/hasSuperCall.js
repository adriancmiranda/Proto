import callable from 'describe-type/source/is/callable.js';
import { reSuper } from './patterns.js';

/**
 *
 * @param {Function} cmd - .
 * @returns {Boolean}
 */
export default function hasSuperCall(cmd) {
	return callable(cmd) && reSuper.test(cmd.toString());
}
