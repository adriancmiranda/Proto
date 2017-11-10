import Proto from '~';

export const Ninja = new Proto({
	// Objects doesn't affect implementations.
	defaults:{
		ninjateste:'**'
	},
	kill:function(flush){
		console.log('kill '+ flush);
		flush && this.flush();
	},
});

export const Human = new Proto({
	constructor:function(){
		console.log('i r human', this.$protoID);
		this.super();
		this.option();
	},
});

export const ChuckNorris = new Proto(Human, { // doesn't inherits the Proto methods
	defaults:{
		skills:'ninja'
	},
	implements:[Ninja],
	rise:3,
	constructor:function(){
		console.log('i r badass and.. ', this.$protoID);
		this.super();
		this.kill('with thumb');
	},
});

export const Goku = new Proto(ChuckNorris, { // doesn't inherits the Proto methods
	defaults:{
		superpowers:['unknown'],
	},
	constructor:function(){
		console.log('Hello! I\'m Goku and.. ', this.$protoID);
		this.super();
	},
	rise:function(){ // override rise property
		console.log('wait for', this.super(), 'days...'); // super returns rise property from superclass
		return this.super();
	},
});
