import ownProperty from 'describe-type/source/has/ownProperty.js';

/**
 *
 * @param {Object} ctx
 * @param {String} key
 * @param {any} value
 * @param {Number} index
 * @param {Boolean} getEnum
 * @param {Function} cmd
 * @returns {any}
 */
export default function iteraction(ctx, key, value, index, getEnum, cmd) {
	if (getEnum || ownProperty(value, key)) {
		return cmd.call(ctx || value[key], value[key], key, index, value);
	}
	return undefined;
}
