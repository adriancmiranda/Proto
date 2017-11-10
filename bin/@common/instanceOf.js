const is = require('./is');

module.exports = function instanceOf(expected, value) {
	if (expected == null) return expected === value;
	if (expected.constructor === Array && expected.length > 0) {
		for (let i = expected.length - 1; i > -1; i -= 1) {
			const ctor = expected[i];
			if (ctor === Number) return is(ctor, value);
			if (is(Function, ctor) && value instanceof ctor) return true;
		}
	}
	if (expected === Number) return is(expected, value);
	return is(Function, expected) && value instanceof expected;
};
