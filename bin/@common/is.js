function an(expected, value) {
	if (expected == null || value == null) return value === expected;
	if (value.constructor === expected) return true;
	if (value.constructor === undefined) return expected === Object;
	return expected === Function && (
		value.constructor.name === 'GeneratorFunction' ||
		value.constructor.name === 'AsyncFunction'
	);
}

module.exports = function any(expected, value) {
	if (expected == null) return expected === value;
	if (expected.constructor === Array && expected.length > 0) {
		for (let i = expected.length - 1; i > -1; i -= 1) {
			if (an(expected[i], value)) return true;
		}
	}
	return an(expected, value);
};
