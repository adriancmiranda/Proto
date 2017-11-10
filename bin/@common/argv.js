exports.args = argv => {
	const keys = Object.create(null);
	const reArg = /^--?(.+)/;
	const reParam = /=/;
	argv = argv.slice(2);
	argv.forEach((key, index) => {
		if (reArg.test(key)) {
			const argvalues = key.split(reParam);
			let argname = key.replace(reArg, '$1');
			let argvalue = argv[index + 1];
			if (argvalues.length === 2) {
				argname = argvalues[0].replace(reArg, '$1');
				argvalue = argvalues[1];
			}
			keys[argname] = argname in keys ?
				[keys[argname]].concat([argvalue]) :
				argvalue
			;
		}
	});
	return keys;
};
