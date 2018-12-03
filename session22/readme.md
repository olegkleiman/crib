# Kotlin

Kotlin code may be transpiled into different targets. Classic Kotlin compiler <code>kotlinc</code> produces the jar valid for JVM, but starting from version 1.1 Kotlin code may be transpiled to JS as well. Kotlin to JS transpiling is done with help of additional compiler: <code>kotlin-js</code>. The produces JS code is usually inserted into HTML page in form of <script> tags and executed as natural JavaScript.
  
The following gradle 
``` gradle
buildscript {
    ext.kotlin_version = '1.3.10'
}
```
