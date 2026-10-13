import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Loader from "./components/Loader";
import Footer from "./components/Footer";
import Top from "./components/Top";
import NotFound from "./components/NotFound";

import Home from "./pages/Home/Home";
import Gallery from "./pages/Gallery/Gallery";
import ProductDetails from "./pages/ProductDetails/ProductDetails";

import About from "./pages/About/About";
import BLog from "./pages/Blog/BLog";
import BlogDetails from "./pages/BlogDetails/BlogDetails";
import Contact from "./pages/Contact/Contact";

import Wishlist from "./pages/Wishlist/Wishlist";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/CheckOut/Checkout";

import Login from "./pages/Accounts/Login";
import Registrations from "./pages/Accounts/Registrations";
import ChangesPassword from "./pages/Accounts/ChangesPassword";
import ForgotPassword from "./pages/Accounts/ForgotPassword";
import Profile from "./pages/Accounts/Profile";

import { useProductContext } from "./context/ProductContext";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { c_user } = useProductContext();
  const aT = localStorage.getItem("humanhorizonAccessToken");
  const rT = localStorage.getItem("humanhorizonRefreshToken");

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/custom_user/logout/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${aT}`,
          },
          body: JSON.stringify({
            refresh_token: rT,
          }),
        },
      );
      if (response.ok) {
        localStorage.removeItem("humanhorizonAccessToken");
        localStorage.removeItem("humanhorizonRefreshToken");
        window.location.reload(false);
      } else {
        console.error("Logout failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 400);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <div className="App">
      {isLoading ? (
        <Loader />
      ) : (
        <BrowserRouter>
          <div
            id="container"
            className={`d-flex flex-column min-vh-100 ${
              isLoading ? "" : "active"
            }`}
          >
            <Header
              aT={aT}
              c_user={c_user && c_user.name}
              handleLogout={handleLogout}
            />

            <main className="flex-grow-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/gallery" element={<Gallery />} />

                <Route path="/image-details/:id" element={<ProductDetails />} />

                <Route path="/blog" element={<BLog />} />
                <Route
                  path="/blog/blog-details/:id"
                  element={<BlogDetails />}
                />

                <Route path="/contact" element={<Contact />} />

                <Route
                  path="/cart"
                  element={<Cart aT={aT} c_user={c_user && c_user.id} />}
                />
                <Route path="/Wishlist" element={<Wishlist />} />
                <Route path="/checkout" element={<Checkout />} />

                <Route path="/registration" element={<Registrations />} />
                <Route path="/login" element={<Login />} />
                <Route path="/change-password" element={<ChangesPassword />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/profile" element={<Profile c_user={c_user} />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

            <Footer />
          </div>

          <Top />
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
