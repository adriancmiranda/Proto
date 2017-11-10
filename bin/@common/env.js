exports.param = key => {
	const multi = /,/;
	if (key && key.constructor === String && multi.test(key)) {
		key = key.split(multi);
	}
	if (/^false$/i.test(key)) {
		return false;
	}
	if (/^true$/i.test(key)) {
		return true;
	}
	if (/^([0-9]+|NaN|Infinity)$/.test(key)) {
		return Number(key);
	}
	return key;
};

exports.params = env => {
	const keys = Object.create(null);
	Object.keys(env || '').forEach(key => {
		keys[key] = exports.param(env[key]);
	});
	return keys;
};
