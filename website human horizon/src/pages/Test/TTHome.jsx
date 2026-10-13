// Templete Code
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import {
  FaHeart,
  FaShareAlt,
  FaGoogle,
  FaTwitter,
  FaFacebookF,
} from "react-icons/fa";

const photos = [
  {
    id: 1,
    image: "/upload/grid/1.jpg",
    classes: "children nature y2018",
    categories: "children, nature",
  },
  {
    id: 2,
    image: "/upload/grid/2.jpg",
    classes: "children education y2018",
    categories: "children, education",
  },
  {
    id: 3,
    image: "/upload/grid/3.jpg",
    classes: "education y2018",
    categories: "education",
  },
  {
    id: 4,
    image: "/upload/grid/4.jpg",
    classes: "children food y2018",
    categories: "children, food",
  },
  {
    id: 5,
    image: "/upload/grid/5.jpg",
    classes: "children nature y2017",
    categories: "children, nature",
  },
  {
    id: 6,
    image: "/upload/grid/6.jpg",
    classes: "food education y2017",
    categories: "food, education",
  },
  {
    id: 7,
    image: "/upload/grid/7.jpg",
    classes: "children nature y2017",
    categories: "children, nature",
  },
  {
    id: 8,
    image: "/upload/grid/8.jpg",
    classes: "education y2017",
    categories: "education",
  },
  {
    id: 9,
    image: "/upload/grid/9.jpg",
    classes: "children nature y2016",
    categories: "children, nature",
  },
  {
    id: 10,
    image: "/upload/11.webp",
    classes: "Garden in summer sunflower",
    categories: "abc",
  },
  {
    id: 11,
    image: "/upload/grid/22.jpg",
    classes: "Gardene Rainbow carrots",
    categories: "xyz",
  },
];

const Home = () => {
  return (
    <Wrapper>
      <section className="photos-section" style={{ marginTop: "100px" }}>
        <div className="photos-box iso-call">
          {photos.map((photo) => (
            <div className={`photo-post ${photo.classes}`} key={photo.id}>
              <img src={photo.image} alt="" />

              <div className="hover-box">
                <div className="inner-hover">
                  <div className="title-post">
                    <h2>Andrew Tolstoy</h2>
                    <span>{photo.categories}</span>
                  </div>

                  <div className="share-like">
                    <Link to="#" className="like">
                      120 <FaHeart />
                    </Link>

                    <Link to="#" className="share">
                      <FaShareAlt />
                    </Link>

                    <ul className="share-list">
                      <li>
                        <Link to="#">
                          <FaGoogle />
                        </Link>
                      </li>

                      <li>
                        <Link to="#">
                          <FaTwitter />
                        </Link>
                      </li>

                      <li>
                        <Link to="#">
                          <FaFacebookF />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="center-button">
          <Link
            to="#"
            className="button-one load-post-container"
            data-load="photo-container-for-load-more.html"
            data-number="3"
          >
            Load More
          </Link>
        </div>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  section.photos-section .photos-box {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }

  /* 3 images per row */
  section.photos-section .photos-box .photo-post {
    width: 33.333333% !important;
    flex: 0 0 33.333333%;
    box-sizing: border-box;
    padding: 5px;
    position: relative;
  }

  /* Image */
  section.photos-section .photos-box .photo-post img {
    display: block;
    width: 100%;
    height: auto;
  }

  /* ==== RESPONSIVE ==== */

  /* Tablet */
  @media (max-width: 991px) {
    section.photos-section .photos-box .photo-post {
      width: 50% !important;
      flex: 0 0 50%;
    }
  }

  /* Mobile */
  @media (max-width: 575px) {
    section.photos-section {
      padding: 20px;
    }

    section.photos-section .photos-box .photo-post {
      width: 100% !important;
      flex: 0 0 100%;
    }
  }
`;

export default Home;


// ========================
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  FaHeart,
  FaShareAlt,
  FaGoogle,
  FaTwitter,
  FaFacebookF,
} from "react-icons/fa";

import photosArray from "../../DataJS/photos.js";
import categoriesArray from "../../DataJS//categories.js";
import yearsArray from "../../DataJS/year.js";

const photos = [
  {
    id: 1,
    image: "/upload/grid/1.jpg",
    classes: "children nature y2018",
    categories: "children, nature",
    year: 2018,
  },
  {
    id: 2,
    image: "/upload/grid/2.jpg",
    classes: "children education y2018",
    categories: "children, education",
    year: 2018,
  },
  {
    id: 3,
    image: "/upload/grid/3.jpg",
    classes: "education y2018",
    categories: "education",
    year: 2018,
  },
  {
    id: 4,
    image: "/upload/grid/4.jpg",
    classes: "children food y2018",
    categories: "children, food",
    year: 2018,
  },
  {
    id: 5,
    image: "/upload/grid/5.jpg",
    classes: "children nature y2017",
    categories: "children, nature",
    year: 2017,
  },
  {
    id: 6,
    image: "/upload/grid/6.jpg",
    classes: "food education y2017",
    categories: "food, education",
    year: 2017,
  },
  {
    id: 7,
    image: "/upload/grid/7.jpg",
    classes: "children nature y2017",
    categories: "children, nature",
    year: 2017,
  },
  {
    id: 8,
    image: "/upload/grid/8.jpg",
    classes: "education y2017",
    categories: "education",
    year: 2017,
  },
  {
    id: 9,
    image: "/upload/grid/9.jpg",
    classes: "children nature y2016",
    categories: "children, nature",
    year: 2016,
  },
  {
    id: 10,
    image: "/upload/grid/11.webp",
    classes: "garden summer sunflower",
    categories: "abc",
    year: 2000,
  },
  {
    id: 11,
    image: "/upload/grid/22.jpg",
    classes: "garden rainbow carrots",
    categories: "xyz",
    year: 2000,
  },
  {
    id: 12,
    image: "/upload/grid/33.jpg",
    classes: "rioroor  ttt",
    categories: "rtc",
    year: 2000,
  },
  {
    id: 13,
    image: "/upload/grid/44.jpg",
    classes: "Rttc Uyz Okk",
    categories: "yyz",
    year: 2000,
  },
];

const Home = () => {
  const galleryRef = useRef(null);
  const [photos, setPhotos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [years, setYears] = useState([]);

  useEffect(() => {
    setPhotos(photosArray);
    setCategories(categoriesArray);
    setYears(yearsArray);
  }, []);

  useEffect(() => {
    const createRows = () => {
      const gallery = galleryRef.current;
      if (!gallery) return;

      const items = Array.from(gallery.querySelectorAll(".photo-post"));
      if (!items.length) return;

      /* ==== GALLERY SETTINGS ==== */ let rowHeight = 260;
      const containerWidth = gallery.clientWidth;
      /* Desktop */ if (window.innerWidth >= 1200) {
        rowHeight = 260;
      } /* Tablet */ else if (window.innerWidth >= 768) {
        rowHeight = 240;
      } /* Mobile */ else {
        rowHeight = 300;
      }

      /* ==== GET IMAGE RATIOS ==== */ const imageData = items.map((item) => {
        const img = item.querySelector("img");
        const width = img.naturalWidth || 1;
        const height = img.naturalHeight || 1;
        return { item, ratio: width / height };
      });

      /* ==== MOBILE ONE IMAGE PER ROW ==== */ if (window.innerWidth <= 575) {
        imageData.forEach(({ item }) => {
          item.style.width = "100%";
          item.style.height = `${rowHeight}px`;
        });
        return;
      }

      /* ==== CREATE JUSTIFIED ROWS ==== */ let currentRow = [];
      let currentRatio = 0;
      const rows = [];

      imageData.forEach((data, index) => {
        currentRow.push(data);
        currentRatio += data.ratio;

        const remainingImages = imageData.length - index - 1;
        /* Calculate natural width of current row based on selected row height. */
        const calculatedWidth =
          currentRatio * rowHeight + (currentRow.length - 1) * 10;
        /* When row is close to container width, finish the row. */ if (
          calculatedWidth >= containerWidth * 0.85 ||
          currentRow.length >= 5 ||
          remainingImages === 0
        ) {
          rows.push(currentRow);
          currentRow = [];
          currentRatio = 0;
        }
      });
      /* ==== APPLY ROW SIZES ==== */ rows.forEach((row) => {
        const totalRatio = row.reduce((total, image) => total + image.ratio, 0);
        const gap = (row.length - 1) * 10;
        /* If this is the final row, don't force it to become extremely wide. */ const isLastRow =
          row === rows[rows.length - 1];
        let finalHeight = rowHeight;
        if (!isLastRow) {
          finalHeight = (containerWidth - gap) / totalRatio;
        }
        row.forEach(({ item, ratio }) => {
          const width = ratio * finalHeight;
          item.style.width = `${width}px`;
          item.style.height = `${finalHeight}px`;
        });
      });
    };

    const loadImages = () => {
      const images = galleryRef.current?.querySelectorAll("img");
      if (!images) return;
      let loaded = 0;
      images.forEach((img) => {
        if (img.complete) {
          loaded++;
          if (loaded === images.length) {
            createRows();
          }
        } else {
          img.addEventListener("load", () => {
            loaded++;
            if (loaded === images.length) {
              createRows();
            }
          });
        }
      });
    };

    loadImages();
    window.addEventListener("resize", createRows);
    return () => {
      window.removeEventListener("resize", createRows);
    };
  }, []);

  return (
    <Wrapper>
      <section className="photos-section" style={{ marginTop: "100px" }}>
        <div className="d-flex justify-content-between align-items-center">
          <div className="bg-danger">All</div>
          <div className="bg-info">All</div>
        </div>
        <div className="photos-box iso-call" ref={galleryRef}>
          {photos.map((photo) => (
            <div className={`photo-post ${photo.classes}`} key={photo.id}>
              <img src={photo.image} alt="" />
              <div className="hover-box">
                <div className="inner-hover">
                  <div className="title-post">
                    <h2>Andrew Tolstoy</h2>
                    <span> {photo.categories} </span>
                  </div>
                  <div className="share-like">
                    <Link to="#" className="like">
                      120 <FaHeart />
                    </Link>
                    <Link to="#" className="share">
                      <FaShareAlt />
                    </Link>
                    <ul className="share-list">
                      <li>
                        <Link to="#">
                          <FaGoogle />
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <FaTwitter />
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <FaFacebookF />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="center-button">
          <Link
            to="#"
            className="button-one load-post-container"
            data-load="photo-container-for-load-more.html"
            data-number="3"
          >
            Load More
          </Link>
        </div>
      </section>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  /* ==== MAIN GALLERY ==== */
  section.photos-section .photos-box {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    width: 100%;
    gap: 10px;
  }

  /* ==== PHOTO POST Width is automatically calculated from the ORIGINAL image ratio. ==== */
  section.photos-section .photos-box .photo-post {
    position: relative;
    flex: 0 0 auto;
    overflow: hidden;
    box-sizing: border-box;
  }

  /* ==== IMAGE No cropping. No stretching. Every image keeps its own original structure. ==== */
  section.photos-section .photos-box .photo-post img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
  /* ==== HOVER BOX Your existing hover structure remains inside the image. ==== */
  /* section.photos-section .photos-box .photo-post .hover-box {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  } */
  /* ==== OPTIONAL IMAGE HOVER ==== */
  /* section.photos-section .photos-box .photo-post img {
    transition: transform 0.4s ease;
  }
  section.photos-section .photos-box .photo-post:hover img {
    transform: scale(1.03);
  } */

  /* ==== TABLET ==== */
  @media (max-width: 991px) {
    section.photos-section .photos-box {
      gap: 8px;
    }
  }

  /* ==== MOBILE ==== */
  @media (max-width: 575px) {
    section.photos-section {
      padding: 20px;
    }
    section.photos-section .photos-box {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    section.photos-section .photos-box .photo-post {
      width: 100% !important;
      height: 300px !important;
    }
    section.photos-section .photos-box .photo-post img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;
export default Home;
