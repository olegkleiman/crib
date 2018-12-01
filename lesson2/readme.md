# JS Callbacks

The script shown in first lesson was extraordinary simple. Now we going to extend it with a <code>callback</code>. Known not only in JS realm, the callback is another function that is called from within the original invocation. Due to the nature of JS, the callbacks are very flexible: one may omit the callback at all or may provide the callback implementation with a different set of received parameters.

To this extent, it is good practice to check every piece of your code related to the callback: was it was passed, may you call it with or without the parameters you intend to pass out?

The JS function [considered](index.js) in this lesson explicitly checks the passed callback before actually invoke it.
Run this example under NodeJS:
``` bash
node --inspect-brk index.js
node index.js
```

The problem with this code is that it includes <code>console.log</code> which is only known to JS Runtime under NodeJS or browser. For other environments, like iOS or Android, we need to mock it somehow.

Let's modify the example in order to run it under iOS:
``` Swift
import JavaScriptCore

let jvm: JSVirtualMachine = JSVirtualMachine()
let context: JSContext = JSContext(virtualMachine: jvm)!
let script = """
                function triple(value, cb) {
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
Note using Swift 4 [multistring literal support](https://github.com/apple/swift-evolution/blob/master/proposals/0168-multi-line-string-literals.md) in this modified code.
