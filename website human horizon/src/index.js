import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { CartProvider } from "./context/CartContext";
import { ProductContext } from "./context/ProductContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ProductContext>
      <CartProvider>
        <App />
      </CartProvider>
    </ProductContext>
  </React.StrictMode>,
);

reportWebVitals();
