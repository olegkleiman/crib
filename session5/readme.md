# JS Runtime

>This session provides very technical information and may be difficult for the unprepared reader. Generally, you may omit this session, but it's highly advised to return there when you feel ready.

## Preface
JS is single-thread language, meaning that within its execution context only one piece od code may run at time. The rest of exection may be run in parallel but outside of JS context, i.e. in JS Runtime.

1. [NodeJS EventLoop and UV](https://github.com/olegkleiman/crib/blob/master/session5/eventLoop/readme.md)
2. [V8, JSC, Chakra and others](https://github.com/olegkleiman/crib/blob/master/session5/v8/readme.md)
3. Inject C++ objects and functions into JS context: NodeJS
4. NodeJS C++ Add-ons
5. Call C++ from JS