import React, { useContext, useRef, useLayoutEffect } from "react";
// import { Plane, Vec2, Vec3 } from "curtainsjs";

// import { CurtainsContext } from "../store/reduxStore";
// import { vs, fs } from "./shaders";
// vertex and fragment shaders

const PlaneIndex = ({ url, title, index, description }) => {
  //
  //
  const planeEl = useRef();
  //
  //

  const direction = index % 2 === 0 ? "direct" : "reverse";
  //
  //
  return (
    <div className={`plane-container ${direction}`}>
      {/*  
      
      
      
      
      */}
      {/*  text  */}
      <div className="plane-details">
        <h6>/{title}</h6>
        <div className="vertical-line" />
        <p>{description}</p>
      </div>
      {/*  
      
      
      
      
      */}
      {/* images */}
      <div className="plane-image" ref={planeEl}>
        <img
          src={url}
          alt=""
          crossOrigin="anonymous"
          data-sampler="planeTexture"
        />
        <div className="image" style={{ backgroundColor: `url{${url}}` }} />
      </div>
      {/*  
      
      
      
      
      */}
    </div>
  );
};

export default PlaneIndex;
