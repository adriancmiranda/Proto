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

describe('Proto.unbindAll', function(){
	it('is available to be called', function(){
		assert.equal('function', typeof(Proto.unbindAll));
	});
});

describe('Proto.bindAll', function(){
	it('is available to be called', function(){
		assert.equal('function', typeof(Proto.bindAll));
	});
});

describe('Proto.unbind', function(){
	it('is available to be called', function(){
		assert.equal('function', typeof(Proto.unbind));
	});
});

describe('Proto.bind', function(){
	it('is available to be called', function(){
		assert.equal('function', typeof(Proto.bind));
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

describe('Proto.prototype.unbindAll', function(){
	it('is available to be called', function(){
	});
});

describe('Proto.prototype.bindAll', function(){
	it('is available to be called', function(){
	});
});

describe('Proto.prototype.flush', function(){
	it('is available to be called', function(){
	});
});

