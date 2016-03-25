'use strict';

function objectHelper() {
	return {
		extend: extend,
		isEmpty: isEmptyObject,
		keys: nativeKeys || keys
	};
}

apply(Object, objectHelper());
