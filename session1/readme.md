# Omnipresent JavaScript

JavaScript is always passing the variables by value. However, because the non-primitive types (Objects, functions, and arrays) hold in its values the address (reference) to the allocated object, this reference is actually passed and the callee, hence, is able to change the value of the passed reference.

The same rules of value passing are applied to copying as well: Objects are copied by reference.