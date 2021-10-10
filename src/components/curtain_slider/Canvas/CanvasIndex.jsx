import React, { useContext, useRef, useLayoutEffect } from "react";
import { CurtainsContext } from "../store/reduxStore";
// import { CurtainsContext } from "../store/reduxStore";

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
    //
    //
    // return () => {
    //   cleanup;
    // };
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
