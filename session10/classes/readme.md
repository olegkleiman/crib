# JS Classes

JS classes are designed to mimic the OO constructs whenever is possible. This includes encapsulation, inheritance and polymorpism.

## 1. Encapsulation
``` JS
class Point {
  #x = 0;
  #y;

  constructor(x, y) {
    this.#x = x;
    this.#y = y;
  }

};
```
Along with a <i>private methods</i>, the support for a <i>class properties</i> is TC39 proposal and only supported only by Babel 7 with [@babel/plugin-proposal-class-properties plugin](https://www.npmjs.com/package/@babel/plugin-proposal-class-properties) and [@babel/plugin-proposal-private-methods](https://www.npmjs.com/package/@babel/plugin-proposal-private-methods).


## 2. Inheritance

## 3. Polymorphism
