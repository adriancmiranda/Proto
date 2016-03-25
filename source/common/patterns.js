
define(function(){
	'use strict';

	return({
		objWrap:/^(\[object(\s|\uFEFF|\xA0))|(\])$/g,
		fnDecl:/^.*function\s([^\s]*|[^\(]*)\([^\x00]+$/
	});
});