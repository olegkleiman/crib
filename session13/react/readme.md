# React

React declares itself as a component-based framework, but these components definitely play a minor role in the main play of React: rendering. Probably, it is possible to express rendering with other constructs, but it seems convenient to base the presentational framework on a component concept, thus to model the UI with a tree of independent blocks where each of them is responsible for its own piece of the screen. 

The most important thing is that each component has the required <i>render()</i> method where it defines how its part of the screen looks. React is orchestrating these renderers with the focal mechanism called reconciliation that without a doubt is a central part of this framework. 

Reconciliation may render the components' output to HTML but Android, iOS or Occulus screens may also be a target. The promising idea is that the component itself won't know where it is rendering.

Classic React component was expressed by [JS classes](https://github.com/olegkleiman/crib/blob/master/session10/classes/readme.md), but for the last two years React team was working hard to make it possible to make the functional components (that are regular JS functions) to a first-class objects in React realm.

## Functional components
Any code that ends up with returning a React element considered a component. Usually React elements are returned from JSX, like;
``` JSX
 return <MyComponent theme='dark' />
```
When Babel JSX sees the code like this, it transpiles this code (with a help of Babel) to 
``` js
 return React.createElement(...)
```
This essentially equals to defining new object
``` js
 return ({
  type: 'MyComponent',
  props: {
    theme: 'dark'
  }
 })
```
Then it ultimately tries to instantiate something that has a <i>render()</i> method. This something shouldn't be a JS class.
 
Curly braces inside JSX serve as a bridge between JSX world and JS world. If the expression comess to JSX embraced with cirly beaces, it is interpreted as a request to evaluate the embraced content with a normal JS context established by execution so far.
