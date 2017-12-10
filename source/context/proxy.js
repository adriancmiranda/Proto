import slice from 'describe-type/source/@/slice.js';
import apply from 'describe-type/source/@/apply.js';

/**
 *
 * @param {Function} cmd - .
 * @param {Object} context - .
 * @param {...rest} ...args - .
 * @returns {Function}
 */
export default function proxy(cmd, context) {
	const args = slice(arguments, 2);
	const fn = function $proxy() {
		return apply(cmd, context, args.concat(slice(arguments)));
	};
	fn.__bind__ = fn.__bind__ || cmd;
	return fn;
}
