'use strict';

function arrayHelper() {
	function forEach(iterator, context) {
		each(this, iterator, context);
	}
	return {
		forEach: nativeForEach || forEach
	};
}

extend(ArrayProto, arrayHelper());
