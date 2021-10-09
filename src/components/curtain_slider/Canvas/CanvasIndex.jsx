import React, { useContext, useRef, useLayoutEffect } from "react";
import { CurtainsContext } from "../store/reduxStore";

const CanvasIndex = () => {
  //
  const container = useRef();
  //
  return <div className="Canvas"></div>;
};

export default CanvasIndex;

/*



import React, { useContext, useRef, useLayoutEffect } from "react";
import { CurtainsContext } from "../store/reduxStore";

const CanvasIndex = () => {
  //
  //
  // related store REDUX
  const { state, dispatch } = useContext(CurtainsContext);
  //
  //
  const container = useRef();
  const someRef = useRef({ scrollEffect: 0 });

  

 useLayoutEffect(() => {
  //
  // related store REDUX
  const { curtains } = state;
  //
  //
  if (container.current && !curtains.container) {
    // set our curtains instance container once
    curtains.setContainer(container.current);

    curtains
      .onContextLost(() => {
        curtains.restoreContext();
      })
      .onRender(() => {
        const newScrollEffect = curtains.lerp(
          someRef.current.scrollEffect,
          0,
          0.075
        );
        someRef.current.scrollEffect = newScrollEffect;

        dispatch({
          type: "SET_SCROLL_EFFECT",
          payload: newScrollEffect,
        });
      })
      .onScroll(() => {
        const delta = curtains.getScrollDeltas();

        delta.y = -delta.y;

        // threshold
        if (delta.y > 60) {
          delta.y = 60;
        } else if (delta.y < -60) {
          delta.y = -60;
        }

        const newScrollEffect = curtains.lerp(
          someRef.current.scrollEffect,
          delta.y * 1.5,
          0.5
        );
        someRef.current.scrollEffect = newScrollEffect;
        dispatch({
          type: "SET_SCROLL_EFFECT",
          payload: newScrollEffect,
        });
      });

    dispatch({
      type: "SET_CURTAINS_CONTAINER",
      payload: curtains.container,
    });

    // dispose curtains if we're unmounting the component (shouldn't ever happen)
    return () => {
      curtains.dispose();
    };
  }
}, [container, state, dispatch]);

 

return <div className="Canvas" ref={container} />;
};

export default CanvasIndex;



*/
