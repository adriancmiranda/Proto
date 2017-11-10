/**
 *
 * @param {Object} context - .
 * @returns {Object}
 */
export default function copy(proto) {
	const Copy = function () {};
	Copy.prototype = (proto && proto.prototype) || proto;
	return new Copy();
}
