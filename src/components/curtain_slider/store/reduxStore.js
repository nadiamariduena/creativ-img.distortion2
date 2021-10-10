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
  const [state, dispatch] = useReducer(() => {}, initialState);

  // 3. from this: const { Provider } = CurtainsContext;
  return <Provider value={{state, dispatch}}>{children}</Provider>;
  // 7. pass the  values from the step 6. to the provider
};
export { CurtainsContext, CurtainsProvider };

/*















*/

// import React from "react";
// import { Curtains } from "curtainsjs";

// const initialState = {
//   curtains: new Curtains({
//     pixelRatio: Math.min(1.5, window.devicePixelRatio),
//   }),
//   container: null,
//   scrollEffect: 0,
// };

// //  The following 2 lines will be passed to the canvas, plane and Home
// const CurtainsContext = React.createContext(initialState);
// const { Provider } = CurtainsContext;

// const CurtainsProvider = ({ children }) => {
//     //
//     //
//   const [state, dispatch] = React.useReducer((state, action) => {
//     switch (action.type) {
//       case "SET_CURTAINS_CONTAINER":
//         return {
//           ...state,
//           container: action.payload,
//         };

//       case "SET_SCROLL_EFFECT": {
//         return {
//           ...state,
//           scrollEffect: action.payload,
//         };
//       }
//       default:
//         throw new Error();
//     }
//   }, initialState);

//   return <Provider value={{ state, dispatch }}>{children}</Provider>;
// };

// export { CurtainsContext, CurtainsProvider };
