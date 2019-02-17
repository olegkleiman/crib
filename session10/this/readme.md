# *this* and fat arrow functions

Functions are the first-class objects ([?](https://en.wikipedia.org/wiki/First-class_citizen) in JS. In particular, this means that function passed as an argument to another function is undistinguished from any other object.
``` JS
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  name() {
    console.log(`x: ${x} y: ${y}`);
  }
};

function setTimeout(callback, delay) {
  // ...
  callback();
}

const point = new Point(7,5);
const callback = point.name; // Here name() loses 'this'
setTimer(callback, 200) // now it passed as an first-class object object but without 'this'
```
