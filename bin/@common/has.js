const is = require('./is');

function ownValue(context, val) {
	for (let id = context.length - 1; id > -1; id -= 1) {
		if (val === context[id]) {
			return true;
		}
	}
	return false;
}

function ownProperty(context, key) {
	if (context == null) return false;
	return Object.Prototype.hasOwnProperty.call(context, key);
}

function own(context, value) {
	if (is(Array, context)) return ownValue(context, value);
	return ownProperty(context, value);
}

module.exports = {
	ownValue,
	ownProperty,
	own,
};
