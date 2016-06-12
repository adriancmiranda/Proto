'use strict';

var assert = require('chai').assert;
var Proto = require('../dist/Proto');

describe('Proto', function(){
	var Dummy;

	before(function(){
		Dummy = Proto.extends({
			constructor:function(){
			}
		});
	});

	after(function(){
		Dummy.flush();
	});

	it('is available to be called', function(){
		assert.equal('function', typeof(Proto));
	});
});

describe('Proto.VERSION', function(){
	it('can be found', function(){
		assert.equal('string', typeof(Proto.VERSION));
	});
});

describe('Proto.create', function(){
	it('is available to be called', function(){
		assert.equal('function', typeof(Proto.create));
	});
});

describe('Proto.implements', function(){
	it('is available to be called', function(){
		assert.equal('function', typeof(Proto.implements));
	});
});

describe('Proto.unproxyAll', function(){
	it('is available to be called', function(){
		assert.equal('function', typeof(Proto.unproxyAll));
	});
});

describe('Proto.proxyAll', function(){
	it('is available to be called', function(){
		assert.equal('function', typeof(Proto.proxyAll));
	});
});

describe('Proto.unproxy', function(){
	it('is available to be called', function(){
		assert.equal('function', typeof(Proto.unproxy));
	});
});

describe('Proto.proxy', function(){
	it('is available to be called', function(){
		assert.equal('function', typeof(Proto.proxy));
	});
});

describe('Proto.overload', function(){
	it('is available to be called', function(){
		assert.equal('function', typeof(Proto.overload));
	});
});

describe('Proto.merge', function(){
	it('is available to be called', function(){
		assert.equal('function', typeof(Proto.merge));
	});
});

describe('Proto.flush', function(){
	it('is available to be called', function(){
		assert.equal('function', typeof(Proto.flush));
	});
});

describe('Proto.keys', function(){
	it('is available to be called', function(){
		assert.equal('function', typeof(Proto.keys));
	});
});

describe('Proto.copy', function(){
	it('is available to be called', function(){
		assert.equal('function', typeof(Proto.copy));
	});
});

describe('Proto.ape', function(){
	it('is available to be called', function(){
		assert.equal('function', typeof(Proto.ape));
	});
});

describe('Proto.of', function(){
	it('is available to be called', function(){
		assert.equal('function', typeof(Proto.of));
	});
});

describe('Proto.extends', function(){
	it('is available to be called', function(){
		assert.equal('function', typeof(Proto.extends));
	});
});

describe('Proto.prototype.toImplement', function(){
	it('is available to be called', function(){
	});
});

describe('Proto.prototype.overload', function(){
	it('is available to be called', function(){
	});
});

describe('Proto.prototype.setOptions', function(){
	it('is available to be called', function(){
	});
});

describe('Proto.prototype.getOptions', function(){
	it('is available to be called', function(){
	});
});

describe('Proto.prototype.unproxyAll', function(){
	it('is available to be called', function(){
	});
});

describe('Proto.prototype.proxyAll', function(){
	it('is available to be called', function(){
	});
});

describe('Proto.prototype.flush', function(){
	it('is available to be called', function(){
	});
});

