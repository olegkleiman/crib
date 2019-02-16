# React

React declares itself as a component-based framework, but these components play a subordinate role in the main play of React: rendering. Probably, it is possible to express rendering with other constructs, but it seems convenient to base the presentational framework on a component concept, thus to model the UI with a tree of independent blocks where each of them is responsible for its own piece of the screen. 
The most important thing is that each component has the required <i>render()</i> method where it defines how its has the required <i>render()</i> method where it defines how its part of the screen looks. React is orchestrating these renderers with the focal mechanism called reconciliation that without a doubt is a central part of this framework. 
Reconciliation may render the components' output to HTML but Android, iOS or Occulus screens may also be a target. The promising idea is that the component itself won't know where it is rendering.

Classic React component was expressed with JS classes but for the last two years React team was working hard to make it possible to make functional components that are regular JS functions a first-class citizen in React realm.

