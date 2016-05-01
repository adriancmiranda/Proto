
![Proto](http://i.imgur.com/CEEbHaw.gif)

> __Proto__ is an extensible program-code-template for creating objects

[![build status][travis_build_status_image]][travis_build_status_url]
[![dependencies status][david_dependencies_status_image]][david_dependencies_status_url]
[![devDependency status][david_devdependencies_status_image]][david_devdependencies_status_url]
[![Codacy Badge][codacy_status_image]][codacy_status_url]
[![License][shields_license_image]][shields_license_url]

<!-- travis -->
[travis_build_status_image]: https://travis-ci.org/adriancmiranda/Proto.svg?branch=master
[travis_build_status_url]: https://travis-ci.org/adriancmiranda/Proto "build status"

<!-- david dependencies -->
[david_dependencies_status_image]: https://david-dm.org/adriancmiranda/Proto.svg?theme=shields.io
[david_dependencies_status_url]: https://david-dm.org/adriancmiranda/Proto "dependencies status"

<!-- david devDependencies -->
[david_devdependencies_status_image]: https://david-dm.org/adriancmiranda/Proto/dev-status.svg?theme=shields.io
[david_devdependencies_status_url]: https://david-dm.org/adriancmiranda/Proto#info=devDependencies "devDependencies status"

<!-- shields.io -->
[shields_license_image]: https://img.shields.io/badge/license-MIT-blue.svg
[shields_license_url]: https://github.com/adriancmiranda/Proto/blob/master/LICENSE.md

<!-- codacy -->
[codacy_status_image]: https://api.codacy.com/project/badge/Grade/75cc315f21fa4f3fa51b8fb0dfc36c67
[codacy_status_url]: https://www.codacy.com/app/adriancmiranda/Proto?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=adriancmiranda/Proto&amp;utm_campaign=Badge_Grade


What you need to build your own Proto
-----------------------------------------

In order to build Proto, you need to have the latest node/npm and git 1.7 or later. Earlier versions might work, but are not supported.

For Windows, you have to download and install [git](http://git-scm.com/downloads) and [node](http://nodejs.org/download/).

OS X users should install [git](http://git-scm.com/download).

Linux/BSD users should use their appropriate package managers to install git and node, or build from source
if you swing that way. Easy-peasy.


How to build your own Proto
-------------------------------
Clone a copy of the main Proto git repo by running:

```bash
git clone git://github.com/adriancmiranda/Proto.git
```

Enter the Proto directory and run the install script and the build script:

```bash
cd Proto && npm i && npm run build
```

The built version of Proto will be put in the `dist/` subdirectory, along with the minified copy and associated map file.


Get Started
-----------

## Installation

### Links to CDN
* [Proto.js](https://rawgit.com/adriancmiranda/Proto/master/dist/Proto.js)
* [Proto.min.js](https://cdn.rawgit.com/adriancmiranda/Proto/master/dist/Proto.min.js)
* [Proto.min.map](https://cdn.rawgit.com/adriancmiranda/Proto/master/dist/Proto.min.map)

Use this URL for dev/testing

```html
<script src="https://rawgit.com/adriancmiranda/class.js/master/dist/Proto.js"></script>
```

Use this URL in production

```html
<script src="https://cdn.rawgit.com/adriancmiranda/class.js/master/dist/Proto.min.js"></script>
```

### via JSPM
`jspm install adriancmiranda/Proto`

### via Bower
`bower install adriancmiranda/Proto`

### via NPM
`npm install adriancmiranda/Proto`

### via Component
`component install adriancmiranda/Proto`

### Node/Browserify/Webpack

```javascript
var Proto = require('Proto');
```


Usage
-----

```javascript

var Ninja = Proto.extends({
	options:{ ninjateste:'**' }, // Objects doesn't affect implementations.
	kill:function(flush){
		console.log('kill '+ flush);
		flush && this.flush();
	}
});

var Human = Proto.extends({
	constructor:function(){
		console.log('i r human', this.$protoID);
		this.super();
	}
});

var ChuckNorris = Human.extends({
	options:{ skills:'ninja' },
	implements:[Ninja],
	constructor:function(){
		console.log('i r badass and.. ', this.$protoID);
		this.super();
		this.kill('with thumb');
	},
	rise:3
});

var Goku = ChuckNorris.extends({
	options:{ superpowers:['unknown'] },
	constructor:function(){
		console.log('Hello! I\'m goku and.. ', this.$protoID);
		this.super();
	},
	rise:function(){ // override rise property
		console.log('wait for', this.super(), 'days...'); // super returns rise property from superclass
		return this.super();
	}
});

var chuck = new ChuckNorris();
chuck.kill('again!');
console.log('chuck:', chuck instanceof Proto); // true
console.log('chuck:', chuck instanceof Ninja); // false
console.log('chuck:', chuck instanceof Human); // true
console.log('chuck:', chuck instanceof ChuckNorris); // true
console.log('chuck.options:', chuck.options);
console.log('chuck:', chuck);

var goku = new Goku();
goku.rise();
console.log('goku:', goku);

```

## License

[MIT](https://github.com/adriancmiranda/class.js/blob/master/LICENSE.md)
