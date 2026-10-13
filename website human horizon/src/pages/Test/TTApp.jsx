import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Loader from "./components/Loader";
import Footer from "./components/Footer";
import Top from "./components/Top";
import NotFound from "./components/NotFound";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Gallery from "./pages/Gallery/Gallery";
import BLog from "./pages/Blog/BLog";
import BlogDetails from "./pages/BlogDetails/BlogDetails";
import Contact from "./pages/Contact/Contact";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Cart from "./pages/Cart/Cart";
import Wishlist from "./pages/Wishlist/Wishlist";
import Login from "./pages/Accounts/Login";
import Registrations from "./pages/Accounts/Registrations";
import ChangesPassword from "./pages/Accounts/ChangesPassword";
import Profile from "./pages/Accounts/Profile";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      // Same as the old fadeOut(400)
      setTimeout(() => {
        setIsLoading(false);
      }, 400);
    };

    // If the page is already completely loaded
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
          {/* Main container */}
          <div id="container" className={isLoading ? "" : "active"}>
            <Header />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/gallery" element={<Gallery />} />

              <Route path="/image-details" element={<ProductDetails />} />
              <Route path="/blog" element={<BLog />} />
              <Route path="/blog/blog-details/:id" element={<BlogDetails />} />
              <Route path="/contact" element={<Contact />} />

              <Route path="/cart" element={<Cart />} />
              <Route path="/Wishlist" element={<Wishlist />} />

              <Route path="/registration" element={<Registrations />} />
              <Route path="/login" element={<Login />} />
              <Route path="/change-password" element={<ChangesPassword />} />
              <Route path="/profile" element={<Profile />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
            <Top />
            <Footer />
          </div>

          {/* Loader */}
          {/* {loading && <Loader />} */}
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
