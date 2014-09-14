if (exports) {
	/**
	 * Source files
	 */
	var am = exports.source = {
		utils: {
			'name': 'class',
			'files': [
				'source/helpers/Polyfills.js',
				'source/helpers/Utils.js',
				'source/utils/Class.js'
			]
		}
	};

	/**
	 * @usage am.mergeFilesFor('karma');
	 * @return Array
	 */
	exports.mergeFilesFor = function() {
		var files = [];
		Array.prototype.slice.call(arguments, 0).forEach(function(filegroup) {
			am[filegroup].forEach(function(file) {
				// replace @ref
				var match = file.match(/^\@(.*)/);
				if (match) {
					files = files.concat(am[match[1]]);
				} else {
					files.push(file);
				}
			});
		});
		return files;
	};
}
