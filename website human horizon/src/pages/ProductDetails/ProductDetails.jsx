import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router";
import styled from "styled-components";

import photosArray from "../../DataJS/photos.js";
import categoriesArray from "../../DataJS/categories.js";
// import yearsArray from "../../DataJS/year.js";
import { useCartContext } from "../../context/CartContext.jsx";

const ProductDetails = () => {
  const {
    cart,
    addToCart,
    removeCart,
    addToWishlist,
    removeWishlist,
    wishlist,
  } = useCartContext();
  const [photos, setPhotos] = useState([]);
  const [categories, setCategories] = useState([]);
  // const [years, setYears] = useState([]);

  const [selectedLicense, setSelectedLicense] = useState("standard");
  const [showPreview, setShowPreview] = useState(false);
  const { id } = useParams();

  const location = useLocation();

  const from = location.state?.from;

  console.log("Product ID:", id);
  console.log("From:", from);

  useEffect(() => {
    setPhotos(photosArray);
    setCategories(categoriesArray);
    // setYears(yearsArray);
  }, []);

  const findProductDetails = photos.find(
    (productItem) => productItem.id === parseInt(id),
  );

  const findCategory = categories.find(
    (categoryItem) => categoryItem.id === findProductDetails?.categoriesId,
  );

  // const imageUrl =
  //   "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=2000&auto=format&fit=crop";

  // Check whether current product is already in cart

  // const isInCart = cart.some(
  //   (item) => item.productId === findProductDetails?.id,
  // );
  const isInCart = cart.some(
    (item) => Number(item.productId) === Number(findProductDetails?.id),
  );

  return (
    <Wrapper>
      <section className="photos-section py-5" style={{ marginTop: "80px" }}>
        <div className="container-fluid px-3 px-md-4">
          <div className="breadcrumb mb-4">
            <Link className="text-dark fw-bold" to="/">
              Home
            </Link>

            <span className="mx-2">&gt;</span>
            <span className="fw-bold">Image Details</span>
            <span className="mx-2">&gt;</span>
            <span>{findProductDetails && findProductDetails.title}</span>
          </div>

          <div className="main_product container">
            <div className="top-bar d-flex align-items-center justify-content-between mb-3">
              <div className="search-container d-flex align-items-center w-100 border rounded-2 overflow-hidden">
                <input
                  type="text"
                  className="form-control border-0 shadow-none text-start"
                  placeholder="Search for photos"
                />
                <button
                  className="btn btn-danger rounded-0 h-100 px-3 d-flex align-items-center justify-content-center"
                  type="button"
                >
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
            </div>

            {/* Products Row */}
            <div className="row g-4">
              <div className="col-lg-7 col-md-12">
                <div
                  className="image-card bg-light rounded overflow-hidden position-relative d-flex align-items-center justify-content-center"
                  onClick={() => setShowPreview(true)}
                  role="button"
                  tabIndex={0}
                >
                  <img
                    // src={imageUrl}
                    // src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=2000&auto=format&fit=crop"
                    src={findProductDetails && findProductDetails.preview_image}
                    alt="Young beauties picking flowers in the courtyard"
                    className="w-100 h-100"
                    style={{
                      objectFit: "inherit",
                    }}
                  />

                  <div className="image-overlay position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center text-white">
                    <i className="fa-solid fa-expand fs-3 mb-2"></i>
                    <span>See full-quality image</span>
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-between mt-3">
                  <div className="bg-light px-3 py-2 rounded small fw-semibold">
                    <i className="fa-solid fa-gem me-1"></i>
                    Premium Content by Human & Horizon
                  </div>

                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-outline-danger btn-sm"
                      type="button"
                    >
                      <i className="fa-solid fa-download me-1"></i>
                      Download
                    </button>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="small fw-semibold mb-2">Photo formats</div>

                  <div className="d-flex flex-wrap gap-2">
                    <span className="bg-color px-2 py-1 rounded-pill small">
                      <b>8688 × 5792 pixels</b> • 29 × 19.3 in • DPI 300 • JPG
                    </span>

                    <span className="bg-color px-2 py-1 rounded-pill small">
                      <b>1000 × 667 pixels</b> • 3.3 × 2.2 in • DPI 300 • JPG
                    </span>
                  </div>

                  <div className="mt-2">
                    <span className="bg-color px-2 py-1 rounded-pill small">
                      <b>500 × 334 pixels</b> • 1.7 × 1.1 in • DPI 300 • JPG
                    </span>
                  </div>
                </div>
              </div>

              <div className="col-lg-5 col-md-12">
                <div className="mb-3">
                  <label className="form-label fw-bold small mb-2">
                    Select License
                  </label>

                  <select
                    className="form-select license-select"
                    value={selectedLicense}
                    onChange={(e) => setSelectedLicense(e.target.value)}
                  >
                    <option value="standard">Standard</option>
                    <option value="enhanced">Enhanced</option>
                    {/* <option value="free">Free</option> */}
                  </select>

                  <h4 className="small fw-bold my-3">
                    {/* <span className="fw-bold fs-5">৳</span> */}$
                    {findProductDetails?.licenses?.[selectedLicense]?.price ||
                      0}
                  </h4>

                  <div className="mt-2">
                    {selectedLicense === "standard" && (
                      <p className="small text-secondary mb-0">
                        Limited usage in print, advertising, and packaging.
                        Unlimited web distribution.
                      </p>
                    )}

                    {selectedLicense === "enhanced" && (
                      <p className="small text-secondary mb-0">
                        Unlimited usage in print, advertising, packaging, and
                        merchandising. Unlimited web distribution.
                      </p>
                    )}

                    {selectedLicense === "free" && (
                      <p className="small text-secondary mb-0">
                        Free for personal and non-commercial use. Perfect for
                        personal projects, presentations, and creative work.
                      </p>
                    )}
                  </div>
                </div>

                {/* Add To Cart */}
                <button
                  className="btn btn-danger w-100 mb-3"
                  type="button"
                  // onClick={(e) => {
                  //   e.preventDefault();

                  //   if (!findProductDetails) return;

                  //   if (isInCart) {
                  //     const cartItem = cart.find(
                  //       (item) =>
                  //         Number(item.productId) ===
                  //         Number(findProductDetails.id),
                  //     );

                  //     if (cartItem) {
                  //       removeCart(cartItem.id);
                  //     }
                  //   } else {
                  //     addToCart(findProductDetails.id, 1, findProductDetails);
                  //   }
                  // }}

                  onClick={(e) => {
                    e.preventDefault();

                    if (!findProductDetails) return;

                    if (isInCart) {
                      const cartItem = cart.find(
                        (item) =>
                          Number(item.productId) ===
                          Number(findProductDetails.id),
                      );

                      if (cartItem) {
                        removeCart(cartItem.id);
                      }
                    } else {
                      // Pass the selected license along with the product
                      addToCart(
                        findProductDetails.id,
                        1,
                        findProductDetails,
                        selectedLicense,
                      );
                    }
                  }}
                >
                  <i
                    className={`fa-solid ${
                      isInCart ? "fa-check" : "fa-basket-shopping"
                    } me-1`}
                  ></i>

                  {isInCart ? "Already in Cart" : "Add to Cart"}
                </button>

                <p
                  className="small text-secondary mb-4"
                  style={{ textAlign: "justify" }}
                >
                  Offset images aren't included in image subscriptions, FLEX
                  subscriptions, unlimited downloads subscriptions or on-demand
                  packs. You can license and pay for them separately.
                </p>

                <div className="image-details">
                  <h4 className="small fw-bold mb-3">Image details</h4>

                  <div className="small mb-2">
                    <span className="text-secondary">Asset id:&nbsp;</span>
                    {findProductDetails && findProductDetails.assetId}
                    <i className="fa-regular fa-copy ms-1 text-secondary"></i>
                  </div>

                  <div className="small fw-semibold mb-2">
                    {findProductDetails && findProductDetails.title}
                    <i className="fa-regular fa-copy ms-1 text-secondary"></i>
                  </div>

                  <div className="small mb-2">
                    <span className="text-secondary">Upload date:&nbsp;</span>
                    {findProductDetails && findProductDetails.uploadDate}
                  </div>

                  <div className="small">
                    <span className="text-secondary">Categories:&nbsp;</span>
                    <Link to="#" className="text-dark text-capitalize">
                      {findCategory?.categories}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Image Preview */}
      {showPreview && (
        <div
          className="image-preview position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
          onClick={() => setShowPreview(false)}
        >
          <button
            type="button"
            className="btn btn-light rounded-circle position-absolute top-0 end-0 m-3"
            onClick={() => setShowPreview(false)}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>

          <img
            // src={imageUrl}
            src={findProductDetails && findProductDetails.preview_image}
            alt="Full preview"
            className="img-fluid"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .search-container {
    border: 1px solid #dcdcdc;
    border-radius: 6px;
    overflow: hidden;
    /* width: 70%; */
    width: 100%;
    /* max-width: 800px; */
    height: 40px;
  }

  .search-container input {
    flex: 1;
    border: none;
    outline: none;
    padding: 0 12px;
    font-size: 14px;
  }

  /* Image */
  .image-card {
    height: 520px;
    cursor: zoom-in;
  }

  .image-card img {
    object-fit: cover;
    display: block;
  }

  .image-overlay {
    background: rgba(0, 0, 0, 0.35);
    opacity: 0;
    transition: 0.3s ease;
  }

  .image-card:hover .image-overlay {
    opacity: 1;
  }

  /* License */
  .license-select:focus,
  .license-select:focus-visible {
    outline: none !important;
    box-shadow: none !important;
    border-color: #dee2e6 !important;
  }

  /* Preview */
  .image-preview {
    z-index: 9999;
    background: rgba(0, 0, 0, 0.92);
  }

  .image-preview img {
    max-width: 95vw;
    max-height: 92vh;
    object-fit: contain;
  }

  .bg-purple-subtle {
    background: #f3e8ff !important;
  }

  .text-purple {
    color: #7e22ce !important;
  }

  @media (max-width: 768px) {
    .top-bar {
      flex-direction: column;
      align-items: stretch !important;
      gap: 12px;
    }

    .search-container {
      width: 100%;
    }

    .image-card {
      height: 400px;
    }
  }
`;

export default ProductDetails;
