import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router";
import styled from "styled-components";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import {
  FaFacebookSquare,
  FaYoutube,
  FaShoppingCart,
  FaHeart,
  FaTimes,
  FaTrashAlt,
  FaUser,
  FaUserCircle,
  FaIdCard,
  FaKey,
  FaCog,
  FaUserPlus,
  FaSignOutAlt,
} from "react-icons/fa";
import { useCartContext } from "../context/CartContext";
import { useProductContext } from "../context/ProductContext";

const Header = ({ aT, c_user, handleLogout }) => {
  const {
    cart,
    removeCart,
    total_item,
    total_price,

    wishlist,
    changeLicense,
  } = useCartContext();

  // data fetching
  const { unpaginate_general_settings, fetchUnpaginateGeneralSettings } =
    useProductContext();

  useEffect(() => {
    fetchUnpaginateGeneralSettings();
  }, [fetchUnpaginateGeneralSettings]);

  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const userMenuRef = useRef(null);

  const handleMenuClick = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  // Prevent background scrolling when cart is open
  useEffect(() => {
    if (cartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [cartOpen]);

  return (
    <Wrapper>
      {/* ====== HEADER ====== */}
      <header className="clearfix center-menu fixed-header">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container-fluid">
            {/* Logo */}
            <Link className="navbar-brand" to="/">
              <img
                // src="/images/human_horizon_logo-11.png"
                src={
                  unpaginate_general_settings &&
                  unpaginate_general_settings.company_logo
                }
                alt="Human Horizon"
                style={{
                  width: "161px",
                  height: "50px",
                }}
              />
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="navbar-toggler"
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-controls="navbarSupportedContent"
              aria-expanded={menuOpen}
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Navigation */}
            <div
              className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav m-auto">
                <li>
                  <NavLink
                    end
                    onClick={handleMenuClick}
                    className={({ isActive }) => (isActive ? "active" : "")}
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    onClick={handleMenuClick}
                    className={({ isActive }) => (isActive ? "active" : "")}
                    to="/about"
                  >
                    About
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    onClick={handleMenuClick}
                    className={({ isActive }) => (isActive ? "active" : "")}
                    to="/gallery"
                  >
                    Gallery
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    onClick={handleMenuClick}
                    className={({ isActive }) => (isActive ? "active" : "")}
                    to="/blog"
                  >
                    Blog
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    onClick={handleMenuClick}
                    className={({ isActive }) => (isActive ? "active" : "")}
                    to="/contact"
                  >
                    Contact
                  </NavLink>
                </li>
              </ul>
            </div>

            <ul className="navbar-nav ml-auto social-icons">
              <li>
                <Link className="facebook" to="#">
                  <FaFacebookSquare size={16} />
                </Link>
              </li>
              <li>
                <Link className="twitter" to="#">
                  <FaXTwitter size={16} />
                </Link>
              </li>
              <li>
                <Link className="youtube" to="#">
                  <FaYoutube size={18} />
                </Link>
              </li>
              <li>
                <Link
                  className="instagram"
                  to="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram size={18} />
                </Link>
              </li>

              {/* ====== Heart ====== */}
              <li>
                <Link className="wishlist position-relative" to="/wishlist">
                  <FaHeart size={16} />

                  {wishlist.length > 0 && (
                    <span className="count-badge">{wishlist.length}</span>
                  )}
                </Link>
              </li>

              {/* ====== CART ====== */}
              <li>
                <button
                  type="button"
                  className="cart cart-button position-relative"
                  onClick={() => setCartOpen(true)}
                  aria-label="Open cart"
                >
                  <FaShoppingCart size={16} />

                  {total_item > 0 && (
                    <span className="count-badge">{total_item}</span>
                  )}
                </button>
              </li>

              {/* ====== LOGIN / USER MENU ====== */}
              <li className="user-menu-wrapper" ref={userMenuRef}>
                <button
                  type="button"
                  className="login user-login-button"
                  onClick={() => setIsUserMenuOpen((prev) => !prev)}
                  aria-label="User menu"
                  aria-expanded={isUserMenuOpen}
                >
                  <FaUser size={16} />
                </button>

                {/* USER DROPDOWN */}
                <div
                  className={`user-dropdown ${
                    isUserMenuOpen ? "user-dropdown-active" : ""
                  }`}
                >
                  <Link to="/account" onClick={() => setIsUserMenuOpen(false)}>
                    <FaUserCircle />
                    <span>Welcome Rony71!</span>
                  </Link>

                  <Link to="/profile" onClick={() => setIsUserMenuOpen(false)}>
                    <FaIdCard />
                    <span>Profile</span>
                  </Link>

                  <Link
                    to="/change-password"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <FaKey />
                    <span>Change Password</span>
                  </Link>

                  <Link to="/settings" onClick={() => setIsUserMenuOpen(false)}>
                    <FaCog />
                    <span>Settings</span>
                  </Link>

                  <Link
                    to="/registration"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <FaUserPlus />
                    <span>Registration</span>
                  </Link>

                  <button
                    type="button"
                    className="user-dropdown-logout"
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      console.log("Logout");
                    }}
                  >
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      {/* ====== CART PREVIEW ====== */}
      {cartOpen && (
        <>
          {/* Dark Overlay */}
          <div
            className="cart-overlay"
            onClick={() => setCartOpen(false)}
          ></div>

          <aside className="cart-preview">
            <div className="cart-header">
              <h3>Cart preview</h3>

              <button
                type="button"
                className="cart-close"
                onClick={() => setCartOpen(false)}
                aria-label="Close cart"
              >
                <FaTimes size={18} />
              </button>
            </div>

            <Link
              to="/cart"
              className="detailed-cart-link"
              onClick={() => setCartOpen(false)}
            >
              See detailed cart
            </Link>

            {/* ====== CART ITEM ====== */}
            {cart.length > 0 ? (
              cart.map((item) => {
                return (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-image">
                      <img src={item && item.image} alt="Images" />
                    </div>

                    <div className="cart-item-info">
                      <div className="cart-item-top">
                        <div>
                          {/* <h4>Fishing Net</h4> */}
                          <h4>{item.title}</h4>
                          <p>{item.assetId || "N/A"}</p>
                          <p>JPG</p>
                        </div>

                        <strong>
                          {/* <span className="fw-bold fs-5">৳</span> */}
                          {/* 249 */}$
                          {Number(item.price || 0).toLocaleString("en-BD")}
                        </strong>
                      </div>
                    </div>

                    {/* License + Remove */}
                    <div className="cart-item-actions">
                      <div className="license-section">
                        <label>License</label>

                        {/* <select defaultValue="Standard">
                          <option value="free">Free</option>
                          <option value="standard">Standard</option>
                          <option value="extended">Enhanced</option>
                        </select> */}
                        <select
                          value={item.license}
                          onChange={(e) =>
                            changeLicense(item.id, e.target.value)
                          }
                        >
                          <option value="standard">Standard</option>
                          <option value="enhanced">Enhanced</option>
                          <option value="free">Free</option>
                        </select>
                      </div>

                      <button
                        type="button"
                        className="remove-item"
                        onClick={() => removeCart(item.id)}
                      >
                        <FaTrashAlt size={13} />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <>
                <li className="text-center py-3 fs-4 text-danger">
                  Cart is empty
                </li>
                <Link
                  to="/"
                  className="checkout-button w-50 d-flex justify-content-center align-items-center mx-auto"
                  onClick={() => setCartOpen(false)}
                >
                  Continue shopping
                </Link>
              </>
            )}

            <div className="cart-space"></div>

            <div className="cart-footer">
              <div className="subtotal">
                <span>
                  Subtotal:{" "}
                  <small>
                    ({cart.length} {cart.length === 1 ? "item" : "items"})
                  </small>
                </span>

                <strong className="mt-0 pt-0">
                  {/* <span className="fw-bold fs-5 mt-0 pt-0">৳</span> */}
                  {/* 249 */}${Number(total_price || 0).toLocaleString("en-BD")}
                </strong>
              </div>

              {/* Start Checkout */}
              <Link
                // to="/checkout"
                // className="checkout-button"
                // onClick={() => setCartOpen(false)}
                to={cart.length > 0 ? "/checkout" : "#"}
                className={`checkout-button ${
                  cart.length === 0 ? "disabled" : ""
                }`}
                onClick={(e) => {
                  if (cart.length === 0) {
                    e.preventDefault();
                    return;
                  }

                  setCartOpen(false);
                }}
              >
                Start checkout
              </Link>

              {/* Review Order */}
              <Link
                // to="/cart"
                // className="review-button"
                // onClick={() => setCartOpen(false)}
                to={cart.length > 0 ? "/cart" : "#"}
                className={`review-button ${
                  cart.length === 0 ? "disabled" : ""
                }`}
                onClick={(e) => {
                  if (cart.length === 0) {
                    e.preventDefault();
                    return;
                  }

                  setCartOpen(false);
                }}
              >
                Review my order
              </Link>
            </div>
          </aside>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  /* ====== HEADER ====== */
  .fixed-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 9999;
    background: #fff;
    border-bottom: 1px solid #e6e6e6;
  }

  .navbar {
    padding: 0;
  }

  /* Navigation links */
  .navbar-nav > li > a {
    color: #696969;
    transition: color 0.2s ease-in-out;
  }

  .navbar-nav > li > a:hover {
    color: #000;
  }

  .navbar-nav > li > a.active {
    color: #000 !important;
    font-weight: 700 !important;
  }

  header.center-menu .social-icons li {
    margin: 0 0px;
  }
  .social-icons {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .social-icons > li {
    list-style: none;
  }

  .social-icons a,
  .cart-button {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #696969;
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .social-icons a:hover,
  .cart-button:hover {
    color: #000;
    background: #f5f5f5;
  }

  .cart-button {
    font-family: inherit;
  }
  /* ==== */
  .wishlist,
  .cart-button {
    position: relative;
  }

  .count-badge {
    position: absolute;
    top: -9px;
    right: -10px;
    min-width: 17px;
    height: 17px;
    padding: 0 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ff3333;
    color: #fff;
    font-size: 10px;
    font-weight: 600;
    line-height: 1;
    border-radius: 50%;
  }

  .cart-button {
    border: none;
    background: transparent;
    padding: 0;
    cursor: pointer;
  }

  /* ====== CART OVERLAY ====== */
  .cart-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.55);
    z-index: 10000;
  }

  /* ====== CART PREVIEW ====== */
  .cart-preview {
    position: fixed;
    top: 0;
    right: 0;
    width: 480px;
    max-width: 100%;
    height: 100vh;
    background: #fff;
    z-index: 10001;
    display: flex;
    flex-direction: column;
    box-shadow: -8px 0 30px rgba(0, 0, 0, 0.18);
    animation: cartSlideIn 0.3s ease forwards;
  }

  @keyframes cartSlideIn {
    from {
      transform: translateX(100%);
    }

    to {
      transform: translateX(0);
    }
  }

  /* ====== CART HEADER ====== */
  .cart-header {
    padding: 17px 12px 10px 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .cart-header h3 {
    margin: 0;
    font-size: 17px;
    font-weight: 700;
    color: #222;
  }

  .cart-close {
    width: 35px;
    height: 35px;
    border: none;
    background: transparent;
    color: #222;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 50%;
  }

  .cart-close:hover {
    background: #f3f3f3;
  }

  /* ====== DETAILED CART ====== */
  .detailed-cart-link {
    margin: 0 12px;
    color: #333;
    font-size: 13px;
    text-decoration: underline !important;
    width: fit-content;
  }

  .detailed-cart-link:hover {
    color: #000;
  }

  /* ====== CART ITEM ====== */
  .cart-item {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 12px;
  }

  /* Product Image */
  .cart-item-image {
    width: 101px;
    height: 101px;
    flex-shrink: 0;
    border-radius: 10px;
    overflow: hidden;
    background: #f4f4f4;
  }

  .cart-item-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  /* Product Information */
  .cart-item-info {
    flex: 1;
    min-width: 0;
  }

  .cart-item-top {
    display: flex;
    justify-content: space-between;
    gap: 10px;
  }

  .cart-item-top h4 {
    margin: 2px 0 5px;
    font-size: 15px;
    font-weight: 500;
    color: #333;
  }

  .cart-item-top p {
    margin: 0;
    font-size: 14px;
    color: #555;
  }

  .cart-item-top strong {
    font-size: 14px;
    color: #222;
    white-space: nowrap;
  }

  /* ====== LICENSE + REMOVE ROW ====== */
  .cart-item-actions {
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 10px;
    margin-top: 4px;
  }

  /* ====== LICENSE ====== */
  .license-section {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .license-section label {
    display: block;
    font-size: 13px;
    margin-bottom: 5px;
    color: #333;
  }

  .license-section select {
    width: 172px;
    height: 42px;
    padding: 0 10px;
    border: 1px solid #999;
    border-radius: 7px;
    background: #fff;
    font-size: 14px;
    color: #222;
    outline: none;
  }

  .license-section select:focus {
    border-color: #222;
  }

  /* ====== REMOVE BUTTON ====== */
  .remove-item {
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 7px;
    padding: 0 14px;
    color: #222;
    font-size: 13px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .remove-item:hover {
    background: #f5f5f5;
    border-color: #999;
  }

  /* ====== EMPTY SPACE ====== */
  .cart-space {
    flex: 1;
    min-height: 30px;
  }

  /* ====== CART FOOTER ====== */
  .cart-footer {
    padding: 0 12px 12px;
  }
  .subtotal {
    border-top: 1px solid #ddd;
    padding: 14px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    color: #222;
  }
  .subtotal small {
    font-size: 13px;
  }
  .subtotal strong {
    font-size: 15px;
  }

  /* ====== CHECKOUT BUTTON ====== */
  .checkout-button {
    width: 100%;
    height: 41px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #111;
    color: #fff;
    border-radius: 5px;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    margin-bottom: 7px;
    transition: background 0.2s ease;
  }

  .checkout-button:hover {
    background: #333;
    color: #fff;
  }

  /* ====== REVIEW ORDER BUTTON ====== */
  .review-button {
    width: 100%;
    height: 41px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    color: #222;
    border: 1px solid #d0d0d0;
    border-radius: 5px;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s ease;
  }

  .review-button:hover {
    background: #f5f5f5;
    color: #111;
  }

  /* ====== RESPONSIVE ====== */
  @media (max-width: 575px) {
    .cart-preview {
      width: 100%;
    }

    .cart-item-image {
      width: 90px;
      height: 90px;
    }

    .remove-item {
      top: 132px;
    }
  }

  /* ====== USER LOGIN / DROPDOWN ====== */
  .user-menu-wrapper {
    position: relative;
    list-style: none;
  }

  .user-login-button {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #696969;
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .user-login-button:hover {
    color: #000;
    background: #f5f5f5;
  }

  /* ====== USER DROPDOWN ====== */
  .user-dropdown {
    position: absolute;
    top: calc(100% + 12px);
    right: 0;
    width: 220px;
    background: #fff;
    border: 1px solid #e6e6e6;
    border-radius: 8px;
    padding: 7px 0;
    margin: 0;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transform: translateY(-8px);
    transition:
      opacity 0.2s ease,
      visibility 0.2s ease,
      transform 0.2s ease;
    z-index: 10005;
  }

  .user-dropdown-active {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transform: translateY(0);
  }

  .user-dropdown a:hover {
    background: none !important;
  }

  /* Dropdown items */
  .user-dropdown a,
  .user-dropdown-logout {
    width: 100% !important;
    min-height: 42px;
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    justify-content: flex-start !important;
    gap: 11px;
    padding: 9px 15px !important;
    margin: 0 !important;
    box-sizing: border-box;
    color: #444 !important;
    /* background: transparent; */
    border: none;
    font-size: 13px;
    font-weight: 400;
    line-height: 1.4;
    text-align: left !important;
    text-decoration: none !important;
    cursor: pointer;
  }

  /* Icons */
  .user-dropdown a svg,
  .user-dropdown-logout svg {
    width: 15px !important;
    height: 15px !important;
    min-width: 15px;
    flex-shrink: 0;
    display: block;
  }
  header.center-menu .social-icons li a {
    padding: 0 10px 0 10px !important;
  }

  /* Text */
  .user-dropdown a span,
  .user-dropdown-logout span {
    flex: 1;
    display: block;
    margin: 0;
    padding: 0;
    text-align: left;
  }

  /* Hover */
  .user-dropdown a:hover,
  .user-dropdown-logout:hover {
    color: #000 !important;
    background: #f5f5f5;
  }

  /* Logout */
  .user-dropdown-logout {
    border-top: 1px solid #eeeeee !important;
    margin-top: 5px !important;
    padding-top: 12px !important;
    padding-bottom: 12px !important;
  }

  /* Dropdown arrow */
  .user-dropdown::before {
    content: "";
    position: absolute;
    top: -6px;
    right: 11px;
    width: 11px;
    height: 11px;
    background: #fff;
    border-left: 1px solid #e6e6e6;
    border-top: 1px solid #e6e6e6;
    transform: rotate(45deg);
  }
`;

export default Header;
