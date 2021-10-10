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

// const Home = () => {
//   return (
//     //
//     // related store REDUX
//     <CurtainsProvider>
//       {/*

//       */}
//       <div className="banner top" />
//       <div id="page-content">
//         {photoData.map(({ url, title, description }, index) => (
//           <Plane
//             key={url}
//             index={index}
//             url={url}
//             title={title}
//             description={description}
//           />
//         ))}
//       </div>

//       <Canvas />

//       <div className="banner bottom" />
//       {/*

//       */}
//     </CurtainsProvider>
//   );
// };

// export default Home;
