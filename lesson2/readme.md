# JS Callbacks

The script shown in first lesson was extraordinary simple. Now we going to extend it with a <code>callback</code>. Known not only in JS realm, the callback is another function that is called from within the original invocation. Due to the nature of JS, the callbacks are very flexible: one may omit the callback at all or may provide the callback implementation with a different set of received parameters.

To this extent, it is good practice to check every piece of your code related to the callback: was it was passed, may you call it with or without the parameters you intend to pass out?

The JS function [considered](index.js) in this lesson explicitly checks the passed callback before actually invoke it.
