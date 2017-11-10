import apply from 'describe-type/source/@/apply.js';
import ownProperty from 'describe-type/source/has/ownProperty.js';

/**
 *
 * @param {Function} parent - .
 * @param {Object} protoProps - .
 * @returns {Boolean}
 */
export default function getChild(parent, protoProps) {
	if (ownProperty(protoProps, 'constructor')) {
		return protoProps.constructor;
	}
	return function Proto() {
		return apply(parent, this, arguments);
	};
}
