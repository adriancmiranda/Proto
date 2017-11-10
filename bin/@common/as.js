const { ownValue } = require('./has.js');
const is = require('./is.js');

module.exports = (expected, value, ...args) => {
	if (is(Function, value) && (expected === Function || ownValue(expected, Function)) === false) {
		value = value(...args);
	}
	return is(expected, value) ? value : args[0];
};
