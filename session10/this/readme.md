# *this* and fat arrow functions

Functions are the first-class-citizens in JS. In particular this means that function passed as agrument to another function is undistiguished from any other object.
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
setTimer(callback, 200) // now it passed as an first-class-citizen object but without 'this'
```
