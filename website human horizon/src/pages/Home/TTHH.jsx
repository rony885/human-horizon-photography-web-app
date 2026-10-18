import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import { useProductContext } from "../../context/ProductContext.jsx";
import { useCartContext } from "../../context/CartContext.jsx";

const Home = () => {
  // CART & WISHLIST
  const {
    cart = [],
    addToCart,
    removeCart,
    addToWishlist,
    removeWishlist,
    wishlist = [],
  } = useCartContext();

  // PRODUCT API DATA
  const {
    product,
    unpaginate_category,
    year,
    fetchProduct,
    fetchUnpaginateCategory,
    fetchYear,
  } = useProductContext();

  const galleryRef = useRef(null);

  // DATA STATE
  const [photos, setPhotos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [years, setYears] = useState([]);

  // FILTER STATE
  const [selectedCategory, setSelectedCategory] = useState(
    () => localStorage.getItem("selectedCategory") || "All",
  );

  const [selectedYear, setSelectedYear] = useState(
    () => localStorage.getItem("selectedYear") || "All",
  );

  // FETCH API DATA
  useEffect(() => {
    fetchProduct();
    fetchUnpaginateCategory();
    fetchYear();
  }, [fetchProduct, fetchUnpaginateCategory, fetchYear]);

  // SET API DATA
  useEffect(() => {
    setPhotos(Array.isArray(product) ? product : []);

    setCategories(
      Array.isArray(unpaginate_category) ? unpaginate_category : [],
    );

    setYears(Array.isArray(year) ? year : []);
  }, [product, unpaginate_category, year]);

  // SAVE FILTERS
  useEffect(() => {
    localStorage.setItem("selectedCategory", selectedCategory);
    localStorage.setItem("selectedYear", selectedYear);
  }, [selectedCategory, selectedYear]);

  // FILTER PRODUCTS
  const filteredPhotos = photos.filter((photo) => {
    const categoryId = photo.category_id ?? photo.category?.id;
    const yearId = photo.year_id ?? photo.year?.id;

    const categoryMatch =
      selectedCategory === "All" ||
      Number(categoryId) === Number(selectedCategory);

    const yearMatch =
      selectedYear === "All" || Number(yearId) === Number(selectedYear);

    return categoryMatch && yearMatch;
  });

  // CLEAR FILTERS
  const handleClearAll = () => {
    setSelectedCategory("All");
    setSelectedYear("All");

    localStorage.removeItem("selectedCategory");
    localStorage.removeItem("selectedYear");
  };

  // JUSTIFIED GALLERY LAYOUT
  useEffect(() => {
    const gallery = galleryRef.current;

    if (!gallery || !filteredPhotos.length) return;

    let resizeTimer;

    const createRows = () => {
      const currentGallery = galleryRef.current;
      if (!currentGallery) return;

      const items = Array.from(currentGallery.querySelectorAll(".photo-post"));

      if (!items.length) return;

      items.forEach((item) => {
        item.style.width = "";
        item.style.height = "";
      });

      const containerWidth = currentGallery.clientWidth;
      if (!containerWidth) return;

      if (window.innerWidth <= 575) {
        items.forEach((item) => {
          item.style.width = "100%";
          item.style.height = "300px";
        });

        return;
      }

      let targetRowHeight = 260;

      if (window.innerWidth >= 1200) {
        targetRowHeight = 260;
      } else if (window.innerWidth >= 768) {
        targetRowHeight = 240;
      }

      const imageData = items.map((item) => {
        const img = item.querySelector("img");

        return {
          item,
          ratio:
            img?.naturalWidth && img?.naturalHeight
              ? img.naturalWidth / img.naturalHeight
              : 1,
        };
      });

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

      rows.forEach((row, rowIndex) => {
        const isLastRow = rowIndex === rows.length - 1;

        const totalRatio = row.reduce((total, image) => total + image.ratio, 0);

        const totalGap = (row.length - 1) * GAP;

        let rowHeight = targetRowHeight;

        if (!isLastRow && totalRatio > 0) {
          rowHeight = (containerWidth - totalGap) / totalRatio;
        }

        row.forEach(({ item, ratio }) => {
          item.style.width = `${ratio * rowHeight}px`;
          item.style.height = `${rowHeight}px`;
        });
      });
    };

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
        if (img.complete) {
          checkComplete();
        } else {
          img.addEventListener("load", checkComplete, { once: true });
          img.addEventListener("error", checkComplete, { once: true });
        }
      });
    };

    const timer = setTimeout(waitForImages, 50);

    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(createRows, 100);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, [filteredPhotos]);

  // PRODUCT ID HELPER
  const getProductId = (item) => item.productId ?? item.product?.id ?? item.id;

  return (
    <Wrapper>
      <section className="photos-section" style={{ marginTop: "100px" }}>
        {/* FILTER AREA */}
        <div className="filter-area row align-items-start">
          <div className="col-lg-8 category-filter-wrapper">
            <h5 className="filter-title">Short by: Category</h5>

            <div className="category-filter row_horizon">
              <button
                type="button"
                className={selectedCategory === "All" ? "active" : ""}
                onClick={() => setSelectedCategory("All")}
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
                  onClick={() => setSelectedCategory(String(category.id))}
                >
                  {category.categories || category.name}
                </button>
              ))}
            </div>
          </div>

          {/* YEAR FILTER */}
          <div className="col-lg-2 year-filter-wrapper">
            <h5 className="filter-title">Short by: Year</h5>

            <div className="year-filter row_horizon">
              <button
                type="button"
                className={selectedYear === "All" ? "active" : ""}
                onClick={() => setSelectedYear("All")}
              >
                ALL
              </button>

              {years.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  className={
                    Number(selectedYear) === Number(item.id) ? "active" : ""
                  }
                  onClick={() => setSelectedYear(String(item.id))}
                >
                  {item.year}
                </button>
              ))}
            </div>
          </div>

          {/* CLEAR FILTERS */}
          <div className="col-lg-2 clear-filter-wrapper pr-0">
            <button
              type="button"
              className="clear-all-button"
              onClick={handleClearAll}
            >
              Clear All
            </button>
          </div>
        </div>

        {/* PRODUCT GALLERY */}
        <div className="photos-box iso-call" ref={galleryRef}>
          {filteredPhotos.map((photo) => {
            // CATEGORY DATA
            const photoCategory =
              categories.find(
                (category) =>
                  Number(category.id) ===
                  Number(photo.category_id ?? photo.category?.id),
              ) || photo.category;

            // YEAR DATA
            const photoYear =
              years.find(
                (item) =>
                  Number(item.id) === Number(photo.year_id ?? photo.year?.id),
              ) || photo.year;

            // WISHLIST STATUS
            const isInWishlist = wishlist.some(
              (item) => Number(getProductId(item)) === Number(photo.id),
            );

            // CART STATUS
            const isInCart = cart.some(
              (item) => Number(getProductId(item)) === Number(photo.id),
            );

            return (
              <div className="photo-post" key={photo.id}>
                <Link
                  to={`/image-details/${photo.id}`}
                  state={{ from: "home" }}
                  className="image-link"
                >
                  <img
                    src={photo.thumbnail_image}
                    alt={photo.name || "Gallery Image"}
                  />
                </Link>

                {/* HOVER CONTENT */}
                <div className="hover-box">
                  <div className="inner-hover">
                    <div className="title-post">
                      <h2>{photo.name}</h2>
                      <span className="text-capitalize">
                        {photoCategory?.categories || photoCategory?.name || ""}
                      </span>
                      &nbsp;
                      <span className="text-capitalize">
                        {photoYear?.year || ""}
                      </span>
                    </div>

                    <div className="share-like">
                      {/* WISHLIST */}
                      <Link
                        to="#"
                        aria-label={
                          isInWishlist
                            ? "Remove from wishlist"
                            : "Add to wishlist"
                        }
                        className={`like ${
                          isInWishlist ? "active-wishlist" : ""
                        }`}
                        onClick={(e) => {
                          e.preventDefault();

                          if (isInWishlist) {
                            removeWishlist(photo.id);
                          } else {
                            addToWishlist(photo);
                          }
                        }}
                      >
                        <OverlayTrigger
                          placement="left"
                          overlay={
                            <Tooltip id={`wishlist-${photo.id}`}>
                              {isInWishlist
                                ? "Remove from Wishlist"
                                : "Add to Wishlist"}
                            </Tooltip>
                          }
                        >
                          <span className="icon-wrapper">
                            <FaHeart
                              className="action-icon"
                              color={isInWishlist ? "#ff3333" : "#ffffff"}
                            />
                          </span>
                        </OverlayTrigger>
                      </Link>

                      {/* CART */}
                      <Link
                        to="#"
                        aria-label={
                          isInCart ? "Remove from cart" : "Add to cart"
                        }
                        className={`like ${isInCart ? "active-cart" : ""}`}
                        onClick={(e) => {
                          e.preventDefault();

                          if (isInCart) {
                            removeCart(photo.id);
                          } else {
                            // Home adds the product using the default license.
                            addToCart(photo.id, 1, photo);
                          }
                        }}
                      >
                        <OverlayTrigger
                          placement="left"
                          overlay={
                            <Tooltip id={`cart-${photo.id}`}>
                              {isInCart ? "Remove from Cart" : "Add to Cart"}
                            </Tooltip>
                          }
                        >
                          <span className="icon-wrapper">
                            <FaShoppingCart
                              className="action-icon"
                              color={isInCart ? "#ff3333" : "#ffffff"}
                            />
                          </span>
                        </OverlayTrigger>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* NO PRODUCTS */}
        {filteredPhotos.length === 0 && (
          <div className="no-photo">No photos found.</div>
        )}

        {/* LOAD MORE */}
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
    overflow-x: auto;
    flex-wrap: nowrap;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
  }

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
    padding-left: 15px;
    padding-right: 15px;
  }

  .filter-title {
    margin: 0 0 12px;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.4;
  }

  .category-filter,
  .year-filter {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
  }

  .category-filter button,
  .year-filter button {
    flex: 0 0 auto;
    border: none;
    background: transparent;
    padding: 6px 10px;
    border-radius: 3px;
    text-transform: capitalize;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.3s ease;
  }

  .category-filter button:hover,
  .year-filter button:hover,
  .category-filter button.active,
  .year-filter button.active {
    background: #000;
    color: #fff;
  }

  .clear-filter-wrapper {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }

  .clear-all-button {
    border: 1px solid #000;
    background: transparent;
    color: #000;
    padding: 6px 10px;
    border-radius: 3px;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.3s ease;
    margin-top: 32px;
  }

  .clear-all-button:hover {
    background: #000;
    color: #fff;
  }

  .photos-section .photos-box {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    width: 100%;
    gap: 10px;
  }

  .photos-box .photo-post {
    position: relative;
    flex: 0 0 auto;
    overflow: hidden;
    box-sizing: border-box;
  }

  .photos-box .photo-post img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  .photos-box .photo-post:hover img {
    transform: scale(1.03);
  }

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
  .share-like .icon-wrapper {
    pointer-events: auto;
  }

  .photos-box .photo-post .hover-box {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  .photos-box .photo-post .inner-hover {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 25px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  /* CART AND WISHLIST ICONS */
  .share-like {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 12px;
  }

  .like {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .icon-wrapper {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .action-icon {
    display: block;
    font-size: 20px;
    transition: color 0.3s ease;
  }

  .like:not(.active-cart):not(.active-wishlist):hover .action-icon {
    color: #ff3333;
  }

  .like.active-wishlist .action-icon,
  .like.active-cart .action-icon {
    color: #ff3333;
  }

  .like.active-wishlist:hover .action-icon,
  .like.active-cart:hover .action-icon {
    color: #ff3333;
  }

  .no-photo {
    width: 100%;
    text-align: center;
    padding: 50px 20px;
    font-size: 18px;
  }

  @media (max-width: 991px) {
    .filter-area {
      margin-bottom: 20px;
    }

    .category-filter-wrapper,
    .year-filter-wrapper,
    .clear-filter-wrapper {
      padding-left: 15px;
      padding-right: 15px;
    }

    .clear-filter-wrapper {
      justify-content: flex-start;
      align-items: flex-start;
      margin-top: 10px;
    }

    .clear-all-button {
      margin-top: 0;
    }

    .photos-section .photos-box {
      gap: 8px;
    }
  }

  @media (max-width: 575px) {
    .photos-section {
      padding: 20px;
    }

    .filter-area {
      display: block;
    }

    .category-filter-wrapper,
    .year-filter-wrapper,
    .clear-filter-wrapper {
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

    .category-filter,
    .year-filter {
      width: 100%;
      overflow-x: auto;
      flex-wrap: nowrap;
    }

    .category-filter button,
    .year-filter button {
      flex: 0 0 auto;
    }

    .clear-filter-wrapper {
      margin-top: 15px;
      justify-content: flex-start;
    }

    .photos-section .photos-box {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .photos-section .photos-box .photo-post {
      width: 100% !important;
      height: 300px !important;
    }

    .photos-section .photos-box .photo-post img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

export default Home;
