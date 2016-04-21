(function(global, factory){
	'use strict';

	var $ = global.jQuery || global.Zepto || global.ender || global.$;
	if(typeof module === 'object' && typeof module.exports === 'object'){
		module.exports = factory(global, $, true);
	}else{
		factory(global, $);
	}

}(typeof window !== 'undefined' ? window : this, function(window, $, nodeEnv){

//|-----------------------------------------------------------------------------
//|
//| Adrian C. Miranda
//|
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
//|
//|-----------------------------------------------------------------------------
//| Utilities
//'-----------------------------------------------------------------------------
