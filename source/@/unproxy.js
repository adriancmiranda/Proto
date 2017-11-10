/**
 *
 * @param {Function} cmd - .
 * @returns {Function}
 */
export default function unproxy(cmd) {
	const cache = cmd.__bind__;
	delete cmd.__bind__;
	return cache;
}
