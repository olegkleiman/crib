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

<b>TBD</b>

The most complete example of method injection comes with an imitation of NodeJS where the <b>C++</b> node firstly instantiates V8 Engine and then adds the method to its context. First goes V8 instance (called <i>isolate</i>) preparation stage.
``` C++
#include <v8.h>
#include "libplatform/libplatform.h"

// v8 stuff
v8::Isolate* isolate;
v8::Local<v8::Context> context;

int main(int argc, char * argv[]) {

    v8::V8::InitializeICUDefaultLocation(argv[0]);
    v8::V8::InitializeExternalStartupData(argv[0]);
    std::unique_ptr<v8::Platform> platform = v8::platform::NewDefaultPlatform();
    v8::V8::InitializePlatform(platform.get());
    
    v8::V8::Initialize();
    v8::V8::SetFlagsFromCommandLine(&argc, argv, true);
    
    v8::Isolate::CreateParams create_params;
    create_params.array_buffer_allocator = v8::ArrayBuffer::Allocator::NewDefaultAllocator();
    
    isolate = v8::Isolate::New(create_params);
    
    v8::Isolate::Scope isolate_scope(isolate);
    v8::HandleScope handle_scope(isolate);

    context = CreateContext(isolate);
 }   
```
The most interesting things are in <code>CreateContext</code> method:
``` C++
v8::Local<v8::Context> CreateContext(v8::Isolate* isolate) {
    // Create a template for the global object.
    v8::Local<v8::ObjectTemplate> global = v8::ObjectTemplate::New(isolate);
    
    // Bind the global 'print' and '_read_file' functions to the C++ callbacks.
    global->Set(
                v8::String::NewFromUtf8(isolate, "_read_file", v8::NewStringType::kNormal)
                .ToLocalChecked(),
                v8::FunctionTemplate::New(isolate, ReadFile));

    global->Set(
                v8::String::NewFromUtf8(isolate, "print", v8::NewStringType::kNormal)
                .ToLocalChecked(),
                v8::FunctionTemplate::New(isolate, Print));

    return v8::Context::New(isolate, NULL, global);
}
```

And finally C++ methods bound to JS context within the previous excerpt:
```C++
// The callback that is invoked by v8 whenever the JavaScript '_read_file'
// function is called.
void ReadFile(const v8::FunctionCallbackInfo<v8::Value>& args) {
...
}
...
// The callback that is invoked by v8 whenever the JavaScript 'print'
// function is called.  Prints its arguments on stdout separated by
// spaces and ending with a newline.
void Print(const v8::FunctionCallbackInfo<v8::Value>& args) {
...
}
```



