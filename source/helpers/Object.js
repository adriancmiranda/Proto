'use strict';

function objectHelper() {
	return {
		extend: extend,
		isEmpty: isEmptyObject,
		keys: nativeKeys || keys
	};
}

extend(Object, objectHelper());
