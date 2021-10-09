import React from "react";
import { Curtains } from "curtainsjs";

const initialState = {
  curtains: new Curtains({
    pixelRatio: Math.min(1.5, window.devicePixelRatio),
  }),
  container: null,
  scrollEffect: 0,
};
/*
  
  
  
  
  
  
  */
//  The following 2 lines will be passed to the canvas, plane and Home
const CurtainsContext = React.createContext(initialState);
const { Provider } = CurtainsContext;
/*
  
  
  
  
  
  
*/
const CurtainsProvider = ({ children }) => {
  //
  //
  //
  const [state, dispatch] = React.useReducer((state, action) => {
    switch (action.type) {
      case "SET_CURTAINS_CONTAINER":
        return {
          ...state,
          container: action.payload,
        };

      case "SET_SCROLL_EFFECT": {
        return {
          ...state,
          scrollEffect: action.payload,
        };
      }
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { CurtainsContext, CurtainsProvider };



/*



import React from "react";
import { Curtains } from "curtainsjs";

const initialState = {
  curtains: new Curtains({
    pixelRatio: Math.min(1.5, window.devicePixelRatio),
  }),
  container: null,
  scrollEffect: 0,
};
 
//  The following 2 lines will be passed to the canvas, plane and Home
const CurtainsContext = React.createContext(initialState);
const { Provider } = CurtainsContext;
 
const CurtainsProvider = ({ children }) => {
  //
  //
  //
  const [state, dispatch] = React.useReducer((state, action) => {
    switch (action.type) {
      case "SET_CURTAINS_CONTAINER":
        return {
          ...state,
          container: action.payload,
        };

      case "SET_SCROLL_EFFECT": {
        return {
          ...state,
          scrollEffect: action.payload,
        };
      }
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { CurtainsContext, CurtainsProvider };




*/