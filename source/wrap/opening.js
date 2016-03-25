(function(global, factory){
	'use strict';

	var create = typeof Object.create === 'function' && Object.create;
	if(typeof module === 'object' && typeof module.exports === 'object'){
		module.exports = factory(global, create, true);
	}else factory(global, create);

}(typeof window !== 'undefined' ? window : this, function(window, create, nodeEnv){

	//| .-------------------------------------------------------------------.
	//| | NAMING CONVENTIONS:                                               |
	//| |-------------------------------------------------------------------|
	//| | Singleton-literals and prototype objects      | PascalCase        |
	//| |-------------------------------------------------------------------|
	//| | Functions and public variables                | camelCase         |
	//| |-------------------------------------------------------------------|
	//| | Global variables and constants                | UPPERCASE         |
	//| |-------------------------------------------------------------------|
	//| | Private variables                             | _underscorePrefix |
	//| '-------------------------------------------------------------------'
	//|
	//| Comment syntax for the entire project follows JSDoc:
	//| @see http://code.google.com/p/jsdoc-toolkit/wiki/TagReference
	//'