import apply from 'describe-type/source/@/apply.js';

/**
 *
 * @param {Function} cmd - .
 * @param {Object} context - .
 * @returns {Function}
 */
export default function ape(cmd, context) {
	return function $ape() {
		apply(cmd, context, arguments);
	};
}
