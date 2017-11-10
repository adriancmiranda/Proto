import apply from 'describe-type/source/@/apply.js';
import callable from 'describe-type/source/is/callable.js';

/**
 *
 * @param {Object} target - .
 * @param {String} name - .
 * @param {Function} cmd - .
 */
export default function overload(target, name, cmd) {
	const cache = target[name];
	target[name] = function () {
		if (cmd.length === arguments.length) {
			return apply(cmd, this, arguments);
		} else if (callable(cache)) {
			return apply(cache, this, arguments);
		}
		return undefined;
	};
}
