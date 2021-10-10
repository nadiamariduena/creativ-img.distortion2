# SECOND TEST 🍌

<br>
<br>

#### The First time i tried to follow this tutorial i failed.

For that reason I decided to train my skills with another tutorial from the same youtuber, this time things worked differently. I structured the project in a different way before i started the lesson, so i did the same with this one, now i can finally see the project, of course with no animations on the images or the animated scroll, its a good thing because in my first try i had a blank page.

<br>
<br>

#### This is how the project looks before start adding all the animation related elements

[check the default structure here:](src/docs/defaultStructure.md)

<br>

[<img src="/src/img/project_beginning_preview.gif"/>](src/docs/delta-request-animation-frame.md)

<br>
<br>
## So lets start shaping the project:

##### Curtains js requires that the images have a "data" argument, just like the one i used for the first project with the scroll

[]()

> The follwing is required so that canvas js will know **what element needs to be animated / technical: get information and then get rendered with the help of WebGL into a canvas**

```javascript
//
//
//
//  ________________ before________________
//
//
//
<div className={`plane-container ${direction}`}>
  <div className="plane-details">
    <h6>/{title}</h6>
    <div className="vertical-line" />
    <p>{description}</p>
  </div>
  <div className="plane-image">
    <img src={url} alt="" crossOrigin="anonymous" data-sampler="planeTexture" />
    <div className="image" style={{ backgroundColor: `url{${url}}` }} />
  </div>
</div>;
//
//
//
//
//
//
// after ________________after________________
//
//
//
//
import React, { useContext, useRef, useLayoutEffect } from "react";

const PlaneIndex = ({ url, title, index, description }) => {
  // add a ref to the img div
  const planeEl = useRef();

  const direction = index % 2 === 0 ? "direct" : "reverse";
  //
  //
  return (
    <div className={`plane-container ${direction}`}>
      {/*  text  */}
      <div className="plane-details">
        <h6>/{title}</h6>
        <div className="vertical-line" />
        <p>{description}</p>
      </div>

      {/* images */}
      <div className="plane-image" ref={planeEl}>
        <img
          src={url}
          alt=""
          crossOrigin="anonymous"
          data-sampler="planeTexture"
        />
      </div>
    </div>
  );
};
//
//
//
//
//
//
//                   scss _____________________ scss
// before
  .plane-image {
    height: 90vh;


    .image {
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    }
  }
}
// AFTER
  .plane-image {
    height: 90vh;

    img {
      display: none; //it should be hidden but i wanted to see if the images worked
    }

  }
}
```

<br>
<br>
<br>

# crossOrigin="anonymous"

## 🔺 Security and tainted canvases 🔺

```javascript
<img src={url} alt="" crossOrigin="anonymous" data-sampler="planeTexture" />
// "Anonymous" (that is, allow non-authenticated downloading of the image cross-origin).
```

##### Because the pixels in a canvas's bitmap can come from a variety of sources, including images or videos retrieved from other hosts, it's inevitable that security problems may arise.

<u> As soon as you draw into a canvas any data that was loaded from another origin without CORS approval, the canvas becomes tainted.</u> **A tainted canvas is one which is no longer considered secure**, and any attempts to retrieve image data back from the canvas will cause an exception to be thrown.

```html
If the source of the foreign content is an HTML <img /> or SVG
<svg>
  element, attempting to retrieve the contents of the canvas isn't allowed.
</svg>
```

If the foreign content comes from an image obtained from either as HTMLCanvasElement or ImageBitMap, and the image source doesn't meet the same origin rules, attempts to read the canvas's contents are blocked.

##### Calling any of the following on a tainted canvas will result in an error:

- Calling getImageData() on the canvas's context

```html
* Calling toBlob() on the <canvas> element itself</canvas>
```

- Calling toDataURL() on the canvas

> **Attempting any of these when the canvas is tainted will cause a SecurityError to be thrown**. This protects users from having private data exposed by using images to pull information from remote web sites without permission.

#### [read more](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image)

[Cross-Origin Resource Sharing (CORS)](https://www.youtube.com/watch?v=af5RI6bLkyw)

[How To Fix: "null has been blocked by CORS policy" Error in JavaScript AJAX](https://www.youtube.com/watch?v=nx8E5BF0XuE)

<br>
<br>
<hr>
<br>

# 🍪

### Import the curtains from the package curtains

```javascript
import React from "react";
import { Curtains } from "curtainsjs";
```

#### To initialize it

<br>

```javascript
const initialState = {
  curtains: new Curtains({
    pixelRatio: Math.min(1.5, window.devicePixelRatio),
  }),
  container: null,
  scrollEffect: 0,
};
```

<br>
<br>
<hr>
<br>

# Store | redux 🍪 🍫

## _the store in:_ REDUX

> **A store is basically just a plain JavaScript object that allows components to share state**. In a way, we can think of **a store as a database**. On the most fundamental level, both constructs allow us to store data in some form or another.

<br>

#### Install the following in case it doesnt work:

```javascript
npm i redux
// and
npm i react-redux

```

#### What is react REDUX and why do we need it?

##### video : [React and Redux Use Provider to Connect Redux to React](https://www.youtube.com/watch?v=aEmG9nc8eLg)

<u>React-redux are bindings between them</u>

- Redux and React-redux. React-redux just provides bindings for Redux library to simplify working with Redux from React components.

<br>

> **What is React VS Redux?**
> Redux manages state and state transformations and is often used with React, but React has its own concept of state. When using these libraries, it's good to know which to use when. Even if you choose to use Redux in your project, you will still need to make decisions on how much of your data is stored in Redux.
> <br> > **Why Redux is bad?**
> What I Hate About Redux. If you use redux to develop your application, even small changes in functionality require you to write excessive amounts of code. This goes against the direct-mapping principle, which states that small functional changes should result in small code changes.

<br>

> **Redux is used by too many react developers without thinking twice! Applied mindlessly like that, redux does more harm than good!** I will show the fields in which redux shines and — most importantly — I will point out the situations in which redux is the wrong tool in my strong opinion.

[Don’t use Redux!](https://orgler.medium.com/dont-use-redux-9e23b5381291)

<br>
<br>

# The Provider

#### 🔴 the provider will bring the store to all our components with the help of redux

> Overview. The <Provider> component makes the Redux store available to any nested components that need to access the Redux store. **Since any React component in a React Redux app can be connected to the store, most applications will render a <Provider> at the top level, with the entire app's component tree inside of it.**

<br>

```javascript
import React from "react";
import { Curtains } from "curtainsjs";

const initialState = {
  //1. here you are grabbing data from the curtains package and passing
  //  it to the initialState, then it will be
  // passed to the const CurtainsContext = React.createContext(initialState);
  // and then to this: const { Provider } = CurtainsContext;
  //
  curtains: new Curtains({
    pixelRatio: Math.min(1.5, window.devicePixelRatio), //default
  }),
  container: null, // is the element canvas
  scrollEffect: 0, //default sroll position min:5:49 video: https://youtu.be/mkmKy0XURK4
};
//
//
//
//2.  The following 2 lines will be passed to the canvas, plane and Home
const CurtainsContext = React.createContext(initialState);
//  THE PROVIDER
const { Provider } = CurtainsContext;
//
//
// 4. You get the children from Props
const CurtainsProvider = ({ children }) => {
  //
  //

  // 3. from this: const { Provider } = CurtainsContext;
  return <Provider value={{}}>{children}</Provider>;
};

export { CurtainsContext, CurtainsProvider };
```

<br>
<br>

# The Reducer 🥛 🍪

###### 1.

```javascript
// import React from "react";
// 5.
import React, { useReducer } from "react";
import { Curtains } from "curtainsjs";

const initialState = {
  //1. here you are grabbing data from the curtains package and passing
  //  it to the initialState, then it will be
  // passed to the const CurtainsContext = React.createContext(initialState);
  // and then to this: const { Provider } = CurtainsContext;
  //
  curtains: new Curtains({
    pixelRatio: Math.min(1.5, window.devicePixelRatio), //default
  }),
  container: null, // is the element canvas
  scrollEffect: 0, //default sroll position min:5:49 video: https://youtu.be/mkmKy0XURK4
};
//
//
//
//2.  The following 2 lines will be passed to the canvas, plane and Home
const CurtainsContext = React.createContext(initialState);
//  THE PROVIDER
const { Provider } = CurtainsContext;
//
//
// 4. You get the children from Props
const CurtainsProvider = ({ children }) => {
  //
  //
  //6. the actual value of the provider
  // the dispatch function comes from the reducer
  const [state, dispatch] = useReducer(() => {}, initialState);

  // 3. from this: const { Provider } = CurtainsContext;
  return <Provider value={{}}>{children}</Provider>;
};

export { CurtainsContext, CurtainsProvider };
```

###### 2.

## Pass the _redux dispatch function_ 🥛

#### What is Dispatch in redux?

> Dispatch is a function of the Redux store. You call store. dispatch to dispatch an action. This is the only way to trigger a state change. With React Redux, your components never access the store directly - connect does it for you.

<br>

```javascript
// 5.
import React, { useReducer } from "react";
import { Curtains } from "curtainsjs";

const initialState = {
  //1. here you are grabbing data from the curtains package and passing
  //  it to the initialState, then it will be
  // passed to the const CurtainsContext = React.createContext(initialState);
  // and then to this: const { Provider } = CurtainsContext;
  //
  curtains: new Curtains({
    pixelRatio: Math.min(1.5, window.devicePixelRatio), //default
  }),
  container: null, // is the element canvas
  scrollEffect: 0, //default sroll position min:5:49 video: https://youtu.be/mkmKy0XURK4
};
//
//
//
//2.  The following 2 lines will be passed to the canvas, plane and Home
const CurtainsContext = React.createContext(initialState);
//  THE PROVIDER
const { Provider } = CurtainsContext;
//
//
// 4. You get the children from Props
const CurtainsProvider = ({ children }) => {
  //
  //6. the actual value of the provider
  // the dispatch function comes from the reducer
  //   THE DISPATCH
  const [state, dispatch] = useReducer(() => {}, initialState);

  // 3. from this: const { Provider } = CurtainsContext;
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
  // 7. pass the  values from the step 6. to the provider
};
```

 <br>
 <br>

# 🍪

## Now we will <u>set the container and the scroll effect</u>

- START by adding the REDUCER , then the SWITCH

- the reducer: **useReducer((state, action)**

> **The switch statement** is used to perform different actions based on different conditions.

##### [The JavaScript Switch Statement](https://www.w3schools.com/js/js_switch.asp)

<br>

 <br>

```javascript
// import React from "react";
// 5.
import React, { useReducer } from "react";
import { Curtains } from "curtainsjs";

const initialState = {
  //1. here you are grabbing data from the curtains package and passing
  //  it to the initialState, then it will be
  // passed to the const CurtainsContext = React.createContext(initialState);
  // and then to this: const { Provider } = CurtainsContext;
  //
  curtains: new Curtains({
    pixelRatio: Math.min(1.5, window.devicePixelRatio), //default
  }),
  container: null, // is the element canvas
  scrollEffect: 0, //default sroll position min:5:49 video: https://youtu.be/mkmKy0XURK4
};
//
//
//
//2.  The following 2 lines will be passed to the canvas, plane and Home
const CurtainsContext = React.createContext(initialState);
//  THE PROVIDER
const { Provider } = CurtainsContext;
//
//
// 4. You get the children from Props
const CurtainsProvider = ({ children }) => {
  //
  //6. the actual value of the provider
  // the dispatch function comes from the reducer
  //   THE DISPATCH
  const [state, dispatch] = useReducer((state, action) => {
    // 8. here the callback gives  "the current state and action"

    //
    // 9. default
    switch (key) {
      case value:
        break;

      default:
        break;
    }
  }, initialState);

  // 3. from this: const { Provider } = CurtainsContext;
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
  // 7. pass the  values from the step 6. to the provider
};
export { CurtainsContext, CurtainsProvider };
```

<br>
<br>

## What is action type in Redux?

> **switch (action.type) {** Actions are the only source of information for the store as per Redux official documentation. It carries a payload of information from your application to store. As discussed earlier, actions are plain JavaScript object that must have a type attribute to indicate the type of action performed.

<br>

### What is action payload in Redux?

> Payload is what is keyed ( the key value pairs ) in your actions and passed around between reducers in your redux application. For example - const someAction = { type: "Test", payload: {user: "Test User", age: 25}, } This is a generally accepted convention to have a type and a payload for an action

#### Action #
An action, is an object that contains the payload of information. They are the only source of information for the Redux store to be updated. Reducers update store based on the value of the action.type. Here we will define the action.type as ADD_TO_CART.

>According to the official Redux documentation, actions are the only things that trigger changes in a Redux application, they contain the payload for changes to an application store. Actions are JavaScript objects that tell Redux the type of action to be performed, **usually they’re defined as functions like the one below**

[How Redux Reducers Work](https://www.smashingmagazine.com/2020/12/how-redux-reducers-work/#:~:text=An%20action%2C%20is%20an%20object%20that%20contains%20the%20payload%20of%20information.&text=The%20code%20above%20is%20a,the%20state%20of%20the%20application.)
<br>

### What is an action payload?

> While action types allow you tell your reducer what action it should take, the payload is the data that your reducer will use to update the state. This lesson shows you how to pass an action payload along with your action type to update the state.
  

<br>

```javascript
// import React from "react";
// 5.
import React, { useReducer } from "react";
import { Curtains } from "curtainsjs";

const initialState = {
  //1. here you are grabbing data from the curtains package and passing
  //  it to the initialState, then it will be
  // passed to the const CurtainsContext = React.createContext(initialState);
  // and then to this: const { Provider } = CurtainsContext;
  //
  curtains: new Curtains({
    pixelRatio: Math.min(1.5, window.devicePixelRatio), //default
  }),
  container: null, // is the element canvas
  scrollEffect: 0, //default sroll position min:5:49 video: https://youtu.be/mkmKy0XURK4
};
//
//
//
//2.  The following 2 lines will be passed to the canvas, plane and Home
const CurtainsContext = React.createContext(initialState);
//  THE PROVIDER
const { Provider } = CurtainsContext;
//
//
// 4. You get the children from Props
const CurtainsProvider = ({ children }) => {
  //
  //6. the actual value of the provider
  // the dispatch function comes from the reducer
  const [state, dispatch] = useReducer((state, action) => {
    // 8. here the call back gives  "the current state and actions"

    //
    // 9. pass the action from step 8.
    switch (action.type) {
      case "SET_CURTAINS_CONTAINER":
        return {
          ...state,
          container: action.payload,
        };
      // 10. to update the scroll effect
      case "SET_SCROLL_EFFECT": {
        return {
          ...state,
          scrollEffect: action.payload,
        };
      }

      default:
        throw new Error();
      /*

    The throw statement throws a 
    user-defined exception. Execution 
    of the current function will stop 
    (the statements after throw won't be executed),
    and control will be passed to the first catch 
    block in the call stack. If no catch block exists
    among caller functions, the program will terminate.
    

    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw
    */
    }
  }, initialState);

  // 3. from this: const { Provider } = CurtainsContext;
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
  // 7. pass the  values from the step 6. to the provider
};
export { CurtainsContext, CurtainsProvider };
```
