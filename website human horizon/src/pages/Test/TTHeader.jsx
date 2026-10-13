import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import styled from "styled-components";
import { FaXTwitter } from "react-icons/fa6";
import {
  FaFacebookSquare,
  FaYoutube,
  FaSignInAlt,
  FaShoppingCart,
  FaHeart,
} from "react-icons/fa";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setMenuOpen(false);
  };

  return (
    <Wrapper>
      <header className="clearfix center-menu fixed-header">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              {/* <img src="/images/logo.png" alt="" /> */}
              <img
                // src="/images/human-horizon-logo.png"
                src="/images/human_horizon_logo-11.png"
                alt=""
                style={{ width: "161px", height: "50px" }}
              />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              // data-toggle="collapse"
              // data-target="#navbarSupportedContent"
              // aria-controls="navbarSupportedContent"
              // aria-expanded="false"
              // aria-label="Toggle navigation"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-controls="navbarSupportedContent"
              aria-expanded={menuOpen}
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              // className="collapse navbar-collapse"
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
                <Link className="wishlist" to="/wishlist">
                  <FaHeart size={16} />
                </Link>
              </li>

              <li>
                <Link className="cart" to="/cart">
                  <FaShoppingCart size={16} />
                </Link>
              </li>

              <li>
                <Link className="login" to="/login">
                  <FaSignInAlt size={16} />
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </Wrapper>
  );
};

const Wrapper = styled.section`
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
  } /* Hover */
  .navbar-nav > li > a:hover {
    color: #000;
  } /* Active page */
  .navbar-nav > li > a.active {
    color: #000 !important;
    font-weight: 700 !important;
  }
`;

export default Header;