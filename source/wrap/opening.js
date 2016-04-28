//     Proto.js v0.0.6-alpha

//     (c) 2015-2016 Adrian C. Miranda
//     Proto may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://ambox.github.io

(function(global, name, version, factory){
	'use strict';

	if(typeof module === 'object' && typeof module.exports === 'object'){

		// Set up for Node.js or CommonJS.
		module.exports = factory(global, exports, name, version);

	}else if(typeof define === 'function' && define.amd){// jshint ignore:line

		// Next for module appropriately for the environment. Start with AMD.
		define(['exports'], function(exports){// jshint ignore:line
			return factory(global, exports, name, version);
		});

	}else{

		// Finally, as a browser global.
		global[name] = factory(global, {}, name, version);

	}

})(this, 'Proto', 'v0.0.6-alpha', function(global, exports, name, version){
	'use strict';

	// Helpers
	// -------
