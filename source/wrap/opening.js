//     Proto.js v1.0.3

//     (c) 2015-2016 Adrian C. Miranda
//     Proto may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://ambox.github.io
(function(global, name, version, factory){
	'use strict';

	/* globals define:false, module:false */
	if(typeof module === 'object' && typeof module.exports === 'object'){

		// Set up for Node.js or CommonJS.
		global[name] = module.exports = factory(global, exports, name, version);

	}else if(typeof define === 'function' && define.amd){

		// Next for module appropriately for the environment. Start with AMD.
		define(['exports'], function(exports){
			return factory(global, exports, name, version);
		});

	}else{

		// Finally, as a browser global.
		global[name] = factory(global, {}, name, version);

	}

}(typeof window !== 'undefined'? window : this, 'Proto', '1.0.3', function(global, exports, name, version){
	'use strict';

	// Helpers
	// -------
