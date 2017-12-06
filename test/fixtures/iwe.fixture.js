import Proto from '~';

export const Ninja = Proto.extends({
	// Objects doesn't affect implementations.
	defaults: {
		ninjateste: '**'
	},
	kill(flush) {
		console.log('kill '+ flush);
		flush && this.flush();
	},
});

export const Human = Proto.extends({
	constructor() {
		console.log('i r human', this.$protoID);
		this.super();
		this.option();
	},
});

export const ChuckNorris = Human.extends({ // inherits the Proto methods too
	defaults: {
		skills: 'ninja'
	},
	implements: [Ninja],
	rise: 3,
	constructor() {
		console.log('i r badass and.. ', this.$protoID);
		this.super();
		this.kill('with thumb');
	},
});

export const Goku = ChuckNorris.extends({ // inherits the Proto methods too
	defaults: {
		superpowers: ['unknown'],
	},
	constructor() {
		console.log('Hello! I\'m Blue Goku and.. ', this.$protoID);
		this.super();
	},
	rise() { // override rise property
		console.log('wait for', this.super(), 'days...'); // super returns rise property from superclass
		return this.super();
	},
});
