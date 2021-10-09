[<img src="/src/img/project_structure.gif"/>](src/docs/delta-request-animation-frame.md)

```javascript

/*


                          the Canvas folder



*/
// THE CONTENT OF THE curtain_slider FOLDER
// the Canvas folder: -------------------------------
// CanvasIndex.jsx
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


                            The plane folder



*/
// the Plane folder: ------------------------------------
// PlaneIndex.jsx
import React, { useContext, useRef, useLayoutEffect } from "react";

const PlaneIndex = ({ url, title, index, description }) => {
  const direction = index % 2 === 0 ? "direct" : "reverse";

  return (
    <div className={`plane-container ${direction}`}>
      <div className="plane-details">
        <h6>/{title}</h6>
        <div className="vertical-line" />
        <p>{description}</p>
      </div>
      <div className="plane-image">
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

export default PlaneIndex;
// the shaders.js
const vs = `
    #ifdef GL_ES
    precision mediump float;
    #endif
    
    #define PI 3.14159265359
    
    // those are the mandatory attributes that the lib sets
    attribute vec3 aVertexPosition;
    attribute vec2 aTextureCoord;
    // those are mandatory uniforms that the lib sets and that contain our model view and projection matrix
    uniform mat4 uMVMatrix;
    uniform mat4 uPMatrix;
    uniform mat4 planeTextureMatrix;
    // if you want to pass your vertex and texture coords to the fragment shader
    varying vec3 vVertexPosition;
    varying vec2 vTextureCoord;
    varying float vDirection;
    uniform float uDirection;
    void main() {
        vec3 position = aVertexPosition;
        float y = sin((position.x * 0.5 - 0.5) * PI) * uDirection;
        position.y -= y;
        
        gl_Position = uPMatrix * uMVMatrix * vec4(position, 1.0);
        // set the varyings
        vTextureCoord = (planeTextureMatrix * vec4(aTextureCoord, 0., 1.)).xy;
        vVertexPosition = position;
        vDirection = uDirection;
    }
    `;

const fs = `
#ifdef GL_ES
  precision mediump float;
#endif
#define S(a,b,n) smoothstep(a,b,n)
// get our varyings
varying vec3 vVertexPosition;
varying vec2 vTextureCoord;
// our texture sampler (default name, to use a different name please refer to the documentation)
uniform sampler2D planeTexture;
uniform float vDirection;
uniform float uTime;
void main(){
vec2 textureCoord = vTextureCoord;
const float PI = 3.141592;
textureCoord.x += (
cos(textureCoord.x * 2.5 + ((uTime * (PI / 3.0)) * 0.031))
+ cos(textureCoord.y * 2.5 + ((uTime * (PI / 2.489)) * 0.017))
) * 0.0075;
textureCoord.y += (
sin(textureCoord.y * 2.5 + ((uTime * (PI / 2.023)) * 0.023))
+ sin(textureCoord.x * 2.5 + ((uTime * (PI / 3.1254)) * 0.037))
) * 0.0125;
gl_FragColor = texture2D(planeTexture, textureCoord);
    }
    `;

export { vs, fs };
/*


                            The store folder



*/
// the store folder: ------------------------------------
// reduxStore.js

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
 
};

export { CurtainsContext, CurtainsProvider };

```

[<img src="/src/img/project_beginning_preview.gif"/>](src/docs/delta-request-animation-frame.md)
