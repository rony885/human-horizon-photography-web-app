import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/CartReducer";

const CartContext = createContext();

const getLocalCartData = () => {
  try {
    const data = localStorage.getItem("humanHorizonCart");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const getLocalOrderData = () => {
  try {
    const data = localStorage.getItem("humanHorizonOrder");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const getLocalWishlistData = () => {
  try {
    const data = localStorage.getItem("humanHorizonWishlist");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const initialState = {
  cart: getLocalCartData(),

  total_item: 0,
  total_price: 0,
  total_discount: 0,
  total_special_price: 0,

  order: getLocalOrderData(),
  order_total_price: 0,
  order_total_discount: 0,
  paid_amount: 0,

  wishlist: getLocalWishlistData(),
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // CART
  const addToCart = (id, amount, product) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        id,
        amount,
        product,
      },
    });
  };

  const removeCart = (id) => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: id,
    });
  };

  const clearCart = () => {
    dispatch({
      type: "CLEAR_CART",
    });
  };

  const setDecrement = (id) => {
    dispatch({
      type: "SET_DECREMENT",
      payload: id,
    });
  };

  const setIncrement = (id) => {
    dispatch({
      type: "SET_INCREMENT",
      payload: id,
    });
  };

  // WISHLIST
  const addToWishlist = (product) => {
    dispatch({
      type: "ADD_TO_WISHLIST",
      payload: product,
    });
  };

  const removeWishlist = (id) => {
    dispatch({
      type: "REMOVE_WISHLIST",
      payload: id,
    });
  };

  const clearWishlist = () => {
    dispatch({
      type: "CLEAR_WISHLIST",
    });
  };

  // changeLicense
  const changeLicense = (id, license) => {
    dispatch({
      type: "CHANGE_LICENSE",
      payload: {
        id,
        license,
      },
    });
  };

  // SAVE + TOTAL
  useEffect(() => {
    dispatch({
      type: "CART_TOTAL_ITEM",
    });

    dispatch({
      type: "CART_TOTAL_PRICE",
    });

    localStorage.setItem("humanHorizonCart", JSON.stringify(state.cart));

    localStorage.setItem(
      "humanHorizonWishlist",
      JSON.stringify(state.wishlist),
    );
  }, [state.cart, state.wishlist]);

  useEffect(() => {
    localStorage.setItem("humanHorizonOrder", JSON.stringify(state.order));
  }, [state.order]);

  return (
    <CartContext.Provider
      value={{
        ...state,

        addToCart,
        removeCart,
        clearCart,

        setDecrement,
        setIncrement,

        changeLicense,

        addToWishlist,
        removeWishlist,
        clearWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => useContext(CartContext);

export { CartProvider, useCartContext };
