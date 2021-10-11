import React, { useContext, useRef, useLayoutEffect } from "react"; //0
import { Plane, Vec2, Vec3 } from "curtainsjs"; //5.

import { CurtainsContext } from "../store/reduxStore";
// // vertex shader and fragment shader
import { vs, fs } from "./shaders.js"; //9

/*




*/

const PlaneIndex = ({ url, title, index, description }) => {
  //
  // Accessing the state from the context
  const { state } = useContext(CurtainsContext);
  const { scrollEffect } = state;
  //
  const planeEl = useRef();
  const someRef = useRef({ scrollEffect: 0 });
  //
  useLayoutEffect(() => {
    const curtains = state.curtains; //2. here you pass the state.curtains to const curtains
    //
    //3  Now we will check if we have a container set,
    // that means that the DOM is loaded (check the CanvasIndex.jsx: ref={container})
    if (state.container) {
      // 8. create the planeParams
      // curtainsjs uses webGL so for the plane to be rendered,
      // it needs to have the vertex shaders
      //
      const planeParams = {
        // 10.
        vertexShader: vs,
        fragmentShader: fs,
        // 11. we need to divide the plane into segments
        widthSegments: 40,
        heightSegments: 40,
        //
        //12. add the uniforms
        uniforms: {
          direction: {
            name: "uDirection", //data coming from the shaders.js
            type: "1f", //the type will be a float value
            value: 0,
          },
          time: {
            name: "uTime", //data coming from the shaders.js
            type: "1f",
            value: 0,
          },
        },
        //
        //
      };
      //
      // 4. now we will create a new Plane,
      // this plane is from the curtains JS, the second argument is from this : <div className="plane-image" ref={planeEl}>
      const plane = new Plane(curtains, planeEl.current, planeParams);
      // planeEl.current this is reaching the DOM /images elements
      // 6
      return () => {
        // 7
        plane.remove();
      };
    }
    //
  }, [state.container, state.curtains]); //1. this container will listen to : [state.container, state.curtains]);

  //
  /*
  The useEffect will be responsible for updating:
  the someRef = useRef({ scrollEffect: 0 }); values,
  when the scroll effect from the 'state' will be updated,
  so we will listen to the scroll effect:
  */
  React.useEffect(() => {
    someRef.current.scrollEffect = scrollEffect;
  }, [scrollEffect]); //related to    const { scrollEffect } = state;

  const direction = index % 2 === 0 ? "direct" : "reverse";
  //

  return (
    <div className={`plane-container ${direction}`}>
      {/*  text  */}
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
        {/* <div className="image" style={{ backgroundColor: `url{${url}}` }} /> */}
      </div>
    </div>
  );
};

export default PlaneIndex;
