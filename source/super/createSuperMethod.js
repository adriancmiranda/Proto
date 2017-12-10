import apply from 'describe-type/source/@/apply.js';
import callable from 'describe-type/source/is/callable.js';
import ownProperty from 'describe-type/source/has/ownProperty.js';
import createSuperPointer from './createSuperPointer.js';

/**
 *
 * @param {String} name - .
 * @param {Function} action - .
 * @param {any} value - .
 * @returns {Function}
 */
export default function createSuperMethod(name, action, context) {
	const parent = context[name];
	const pointer = createSuperPointer(parent);
	const isSuperProperty = ownProperty(context, name) && callable(parent) === false;
	return function Proto() {
		this.super = pointer;
		if (isSuperProperty) {
			if (arguments.length) {
				context[name] = arguments[0];
			}
			return context[name];
		}
		return apply(action, this, arguments);
	};
}
