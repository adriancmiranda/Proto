module.exports = function requirejs(grunt, opts){
	'use strict';

	// Optimize RequireJS projects using r.js
	// @see https://github.com/gruntjs/grunt-contrib-requirejs
	return({
		src:{
			options:{
				baseUrl:'<%= scaffold.source %>',
				name:'main',
				out:'<%= scaffold.static %>/<%= name %>.js',
				optimize:'none',
				findNestedDependencies:true,
				skipSemiColonInsertion:true,
				skipModuleInsertion:true,
				useStrict:true,
				rawText: {},
				wrap:{
					startFile:'<%= scaffold.source %>/wrap/opening.js',
					endFile:'<%= scaffold.source %>/wrap/closure.js'
				},
				onBuildWrite:function(name, path, script){
					var fileName;
					if(/.\/common\//.test(path)){
						fileName = (/common\/([\w-]+)/.exec(name)[1]);
						script = script.replace(/define\([^{]*?{/, '');
						script = script.replace(/[^{]*(\'|\")use\sstrict(\'|\")\s*;*(\n|\r)/g, '');
						script = script.replace(/return\s*/, 'var '+fileName+' = ');
						script = script.replace(/\s\}\s*?\);*[^}\w]*$/, '');
					}else if(/.\/global\//.test(path)){
						fileName = (/global\/([\w-]+)/.exec(name)[1]);
						script = script.replace(/define\([^{]*?{/, '');
						script = script.replace(/[^{]*(\'|\")use\sstrict(\'|\")\s*;*(\n|\r)/g, '');
						script = script.replace(/return\s*/, 'window.'+fileName+' = ');
						script = script.replace(/\s\}\s*?\);*[^}\w]*$/, '');
					}else{
						script = script.replace(/\/\/ jshint ignore\:line/, '');
						script = script.replace(/define\([^{]*?{/, '');
						script = script.replace(/define\(\[[^\]]*\]\)[\W\n]+$/, '');
						script = script.replace(/[^{]*(\'|\")use\sstrict(\'|\")\s*;*(\n|\r)/g, '');
						script = script.replace(/\s*exports\.\w+\s*=\s*\w+;/g, '');
						script = script.replace(/\/\*\s*ExcludeStart\s*\*\/[\w\W]*?\/\*\s*ExcludeEnd\s*\*\//ig, '');
						script = script.replace(/\/\/\s*BuildExclude\n\r?[\w\W]*?\n\r?/ig, '');
						script = script.replace(/\s*return(\s+|\(+)[^\}]+(\}\s*?\);*[^\w\}]*)$/, '$2');
						script = script.replace(/\}\s*?\);*[^}\w]*$/, '');
					}
					return script;
				}
			}
		}
	});
};
