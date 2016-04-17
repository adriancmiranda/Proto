describe('Proto', function(){
	var Proto = require('../dist/Proto');

	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // SimpleHTTPServer
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    var SimpleHTTPServer = new Proto(function SimpleHTTPServer(){
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
        Proto.bindAll(this);
    }).extends(SimpleHTTPServer).public('start', function(){
        HTTPServer.super.prototype.start.apply(this, arguments);
        console.log('HTTPServer started');
    }).public('stop', function(){
        HTTPServer.super.prototype.stop.apply(this, arguments);
        console.log('HTTPServer stopped');
    });

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Server
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    var Server = Proto(function Server(){
        Server.super.apply(this, arguments);
    })

    Server.extends(HTTPServer);

    Server.public('start', function(){
        Server.super.prototype.start.apply(this, arguments);
        console.log('Server started', Proto.keys(this));
    });

    Server.charge('listen', function(){
        console.log('listen http://%s:%i', '0.0.0.0', 3000);
    });

    Server.charge('listen', function(port){
        console.log('listen http://%s:%i', '0.0.0.0', port || 3000);
    });

    Server.charge('listen', function(host, port){
        console.log('listen http://%s:%i', host || '0.0.0.0', port || 3000);
    });

    Server.public('stop', function(){
        Server.super.prototype.stop.apply(this, arguments);
        console.log('Server stopped');
    });

    Server.public('startup', function(){
        this.start('server 1');
        this.start('server 2');
        this.start('server 3');
        console.log('Server up and running!');
    }).static('killAll', function(){
        console.log('Killed!');
    });

	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// Tests
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	var server = new Server('custom');
	server.startup();
	Server.killAll();

	console.log(
		server instanceof Server &&
		server instanceof HTTPServer &&
		server instanceof SimpleHTTPServer
	);

	console.log('--')


	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// !SimpleHTTPServer
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	SimpleHTTPServer = Proto.extends({
		initialize:function(){
			console.log('SimpleHTTPServer created', arguments);
		},
		start:function(){
			console.log('SimpleHTTPServer started', arguments);
		},
		stop:function(){
			console.log('SimpleHTTPServer stopped', arguments);
		}
	});

	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// !HTTPServer
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	HTTPServer = SimpleHTTPServer.extends({
		initialize:function(){
			HTTPServer.super.initialize.apply(this, arguments);
			Proto.bindAll(this);
		},
		start:function(){
			HTTPServer.super.start.apply(this, arguments);
			console.log('HTTPServer started');
		},
		stop:function(){
			HTTPServer.super.stop.apply(this, arguments);
			console.log('HTTPServer stopped');
		}
	});

	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// !Server
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	Server = HTTPServer.extends({
		initialize:function(){
			Server.super.initialize.apply(this, arguments);
		},
		start:function(){
			Server.super.start.apply(this, arguments);
			console.log('Server started', Proto.keys(this));
		},
		listen:function(){
			console.log('listen http://%s:%i', '0.0.0.0', 3000);
		},
		listen:function(port){
			console.log('listen http://%s:%i', '0.0.0.0', port || 3000);
		},
		listen:function(host, port){
			console.log('listen http://%s:%i', host || '0.0.0.0', port || 3000);
		},
		stop:function(){
			Server.super.stop.apply(this, arguments);
			console.log('Server stopped');
		},
		startup:function(){
			this.start('server 1');
			this.start('server 2');
			this.start('server 3');
			console.log('Server up and running!');
		}
	});

	Server.killAll = function(){
		console.log('Killed!');
	};

	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// !Tests
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	server = new Server('yourServerNameAgain');
	server.startup();
	Server.killAll();

	console.log(
		server instanceof Server &&
		server instanceof HTTPServer &&
		server instanceof SimpleHTTPServer &&
		server instanceof Proto
	);

});
