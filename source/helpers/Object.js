'use strict';

extend(Object, (function() {

	function keys(object) {
		var property, id, results = [];
		if (typeOf(object) !== 'object') {
			return results;
		}
		for (property in object) {
			if (Object.prototype.hasOwnProperty.call(object, property)) {
				results.push(property);
			}
		}
		if (IS_DONTENUM_BUGGY) {
			for (id = 0; property = DONT_ENUMS[id]; id++) {
				if (Object.prototype.hasOwnProperty.call(object, property)) {
					results.push(property);
				}
			}
		}
		return results;
	}
	
	var statics = {
		keys: Object.keys || keys
	};
	
	return statics;
})());
