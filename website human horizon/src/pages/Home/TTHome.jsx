import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

import photosArray from "../../DataJS/photos.js";
import categoriesArray from "../../DataJS/categories.js";
import yearsArray from "../../DataJS/year.js";

const Home = () => {
  const galleryRef = useRef(null);
  const [photos, setPhotos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [years, setYears] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");

  useEffect(() => {
    setPhotos(photosArray);
    setCategories(categoriesArray);
    setYears(yearsArray);
  }, []);

  /* ====== FILTER PHOTOS ALL CATEGORY: Show every category. ALL YEAR: Show every year. ALL CATEGORY + ALL YEAR: Show ALL images. CATEGORY + YEAR: Both conditions must match. ====== */
  const filteredPhotos = photos.filter((photo) => {
    const categoryMatch =
      selectedCategory === "All" ||
      Number(photo.categoriesId) === Number(selectedCategory);

    const yearMatch =
      selectedYear === "All" || Number(photo.yearId) === Number(selectedYear);
    return categoryMatch && yearMatch;
  });

  /* ====== JUSTIFIED GALLERY ====== */
  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery || !filteredPhotos.length) {
      return;
    }

    let resizeTimer;
    const createRows = () => {
      const currentGallery = galleryRef.current;
      if (!currentGallery) return;

      const items = Array.from(currentGallery.querySelectorAll(".photo-post"));
      if (!items.length) return;
      /* ===== RESET OLD INLINE STYLES ===== */ items.forEach((item) => {
        item.style.width = "";
        item.style.height = "";
      });

      const containerWidth = currentGallery.clientWidth;
      if (!containerWidth) return;
      /* ===== MOBILE ONE IMAGE PER ROW ===== */
      if (window.innerWidth <= 575) {
        items.forEach((item) => {
          item.style.width = "100%";
          item.style.height = "300px";
        });
        return;
      }

      /* ===== ROW HEIGHT ===== */
      let targetRowHeight = 260;
      if (window.innerWidth >= 1200) {
        targetRowHeight = 260;
      } else if (window.innerWidth >= 768) {
        targetRowHeight = 240;
      } else {
        targetRowHeight = 260;
      }

      /* ===== IMAGE INFORMATION ===== */
      const imageData = items.map((item) => {
        const img = item.querySelector("img");
        const naturalWidth = img.naturalWidth || 1;
        const naturalHeight = img.naturalHeight || 1;
        return { item, ratio: naturalWidth / naturalHeight };
      });

      /* ===== CREATE ROWS ===== */
      const rows = [];
      let currentRow = [];
      let currentRatio = 0;
      const GAP = 10;
      imageData.forEach((image, index) => {
        currentRow.push(image);
        currentRatio += image.ratio;
        const gapWidth = (currentRow.length - 1) * GAP;
        const calculatedWidth = currentRatio * targetRowHeight + gapWidth;
        const remaining = imageData.length - index - 1;
        if (
          calculatedWidth >= containerWidth * 0.92 ||
          currentRow.length >= 5 ||
          remaining === 0
        ) {
          rows.push(currentRow);
          currentRow = [];
          currentRatio = 0;
        }
      });

      /* ===== APPLY ROW SIZES ===== */
      rows.forEach((row, rowIndex) => {
        const isLastRow = rowIndex === rows.length - 1;
        const totalRatio = row.reduce((total, image) => total + image.ratio, 0);
        const totalGap = (row.length - 1) * GAP;
        let rowHeight = targetRowHeight;
        /* ===== NORMAL ROWS COMPLETELY FILL WIDTH ===== */
        if (!isLastRow) {
          rowHeight = (containerWidth - totalGap) / totalRatio;
        }
        row.forEach(({ item, ratio }) => {
          const width = ratio * rowHeight;
          item.style.width = `${width}px`;
          item.style.height = `${rowHeight}px`;
        });
      });
    };

    /* ====== WAIT FOR ALL IMAGES ====== */
    const waitForImages = () => {
      const images = gallery.querySelectorAll("img");
      if (!images.length) return;
      let loadedImages = 0;

      const checkComplete = () => {
        loadedImages++;
        if (loadedImages >= images.length) {
          createRows();
        }
      };
      images.forEach((img) => {
        if (img.complete && img.naturalWidth > 0) {
          checkComplete();
        } else {
          img.addEventListener("load", checkComplete, { once: true });
          img.addEventListener("error", checkComplete, { once: true });
        }
      });
    };

    /* ====== SMALL DELAY ====== */
    const timer = setTimeout(() => {
      waitForImages();
    }, 50);

    /* ====== RESIZE ====== */
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        createRows();
      }, 100);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timer);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, [filteredPhotos]);

  return (
    <Wrapper>
      <section className="photos-section" style={{ marginTop: "100px" }}>
        <div className="filter-area row align-items-start">
          <div className="col-lg-9 category-filter-wrapper">
            <h5 className="filter-title"> Short by: Category </h5>
            <div className="category-filter row_horizon">
              <button
                type="button"
                className={
                  selectedCategory === "All" && selectedYear === "All"
                    ? "active"
                    : ""
                }
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedYear("All");
                }}
              >
                ALL
              </button>

              {categories.map((category) => (
                <button
                  type="button"
                  key={category.id}
                  className={
                    Number(selectedCategory) === Number(category.id)
                      ? "active"
                      : ""
                  }
                  onClick={() => {
                    setSelectedCategory(category.id);
                  }}
                  style={{ textTransform: "uppercase", whiteSpace: "nowrap" }}
                >
                  {category.categories}
                </button>
              ))}
            </div>
          </div>

          <div className="col-lg-3 year-filter-wrapper">
            <h5 className="filter-title year-title"> Short by: Year </h5>
            <div className="year-filter row_horizon">
              <button
                type="button"
                className={selectedYear === "All" ? "active" : ""}
                onClick={() => {
                  setSelectedYear("All");
                }}
              >
                ALL
              </button>

              {years.map((year) => (
                <button
                  type="button"
                  key={year.id}
                  className={
                    Number(selectedYear) === Number(year.id) ? "active" : ""
                  }
                  onClick={() => {
                    setSelectedYear(year.id);
                  }}
                  style={{ textTransform: "uppercase", whiteSpace: "nowrap" }}
                >
                  {year.year}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ====== GALLERY ====== */}
        <div className="photos-box iso-call" ref={galleryRef}>
          {filteredPhotos.map((photo) => {
            /* ====== FIND CATEGORY ====== */
            const photoCategory = categories.find(
              (category) => Number(category.id) === Number(photo.categoriesId),
            );

            /* ====== FIND YEAR ====== */
            const photoYear = years.find(
              (year) => Number(year.id) === Number(photo.yearId),
            );

            return (
              <div className={`photo-post ${photo.title}`} key={photo.id}>
                <Link
                  to={`/image-details/${photo.id}`}
                  state={{ from: "home" }}
                  className="image-link"
                >
                  <img
                    src={photo.image}
                    alt={
                      photoCategory ? photoCategory.categories : "Gallery Image"
                    }
                  />
                </Link>

                {/* ====== HOVER BOX ====== */}
                <div className="hover-box">
                  <div className="inner-hover">
                    <div className="title-post">
                      <h2>{photo.title}</h2>
                      <span className="text-capitalize">
                        {photoCategory ? photoCategory.categories : ""}
                      </span>
                      &nbsp;
                      <span className="text-capitalize">
                        {" "}
                        {photoYear ? photoYear.year : ""}{" "}
                      </span>
                    </div>

                    <div className="share-like">
                      <Link to="#" className="like">
                        {/* 120 <FaHeart /> */}
                        <FaHeart />
                      </Link>
                      <Link to="#" className="like">
                        <FaShoppingCart />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredPhotos.length === 0 && (
          <div className="no-photo"> No photos found. </div>
        )}

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
  .row_horizon {
    display: flex;
    align-items: center;
    gap: 8px;
    overflow-x: auto !important;
    flex-wrap: nowrap !important;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
  }

  /* ====== FILTER AREA ====== */
  .filter-area {
    width: 100%;
    margin-bottom: 25px;
    display: flex;
    align-items: flex-start;
    row-gap: 20px;
  }

  .category-filter-wrapper {
    padding-right: 25px;
  }

  .year-filter-wrapper {
    padding-left: 25px;
  }

  /* ====== FILTER TITLE ====== */
  .filter-title {
    margin: 0 0 12px;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.4;
  }

  .year-title {
    text-align: right;
  }

  /* ====== CATEGORY / YEAR FILTER ====== */
  .category-filter,
  .year-filter {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
  }

  /* ====== FILTER BUTTON ====== */
  .category-filter button,
  .year-filter button {
    flex: 0 0 auto;
    border: none;
    background: transparent;
    padding: 6px 10px;
    border-radius: 3px;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.3s ease;
  }

  /* ====== FILTER BUTTON HOVER / ACTIVE ====== */
  .category-filter button:hover,
  .year-filter button:hover,
  .category-filter button.active,
  .year-filter button.active {
    background: #000;
    color: #fff;
  }

  /* ====== MAIN GALLERY ====== */
  section.photos-section .photos-box {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    width: 100%;
    gap: 10px;
  }

  /* ====== PHOTO ITEM ====== */
  section.photos-section .photos-box .photo-post {
    position: relative;
    flex: 0 0 auto;
    overflow: hidden;
    box-sizing: border-box;
  }

  /* ====== IMAGE ====== */
  section.photos-section .photos-box .photo-post img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  /* ====== IMAGE HOVER ====== */
  section.photos-section .photos-box .photo-post:hover img {
    transform: scale(1.03);
  }

  /* Image Link */
  .image-link {
    display: block;
    width: 100%;
    height: 100%;
  }

  .hover-box {
    pointer-events: none;
  }

  .share-like,
  .share-like a,
  .share-list {
    pointer-events: auto;
  }

  /* ====== HOVER BOX ====== */
  section.photos-section .photos-box .photo-post .hover-box {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  /* ====== INNER HOVER ====== */
  section.photos-section .photos-box .photo-post .inner-hover {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 25px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .share-like {
    display: flex;
    align-items: center;
    /* gap: 12px; */
  }
  .share-list {
    display: flex;
    align-items: center;
    /* gap: 8px; */
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .no-photo {
    width: 100%;
    text-align: center;
    padding: 50px 20px;
    font-size: 18px;
  }

  /* ====== TABLET ====== */
  @media (max-width: 991px) {
    .filter-area {
      margin-bottom: 20px;
    }
    .category-filter-wrapper,
    .year-filter-wrapper {
      padding-left: 15px;
      padding-right: 15px;
    }
    .year-title {
      text-align: left;
    }
    section.photos-section .photos-box {
      gap: 8px;
    }
  }
  /* ====== MOBILE ====== */
  @media (max-width: 575px) {
    section.photos-section {
      padding: 20px;
    }
    .filter-area {
      display: block;
    }
    .category-filter-wrapper,
    .year-filter-wrapper {
      width: 100%;
      padding-left: 0;
      padding-right: 0;
    }
    .category-filter-wrapper {
      margin-bottom: 20px;
    }
    .filter-title {
      margin-bottom: 10px;
    }
    .year-title {
      text-align: left;
    }
    .category-filter,
    .year-filter {
      width: 100%;
      overflow-x: auto !important;
      flex-wrap: nowrap !important;
    }
    .category-filter button,
    .year-filter button {
      flex: 0 0 auto;
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
