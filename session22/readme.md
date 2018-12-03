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

Under this directory <code>build/classes/kotlin/main</code> you'll find the JS file with a name corresponding to your project. For out simple Kotlin input, the produced JS looks like:
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
In an additionally produced directory (<code>build/classes/kotlin/main/lib</code>) there is <code>kotlin.js</code> file that is Kotlin Runtime to JS. Both files needs to be included in HTML:
``` html
<script type="text/javascript" src="out/production/kjs/lib/kotlin.js"></script>
<script type="text/javascript" src="out/production/kjs/kjs.js"></script>
```

Let's modify our gradle to target JVM from the same Kotlin code:
``` gradle
buildscript {
    ext.kotlin_version = '1.3.10'
    repositories {
        mavenCentral()
    }
    dependencies {
        classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"
    }
}

apply plugin: 'kotlin'
apply plugin: 'application'

mainClassName = 'demo.MainKt'

jar {
    manifest {
        attributes 'Main-Class': 'demo.MainKt'
    }

    // This line of code recursively collects and copies all of a project's files
    // and adds them to the JAR itself. One can extend this task, to skip certain
    // files or particular types at will
    from { configurations.compile.collect { it.isDirectory() ? it : zipTree(it) } }
}

//task wrapper(type: Wrapper) {
//    gradleVersion = "4.10.2"
//}
```
When you run <code>$ gradle clean build</code> this time, under <code>build/classes/kotlin</code> directory you'll find another output. <code>MainKt.class</code> is produced this time that is valid java output, but most important artifact produced there is under <code>build/lib</code> folder. It is <project_name>.jar</code> fat jar (i.e. jar including all dependencies) that is valid for usual Java invocation:

<code>java -jar ./build/libs/<project_name>.jar</code>
---

Continue to next chapter of this session: [Kotlin for Web](https://github.com/olegkleiman/crib/blob/master/session22/KotlinForWeb/readme.md)

