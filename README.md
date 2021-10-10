# 🍌

# CREDITS:

Big thanks to **[
Nicu Barbaros](https://github.com/nicubarbaros)** , for sharing this **Great tutorial** on how to get started with Locomotive scroll and canvas/WebGl.

<br>

# About the project:

### Creative Agency Style Image Distortion Effect With Curtains.js & React

> Curtains.js was created with just that issue in mind. It is a small vanilla WebGL javascript library that converts HTML elements containing images, videos and canvases into 3D WebGL textured planes, allowing you to animate them via shaders.

<br>
<br>

### SECOND TEST 🍌 🌴

<br>

#### The First time i tried to follow this tutorial i failed.

For that reason I decided to develop my skills with another [tutorial](https://github.com/nadiamariduena/skew-distortion-on-scroll-locomotive) from the same youtuber, this time things worked differently. I structured the project in a different way before i started the lesson, so i did the same with this one, now i can finally see the project, of course with no animations on the images or the animated scroll, its a good thing because in my first try i had a blank page.

[skew-distortion-on-scroll-locomotive](https://github.com/nadiamariduena/skew-distortion-on-scroll-locomotive)

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

#### I never added "order" to the grids and i think i find it interesting, i will definitely invest some time to see what else i can do with it.

[<img src="/src/img/grid_order_css_styles.gif"/>](src/docs/delta-request-animation-frame.md)

<br>
<br>
<br>

```javascript
crossOrigin = "anonymous";
```

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

<br>

> **NOTE:** The reason why i care about explaining the redux here below, is not because i want to have some knowledge, but because i am planning to create a shop after 1 more tutorial with another scroll, and it will be a M.E.R.N one so the faster i get to understand it the better/easier it will be.

<br>

## _the store in:_ REDUX

- **A store is basically just a plain JavaScript object that allows components to share state**. In a way, we can think of **a store as a database**. On the most fundamental level, both constructs allow us to store data in some form or another.

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
> <br> **Why Redux is bad?**
> What I Hate About Redux. If you use redux to develop your application, even small changes in functionality require you to write excessive amounts of code. This goes against the direct-mapping principle, which states that small functional changes should result in small code changes.

<br>

> **Redux is used by too many react developers without thinking twice! Applied mindlessly like that, redux does more harm than good!** I will show the fields in which redux shines and — most importantly — I will point out the situations in which redux is the wrong tool in my strong opinion.

[Don’t use Redux!](https://orgler.medium.com/dont-use-redux-9e23b5381291)

[<img src="/src/img/redux_funny.gif"/>](src/docs/delta-request-animation-frame.md)

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

#### Action

An action, is an object that contains the payload of information. They are the only source of information for the Redux store to be updated. Reducers update store based on the value of the action.type. Here we will define the action.type as ADD_TO_CART.

> According to the official Redux documentation, actions are the only things that trigger changes in a Redux application, they contain the payload for changes to an application store. Actions are JavaScript objects that tell Redux the type of action to be performed, **usually they’re defined as functions like the one below**

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

<br>
<br>

# Export the store data

### As we read in the previous steps... 🥛

- 🍌 the provider will bring the store to all our components with the help of redux

> Overview. The <Provider> component makes the Redux store available to any nested components that need to access the Redux store. **Since any React component in a React Redux app can be connected to the store, most applications will render a <Provider> at the top level, with the entire app's component tree inside of it.**

<br>

### **Go to:** Home.js: and <u>Wrap the following data inside the Provider:</u>

#### While there, add the following:

> We will access the context we worked inside the **reduxStore.js**

```javascript
import React from "react";
// the images
import photoData from "./photoData";
import { CurtainsProvider } from "./store/reduxStore";

//
import Canvas from "./Canvas/CanvasIndex";
import Plane from "./Plane/PlaneIndex";

const Home = () => {
  return (
    //
    // related store REDUX
    <CurtainsProvider>
      // // PROVIDER WRAPPING *** //
      <div className="banner top" />
      <div id="page-content">
        {photoData.map(({ url, title, description }, index) => (
          <Plane
            key={url}
            index={index}
            url={url}
            title={title}
            description={description}
          />
        ))}
      </div>
      <Canvas />
      <div className="banner bottom" />
      // // PROVIDER WRAPPING ***
    </CurtainsProvider>
  );
};

export default Home;
```

<br>

### <u>Go to the Canvas folder</u> and open the index.jsx: , add the useRef and check if its correctly set up to export to the Home.js

<br>

```javascript
import React, { useRef } from "react";

export default function Canvas() {
  //
  //
  const container = useRef();
  //
  //
  return <div className="Canvas" ref={container}></div>;
}
```

<br>

- I added an **opacity to a pink BG** so to see where i am, also the text

[<img src="/src/img/canvas_1.gif"/>](src/docs/delta-request-animation-frame.md)

<br>

#### I DECIDED to change the component from functional component to a class component

> **THE REASON**

- I get an error when i try to put in place something instead of something else:

```javascript
// This is the original code that works for the youtuve video
// STRANGELY dont work for me
import Plane from "./Plane";
import Canvas from "./Canvas";
// This code works
import Canvas from "./Canvas/CanvasIndex";
import Plane from "./Plane/PlaneIndex";
```

- I tried to change the name of the file inside the Canvas exactly as he did but nothing, i think its maybe due to certain packages he has.(some prettifiers, less etc)

<br>

### This is how it looks now

<br>

```javascript
import React, { useEffect } from "react";

//
// the images
import photoData from "./photoData";
import { CurtainsProvider } from "./store/reduxStore";

//
import Canvas from "./Canvas/CanvasIndex";
import Plane from "./Plane/PlaneIndex";

class Home extends React.Component {
  render() {
    return (
      <CurtainsProvider>
        {/* 
  
  */}
        <div className="banner top" />
        <div id="page-content">
          {photoData.map(({ url, title, description }, index) => (
            <Plane
              key={url}
              index={index}
              url={url}
              title={title}
              description={description}
            />
          ))}
        </div>

        <Canvas />

        <div className="banner bottom" />
        {/* 
  
  */}
      </CurtainsProvider>
    );
  }
}

export default Home;
```

<br>
<br>

### Now we need to go back to the CanvasIndex.jsx

> We will be working on:

- SETTING UP THE CONTAINER
- UPDATING THE SCROLL EFFECT (when the user scroll)

<br>

#### 1. First thing to do: ACCESS the Context

> **Note:** i removed and changed a couple of things

```javascript
import React, { useContext, useRef } from "react";
import { CurtainsContext } from "../store/reduxStore";
// import { CurtainsContext } from "../store/reduxStore";

export default function CanvasIndex() {
  //
  //
  // related store REDUX
  const { state, dispatch } = useContext(CurtainsContext);
  //
  //
  const container = useRef();
  //
  //
  return (
    <div className="Canvas" ref={container}>
      hello hhhhhhhhhhhhhhhh
    </div>
  );
}
```

<br>

### 2. Add the UseLayout Effect

> **What is the useLayoutEffect**
> The useLayoutEffect works similarly to useEffect but rather working asynchronously like useEffect hook, <u>it fires synchronously after all DOM loading is done loading.</u> This is useful for synchronously re-rendering the DOM and also to read the layout from the DOM.

<br>

#### uselayouteffect vs useEffect

- useLayoutEffect is identical to useEffect, but it's major key difference is that **it gets triggered synchronously after all DOM mutation**. ... This hook is optimized, to allow the engineer to make changes to a DOM node directly before the browser has a chance to paint.

<br>

#### What runs first useEffect or useLayoutEffect?

Even though the useLayoutEffect Hook is placed after the useEffect Hook, the useLayoutEffect Hook is triggered first!

<br>
<br>

> 🔴 DEFAULT: you will have errors until you insert your own data

```javascript
import React, { useContext, useRef, useLayoutEffect } from "react";
import { CurtainsContext } from "../store/reduxStore";
// import { CurtainsContext } from "../store/reduxStore";

export default function CanvasIndex() {
  //
  //
  // related store REDUX
  const { state, dispatch } = useContext(CurtainsContext);
  //
  // DEFAULT: you will have errors until you insert your own data
  //
  useLayoutEffect(() => {
    effect;
    return () => {
      cleanup;
    };
  }, [input]);

  //
  //
  const container = useRef();
  //
  //
  return (
    <div className="Canvas" ref={container}>
      hello hhhhhhhhhhhhhhhh
    </div>
  );
}
```

<br>
<br>

#### Modify and add certain things

- change the position of the use **Ref={container}**
- add the following to the useLayoutEffect: **[container, state, dispatch]);**

- Get the curtains from the state const **const {curtains} = state;**
- Check if the container is rendered

<br>
<br>

```javascript
import React, { useContext, useRef, useLayoutEffect } from "react";
import { CurtainsContext } from "../store/reduxStore";
// import { CurtainsContext } from "../store/reduxStore";

export default function CanvasIndex() {
  //
  //1
  const container = useRef();
  //
  //
  //
  //
  // related store REDUX
  const { state, dispatch } = useContext(CurtainsContext);
  //
  // DEFAULT: you will have errors until you insert your own data
  //
  useLayoutEffect(() => {
    //3
    const { curtains } = state;
    //
    //4
    if (container.current && !curtains.container) {
      // we will dispatch an action to the reducer
    }
    //
    //
    return () => {
      cleanup;
    };
    // 2
  }, [container, state, dispatch]);

  //
  //

  //
  //
  return (
    <div className="Canvas" ref={container}>
      hello hhhhhhhhhhhhhhhh
    </div>
  );
}
```

<br>
<br>

### Work on the "ACTION", pass the dispatch function (the one from the redux store)

> If you check the reduxStore, "in the initialState", the curtains is an Object:

```javascript
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
```

### so in the CanvasIndex.js we have to set the container to our **.Canvas**

- set the container to our canvas: **curtains.setContainer(container.current);**

- grab the **curtains.setContainer** from the library and assign the element: **curtains.setContainer(container.current);**

```javascript
export default function CanvasIndex() {
  //
  //
  const container = useRef();
  //
  //
  //
  //
  // related store REDUX
  const { state, dispatch } = useContext(CurtainsContext);
  //
  // DEFAULT: you will have errors until you insert your own data
  //
  useLayoutEffect(() => {
    //
    const { curtains } = state;
    //
    //
    if (container.current && !curtains.container) {
      // we will dispatch an action to the reducer

      //here you are grabing the el from the library and assign to it
      curtains.setContainer(container.current);
      //
      //
      //
      dispatch({
        type: "SET_CURTAINS_CONTAINER",
        payload: curtains.container,
      });
    }
    //
    //
    return () => {
      cleanup;
    };
  }, [container, state, dispatch]);

  //
  //

  //
  //
  return (
    <div className="Canvas" ref={container}>
      hello hhhhhhhhhhhhhhhh
    </div>
  );
}
```

<br>

# LERP

#### 🔺 Now we will listen few functions for the library | This will give smoothness to the scroll ans also that kind of bouncing back of the scroll when the user stops scrolling

> more or less like this

[<img src="/src/img/lerp_preview.gif"/>](https://stackoverflow.com/questions/50514712/smooth-lerping-through-list-of-vector3s/50515902)

[Smooth lerping through list of vector3's](https://stackoverflow.com/questions/50514712/smooth-lerping-through-list-of-vector3s/50515902)

### But what is Lerp?

#### _LERP_ FUNCTION to ease and smoothing out a value (for the scroll effect)

[Processing / p5.js Tutorial: What is lerp? (Linear Interpolation)](https://www.youtube.com/watch?v=8uLVnM36XUc) ⬅️

<br>

[Lerp function - Anmation javascript canvas ](https://www.youtube.com/watch?v=UGMyHSelK00)

[Modulating values with Lerp - Unity Official Tutorials ](https://www.youtube.com/watch?v=cD-mXwSCvWc)

<br>

[Easy Animations in Three.js React With Vector3 Lerp ](https://codeworkshop.dev/blog/2020-10-20-easy-animations-in-three-js-react-with-vector3-lerp/)

<br>
<br>

# ☕

## The following text doesn't seem related but believe me its, as if you want to do stuff with Threejs(WebGL) its the same.

<br>

#### Imagine you have an object in a 3D scene and you want to change the position.

- That is pretty easy to do in React Three Fiber or ThreeJS. Just set the position attributes on the object and it will pop to the new location.

<br>

##### Now what if instead of the object popping immediately to the new position you want to animate it moving from the old position to the new position.

<br>

> **You could implement this yourself or you could use the fantastically useful lerp method**

- Which is on the Three.js Vector3 type. A Vector3 is a class that is used to represent most values which have x, y, and z coordinates in Three.js so you can use it to animate many object transforms like position, scale, or rotation. For this demonstration we will animate the position of a cube.
  > <br> The lerp method takes as its first argument another vector to interpolate towards, and a second argument called the alpha. You can think of the alpha as the speed at which the position should interpolate towards the new vector.

[Easy Animations in Three.js React With Vector3 Lerp](https://codeworkshop.dev/blog/2020-10-20-easy-animations-in-three-js-react-with-vector3-lerp/)

```javascript
import * as THREE from "three";
const vec = new THREE.Vector3();
const vec2 = new THREE.Vector3();
vec.lerp(vec2, 0.1);
```

 <br>

#### Lets continue ...

> So this is what we have until now:

 <br>

```javascript
export default function CanvasIndex() {
  //
  //
  const container = useRef();
  //
  //
  //
  //
  // related store REDUX
  const { state, dispatch } = useContext(CurtainsContext);
  //
  // DEFAULT: you will have errors until you insert your own data
  //
  useLayoutEffect(() => {
    //
    const { curtains } = state;
    //
    //
    if (container.current && !curtains.container) {
      // we will dispatch an action to the reducer

      //here you are grabing the el from the library and assign to it
      curtains.setContainer(container.current);
      //
      // Now we will listen few functions for the library, so that
      // if something happens: we try to restore the contextwhen the canvas renders ???
      // confusing explanation from the youtuber
      // min: 14:22   https://youtu.be/mkmKy0XURK4
      //
      curtains
        .onContextLost(() => {
          curtains.restoreContext();
        }) //L . E . R . P
        .onRender(() => {
          //When the canvas render we have a scroll effect
          //   BUT FIRST SET UP the new useRef
        });
      //
      //
      //
      dispatch({
        type: "SET_CURTAINS_CONTAINER",
        payload: curtains.container,
      });
    }
    //
    //
    return () => {
      cleanup;
    };
  }, [container, state, dispatch]);

  //
  //

  //
  //
  return (
    <div className="Canvas" ref={container}>
      hello hhhhhhhhhhhhhhhh
    </div>
  );
}
```

<br>
<br>

## SET UP a new useRef

- and assign it a 'previous value' of the scroll effect

> const someRef = useRef({ scrollEffect: 0 });

```javascript
export default function CanvasIndex() {
  //
  //
  const container = useRef();
  //L . E . R . P related
  const someRef = useRef({ scrollEffect: 0 });
  //
  //
  //
  // related store REDUX
  const { state, dispatch } = useContext(CurtainsContext);
  //
  // DEFAULT: you will have errors until you insert your own data
  //
  useLayoutEffect(() => {
    //
    const { curtains } = state;
    //
    //
    if (container.current && !curtains.container) {
      // we will dispatch an action to the reducer

      //here you are grabing the el from the library and assign to it
      curtains.setContainer(container.current);
      //
      // Now we will listen few functions for the library, so that
      // if something happens: we try to restore the contextwhen the canvas renders ???
      // confusing explanation from the youtuber
      // min: 14:22   https://youtu.be/mkmKy0XURK4
      //
      curtains
        .onContextLost(() => {
          curtains.restoreContext();
        })
        .onRender(() => {
          //L . E . R . P  -----------
          //When the canvas render we have a scroll effect
          //   BUT FIRST SET UP the new useRef
          const newScrollEffect = curtains.lerp(
            someRef.current.scrollEffect,
            0,
            0.075
          );
          // 0, 0.075   when we will stop scrolling the elements will stop moving "smoothly"

          someRef.current.scrollEffect = newScrollEffect;
          // action: type
          dispatch({
            type: "SET_SCROLL_EFFECT",
            payload: newScrollEffect,
          });
          //--------------------------
        });

      //
      //
      //
      dispatch({
        //action: type
        type: "SET_CURTAINS_CONTAINER",
        payload: curtains.container,
      });
    }
    //
    // to stop the error , until we reach this area
    // return () => {
    //   cleanup;
    // };
  }, [container, state, dispatch]);

  //
  return (
    <div className="Canvas" ref={container}>
      hello hhhhhhhhhhhhhhhh
    </div>
  );
}
```

<br>
<br>

### The Lerp method

- Takes as its first argument another vector to interpolate towards, and a second argument called the alpha. You can think of the alpha as the speed at which the position should interpolate towards the new vector.

```javascript
const newScrollEffect = curtains.lerp(
  someRef.current.scrollEffect,
  // when we will stop scrolling the elements will stop moving SMOOTHLY

  0,
  0.075
);
```

<br>
<br>

## DELTA 🍨

### <u>Delta is great for consistency of the update method . You don't want your movement to be influenced by the framerate.</u>

##### Read the article to understand the uses of DELTA and why its necessary in case of animations, its IMPORTANT!

#### [Delta for games](https://isaacsukin.com/news/2015/01/detailed-explanation-javascript-game-loops-and-timing)

[Loop forever and provide delta time](https://stackoverflow.com/questions/13996267/loop-forever-and-provide-delta-time)

##### gameloop using delta time

[stackoverflow question: gameloop using delta time](https://stackoverflow.com/questions/31998251/javascript-gameloop-using-delta-time)

> I have researched on requestAnimationFrame and none of the explenations seem to be useful.

- requestAnimationFrame is a special timer. Unlike setInterval which executes the callback repeatedly after a given minimum of milliseconds, requestAnimationFrame executes variably to achieve smooth framerates.

> **The problem is how requestAnimationFrame achieves that. Depending on the situation, it may run faster or slower.** What this means is that if your update logic was tied to requestAnimationFrame directly, a character running at "one step per update" would travel 60 steps in one second when requestAnimationFrame is running at 60fps, but then would only do 40 when it throttles down to 40fps.

- To counteract this sudden speed-up/slow-down of the timer, we use "delta time". Instead of depending on each iteration of requestAnimationFrame to call an update, you check the time between frames to see if it is the right time to call an update.

- So lets say your character should do a step every 100ms. If the game ran at 60fps, 100ms is roughly every 6 frames. This means that for each iteration, your code checks to see if 100ms has elapsed. Around the 6th frame it does, and calls update. Now if the timer ran at 40fps, 100ms is around 4 frames. So same logic, on each iteration it checks if 100ms elapsed. At the 4th frame it does and calls update. With this, you are insured that update is consistently being called regardless of the fluctuations.

<br>

##### [Using requestAnimationFrame with React Hooks](src/docs/delta-request-animation-frame.md)

<br>
<br>

# \* times 🚀 Dichotomy Paradox

[<img src="/src/img/DichotomyParadox_times_explana.gif"/>](https://www.ted.com/talks/colm_kelleher_what_is_zeno_s_dichotomy_paradox/transcript?language=en#t-236201)

> That which is in locomotion must arrive at the half-way stage before it arrives at the goal.
> — as recounted by Aristotle, Physics VI:9, 239b10

<br>
 
### [What is Zeno's Dichotomy Paradox? | TED talks](https://www.ted.com/talks/colm_kelleher_what_is_zeno_s_dichotomy_paradox/transcript?language=en#t-236201)

#### <u>Dichotomy paradox</u>

- to use on the .onScroll(() => {

- this will help to understand the use of (\* times):

  > delta.y \* 1.5,

  <br>

  #### the negative values

  ```javascript
  const delta = curtains.getScrollDeltas();
  // now we set the delta in the y direction and the -y ,
  // (because we need the opposite values when scrolling)
  delta.y = -delta.y;
  ```

  [<img src="/src/img/delta_negativeValues.gif"/>](https://www.youtube.com/watch?v=X-4tIs00NvM)

<br>

```javascript
        .onRender(() => {
                //       DATA HERE - read the code above
        })
        .onScroll(() => {
          // this callback we will use to update the scroll effect, when
          // the canvas is scrolled by the user.
          // we will need to get the delta

          // DELTA ** ///

          const delta = curtains.getScrollDeltas();
          // now we set the delta in the y direction and the -y ,
          // (because we need the opposite values when scrolling)
          delta.y = -delta.y;

          //---*-- BELOW:  we will lerp again the values, this time you will ,
          // multiply the values, it has to do with the ftp (frames times per second) or some complicated stuff related to the bouncing back
          // another nice article:  https://stackoverflow.com/questions/43720669/lerp-with-time-deltatime

          const newScrollEffect = curtains.lerp(
            someRef.current.scrollEffect,
            delta.y * 1.5,
            0.5
          );
          // update/Dispatch the scroll
          someRef.current.scrollEffect = newScrollEffect;
          dispatch({
            type: "SET_SCROLL_EFFECT",
            payload: newScrollEffect,
          });
          //  DELTA ** ///
        });
```

<br>
<br>

# Clamp the value

> **In computer science, we use the word clamp as a way to restrict a number between two other numbers**. When clamped, a number will either keep its own value if living in the range imposed by the two other values, take the lower value if initially lower than it, or the higher one if initially higher than it.

##### As a quick example before going any further: [Clamping a Number](https://css-tricks.com/snippets/sass/clamping-number/)

<br>

- In the tutorial

[clamp the value: 18:40](https://youtu.be/mkmKy0XURK4)

##### "We need to clamp the value of the DELTA as it can be really big and really small"

> He is making reference to the scrolling strength to the y and -y direction

<br>

```javascript
//
if (container.current && !curtains.container) {
  // we will dispatch an action to the reducer

  //here you are grabing the el from the library and assign to it
  curtains.setContainer(container.current);
  //
  // Now we will listen few functions for the library, so that
  // if something happens: we try to restore the contextwhen the canvas renders ???
  // confusing explanation from the youtuber
  // min: 14:22   https://youtu.be/mkmKy0XURK4
  //
  // You will update the container in the function on the bottom,
  // dispatch({});

  curtains
    .onContextLost(() => {
      curtains.restoreContext();
    })
    .onRender(() => {
      //L . E . R . P
      //When the canvas render we have a scroll effect
      //   BUT FIRST SET UP the new useRef
      const newScrollEffect = curtains.lerp(
        someRef.current.scrollEffect,
        0,
        0.075
      );
      // 0, 0.075   when we will stop scrolling the elements will stop moving "smoothly"

      someRef.current.scrollEffect = newScrollEffect;
      //
      dispatch({
        type: "SET_SCROLL_EFFECT",
        payload: newScrollEffect,
      });
      //
    })
    .onScroll(() => {
      // this callback we will use to update the scroll effect, when
      // the canvas is scrolled by the user.
      // we will need to get the delta

      // DELTA ** ///

      const delta = curtains.getScrollDeltas();
      // now we set the delta in the y direction and the -y ,
      // (because we need the opposite values when scrolling)
      delta.y = -delta.y;
      /*
CLAMP ***

"We need to clamp the value of 
the DELTA as it can be really big and really small"


https://css-tricks.com/snippets/sass/clamping-number/

*/
      // threshold | CLAMP ***
      if (delta.y > 60) {
        delta.y = 60;
      } else if (delta.y < -60) {
        delta.y = -60;
      }
      /*




*/
      //---*--  we will lerp again the values, this time you will ,
      // multiply the values, it has to do with the ftp (frames times per second)
      // another nice article:  https://stackoverflow.com/questions/43720669/lerp-with-time-deltatime

      const newScrollEffect = curtains.lerp(
        someRef.current.scrollEffect,
        delta.y * 1.5,
        0.5
      );
      // update/Dispatch the scroll
      someRef.current.scrollEffect = newScrollEffect;
      dispatch({
        type: "SET_SCROLL_EFFECT",
        payload: newScrollEffect,
      });
      //  DELTA ** ///
    });
  //
  //
  //update/Dispatch the container from the top
  dispatch({
    type: "SET_CURTAINS_CONTAINER",
    payload: curtains.container,
  });
}
```

#### UNHIDE THE RETURN:

- from here below:

```javascript
          //  DELTA ** ///
        });
      //
      //
      //update/Dispatch the container from the top
      dispatch({
        type: "SET_CURTAINS_CONTAINER",
        payload: curtains.container,
      });
    }
    //
    //
    // return () => {
    //   cleanup;
    // };
  }, [container, state, dispatch]);

  //
  //

  //
```

### And add the following:

```javascript
// dispose curtains if we're unmounting the component (shouldn't ever happen)
return () => {
  curtains.dispose();
};
```

<br>

# dispose();

> In the context of C#, **dispose is an object method invoked to execute code required for memory cleanup and release and reset unmanaged resources**, such as file handles and database connections. ... The Dispose method, provided by the IDisposable interface, implements Dispose calls.

In my Threejs Scenes I will use it like this:

> If I want to use an image as material, I must to think about to kill the re rendering, so if you have many you can imagine what can happen, the scene will probably not be seen due to heavy performance.

```javascript
//Here is the image
this.bodyCroco = this.loaderImg.load("./img/medium_smallSquaresCroco____.png");
//  Here is the material, the image is inside of it

this.crocoMatPhysical = new THREE.MeshPhysicalMaterial({
  emissive: 0x000000,
  flatShading: false,
  roughness: 0,
  side: THREE.DoubleSide,
  map: this.bodyCroco,
  reflectivity: 1,
});
```

<br>

### Heavy performance ⚠️

#### For the <u>disposing</u> you can do it either in the Mesh where you are using it or in the <u>componentWillUnmount(){}</u>

- I like to do it in componentWillUnmount(){}, as its more organized, and i can put all the stuff I want to dispose() there instead of having it all in the mesh:

```javascript
this.bodyCroco.dispose();
this.crocoMatPhysical.dispose();
```

<br>

##### One of the things i don't understand, is that it works but for one element: ( RectAreaLightUniformsLib) it worked differently ,(how i know it works?: my computer stops overheating.

> The First time i came across the dispose() method was just by curiosity, when looking to solve another issue related to my threejs scene (few months ago), i fell upon that dispose() in one piece of code by someone else, for me it was a mystery as it was the first time i saw the dispose() on the bottom of a mesh. After researching, i figure it out it had to do with 'better performance', **so i thought what if i add this to the componentWillUnmount(){} instead of the mesh?**

<br>

[<img src="/src/img/overheating_dispose1.gif"/>]()

<br>

#### [How to reduce CPU usage? (overheating)](https://discourse.threejs.org/t/how-to-reduce-cpu-usage-overheating/26016)

- So for all the materials work perfectly in componentWillUnmount(){} but for a particular light, works in the componentDidMount() {

```javascript
componentDidMount() {
    this.sceneSetup();
    this.addCustomSceneObjects();
    RectAreaLightUniformsLib.init();
```

<br>
<br>

#### BACK to the project DISPOSE()
