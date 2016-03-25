describe('Proto', function(){
	var Proto = require('../dist/Proto');

	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// SimpleHTTPServer
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	var SimpleHTTPServer = Proto(function SimpleHTTPServer(){
		console.log('SimpleHTTPServer created', arguments);
	});

	SimpleHTTPServer.prototype.start = function(){
		console.log('SimpleHTTPServer started', arguments);
	};

	SimpleHTTPServer.prototype.stop = function(){
		console.log('SimpleHTTPServer stopped', arguments);
	};

	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// HTTPServer
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	var HTTPServer = Proto(function HTTPServer(){
		HTTPServer.super.apply(this, arguments);
	}).extends(SimpleHTTPServer);

	HTTPServer.prototype.start = function(){
		HTTPServer.super.prototype.start.apply(this, arguments);
		console.log('HTTPServer started');
	};

	HTTPServer.prototype.stop = function(){
		HTTPServer.super.prototype.stop.apply(this, arguments);
		console.log('HTTPServer stopped');
	};

	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// Server
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	var Server = Proto(function Server(){
		Server.super.apply(this, arguments);
	}).extends(HTTPServer);

	Server.prototype.start = function(){
		Server.super.prototype.start.apply(this, arguments);
		console.log('Server started');
	};

	Server.prototype.stop = function(){
		Server.super.prototype.stop.apply(this, arguments);
		console.log('Server stopped');
	};

	Server.prototype.startup = function(){
		console.log('Server up and running!');
	};

	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// Tests
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	var server = new Server('custom');

});