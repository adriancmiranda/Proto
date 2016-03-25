module.exports = function mochacli(){
	'use strict'

	// Run Mocha server-side tests in Grunt
	// @see https://www.npmjs.com/package/grunt-mocha-cli
	return({
		options:{
			ignoreLeaks:false,
			reporter:'spec',
			timeout:6000,
			ui:'bdd'
		},
		client:['test/{,*/}*.js'],
	})
};
