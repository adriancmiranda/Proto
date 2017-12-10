import keys from 'describe-type/source/@/keys.js';
import callable from 'describe-type/source/is/callable.js';
import eachValue from '../@/eachValue.js';

/**
 *
 * @param {Function} cmd - .
 * @param {Object} context - .
 * @param {Array} methods - .
 * @returns {Object}
 */
export default function mapContext(cmd, context, methods) {
	const names = methods.length ? methods : keys(context, true);
	eachValue(names, method => {
		if (callable(context[method])) {
			context[method] = cmd(context[method], context);
		}
	});
	return context;
}
