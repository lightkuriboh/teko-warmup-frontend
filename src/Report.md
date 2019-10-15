
# React  
## Fundamentals  
### JSX  
    * Syntax extension to javascript  
    * Definition how UI should look like  
    * Will be use as "createElement"  
### Component and Props  
    * Component as a function  
    * Props is the ofject which contain references to the values passed to child component by the parent component  
### State    
    * Each component will contain a State as a object  
    * The State is modified my "setState()"  
### Life-circle methods  
#### Constructor  
    * Initialization stage at life-circle, invoked once  
    * Place to bind methods and set initial state  
    * Invoke "getDerivedFromPros" static method  
#### Render  
    * Place to render DOM  
    * Invoked multiple times, once before the component is fully mounted and whenever the State is modified or Parent component is re-rendered  
#### componentDidMount  
    * Invoked once when it and all of its child are render properly  
    * Place to call HTTP request for further data  
#### componentShouldUpdate  
    * Place to control the re-render of the component  
#### Other life-circle methods will not be explained here  
  
# Redux  
## Introduction  
    An state management library  
## Principles  
    * The State of whole application is stored in an object tree within a single Object  
    * State is read-only  
    * Changes are made with pure functions  
## How to use  
    * Actions with action's type and payload  
    * Reducers that are compouned with pure functions  
    
# Reactn  
    *  Not different from redux  

# Hooks  
    * Category of function that let coder to "hook" into React state and life circle from functional components    
    * Statefull classes -> stateless functions  
    * Just to Reduce lines of code and Make components easier to be understanded and maintained  
    
