// import React from "react";
// import styled from "styled-components";

// const Loader = () => {
//   return (
//     <Wrapper>
//       <div className="preloader">
//         <img alt="" src="/images/loader.gif" />
//       </div>
//     </Wrapper>
//   );
// };

// const Wrapper = styled.section``;

// export default Loader;

import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Loader = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if all images on the page are loaded
    const images = document.images;

    let loadedImages = 0;

    const imageLoaded = () => {
      loadedImages++;

      if (loadedImages === images.length) {
        setIsLoaded(true);
      }
    };

    if (images.length === 0) {
      setIsLoaded(true);
    } else {
      Array.from(images).forEach((img) => {
        if (img.complete) {
          imageLoaded();
        } else {
          img.addEventListener("load", imageLoaded);
          img.addEventListener("error", imageLoaded);
        }
      });
    }

    return () => {
      Array.from(images).forEach((img) => {
        img.removeEventListener("load", imageLoaded);
        img.removeEventListener("error", imageLoaded);
      });
    };
  }, []);

  return (
    <Wrapper>
      <div className={`preloader ${isLoaded ? "loaded" : ""}`}>
        {/* <img src="/images/loader.gif" alt="Loading..." /> */}
        <img
          src="/images/human_horizon_logo-11.png"
          alt="Loading..."
          style={{ width: "161px", height: "100px" }}
        />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .preloader {
    position: fixed;
    width: 100%;
    height: 100%;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    top: 0;
    left: 0;
    -webkit-backface-visibility: hidden;
    transition: all 0.4s ease-in-out;
    -moz-transition: all 0.4s ease-in-out;
    -webkit-transition: all 0.4s ease-in-out;
    -o-transition: all 0.4s ease-in-out;
    z-index: 9999;
  }

  .preloader img {
    -webkit-backface-visibility: hidden;
    width: 200px;
    height: 200px;
  }

  /* Fade out */
  .preloader.loaded {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }
`;

export default Loader;
