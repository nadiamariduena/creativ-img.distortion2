
<br>
## DONT FOLLOW THIS TUTORIAL, AS THE CODER CODES BUT CANNOT GIVE A GOOD EXPLANATION OF WHY OF CERTAIN THINGS GO IN CERTAIN PLACES, also cannot explain the uses of certain things like DELTA.

# 🔴

### Use this code to learn syntax but its really bad to learn

### this is something new i learned here:

> the way you grab data from a json and then pass it through **PROPS** to another file

```javascript
// CurtainSlider.jsx
import React, { useEffect } from "react";
import "./style.scss";
import Plane from "./Plane";
import Canvas from "./Canvas";
import { CurtainsProvider } from "./store/reduxStore";

//1 grab the data fron this
import dumbData from "./dumbData";
class CurtainSlider extends React.Component {
  render() {
    return (
      <CurtainsProvider>
        <div className="banner top" />
        <div id="page-content">
          {dumbData.map(({ url, title, description }, index) => (
            //2  map the data and specify it, pass it as arguments: { url, title, description }, so to be used and send through the <Plane>

            <Plane
              // 3 next , check the index.jsx Plane
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
      </CurtainsProvider>
    );
  }
}
export default CurtainSlider;
/*
index.jsx Plane






*/
import React, { useContext, useRef, useLayoutEffect } from "react";
import { Plane, Vec2, Vec3 } from "curtainsjs";

import "./style.scss";
import { CurtainsContext } from "../store/reduxStore";
import { vs, fs } from "./shaders.js";
// vertex and fragment shaders

//
//
// data from the PLANE index.jsx
const WebPlane = ({ url, title, index, description }) => {
  const { state } = useContext(CurtainsContext);
  const { scrollEffect } = state;
  const planeEl = useRef();
  const someRef = useRef({ scrollEffect: 0 });

  useLayoutEffect(() => {
    const curtains = state.curtains;
    if (state.container) {
      const planeParams = {
        vertexShader: vs,
        fragmentShader: fs,
        widthSegments: 40,
        heightSegments: 40,
        uniforms: {
          direction: {
            name: "uDirection",
            type: "1f",
            value: 0,
          },
          time: {
            name: "uTime",
            type: "1f",
            value: 0,
          },
        },
      };

      const plane = new Plane(curtains, planeEl.current, planeParams);

      plane.onRender(() => {
        plane.uniforms.time.value++;

        plane.uniforms.direction.value = someRef.current.scrollEffect / 500;
      });

      // remove plane if we're unmounting the component
      return () => {
        plane.remove();
      };
    }
  }, [state.container, state.curtains]);

  React.useEffect(() => {
    someRef.current.scrollEffect = scrollEffect;
  }, [scrollEffect]);

  const direction = index % 2 === 0 ? "direct" : "reverse";
  return (
    <div className={`plane-container ${direction}`}>
      <div className="plane-details">
        <h6>/{title}</h6>
        <div className="vertical-line" />
        <p>{description}</p>
      </div>
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

export default WebPlane;
```

# ALSO

> Good thing about this is that i could finally understand why we use 2 curly brackets in react and why we only use 1 in certain things

[what-is-the-purpose-of-double-curly-braces-in-reacts-jsx-syntax](https://stackoverflow.com/questions/22671582/what-is-the-purpose-of-double-curly-braces-in-reacts-jsx-syntax)

### What is the purpose of double curly braces in React's JSX syntax?

> The exterior set of curly braces are letting

          JSX know you want a JS expression. The interior
          set of curly braces represent a JavaScript object,
          meaning you’re passing in a object to the style attribute.

>

          Curly braces has got 2 usage here:-

> { .. } evaluates to an expression in JSX.
> { key: value } implies a javascript object.
> Let see a simple example.

```javascript
<Image source={pic} style={{ width: 193 }} />
```

> If you observe **pic** is surrounded by braces. That's
> the JSX way of **embedding variable**. pic can be any Javascript
> expression/variable/object. You can also do something like
> { 2+3 } and it will evaluate to { 5 }

Let's dissect style here. **{width: 193} is a Javascript object**.
And to embed this object in JSX you need curly braces, hence, { {width: 193} }

**Note: To embed any kind of Javascript expression/variable/object
in JSX you need curly braces.**

<br>

---

[curly-braces-versus-parenthesis-in-reactjs](https://javascript.plainenglish.io/curly-braces-versus-parenthesis-in-reactjs-4d3ffd33128f)

#### When should I use curly braces { } and parenthesis ( ) in React?

> How braces { } are used Curly braces { } are special syntax in JSX. It is used to evaluate a JavaScript expression during compilation. A JavaScript expression can be a variable, function, an object, or any code that resolves into a value.
> Evaluating a JavaScript variable

```javascript
const yellowStyle={color: 'yellow'}
<Star style={yellowStyle} />

which is same as
<Star style={{color: 'yellow'}} />
```

### How parenthesis ( ) are used?

> Parenthesis are used in an arrow function to return an object.

```javascript
() => ({ name: 'Amanda' }) // Shorthand to return an object

That is equivalent to:
() => {
return { name : 'Amanda' }
}

```

> Parenthesis are used to group multiline of codes on
> JavaScript return statement so to prevent semicolon
> inserted automatically in the wrong place.

 <br>
 <br>
 <br>

### unrelated vector info for animations in THREEJS

> Imagine you have an object in a 3D scene and you want to change the position. That is pretty easy to do in React Three Fiber or ThreeJS. Just set the position attributes on the object and it will pop to the new location.

> Now what if instead of the object popping immediately to the new position you want to animate it moving from the old position to the new position.

[Easy Animations in Three.js React With Vector3 Lerp](https://codeworkshop.dev/blog/2020-10-20-easy-animations-in-three-js-react-with-vector3-lerp/)

<hr>

<br>

# 🍰 ☕

## the store in REDUX

> **A store is basically just a plain JavaScript object that allows components to share state**. In a way, we can think of **a store as a database**. On the most fundamental level, both constructs allow us to store data in some form or another.

##### You will do all the change through the redux store

### Import the curtains from the package curtains

```javascript
import React from "react";
import { Curtains } from "curtainsjs";
```

##### to initialize it

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

### What is a provider in Redux?

> Overview. The <Provider> component makes the Redux store available to any nested components that need to access the Redux store. Since any React component in a React Redux app can be connected to the store, most applications will render a <Provider> at the top level, with the entire app's component tree inside of it.

```javascript
const CurtainsContext = React.createContext(initialState);

//
//
const { Provider } = CurtainsContext;

//
//
//
const CurtainsProvider = ({ children }) => {
  //
  //
  //
  return <Provider value={{}}>{children}</Provider>;
};
```

##### Pass the reduc dispatch function 🌵

### What is Dispatch in redux?

> dispatch is a function of the Redux store. You call store. dispatch to dispatch an action. This is the only way to trigger a state change. With React Redux, your components never access the store directly - connect does it for you.

```javascript
const CurtainsContext = React.createContext(initialState);
//
//
const { Provider } = CurtainsContext;
// pass the props ({ children })
const CurtainsProvider = ({ children }) => {
  //
  // DISPATCH **
  const [state, dispatch] = useReducer(() => {}, initialState);
  //
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};
```

<br>

#### Now set the container and the scroll effect inside the REDUCER (the reducer will perform this 2 actions)

##### you will also pass a switch 🌵

##### Why do we use switch in JavaScript??

> The objective of a switch statement is to give an expression to evaluate and several different statements to execute based on the value of the expression. The interpreter checks each case against the value of the expression until a match is found. If nothing matches, a default condition will be used.

```javascript
const { Provider } = CurtainsContext;
//
//
const CurtainsProvider = ({ children }) => {
  //
  //
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      //
      //
      default:
        throw new Error();
    }
  }, initialState);
  //
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};
```

#### What is action type in Redux?

> **switch (action.type) {** Actions are the only source of information for the store as per Redux official documentation. It carries a payload of information from your application to store. As discussed earlier, actions are plain JavaScript object that must have a type attribute to indicate the type of action performed.

<br>

```javascript
const CurtainsContext = React.createContext(initialState);

//
const { Provider } = CurtainsContext;

const CurtainsProvider = ({ children }) => {
  //
  //
  const [state, dispatch] = useReducer((state, action) => {
    //
    //
    //
    switch (action.type) {
      //
      case "SET_CURTAINS_CONTAINER":
        //
        return {
          //   the 3 dots means: and all the rest of the data
          ...state,
          container: action.payload, // PAYLOAD ** ??
        };
      //
      default:
        throw new Error();
    }
  }, initialState);
  //
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};
```

### What is action payload in Redux?

> Payload is what is keyed ( the key value pairs ) in your actions and passed around between reducers in your redux application. For example - const someAction = { type: "Test", payload: {user: "Test User", age: 25}, } This is a generally accepted convention to have a type and a payload for an action

### What is an action payload?

> While action types allow you tell your reducer what action it should take, the payload is the data that your reducer will use to update the state. This lesson shows you how to pass an action payload along with your action type to update the state.

<br>

```javascript
const { Provider } = CurtainsContext;

//
//
//
const CurtainsProvider = ({ children }) => {
  //
  //
  const [state, dispatch] = useReducer((state, action) => {
    //
    //
    //
    switch (action.type) {
      //
      case "SET_CURTAINS_CONTAINER":
        //
        return {
          //   the 3 dots means: and all the rest of the data
          ...state,
          container: action.payload,
        };
      //
      //
      case "SET_SCROLL_EFFECT": {
        return {
          ...state,
          scrollEffect: action.payload,
        };
      }
      //
      default:
        throw new Error();
    }
  }, initialState);
  //
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};
```

<br>
<hr>

### NOW EXPORT THE ABOVE DATA to the Canvas > index.jsx

> **go to the** Canvas folder and open the index.jsx:

```javascript
import React, { useRef } from "react";

export default function Canvas() {
  const container = useRef();
  return <div className="Canvas" ref={container}></div>;
}
```

#### While there add the following:

> We will access the context we worked inside the **reduxStore.js** that is inside the **store folder**

```javascript
import React, { useRef } from "react";

export default function Canvas() {
  //
  // ** here you will access the context from the reduxStore.js **
  const { state, dispatch } = useContext(CurtainsContext);
  //
  //
  //
  const container = useRef();

  return <div className="Canvas" ref={container}></div>;
}
```

#### We will need to pass a couple of things to the array of the use Layout effect, so that we will have the access inisde of it []

> **1** basic layout (without the data)

```javascript
 const container = useRef();
  const { state, dispatch } = useContext(CurtainsContext);
  //
  //
useLayoutEffect(() => {
  effect
  return () => {
    cleanup
  };
//   the layout array
}, [input])
  //


  return <div className="Canvas" ref={container}></div>;
}
```

> **2**

```javascript
export default function Canvas() {
  //
  const container = useRef();
  //
  //
  // ** here you will access the context from the reduxStore.js **
  const { state, dispatch } = useContext(CurtainsContext);
  //
  //
  useLayoutEffect(() => {
    effect;
    return () => {
      cleanup;
    };
    // this is the data from the store folder, reduxStore.js
  }, [container, state, dispatch]);
  //

  return <div className="Canvas" ref={container}></div>;
}
```

> **3**

[<img src="./src/img/curtains_state.jpg"/>]()

```javascript
export default function Canvas() {
  //
  const container = useRef();
  //
  //
  // ** here you will access the context from the reduxStore.js **
  const { state, dispatch } = useContext(CurtainsContext);
  //
  //
  useLayoutEffect(() => {
    //
    // get the curtains from the state in the  reduxStore.js(on top of the file)
    const { curtains } = state;

    //
    if (container.current && !curtains.container) {
      dispatch({
        type: "SET_CURTAINS_CONTAINER",
        payload: curtains.container,
      });
    }
    //

    return () => {
      cleanup;
    };
    // this is the data from the store folder, reduxStore.js
  }, [container, state, dispatch]);
  //

  return <div className="Canvas" ref={container}></div>;
}
```

# 🌞

# _LERP_ FUNCTION to ease and smoothing out a value (for the scroll effect)

[Processing / p5.js Tutorial: What is lerp? (Linear Interpolation)](https://www.youtube.com/watch?v=8uLVnM36XUc)

[Lerp function - Anmation javascript canvas ](https://www.youtube.com/watch?v=UGMyHSelK00)

[Modulating values with Lerp - Unity Official Tutorials ](https://www.youtube.com/watch?v=cD-mXwSCvWc)

<br>

[Easy Animations in Three.js React With Vector3 Lerp ](https://codeworkshop.dev/blog/2020-10-20-easy-animations-in-three-js-react-with-vector3-lerp/)

#### Imagine you have an object in a 3D scene and you want to change the position. That is pretty easy to do in React Three Fiber or ThreeJS. Just set the position attributes on the object and it will pop to the new location.

##### Now what if instead of the object popping immediately to the new position you want to animate it moving from the old position to the new position.

##### You could implement this yourself or you could use the fantastically useful lerp method which is on the Three.js Vector3 type. A Vector3 is a class that is used to represent most values which have x, y, and z coordinates in Three.js so you can use it to animate many object transforms like position, scale, or rotation. For this demonstration we will animate the position of a cube.

<br>

```javascript
export default function Canvas() {
  //
  const container = useRef();
  //
  // ** here you will access the context from the reduxStore.js **
  const { state, dispatch } = useContext(CurtainsContext);
  // this is to store the previous value of the scroll effect
  const someRef = useRef({ scrollEffect: 0 });
  //
  //
  //
  //
  //
  useLayoutEffect(() => {
    const { curtains } = state;
    //
    if (container.current && !curtains.container) {
      curtains.setContainer(container.current);
      //
      //
      curtains
        .onContextLost(() => {
          curtains.restoreContext();
        })
        .onRender(() => {
          // we will lerp from the current position to
          const newScrollEffect = curtains.lerp(
            someRef.current.scrollEffect,
            // when we will stop scrolling the elements will stop moving SMOOTHLY

            0,
            0.075
          );

          //
          // we set the ref and we update the value as well as we dispatch
          someRef.current.scrollEffect = newScrollEffect;

          dispatch({
            type: "SET_SCROLL_EFFECT",
            // the payload will be the new scroll effect
            payload: newScrollEffect,
          });
          //
        });
      //
      dispatch({
        type: "SET_CURTAINS_CONTAINER",
        payload: curtains.container,
      });
    }
    //

    return () => {
      cleanup;
    };
    // this is the data from the store folder, reduxStore.js
  }, [container, state, dispatch]);
  //

  return <div className="Canvas" ref={container}></div>;
}
```

#### The lerp method takes as its first argument another vector to interpolate towards, and a second argument called the alpha. You can think of the alpha as the speed at which the position should interpolate towards the new vector.

```javascript
const newScrollEffect = curtains.lerp(
  someRef.current.scrollEffect,
  // when we will stop scrolling the elements will stop moving SMOOTHLY

  0,
  0.075
);
```

## we will also need to use a delta for the animation

```javascript
export default function Canvas() {
  //
  const container = useRef();
  //
  // ** here you will access the context from the reduxStore.js **
  const { state, dispatch } = useContext(CurtainsContext);
  // this is to store the previous value of the scroll effect
  const someRef = useRef({ scrollEffect: 0 });
  //
  //
  //
  //
  //
  useLayoutEffect(() => {
    const { curtains } = state;
    //
    if (container.current && !curtains.container) {
      curtains.setContainer(container.current);
      //
      //
      curtains
        .onContextLost(() => {
          curtains.restoreContext();
        })
        .onRender(() => {
          // we will lerp from the current position to
          const newScrollEffect = curtains.lerp(
            someRef.current.scrollEffect,
            // when we will stop scrolling the elements will stop moving SMOOTHLY

            0,
            0.075
          );
          //
          // we set the ref and we update the value as well as we dispatch
          someRef.current.scrollEffect = newScrollEffect;

          dispatch({
            type: "SET_SCROLL_EFFECT",
            // the payload will be the new scroll effect
            payload: newScrollEffect,
          });
        })
        //  this will update the scroll effect
        .onScroll(() => {
          const delta = curtains.getScrollDeltas();
          delta.y = -delta.y; ///DELTA ******
          //
          //
          const newScrollEffect = curtains.lerp(
            someRef.current.scrollEffect,
            delta.y * 1.5 ///DELTA ******
          );
          //
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

    return () => {
      cleanup;
    };
    // this is the data from the store folder, reduxStore.js
  }, [container, state, dispatch]);
  //

  return <div className="Canvas" ref={container}></div>;
}
```

<br>

### Read the article to understand the uses of DELTA and why its necessary in case of animations, read it until the end as its IMPORTANT!

> There are three ways to store variables within functional components:

> **We can define a simple const or let whose value will always be reinitialized with every component re-rendering.
> We can use useState whose value persists across re-renderings, and if you change it, it will also trigger re-rendering.
> We can use useRef.
> The useRef hook is primarily used to access the DOM, but it’s more than that. It is a mutable object that persists a value across multiple re-renderings**. It is really similar to the useState hook except you read and write its value through its .current property, and changing its value won’t re-render the component.

> For instance, the example below will always show 5 even if the component is re-rendered by its parent.

<br>

### READ THE WHOLE ARTICLE AS ITS IMPORTANT

#### [Using requestAnimationFrame with React Hooks](src/docs/delta-request-animation-frame.md)

[<img src="/src/img/counter_request-anima-frame.gif"/>](src/docs/delta-request-animation-frame.md)

<hr>

# MORE ABOUT REQUEST ANIMATION FRAME (RAF)

> **RAF does almost exactly the same thing as setTimeout**, with **two differences**: RAF will invoke the callback as soon as it can (so no need, or way, to pass the delay time), and it will provide the callback with the high-resolution timestamp telling it when exactly it was executed.

> Your main is thus almost equivalent to step from the example. The RAF call outside the function schedules the first callback; the RAF at the end of the function schedules the next one as the last one is finishing, which constitutes a loop (to break it, conditionally avoid invoking RAF inside the function).

[using delta time with javascript](https://stackoverflow.com/questions/58816632/using-delta-time-with-javascript)

<br>

## Continuing

```javascript
export default function Canvas() {
  //
  const container = useRef();
  //
  // ** here you will access the context from the reduxStore.js **
  const { state, dispatch } = useContext(CurtainsContext);
  // this is to store the previous value of the scroll effect
  const someRef = useRef({ scrollEffect: 0 });
  //
  //
  //
  //
  //
  useLayoutEffect(() => {
    const { curtains } = state;
    //
    if (container.current && !curtains.container) {
      curtains.setContainer(container.current);
      //
      //
      curtains
        .onContextLost(() => {
          curtains.restoreContext();
        })
        .onRender(() => {
          // we will lerp from the current position to
          const newScrollEffect = curtains.lerp(
            someRef.current.scrollEffect,
            // when we will stop scrolling the elements will stop moving SMOOTHLY

            0,
            0.075
          );
          //
          // we set the ref and we update the value as well as we dispatch
          someRef.current.scrollEffect = newScrollEffect;

          dispatch({
            type: "SET_SCROLL_EFFECT",
            // the payload will be the new scroll effect
            payload: newScrollEffect,
          });
        })
        //  this callback we will use to update the scroll effect
        //  when the canvas is scroll by the user
        // ------- callback
        .onScroll(() => {
          const delta = curtains.getScrollDeltas();
          // we need the opposite values, for when you scroll and stop scrolling, it will roll up (venir en arriere) few millimeter
          delta.y = -delta.y;
          //
          //
          // threshold
          if (delta.y > 60) {
            delta.y = 60;
          } else if (delta.y < -60) {
            delta.y = -60;
          }

          //
          const newScrollEffect = curtains.lerp(
            someRef.current.scrollEffect,
            delta.y * 1.5,
            0.5
          );
          //
          someRef.current.scrollEffect = newScrollEffect;

          dispatch({
            type: "SET_SCROLL_EFFECT",
            payload: newScrollEffect,
          });
        });
      // ------- callback
      //
      //
      //
      dispatch({
        type: "SET_CURTAINS_CONTAINER",
        payload: curtains.container,
      });
    }
    //

    return () => {
      cleanup;
    };
    // this is the data from the store folder, reduxStore.js
  }, [container, state, dispatch]);
  //

  return <div className="Canvas" ref={container}></div>;
}
```

<br>

## Now Remove the curtain when the component UNMOUNTS

```javascript

```
