# JS Callbacks

The script shown in the first lesson was extraordinary simple. Now we going to extend it with a <code>callback</code>. Known not only in JS realm, the callback is another function that is called from within the original invocation. Due to the nature of JS, the callbacks are very flexible: one may omit the callback at all or may provide the callback implementation with a different set of received parameters.

To this extent, it is good practice to check every piece of your code related to the callback: was it was passed, may you call it with or without the parameters you intend to pass out?

The JS function [considered](index.js) in this lesson explicitly checks the passed callback before actually invoke it.
Run this example under NodeJS:
``` bash
node --inspect-brk index.js
node index.js
```
Note that as least as for NddeLS version 8.9.3, no additional efforts needed to support ES6 in this code.


The problem with this code is that it includes <code>console.log</code> which is only known to JS Runtime under NodeJS or browser. For other environments, like iOS or Android, we need to mock it somehow.

Let's modify the example in order to run it under iOS with <b>Swift 4</b>:
``` Swift
import JavaScriptCore
...
let jvm: JSVirtualMachine = JSVirtualMachine()
let context: JSContext = JSContext(virtualMachine: jvm)!
let script = """
            const triple = (value, cb) => {
              const res = value * 3;
              if( cb ) {
                cb(res);
              } else {
                return res;
              }
            }

            triple(11);
"""

let res = context.evaluateScript(script)
```
Note using Swift 4 [multistring literal support](https://github.com/apple/swift-evolution/blob/master/proposals/0168-multi-line-string-literals.md) in this modified code. Because the callback is not passed in this excerpt, <code>if</code> statement is extended here to <code>else</code> block that is simply return the calculated value. 

Although Java has the [proposal](https://blog.joda.org/2008/01/java-7-multi-line-string-literals_594.html) for multiline string support, but under Android, it hasn't been implemented yet, so out <b>Java</b> code might looks like:
``` Java 
import com.eclipsesource.v8.V8;
...
V8 runtime = V8.createV8Runtime();

Integer res = runtime.executeIntegerScript(
    "const triple = (value, cb) => {\n" +
    "const res = value * 3;\n" +
    "if( cb ) {\n" +
        "cb(res);\n" +
    "} else {\n" +
        "return res;\n" +
        "}\n" +
    "}\n" +
    "triple(11)\n");
```
The excepted return will be the same as in Swift case, although iOS expoits JavaSciptCore as JS Engine and Java under Android used V8 Engine.

<b>Kotlin</b> in this case is only different on by its more modern syntax:
``` Kotlin
import com.eclipsesource.v8.V8
...
val runtime = V8.createV8Runtime()
val script = """
        const triple = (value, cb) => {
          const res = value * 3;
          if( cb ) {
            cb(res);
          } else {
            return res;
          }
        }
        triple(11)
"""
val res = runtime.executeIntegerScript(script)
```

We got around the callback so far, but surely it wasn't our intention for this lesson. On the contrary, we wanted to demonstrate how to use them. So let's provide purely JS callback instead on <code>console.log</code>
``` javascript
const log = (message) => {
 ...
}
...
triple(11, log);
```
---

Continue to next chapter of this session: [Native callbacks](https://github.com/olegkleiman/crib/blob/master/session2/nativeCallbacks/readme.md)

