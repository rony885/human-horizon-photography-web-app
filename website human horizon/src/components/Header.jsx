import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
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
  const navigate = useNavigate();

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
              {aT ? (
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

                  <div
                    className={`user-dropdown px-2 ${
                      isUserMenuOpen ? "user-dropdown-active" : ""
                    }`}
                  >
                    <Link
                      to="/profile"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <FaUserCircle />
                      <span>Welcome {c_user || "User"}!</span>
                    </Link>

                    <Link
                      to="/profile"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
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

                    <button
                      type="button"
                      className="user-dropdown-logout"
                      // onClick={async () => {
                      //   setIsUserMenuOpen(false);
                      //   await handleLogout();
                      // }}
                      onClick={() => {
                        handleLogout();
                        navigate("/");
                      }}
                    >
                      <FaSignOutAlt />
                      <span>Logout</span>
                    </button>
                  </div>
                </li>
              ) : (
                <li className="login-action">
                  <Link to="/login" className="login-button">
                    <span className="login-button-icon">
                      <FaUser />
                    </span>
                    <span>Login</span>
                  </Link>
                </li>
              )}
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
  /* ===== HEADER ===== */
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

  .navbar-brand img {
    display: block;
    object-fit: contain;
  }

  /* ===== NAVIGATION ===== */
  .navbar-nav > li > a {
    color: #696969;
    transition: color 0.2s ease-in-out;
  }

  .navbar-nav > li > a:hover {
    color: #dc3545;
  }

  .navbar-nav > li > a.active {
    color: #dc3545 !important;
    font-weight: 700 !important;
  }

  /* ===== SOCIAL ICONS ===== */
  header.center-menu .social-icons li {
    margin: 0 !important;
  }

  .social-icons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px !important;
    margin: 0;
    padding: 0;
  }

  .social-icons > li {
    display: flex;
    align-items: center;
    justify-content: center;
    list-style: none;
    margin: 0 !important;
    padding: 0 !important;
  }

  .social-icons a {
    width: 34px;
    height: 38px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    color: #696969;
    background: transparent;
    text-decoration: none !important;
    transition: all 0.25s ease;
  }

  .social-icons a:hover {
    color: #dc3545;
    background: #fff1f2;
  }

  /* ===== WISHLIST ===== */
  .wishlist {
    position: relative;
  }

  .social-icons .wishlist {
    width: 38px;
    height: 38px;
    border: 1px solid #e2e5e9;
    background: #fff;
    border-radius: 8px;
  }

  .social-icons .wishlist:hover {
    color: #dc3545;
    border-color: #dc3545;
    background: #fff5f5;
  }

  /* ===== CART BUTTON ===== */
  .social-icons .cart-button {
    position: relative;
    width: 38px;
    min-width: 38px;
    height: 38px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    margin: 0 !important;
    padding: 0 !important;
    border: 1px solid #e2e5e9;
    border-radius: 8px;
    background: #fff;
    color: #333;
    cursor: pointer;
    transition: all 0.25s ease;
  }

  .social-icons .cart-button:hover {
    color: #dc3545;
    border-color: #dc3545;
    background: #fff5f5;
    transform: translateY(-1px);
  }

  /* ===== COUNT BADGE ===== */
  .count-badge {
    position: absolute;
    top: -7px;
    right: -7px;
    min-width: 17px;
    height: 17px;
    padding: 0 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    border: 2px solid #fff;
    border-radius: 20px;
    background: #dc3545;
    color: #fff;
    font-size: 10px;
    font-weight: 700;
    line-height: 1;
  }

  /* ===== LOGIN ACTION ===== */
  .social-icons .login-action {
    display: flex;
    align-items: center;
    justify-content: center;
    list-style: none;
    margin: 0 !important;
    padding: 0 !important;
  }

  .social-icons .login-action .login-button {
    height: 38px;
    min-width: 90px;
    display: inline-flex !important;
    align-items: center;
    justify-content: center;
    gap: 8px;
    box-sizing: border-box;
    margin: 0 !important;
    padding: 0 15px !important;
    border: 1px solid #dc3545;
    border-radius: 8px;
    background: #dc3545;
    color: #fff !important;
    font-size: 13px;
    font-weight: 600;
    line-height: 1;
    text-decoration: none !important;
    white-space: nowrap;
    box-shadow: 0 2px 5px rgba(220, 53, 69, 0.15);
    transition: all 0.25s ease;
  }

  .social-icons .login-action .login-button svg {
    flex-shrink: 0;
  }

  .social-icons .login-action .login-button:hover {
    background: #bb2d3b;
    border-color: #bb2d3b;
    color: #fff !important;
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(220, 53, 69, 0.2);
  }

  .social-icons .login-action .login-button:active {
    transform: translateY(0);
  }

  /* ===== LOGGED-IN USER BUTTON ===== */
  .user-menu-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    list-style: none;
    margin: 0 !important;
    padding: 0 !important;
  }

  .user-menu-wrapper .user-login-button {
    width: 38px;
    min-width: 38px;
    height: 38px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    margin: 0 !important;
    padding: 0 !important;
    border: 1px solid #e2e5e9;
    border-radius: 8px;
    background: #fff;
    color: #333;
    cursor: pointer;
    transition: all 0.25s ease;
  }

  .user-menu-wrapper .user-login-button:hover {
    color: #dc3545;
    border-color: #dc3545;
    background: #fff5f5;
    transform: translateY(-1px);
  }

  /* ===== USER DROPDOWN ===== */
  .user-dropdown {
    position: absolute;
    top: calc(100% + 12px);
    right: 0;
    width: 230px;
    padding: 7px 0;
    margin: 0;
    background: #fff;
    border: 1px solid #e6e6e6;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
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

  .user-dropdown::before {
    content: "";
    position: absolute;
    top: -6px;
    right: 12px;
    width: 11px;
    height: 11px;
    background: #fff;
    border-left: 1px solid #e6e6e6;
    border-top: 1px solid #e6e6e6;
    transform: rotate(45deg);
  }

  .user-dropdown a,
  .user-dropdown .user-dropdown-logout {
    width: 100% !important;
    min-height: 42px;
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    justify-content: flex-start !important;
    gap: 11px;
    box-sizing: border-box;
    /* padding: 10px 15px !important; */
    margin: 0 !important;
    border: none;
    background: transparent;
    color: #444 !important;
    font-family: inherit;
    font-size: 13px;
    font-weight: 400;
    line-height: 1.4;
    text-align: left !important;
    text-decoration: none !important;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .user-dropdown a svg,
  .user-dropdown .user-dropdown-logout svg {
    width: 15px !important;
    height: 15px !important;
    min-width: 15px;
    flex-shrink: 0;
    display: block;
  }

  .user-dropdown a span,
  .user-dropdown .user-dropdown-logout span {
    flex: 1;
    display: block;
    margin: 0;
    padding: 0;
    text-align: left;
  }

  .user-dropdown a:hover,
  .user-dropdown .user-dropdown-logout:hover {
    color: #dc3545 !important;
    background: #fff5f5 !important;
  }

  .user-dropdown .user-dropdown-logout {
    border-top: 1px solid #eeeeee !important;
    margin-top: 5px !important;
    padding-top: 12px !important;
    padding-bottom: 12px !important;
  }

  /* ===== CART OVERLAY ===== */
  .cart-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.55);
    z-index: 10000;
  }

  /* ===== CART PREVIEW ===== */
  .cart-preview {
    position: fixed;
    top: 0;
    right: 0;
    width: 480px;
    max-width: 100%;
    height: 100vh;
    height: 100dvh;
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

  /* ===== CART HEADER ===== */
  .cart-header {
    padding: 17px 16px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .cart-header h3 {
    margin: 0;
    color: #222;
    font-size: 17px;
    font-weight: 700;
  }

  .cart-close {
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 50%;
    background: transparent;
    color: #222;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .cart-close:hover {
    background: #f3f3f3;
    color: #dc3545;
  }

  /* ===== DETAILED CART LINK ===== */
  .detailed-cart-link {
    width: fit-content;
    margin: 0 16px 10px;
    color: #333;
    font-size: 13px;
    text-decoration: underline !important;
  }

  .detailed-cart-link:hover {
    color: #dc3545;
  }

  /* ===== CART ITEM ===== */
  .cart-item {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 14px 16px;
    border-bottom: 1px solid #f0f0f0;
  }

  .cart-item-image {
    width: 100px;
    height: 100px;
    flex-shrink: 0;
    overflow: hidden;
    border-radius: 9px;
    background: #f4f4f4;
  }

  .cart-item-image img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
  }

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
    color: #333;
    font-size: 15px;
    font-weight: 600;
    overflow-wrap: anywhere;
  }

  .cart-item-top p {
    margin: 0 0 3px;
    color: #777;
    font-size: 13px;
  }

  .cart-item-top strong {
    color: #222;
    font-size: 14px;
    white-space: nowrap;
  }

  /* ===== LICENSE + REMOVE ===== */
  .cart-item-actions {
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 10px;
    margin-top: 5px;
  }

  .license-section {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .license-section label {
    display: block;
    margin-bottom: 5px;
    color: #333;
    font-size: 13px;
    font-weight: 500;
  }

  .license-section select {
    width: 172px;
    max-width: 100%;
    height: 40px;
    padding: 0 10px;
    border: 1px solid #d8d8d8;
    border-radius: 7px;
    background: #fff;
    color: #222;
    font-family: inherit;
    font-size: 13px;
    outline: none;
    transition: border-color 0.2s ease;
  }

  .license-section select:focus {
    border-color: #dc3545;
  }

  .remove-item {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    padding: 0 12px;
    border: 1px solid #e0e0e0;
    border-radius: 7px;
    background: #fff;
    color: #555;
    font-size: 13px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .remove-item:hover {
    border-color: #dc3545;
    background: #fff5f5;
    color: #dc3545;
  }

  /* ===== EMPTY CART SPACE ===== */
  .cart-space {
    flex: 1;
    min-height: 20px;
  }

  /* ===== CART FOOTER ===== */
  .cart-footer {
    padding: 0 16px 16px;
    background: #fff;
  }

  .subtotal {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 14px 0;
    border-top: 1px solid #e5e5e5;
    color: #222;
    font-size: 14px;
  }

  .subtotal small {
    color: #777;
    font-size: 12px;
  }

  .subtotal strong {
    font-size: 16px;
    font-weight: 700;
    white-space: nowrap;
  }

  /* ===== CHECKOUT BUTTON ===== */
  .checkout-button {
    width: 100%;
    min-height: 43px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    margin-bottom: 8px;
    border: 1px solid #dc3545;
    border-radius: 7px;
    background: #dc3545;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s ease;
  }

  .checkout-button:hover {
    border-color: #bb2d3b;
    background: #bb2d3b;
    color: #fff;
  }

  .checkout-button.disabled,
  .review-button.disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  /* ===== REVIEW ORDER BUTTON ===== */
  .review-button {
    width: 100%;
    min-height: 43px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    border: 1px solid #dedede;
    border-radius: 7px;
    background: #fff;
    color: #222;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s ease;
  }

  .review-button:hover {
    border-color: #dc3545;
    background: #fff5f5;
    color: #dc3545;
  }

  /* ===== ACCESSIBILITY ===== */
  .cart-button:focus-visible,
  .user-login-button:focus-visible,
  .login-button:focus-visible,
  .cart-close:focus-visible,
  .remove-item:focus-visible {
    outline: 3px solid rgba(220, 53, 69, 0.25);
    outline-offset: 3px;
  }

  /* ===== RESPONSIVE ===== */
  @media (max-width: 991px) {
    .social-icons {
      justify-content: center;
      flex-wrap: wrap;
      gap: 10px !important;
      padding: 10px 0;
    }
  }

  @media (max-width: 575px) {
    .cart-preview {
      width: 100%;
    }

    .cart-item {
      padding: 12px;
      gap: 8px;
    }

    .cart-item-image {
      width: 85px;
      height: 85px;
    }

    .cart-item-actions {
      gap: 8px;
    }

    .license-section select {
      width: 145px;
    }

    .remove-item {
      padding: 0 9px;
    }

    .cart-footer {
      padding: 0 12px 12px;
    }

    .social-icons {
      gap: 8px !important;
    }

    .social-icons .cart-button,
    .social-icons .wishlist,
    .user-menu-wrapper .user-login-button {
      width: 36px;
      min-width: 36px;
      height: 36px;
    }

    .social-icons .login-action .login-button {
      min-width: 82px;
      height: 36px;
      padding: 0 12px !important;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

export default Header;
