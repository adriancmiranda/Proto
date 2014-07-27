class.js
========

An extensible program-code-template for creating objects

## How to install __class.js__ in your project

```bash
bower install --save class=adriancmiranda/class.js
```

## Planning

```javascript
var Event = Class.create({
  constructor: function (target) {
    this.target = target;
  },
  on: function () {
  },
  off: function () {
  },
  trigger: function () {
  }
});

var Observable = Class.create({
  addObserver: function () {
  },
  countObservers: function () {
  },
  deleteObserver: function () {
  },
  deleteObservers: function () {
  },
  hasChanged: function () {
  },
  notifyObservers: function () {
  },
  notifyObservers: function () {
  }
});

var Robot = Class.create({
  extends: [Observable, Event]
  constructor: function (super, name, target) {
    this.name = name;
    super(target);
  },
  move: function () {
  },
  run: function () {
  },
  turnOff: function () {
  },
  showState: function () {
  },
  setVisible: function () {
  },
  isVisible: function () {
  }
});

var eva = new Robot();
