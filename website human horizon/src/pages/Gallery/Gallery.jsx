import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

// import categoriesArray from "../../DataJS/categories.js";
// import yearsArray from "../../DataJS/year.js";

import photosArray from "../../DataJS/photos.js";
import { useCartContext } from "../../context/CartContext.jsx";

const Gallery = () => {
  const {
    cart,
    addToCart,
    removeCart,
    addToWishlist,
    removeWishlist,
    wishlist,
  } = useCartContext();

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [photos, setPhotos] = useState([]);

  // const [categories, setCategories] = useState([]);
  // const [years, setYears] = useState([]);

  useEffect(() => {
    setPhotos(photosArray);

    // setCategories(categoriesArray);
    // setYears(yearsArray);
  }, []);

  // OPEN LIGHTBOX
  const openLightbox = (index) => {
    setSelectedIndex(index);
    document.body.style.overflow = "hidden";
  };

  // CLOSE LIGHTBOX
  const closeLightbox = useCallback(() => {
    setSelectedIndex(null);
    document.body.style.overflow = "";
  }, []);

  // PREVIOUS IMAGE
  const prevImage = useCallback(() => {
    setSelectedIndex((currentIndex) => {
      if (currentIndex === null) {
        return null;
      }

      return currentIndex === 0 ? photos.length - 1 : currentIndex - 1;
    });
  }, [photos.length]);

  // NEXT IMAGE
  const nextImage = useCallback(() => {
    setSelectedIndex((currentIndex) => {
      if (currentIndex === null) {
        return null;
      }

      return currentIndex === photos.length - 1 ? 0 : currentIndex + 1;
    });
  }, [photos.length]);

  // KEYBOARD
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (selectedIndex === null) {
        return;
      }

      if (event.key === "Escape") {
        closeLightbox();
      }

      if (event.key === "ArrowLeft") {
        prevImage();
      }

      if (event.key === "ArrowRight") {
        nextImage();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex, closeLightbox, prevImage, nextImage]);

  // CLEAN BODY
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <Wrapper>
      <section className="photos-section py-5" style={{ marginTop: "80px" }}>
        <div className="container-fluid px-3 px-md-4">
          <div className="breadcrumb">
            <Link className="mb-4 text-dark fw-bold" to="/">
              Home
            </Link>

            <span> &gt; </span>

            <span>Gallery</span>
          </div>

          <div className="masonry-grid">
            {photos.map((item, index) => {
              // CHECK WISHLIST
              const isInWishlist = wishlist.some(
                (wishItem) => Number(wishItem.id) === Number(item.id),
              );

              // CHECK CART
              const isInCart = cart.some(
                (cartItem) => Number(cartItem.productId) === Number(item.id),
              );

              return (
                <div
                  className="masonry-item"
                  key={item.id}
                  onClick={() => openLightbox(index)}
                >
                  <div className="photo-post position-relative overflow-hidden rounded-4">
                    <img
                      src={item.thumbnail_image}
                      alt={item.alt || item.title || "Gallery Image"}
                      className="w-100 d-block gallery-image"
                    />

                    <div className="overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-end p-4">
                      <div
                        className="gallery-actions position-absolute top-0 end-0 d-flex align-items-center gap-2 p-3"
                        onClick={(event) => {
                          event.stopPropagation();
                        }}
                      >
                        {/* WISHLIST */}
                        <OverlayTrigger
                          placement="left"
                          overlay={
                            <Tooltip id={`wishlist-${item.id}`}>
                              {isInWishlist
                                ? "Already in Wishlist"
                                : "Add to Wishlist"}
                            </Tooltip>
                          }
                        >
                          <button
                            type="button"
                            className={`gallery-action-btn ${
                              isInWishlist ? "active-wishlist" : ""
                            }`}
                            onClick={(event) => {
                              event.stopPropagation();

                              if (isInWishlist) {
                                removeWishlist(item.id);
                              } else {
                                addToWishlist(item);
                              }
                            }}
                            aria-label={
                              isInWishlist
                                ? "Already in Cart"
                                : "Add to Wishlist"
                            }
                          >
                            <FaHeart size={17} />
                          </button>
                        </OverlayTrigger>

                        {/* CART */}
                        <OverlayTrigger
                          placement="left"
                          overlay={
                            <Tooltip id={`cart-${item.id}`}>
                              {isInCart ? "Remove from Cart" : "Add to Cart"}
                            </Tooltip>
                          }
                        >
                          <button
                            type="button"
                            className={`gallery-action-btn ${
                              isInCart ? "active-cart" : ""
                            }`}
                            onClick={(event) => {
                              event.stopPropagation();

                              if (isInCart) {
                                removeCart(item.id);
                              } else {
                                addToCart(item.id, 1, item);
                              }
                            }}
                            aria-label={
                              isInCart ? "Remove from Cart" : "Add to Cart"
                            }
                          >
                            <FaShoppingCart size={17} />
                          </button>
                        </OverlayTrigger>
                      </div>

                      <h3 className="text-white fs-5 fw-semibold m-0">
                        <Link
                          className="text-white text-capitalize"
                          to={`/image-details/${item.id}`}
                          state={{ from: "gallery" }}
                          onClick={(event) => event.stopPropagation()}
                        >
                          {item.title}
                        </Link>
                      </h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==== LIGHTBOX ==== */}
      {selectedIndex !== null && (
        <div
          className="lightbox-backdrop position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          onClick={closeLightbox}
        >
          <button
            type="button"
            className="lightbox-close-button position-fixed d-flex align-items-center justify-content-center rounded-circle border-0 text-white"
            onClick={(event) => {
              event.stopPropagation();
              closeLightbox();
            }}
            aria-label="Close lightbox"
          >
            <FiX size={24} strokeWidth={2.5} />
          </button>

          <button
            type="button"
            className="btn-nav btn-prev position-absolute d-flex align-items-center justify-content-center rounded-circle border-0 text-white"
            onClick={(event) => {
              event.stopPropagation();
              prevImage();
            }}
            aria-label="Previous image"
          >
            <FiChevronLeft size={26} strokeWidth={2} />
          </button>

          <div
            className="lightbox-content d-flex flex-column align-items-center"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="image-wrapper d-flex align-items-center justify-content-center">
              <img
                src={photos[selectedIndex].main_image}
                alt={
                  photos[selectedIndex].alt ||
                  photos[selectedIndex].title ||
                  "Gallery Image"
                }
                className="lightbox-image d-block rounded-4"
              />
            </div>

            <div className="lightbox-info w-100 d-flex align-items-center justify-content-between gap-3 mt-3 px-1">
              <p className="lightbox-caption text-white m-0 fw-medium text-capitalize">
                {photos[selectedIndex].title}
              </p>

              <span className="image-counter text-white rounded-pill px-3 py-2">
                {selectedIndex + 1} of {photos.length}
              </span>
            </div>
          </div>

          <button
            type="button"
            className="btn-nav btn-next position-absolute d-flex align-items-center justify-content-center rounded-circle border-0 text-white"
            onClick={(event) => {
              event.stopPropagation();
              nextImage();
            }}
            aria-label="Next image"
          >
            <FiChevronRight size={26} strokeWidth={2} />
          </button>
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .masonry-grid {
    column-count: 1;
    column-gap: 20px;
  }

  .masonry-item {
    width: 100%;
    display: inline-block;
    vertical-align: top;
    break-inside: avoid;
    margin-bottom: 20px;
    cursor: pointer;
  }

  /* GALLERY IMAGE */
  .photo-post {
    background: #f5f5f5;
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
  }

  .photo-post:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  }

  .gallery-image {
    transition: transform 0.4s ease;
  }

  .photo-post:hover .gallery-image {
    transform: scale(1.04);
  }

  /* OVERLAY */
  .overlay {
    opacity: 0;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.75),
      rgba(0, 0, 0, 0.05)
    );
    transition: opacity 0.3s ease;
  }

  .photo-post:hover .overlay {
    opacity: 1;
  }

  /* GALLERY ACTIONS */
  .gallery-actions {
    z-index: 10;
  }

  .gallery-action-btn {
    width: 38px;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: 1px solid rgba(255, 255, 255, 0.35);
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.35);
    color: #fff;
    cursor: pointer;
    transition:
      background 0.25s ease,
      color 0.25s ease,
      transform 0.25s ease,
      border-color 0.25s ease;
  }

  .gallery-action-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.7);
    color: #fff;
    transform: scale(1.08);
  }

  /*  ACTIVE WISHLIST  */
  .gallery-action-btn.active-wishlist {
    color: #ff3333;
    /* background: rgba(255, 255, 255, 0.95); */
    /* border-color: #fff; */
  }

  .gallery-action-btn.active-wishlist:hover {
    color: #ff3333;
    /* background: #fff; */
  }

  /*  ACTIVE CART  */
  .gallery-action-btn.active-cart {
    color: #ff3333;
    /* background: rgba(255, 255, 255, 0.95); */
    /* border-color: #fff; */
  }

  .gallery-action-btn.active-cart:hover {
    color: #ff3333;
    /* background: #fff; */
  }

  /* LIGHTBOX */
  .lightbox-backdrop {
    z-index: 999998;
    padding: 1rem;
    background: rgba(0, 0, 0, 0.88);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }

  .lightbox-close-button {
    top: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    z-index: 2147483647;
    background: rgba(255, 255, 255, 0.18);
    border: 2px solid rgba(255, 255, 255, 0.35) !important;
    padding: 0;
    transition:
      background 0.2s ease,
      transform 0.2s ease,
      border-color 0.2s ease;
  }

  .lightbox-close-button:hover {
    background: rgba(255, 255, 255, 0.32);
    border-color: rgba(255, 255, 255, 0.75) !important;
    transform: scale(1.08);
  }

  .lightbox-content {
    max-width: 60rem;
    max-height: 90vh;
    position: relative;
    z-index: 999999;
  }

  .lightbox-image {
    max-width: calc(100vw - 160px);
    max-height: 80vh;
    width: auto;
    object-fit: contain;

    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  }

  .image-counter {
    background: rgba(255, 255, 255, 0.12);
    font-size: 0.95rem;
    white-space: nowrap;
  }

  /* NAVIGATION BUTTONS */
  .btn-nav {
    width: 50px;
    height: 50px;
    z-index: 1000000;
    background: rgba(255, 255, 255, 0.12);
    transition:
      background 0.2s ease,
      transform 0.2s ease;
  }

  .btn-nav:hover {
    background: rgba(255, 255, 255, 0.25);
  }

  .btn-prev {
    left: 1.25rem;
    top: 50%;
    transform: translateY(-50%);
  }

  .btn-prev:hover {
    transform: translateY(-50%) scale(1.05);
  }

  .btn-next {
    right: 1.25rem;
    top: 50%;
    transform: translateY(-50%);
  }

  .btn-next:hover {
    transform: translateY(-50%) scale(1.05);
  }

  /* MASONRY RESPONSIVE */
  @media (min-width: 540px) {
    .masonry-grid {
      column-count: 2;
    }
  }

  @media (min-width: 820px) {
    .masonry-grid {
      column-count: 3;
    }
  }

  @media (min-width: 1100px) {
    .masonry-grid {
      column-count: 4;
    }
  }

  @media (min-width: 1400px) {
    .masonry-grid {
      column-count: 5;
    }
  }

  /* TABLET */
  @media (max-width: 1024px) {
    .lightbox-close-button {
      top: 15px;
      right: 15px;
      width: 48px;
      height: 48px;
    }

    .lightbox-image {
      max-width: calc(100vw - 120px);
    }

    .btn-prev {
      left: 12px;
    }

    .btn-next {
      right: 12px;
    }
  }

  /* MOBILE */
  @media (max-width: 768px) {
    .lightbox-backdrop {
      padding: 15px;
    }

    .lightbox-close-button {
      top: 12px;
      right: 12px;
      width: 46px;
      height: 46px;
    }

    .lightbox-content {
      max-width: calc(100vw - 30px);
      max-height: 85vh;
    }

    .lightbox-image {
      max-width: calc(100vw - 80px);
      max-height: 72vh;
      border-radius: 12px !important;
    }

    .lightbox-caption {
      font-size: 1rem;
    }

    .image-counter {
      font-size: 0.85rem;
    }

    .btn-nav {
      width: 42px;
      height: 42px;
    }

    .btn-prev {
      left: 8px;
    }

    .btn-next {
      right: 8px;
    }

    .gallery-action-btn {
      width: 34px;
      height: 34px;
    }
  }

  /* SMALL MOBILE */
  @media (max-width: 480px) {
    .lightbox-close-button {
      top: 10px;
      right: 10px;
      width: 44px;
      height: 44px;
    }

    .lightbox-image {
      max-width: calc(100vw - 70px);
      max-height: 68vh;
    }

    .lightbox-caption {
      font-size: 0.9rem;
    }

    .image-counter {
      font-size: 0.8rem;
      padding: 4px 8px !important;
    }

    .btn-nav {
      width: 38px;
      height: 38px;
    }

    .btn-prev {
      left: 5px;
    }

    .btn-next {
      right: 5px;
    }

    .gallery-actions {
      padding: 10px !important;
    }

    .gallery-action-btn {
      width: 32px;
      height: 32px;
    }
  }
`;

export default Gallery;
