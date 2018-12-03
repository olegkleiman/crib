# Kotlin

Kotlin code may be transpiled into different targets. Classic Kotlin compiler <code>kotlinc</code> produces the jar valid for JVM, but starting from version 1.1 Kotlin code may be transpiled to JS as well. Kotlin to JS transpiling is done with help of additional compiler: <code>kotlin-js</code>. The produces JS code is usually inserted into HTML page in form of <script> tags and executed as natural JavaScript.
  
The following gradle targets JS by utilizing <code>kotlin2js</code> plugin:
``` gradle
buildscript {
    ext.kotlin_version = '1.3.10'
}
plugins {
    id 'kotlin2js' version '1.3.0'
}

repositories {
    mavenCentral()
}

dependencies {
    implementation "org.jetbrains.kotlin:kotlin-stdlib-js:$kotlin_version"
}
```

Just build the project with defaulf file structure as

<code>$ gradle</code>

and observe produced <code>build</code> directory.

Under this directory: <code>build/classes/kotlin/main</code> you'll find the JS file with a name corresponding to your project. For out simple Kotlin input, the produced JS looks like:
``` javascript
if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'kgjs'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'kgjs'.");
}
var kgjs = function (_, Kotlin) {
  'use strict';
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  function main(args) {
    var message = 'Hello Kotlin!';
    println(message);
  }
  _.main_kand9s$ = main;
  main([]);
  Kotlin.defineModule('kgjs', _);
  return _;
}(typeof kgjs === 'undefined' ? {} : kgjs, kotlin);
```
