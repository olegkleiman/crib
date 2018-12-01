# Native callbacks

From Engine's point of view there is no difference between native and JS callback. Both are simply required to be registered in the JS context. If for JS callbacks that we saw in the previous section, this happens "automatically", the native callback should be registered programmatically. Moreover, because the callback is just a function, this registration is mostly the same for any function/method exposed from native to JS land.

<b>Swift</b> makes the process of native methods registration very simple. It's a simplest among all other languages considered here. The exposed method must be declared with [@convention attribute](https://docs.swift.org/swift-book/ReferenceManual/Attributes.html#convention):
``` Swift
private let consoleLog: @convention(block) (String) -> Void = { logMessage in
            print("\nJS Console:", logMessage)
}
```

Then with modified the script that calls this exposed method
``` javascript
triple(11, consoleLog); // pay attention to a callback name: it is the name of the exposed with @convention method
```

The invocation itself looks like:
``` Swift
let jvm: JSVirtualMachine = JSVirtualMachine()
let context: JSContext = JSContext(virtualMachine: jvm)!
...
let consoleLogObject = unsafeBitCast(self.consoleLog, to: AnyObject.self)
context.setObject(consoleLogObject, forKeyedSubscript: "consoleLog" as (NSCopying & NSObjectProtocol))
let res = context.evaluateScript(script)

```
See [this discussion](https://gist.github.com/JadenGeller/ccc62c4316e8c225c259) about <code>unsafeBitCast</code>. The method registration itself happens in [JSContext.setObject](https://developer.apple.com/documentation/javascriptcore/jscontext/1451416-setobject). Needless to say that this technique works only for iOS.

For <b>Java</b> under Android, native method exposition takes interesting forms. 
Firstly, [JavascriptInterface](https://developer.android.com/reference/android/webkit/JavascriptInterface) is ultimately exposes any method decorated with this attribute to JavaScript. It seems intended for use from WebView, but may have a broader client base.

The most completed example of such injection comes with an imitation of NodeJS where the C++ node firstly instantiates V8 Engine and then adds the method to its context:
``` C++
```

This way 

