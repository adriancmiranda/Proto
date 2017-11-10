/**
 *
 * @function
 * @param {Array|arraylike} value
 * @param {Function} cmd
 * @param {any} context
 * @returns {?}
 */
export default function eachValue(value, cmd, context, keepReverse) {
	if (value == null) return undefined;
	const l = (0 | value.length) - 1;
	for (let index = l; index > -1; index -= 1) {
		const i = keepReverse ? index : l - index;
		const item = value[i];
		const resolve = cmd.call(context || item, item, i, value, i);
		if (resolve !== undefined) {
			return resolve;
		}
	}
	return undefined;
}
