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
	const hasArgs = args.length;
	const fn = function $proxy() {
		const fnArgs = slice(arguments);
		return apply(cmd, context, hasArgs ? args.concat(fnArgs) : fnArgs);
	};
	fn.__bind__ = fn.__bind__ || cmd;
	return fn;
}
