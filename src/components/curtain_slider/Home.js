import React from "react";
//
import Canvas from "./Canvas/CanvasIndex";
import Plane from "./Plane/PlaneIndex";
import { CurtainsProvider } from "./store/reduxStore";
// the images
import photoData from "./photoData";

const Home = () => {
  return (
    //
    // related store REDUX
    <CurtainsProvider>
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
    </CurtainsProvider>
  );
};

export default Home;
