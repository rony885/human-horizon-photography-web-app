import React, { useState } from "react";
import { Link } from "react-router";
import styled from "styled-components";

const ProductDetails = () => {
  const [selectedLicense, setSelectedLicense] = useState("standard");
  const [showPreview, setShowPreview] = useState(false);

  // const imageUrl =
  //   "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=2000&auto=format&fit=crop";

  return (
    <Wrapper>
      <section className="photos-section py-5" style={{ marginTop: "80px" }}>
        <div className="container-fluid px-3 px-md-4">
          {/* Breadcrumb */}
          <div className="breadcrumb mb-4">
            <Link className="text-dark fw-bold" to="/">
              Home
            </Link>

            <span className="mx-2">&gt;</span>

            <span className="fw-bold">Image Details</span>

            <span className="mx-2">&gt;</span>

            <span>Young beauties picking flowers in the courtyard</span>
          </div>

          {/* Main Product */}
          <div className="main_product container">
            {/* Top Search Bar */}
            <div className="top-bar d-flex align-items-center justify-content-between mb-3">
              <div className="search-container d-flex align-items-center">
                <div className="dropdown d-flex align-items-center gap-2 px-3">
                  <i className="fa-regular fa-image"></i>
                  <span>Photos</span>
                  <i className="fa-solid fa-chevron-down arrow"></i>
                </div>

                <input type="text" placeholder="Search for photos" />

                <button className="camera-btn" type="button">
                  <i className="fa-solid fa-camera"></i>
                </button>

                <button className="search-btn" type="button">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>

              <button className="ai-search-btn" type="button">
                <i className="fa-solid fa-sparkles me-1"></i>
                AI Search
                <span className="badge bg-purple ms-1">New</span>
              </button>
            </div>

            {/* Bootstrap Row */}
            <div className="row g-4">
              {/* ================= LEFT SIDE ================= */}
              <div className="col-lg-7 col-md-12">
                {/* Image Card */}
                <div
                  className="image-card bg-light rounded overflow-hidden position-relative d-flex align-items-center justify-content-center"
                  onClick={() => setShowPreview(true)}
                  role="button"
                  tabIndex={0}
                >
                  <img
                    // src={imageUrl}
                    src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=2000&auto=format&fit=crop"
                    alt="Young beauties picking flowers in the courtyard"
                    className="w-100 h-100"
                  />

                  {/* Hover Preview */}
                  <div className="image-overlay position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center text-white">
                    <i className="fa-solid fa-expand fs-3 mb-2"></i>
                    <span>See full-quality image</span>
                  </div>
                </div>

                {/* Image Bottom Bar */}
                <div className="d-flex align-items-center justify-content-between mt-3">
                  <div className="bg-light px-3 py-2 rounded small fw-semibold">
                    <i className="fa-solid fa-gem me-1"></i>
                    Premium Content by Human & Horizon
                  </div>

                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      type="button"
                    >
                      <i className="fa-regular fa-heart me-1"></i>
                      Save
                    </button>

                    <button
                      className="btn btn-outline-secondary btn-sm"
                      type="button"
                    >
                      <i className="fa-solid fa-flask me-1"></i>
                      Try
                    </button>
                  </div>
                </div>

                {/* Photo Formats */}
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

              {/* ================= RIGHT SIDE ================= */}
              <div className="col-lg-5 col-md-12">
                {/* License Selection */}
                <div className="d-flex flex-column gap-3 mb-3">
                  {/* Standard */}
                  <label
                    className={`license-card d-flex gap-3 ${
                      selectedLicense === "standard" ? "selected" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="license"
                      value="standard"
                      checked={selectedLicense === "standard"}
                      onChange={() => setSelectedLicense("standard")}
                      className="d-none"
                    />

                    <div className="radio-custom"></div>

                    <div className="w-100">
                      <div className="d-flex justify-content-between fw-bold small mb-1">
                        <span>Standard License</span>
                        <span>$249</span>
                      </div>

                      <p className="small text-secondary mb-0">
                        Limited usage in print, advertising, and packaging.
                        Unlimited web distribution.
                      </p>
                    </div>
                  </label>

                  {/* Enhanced */}
                  <label
                    className={`license-card d-flex gap-3 ${
                      selectedLicense === "enhanced" ? "selected" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="license"
                      value="enhanced"
                      checked={selectedLicense === "enhanced"}
                      onChange={() => setSelectedLicense("enhanced")}
                      className="d-none"
                    />

                    <div className="radio-custom"></div>

                    <div className="w-100">
                      <div className="d-flex justify-content-between fw-bold small mb-1">
                        <span>Enhanced License</span>
                        <span>$349</span>
                      </div>

                      <p className="small text-secondary mb-0">
                        Unlimited usage in print, advertising, packaging, and
                        merchandising. Unlimited web distribution.
                      </p>
                    </div>
                  </label>
                </div>

                {/* Add To Cart */}
                <button className="btn btn-danger w-100 mb-3" type="button">
                  Add to Cart
                </button>

                <p className="small text-secondary mb-4">
                  Offset images aren't included in image subscriptions, FLEX
                  subscriptions, unlimited downloads subscriptions or on-demand
                  packs. You can license and pay for them separately.
                </p>

                {/* Image Details */}
                <div className="image-details">
                  <h4 className="small fw-bold mb-3">Image details</h4>

                  <div className="small mb-2">
                    <span className="text-secondary">Asset id:</span> 2399915843
                    <i className="fa-regular fa-copy ms-1 text-secondary"></i>
                  </div>

                  <div className="small fw-semibold mb-2">
                    Young beauties picking flowers in the courtyard
                    <i className="fa-regular fa-copy ms-1 text-secondary"></i>
                  </div>

                  <div className="small mb-2">
                    <span className="text-secondary">Release information:</span>{" "}
                    Signed model release on file with Shutterstock, Inc.
                  </div>

                  <div className="small mb-2">
                    <span className="text-secondary">Upload date:</span>{" "}
                    December 12, 2023
                  </div>

                  <div className="small">
                    <span className="text-secondary">Categories:</span>{" "}
                    <Link to="#" className="text-dark">
                      People
                    </Link>
                  </div>
                </div>

                {/* Contributor */}
                <div className="d-flex align-items-center gap-3 mt-4">
                  <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="Contributor Profile"
                    width="36"
                    height="36"
                    className="rounded-circle object-fit-cover"
                  />

                  <div>
                    <Link
                      to="#"
                      className="text-dark text-decoration-none small fw-medium"
                    >
                      View Stock on Offset
                    </Link>

                    <div className="d-flex gap-2 mt-1">
                      <span className="badge bg-primary-subtle text-primary">
                        <i className="fa-solid fa-star me-1"></i>5 years
                      </span>

                      <span className="badge bg-purple-subtle text-purple">
                        <i className="fa-solid fa-arrow-up-from-bracket me-1"></i>
                        10K+ assets
                      </span>
                    </div>
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
            src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=2000&auto=format&fit=crop"
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
  /* Search */
  .search-container {
    border: 1px solid #dcdcdc;
    border-radius: 6px;
    overflow: hidden;
    width: 70%;
    max-width: 800px;
    height: 40px;
  }

  .search-container input {
    flex: 1;
    border: none;
    outline: none;
    padding: 0 12px;
    font-size: 14px;
  }

  .camera-btn,
  .search-btn {
    height: 100%;
    border: none;
    padding: 0 16px;
  }

  .camera-btn {
    background: #fff;
    color: #666;
  }

  .search-btn {
    background: #ff334b;
    color: #fff;
  }

  .ai-search-btn {
    border: 1px solid #dcdcdc;
    background: #fff;
    padding: 8px 14px;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 600;
  }

  .bg-purple {
    background: #9c27b0 !important;
  }

  .bg-color {
    background-color: #f4f4f4;
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
  .license-card {
    border: 1px solid #dcdcdc;
    border-radius: 8px;
    padding: 12px 16px;
    cursor: pointer;
  }

  .license-card.selected {
    border-color: #000;
  }

  .radio-custom {
    width: 16px;
    height: 16px;
    border: 2px solid #ccc;
    border-radius: 50%;
    margin-top: 2px;
    flex-shrink: 0;
  }

  .license-card input:checked + .radio-custom {
    border-color: #000;
    background: #000;
    box-shadow: inset 0 0 0 3px #fff;
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