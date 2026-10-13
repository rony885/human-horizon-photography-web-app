import React from "react";
import { Link } from "react-router";
import styled from "styled-components";

const gallery =[
  {
    id: 1,
    image: "/upload/gallery/pin1.jpg",
    title: "Flying Ball",
  }
]

const Gallery = () => {

  return (
    <Wrapper>
      <section className="gallery-section pinterest-style full">
        <div className="gallery-box iso-call col4">
          <div className="gallery-post">
            <div className="inner-gallery-post">
              <img src="/upload/gallery/pin1.jpg" alt="" />
              <div className="hover-box">
                <h2>
                  <a href="upload/gallery/pin1.jpg" className="image-popup">
                    Flying Ball
                  </a>
                </h2>
              </div>
            </div>
          </div>

          <div className="gallery-post">
            <div className="inner-gallery-post">
              <img src="upload/gallery/pin2.jpg" alt="" />
              <div className="hover-box">
                <h2>
                  <a href="upload/gallery/pin2.jpg" className="image-popup">
                    Flying Ball
                  </a>
                </h2>
              </div>
            </div>
          </div>

          <div className="gallery-post">
            <div className="inner-gallery-post">
              <img src="upload/gallery/pin3.jpg" alt="" />
              <div className="hover-box">
                <h2>
                  <a href="upload/gallery/pin3.jpg" className="image-popup">
                    Flying Ball
                  </a>
                </h2>
              </div>
            </div>
          </div>

          <div className="gallery-post">
            <div className="inner-gallery-post">
              <img src="upload/gallery/pin4.jpg" alt="" />
              <div className="hover-box">
                <h2>
                  <a href="upload/gallery/pin4.jpg" className="image-popup">
                    Flying Ball
                  </a>
                </h2>
              </div>
            </div>
          </div>

          <div className="gallery-post">
            <div className="inner-gallery-post">
              <img src="upload/gallery/pin5.jpg" alt="" />
              <div className="hover-box">
                <h2>
                  <a href="upload/gallery/pin5.jpg" className="image-popup">
                    Flying Ball
                  </a>
                </h2>
              </div>
            </div>
          </div>

          <div className="gallery-post">
            <div className="inner-gallery-post">
              <img src="upload/gallery/pin6.jpg" alt="" />
              <div className="hover-box">
                <h2>
                  <a href="upload/gallery/pin6.jpg" className="image-popup">
                    Flying Ball
                  </a>
                </h2>
              </div>
            </div>
          </div>

          <div className="gallery-post">
            <div className="inner-gallery-post">
              <img src="upload/gallery/pin7.jpg" alt="" />
              <div className="hover-box">
                <h2>
                  <a href="upload/gallery/pin7.jpg" className="image-popup">
                    Flying Ball
                  </a>
                </h2>
              </div>
            </div>
          </div>

          <div className="gallery-post">
            <div className="inner-gallery-post">
              <img src="upload/gallery/pin8.jpg" alt="" />
              <div className="hover-box">
                <h2>
                  <a href="upload/gallery/pin8.jpg" className="image-popup">
                    Flying Ball
                  </a>
                </h2>
              </div>
            </div>
          </div>

          <div className="gallery-post">
            <div className="inner-gallery-post">
              <img src="upload/gallery/pin9.jpg" alt="" />
              <div className="hover-box">
                <h2>
                  <a href="upload/gallery/pin9.jpg" className="image-popup">
                    Flying Ball
                  </a>
                </h2>
              </div>
            </div>
          </div>

          <div className="gallery-post">
            <div className="inner-gallery-post">
              <img src="upload/gallery/pin10.jpg" alt="" />
              <div className="hover-box">
                <h2>
                  <a href="upload/gallery/pin10.jpg" className="image-popup">
                    Flying Ball
                  </a>
                </h2>
              </div>
            </div>
          </div>

          <div className="gallery-post">
            <div className="inner-gallery-post">
              <img src="upload/gallery/pin11.jpg" alt="" />
              <div className="hover-box">
                <h2>
                  <a href="upload/gallery/pin11.jpg" className="image-popup">
                    Flying Ball
                  </a>
                </h2>
              </div>
            </div>
          </div>

          <div className="gallery-post">
            <div className="inner-gallery-post">
              <img src="upload/gallery/pin12.jpg" alt="" />
              <div className="hover-box">
                <h2>
                  <a href="upload/gallery/pin12.jpg" className="image-popup">
                    Flying Ball
                  </a>
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div className="center-button">
          <Link to="#" className="button-one">
            Prev Gallery
          </Link>
          <Link to="#" className="button-one">
            Next Gallery
          </Link>
        </div>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .gallery-section {
    padding: 40px 0 70px;
  }
  .gallery-box {
    margin-left: -15px;
    margin-right: -15px;
    margin-top: -15px;
    display: flex;
    flex-wrap: wrap;
    width: auto;
  } /* Gallery item */
  .gallery-post {
    width: 20%;
    padding: 15px;
    position: relative;
    box-sizing: border-box;
  } /* Inner gallery */
  .inner-gallery-post {
    position: relative;
    overflow: hidden;
    width: 100%;
    border-radius: 20px;
    transition: all 0.2s ease-in-out;
  } /* Image */
  .gallery-post img {
    display: block;
    width: 100%;
    max-width: 100%;
    height: auto;
    border-radius: 20px;
  } /* Hover box */
  .hover-box {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background: rgba(255, 255, 255, 0.92);
    opacity: 0;
    transition: all 0.3s ease-in-out;
  } /* Hover title */
  .hover-box h2 {
    margin: 0;
    font-size: 15px;
    font-weight: 400;
    text-transform: initial;
    transition: all 0.2s ease-in-out;
  } /* Hover link */
  .hover-box h2 a {
    color: #222222;
    text-decoration: none;
  }
  .hover-box h2 a:hover {
    color: #000000;
  } /* Hover effect */
  .gallery-post:hover .inner-gallery-post {
    box-shadow: 0 16px 24px #eaeaea;
  }
  .gallery-post:hover .hover-box {
    opacity: 1;
  } /* Center buttons */
  .center-button {
    padding-top: 25px;
    text-align: center;
  }
  .center-button a {
    margin: 0 14px;
  } /*------------------------------------------------- */ /* = Responsive Gallery *------------------------------------------------- */ /* Large tablets */
  @media (max-width: 1199px) {
    .gallery-post {
      width: 25%;
    }
  } /* Tablets */
  @media (max-width: 991px) {
    .gallery-post {
      width: 33.333333%;
    }
  } /* Mobile landscape */
  @media (max-width: 767px) {
    .gallery-box {
      margin-left: 10px;
      margin-right: 10px;
    }
    .gallery-post {
      width: 50%;
      padding: 10px;
    }
  } /* Mobile */
  @media (max-width: 480px) {
    .gallery-post {
      width: 100%;
      padding: 10px;
    }
  }
`;

export default Gallery;


import React from "react";
import { Link } from "react-router";
import styled from "styled-components";

const gallery = [
  {
    id: 1,
    image: "/upload/gallery/pin1.jpg",
    title: "Flying Ball",
  },
  {
    id: 2,
    image: "/upload/gallery/pin2.jpg",
    title: "Flying Ball",
  },
  {
    id: 3,
    image: "/upload/gallery/pin3.jpg",
    title: "Flying Ball",
  },
  {
    id: 4,
    image: "/upload/gallery/pin4.jpg",
    title: "Flying Ball",
  },
  {
    id: 5,
    image: "/upload/gallery/pin5.jpg",
    title: "Flying Ball",
  },
  {
    id: 6,
    image: "/upload/gallery/pin6.jpg",
    title: "Flying Ball",
  },
  {
    id: 7,
    image: "/upload/gallery/pin7.jpg",
    title: "Flying Ball",
  },
  {
    id: 8,
    image: "/upload/gallery/pin8.jpg",
    title: "Flying Ball",
  },
  {
    id: 9,
    image: "/upload/gallery/pin9.jpg",
    title: "Flying Ball",
  },
  {
    id: 10,
    image: "/upload/gallery/pin10.jpg",
    title: "Flying Ball",
  },
  {
    id: 11,
    image: "/upload/gallery/pin11.jpg",
    title: "Flying Ball",
  },
  {
    id: 12,
    image: "/upload/gallery/pin12.jpg",
    title: "Flying Ball",
  },
];

const Gallery = () => {
  return (
    <Wrapper>
      <section className="gallery-section pinterest-style full">
        <div className="gallery-box iso-call col4">
          {gallery.map((item) => (
            <div className="gallery-post" key={item.id}>
              <div className="inner-gallery-post">
                <img src={item.image} alt={item.title} />

                <div className="hover-box">
                  <h2>
                    <a href={item.image} className="image-popup">
                      {item.title}
                    </a>
                  </h2>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="center-button">
          <Link to="#" className="button-one">
            Prev Gallery
          </Link>

          <Link to="#" className="button-one">
            Next Gallery
          </Link>
        </div>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .gallery-section {
    padding: 40px 0 70px;
  }

  .gallery-box {
    margin-left: -15px;
    margin-right: -15px;
    margin-top: -15px;
    display: flex;
    flex-wrap: wrap;
    width: auto;
  }

  .gallery-post {
    width: 20%;
    padding: 15px;
    position: relative;
    box-sizing: border-box;
  }

  .inner-gallery-post {
    position: relative;
    overflow: hidden;
    width: 100%;
    border-radius: 20px;
    transition: all 0.2s ease-in-out;
  }

  .gallery-post img {
    display: block;
    width: 100%;
    max-width: 100%;
    height: auto;
    border-radius: 20px;
  }

  .hover-box {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background: rgba(255, 255, 255, 0.92);
    opacity: 0;
    transition: all 0.3s ease-in-out;
  }

  .hover-box h2 {
    margin: 0;
    font-size: 15px;
    font-weight: 400;
    text-transform: initial;
    transition: all 0.2s ease-in-out;
  }

  .hover-box h2 a {
    color: #222222;
    text-decoration: none;
  }

  .hover-box h2 a:hover {
    color: #000000;
  }

  .gallery-post:hover .inner-gallery-post {
    box-shadow: 0 16px 24px #eaeaea;
  }

  .gallery-post:hover .hover-box {
    opacity: 1;
  }

  .center-button {
    padding-top: 25px;
    text-align: center;
  }

  .center-button a {
    margin: 0 14px;
  }

  /* Large tablets */
  @media (max-width: 1199px) {
    .gallery-post {
      width: 25%;
    }
  }

  /* Tablets */
  @media (max-width: 991px) {
    .gallery-post {
      width: 33.333333%;
    }
  }

  /* Mobile landscape */
  @media (max-width: 767px) {
    .gallery-box {
      margin-left: 10px;
      margin-right: 10px;
    }

    .gallery-post {
      width: 50%;
      padding: 10px;
    }
  }

  /* Mobile */
  @media (max-width: 480px) {
    .gallery-post {
      width: 100%;
      padding: 10px;
    }
  }
`;

export default Gallery;