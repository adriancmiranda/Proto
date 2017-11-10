import * as iwp from 'fixtures/iwp.fixture';
import * as iwe from 'fixtures/iwe.fixture';
import Proto from '~';

const goku = new iwp.Goku();
const blueGoku = new iwe.Goku();

describe('Proto', function(){
	it('is available to be called', function(){
		expect(Proto).toEqual(jasmine.any(Function));
	});
});

describe('Proto.VERSION', function(){
	it('can be found', function(){
		expect(Proto.VERSION).toEqual(jasmine.any(String));
	});
});

describe('Proto.create', function(){
	it('is available to be called', function(){
		expect(Proto.create).toEqual(jasmine.any(Function));
	});
});

describe('Proto.implements', function(){
	it('is available to be called', function(){
		expect(Proto.implements).toEqual(jasmine.any(Function));
	});
});

describe('Proto.unproxyAll', function(){
	it('is available to be called', function(){
		expect(Proto.unproxyAll).toEqual(jasmine.any(Function));
	});
});

describe('Proto.proxyAll', function(){
	it('is available to be called', function(){
		expect(Proto.proxyAll).toEqual(jasmine.any(Function));
	});
});

describe('Proto.unproxy', function(){
	it('is available to be called', function(){
		expect(Proto.unproxy).toEqual(jasmine.any(Function));
	});
});

describe('Proto.proxy', function(){
	it('is available to be called', function(){
		expect(Proto.proxy).toEqual(jasmine.any(Function));
	});
});

describe('Proto.overload', function(){
	it('is available to be called', function(){
		expect(Proto.overload).toEqual(jasmine.any(Function));
	});
});

describe('Proto.merge', function(){
	it('is available to be called', function(){
		expect(Proto.merge).toEqual(jasmine.any(Function));
	});
});

describe('Proto.flush', function(){
	it('is available to be called', function(){
		expect(Proto.flush).toEqual(jasmine.any(Function));
	});
});

describe('Proto.keys', function(){
	it('is available to be called', function(){
		expect(Proto.keys).toEqual(jasmine.any(Function));
	});
});

describe('Proto.copy', function(){
	it('is available to be called', function(){
		expect(Proto.copy).toEqual(jasmine.any(Function));
	});
});

describe('Proto.ape', function(){
	it('is available to be called', function(){
		expect(Proto.ape).toEqual(jasmine.any(Function));
	});
});

describe('Proto.of', function(){
	it('is available to be called', function(){
		expect(Proto.of).toEqual(jasmine.any(Function));
	});
});

describe('Proto.extends', function(){
	it('is available to be called', function(){
		expect(Proto.extends).toEqual(jasmine.any(Function));
	});
});

describe('Proto.prototype.implement', function(){
	it('is available to be called', function(){
		expect(blueGoku.implement).toEqual(jasmine.any(Function));
	});
});

describe('Proto.prototype.overload', function(){
	it('is available to be called', function(){
		expect(blueGoku.overload).toEqual(jasmine.any(Function));
	});
});

describe('Proto.prototype.option', function(){
	it('is available to be called', function(){
		expect(blueGoku.option).toEqual(jasmine.any(Function));
	});
});

describe('Proto.prototype.unproxyAll', function(){
	it('is available to be called', function(){
		expect(blueGoku.unproxyAll).toEqual(jasmine.any(Function));
	});
});

describe('Proto.prototype.proxyAll', function(){
	it('is available to be called', function(){
		expect(blueGoku.proxyAll).toEqual(jasmine.any(Function));
	});
});

describe('Proto.prototype.flush', function(){
	it('is available to be called', function(){
		expect(blueGoku.flush).toEqual(jasmine.any(Function));
	});
});
