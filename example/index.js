var Proto = require('Proto');

var Vec3 = new Proto({
	constructor:function(x, y, z){
		this.position(x, y, z);
	},
	position:function(x, y, z){
		this.x = x >>> 0;
		this.y = y >>> 0;
		this.z = z >>> 0;
		return this;
	},
	toObject:function(){
		return { x: this.x, y: this.y, z: this.z };
	},
});

var Rectangle = new Proto(Vec3, {
	constructor:function(x, y, z, width, height){
		this.super(x, y, z);
		this.width = width >>> 0;
		this.height = height >>> 0;
	},
	position:function(x, y, z){
		console.log('Rectangle: position changed!');
		return this.super(x, y, z);
	},
	toObject:function() {
		var offset = this.super();
		offset.width = this.width;
		offset.height = this.height;
		return offset;
	},
});

var rect = new Rectangle(10, 20, 0, 100, 80);
rect.position(1, 2).toObject();
