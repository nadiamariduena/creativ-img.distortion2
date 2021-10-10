# SECOND TEST 🍌

<br>
<br>

#### The First time i tried to follow this tutorial i failed.

For that reason I decided to train my skills with another tutorial from the same youtuber, this time things worked differently. I structured the project in a different way before i started the lesson, so i did the same with this one, now i can finally see the project, of course with no animations on the images or the animated scroll, its a good thing because in my first try i had a blank page.

<br>
<br>

#### This is how the project looks before start adding all the animation related elements

[check the default structure here:](src/docs/defaultStructure.md)

<br>

[<img src="/src/img/project_beginning_preview.gif"/>](src/docs/delta-request-animation-frame.md)

<br>
<br>
## So lets start shaping the project:

##### Curtains js requires that the images have a "data" argument, just like the one i used for the first project with the scroll

[]()

> The follwing is required so that canvas js will know **what element needs to be animated / technical: get information and then get rendered with the help of WebGL into a canvas**

```javascript
// before
<div className={`plane-container ${direction}`}>
  <div className="plane-details">
    <h6>/{title}</h6>
    <div className="vertical-line" />
    <p>{description}</p>
  </div>
  <div className="plane-image">
    <img src={url} alt="" crossOrigin="anonymous" data-sampler="planeTexture" />
    <div className="image" style={{ backgroundColor: `url{${url}}` }} />
  </div>
</div>;

// after ________________************________________
//
import React, { useContext, useRef, useLayoutEffect } from "react";

const PlaneIndex = ({ url, title, index, description }) => {
  //
  //
  const planeEl = useRef();

  const direction = index % 2 === 0 ? "direct" : "reverse";
  //
  //
  return (
    <div className={`plane-container ${direction}`}>
      {/*  text  */}
      <div className="plane-details">
        <h6>/{title}</h6>
        <div className="vertical-line" />
        <p>{description}</p>
      </div>

      {/* images */}
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
// scss _____________________ scss
// before
  .plane-image {
    height: 90vh;


    .image {
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    }
  }
}
// AFTER
  .plane-image {
    height: 90vh;

    img {
      display: none; //it should be hidden but i wanted to see if the images worked
    }

  }
}
```

<br>
<br>
<br>

# crossOrigin="anonymous"

## 🔺 Security and tainted canvases 🔺

```javascript
<img src={url} alt="" crossOrigin="anonymous" data-sampler="planeTexture" />
// "Anonymous" (that is, allow non-authenticated downloading of the image cross-origin).
```

##### Because the pixels in a canvas's bitmap can come from a variety of sources, including images or videos retrieved from other hosts, it's inevitable that security problems may arise.

<u> As soon as you draw into a canvas any data that was loaded from another origin without CORS approval, the canvas becomes tainted.</u> **A tainted canvas is one which is no longer considered secure**, and any attempts to retrieve image data back from the canvas will cause an exception to be thrown.

```html
If the source of the foreign content is an HTML <img /> or SVG
<svg>
  element, attempting to retrieve the contents of the canvas isn't allowed.
</svg>
```

If the foreign content comes from an image obtained from either as HTMLCanvasElement or ImageBitMap, and the image source doesn't meet the same origin rules, attempts to read the canvas's contents are blocked.

##### Calling any of the following on a tainted canvas will result in an error:

- Calling getImageData() on the canvas's context

```html
* Calling toBlob() on the <canvas> element itself</canvas>
```

- Calling toDataURL() on the canvas

> **Attempting any of these when the canvas is tainted will cause a SecurityError to be thrown**. This protects users from having private data exposed by using images to pull information from remote web sites without permission.

#### [read more](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image)

[Cross-Origin Resource Sharing (CORS)](https://www.youtube.com/watch?v=af5RI6bLkyw)

[How To Fix: "null has been blocked by CORS policy" Error in JavaScript AJAX](https://www.youtube.com/watch?v=nx8E5BF0XuE)
