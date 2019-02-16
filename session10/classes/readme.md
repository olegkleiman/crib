# JS Classes

JS classes are designed to mimic the OO constructs whenever is possible. This includes encapsulation, inheritance, and polymorphism. Remember, however, that all this JS constructs are just syntax sugar.

## 1. Encapsulation
``` JS
class Point {
  #x = 0;
  #y;

  constructor(x, y) {
    this.#x = x;
    this.#y = y;
  }
  
  get x() { // getter, used here to expose private property
    return this.#x;
  }

};

const point = new Point(2,3);
console.log(point.x);

```
Along with a <i>private methods</i>, the support for a <i>class properties</i> is TC39 [proposal](https://github.com/tc39/proposal-class-fields#private-fields) and only supported only by Babel 7 with [@babel/plugin-proposal-class-properties plugin](https://www.npmjs.com/package/@babel/plugin-proposal-class-properties) and [@babel/plugin-proposal-private-methods](https://www.npmjs.com/package/@babel/plugin-proposal-private-methods).


## 2. Inheritance
``` JS
class Marker extends Point {
  #text;
  
  constructor(text) {
    super(0, 0);

    this.#text = text;
  }

  get text() {
    return this.#text;
  }
};

const marker = new Marker('my marker');
console.log(`${marker.text}  ${marker.x}`); // Pay attention that x is a method of base class

```

## 3. Polymorphism
