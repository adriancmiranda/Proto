module.exports = () => {
	const defer = Object.create(null);
	defer.promise = new Promise(function executor(resolve, reject) {
		defer.resolve = resolve;
		defer.reject = reject;
	});
	return defer;
};
