const CartReducer = (state, action) => {
  // ADD TO CART
  if (action.type === "ADD_TO_CART") {
    const { product } = action.payload;

    // const exist = state.cart.find(
    //   (item) => Number(item.productId) === Number(product.id),
    // );
    const exist = state.cart.find((item) => item.id === product.id);

    // Already in cart
    if (exist) {
      return state;
    }

    const cartProduct = {
      id: product.id,
      productId: product.id,
      title: product.title,
      image: product.image,

      // IMPORTANT
      assetId: product.assetId || "",

      formats: product.formats || [],
      amount: 1,

      premium: product.premium || false,
      premiumText: product.premiumText || "",

      licenses: product.licenses || {},

      license: "standard",
      licenseName: product.licenses?.standard?.name || "Standard License",

      price: Number(product.licenses?.standard?.price || 0),
    };

    return {
      ...state,
      cart: [...state.cart, cartProduct],
    };
  }

  // CHANGE LICENSE
  if (action.type === "CHANGE_LICENSE") {
    const { id, license } = action.payload;

    const updatedCart = state.cart.map((item) => {
      if (item.id !== id) {
        return item;
      }

      const selectedLicense = item.licenses?.[license];

      if (!selectedLicense) {
        return item;
      }

      return {
        ...item,
        license,
        licenseName: selectedLicense.name,
        price: Number(selectedLicense.price || 0),
      };
    });

    return {
      ...state,
      cart: updatedCart,
    };
  }

  // REMOVE FROM CART
  if (action.type === "REMOVE_ITEM") {
    return {
      ...state,
      cart: state.cart.filter((item) => item.id !== action.payload),
    };
  }

  // CLEAR CART
  if (action.type === "CLEAR_CART") {
    return {
      ...state,
      cart: [],
    };
  }

  // INCREMENT
  if (action.type === "SET_INCREMENT") {
    const updated = state.cart.map((item) => {
      if (Number(item.id) === Number(action.payload)) {
        return {
          ...item,
          amount: Math.min(Number(item.amount) + 1, 10),
        };
      }

      return item;
    });

    return {
      ...state,
      cart: updated,
    };
  }

  // DECREMENT
  if (action.type === "SET_DECREMENT") {
    const updated = state.cart.map((item) => {
      if (Number(item.id) === Number(action.payload)) {
        return {
          ...item,
          amount: Math.max(Number(item.amount) - 1, 1),
        };
      }

      return item;
    });

    return {
      ...state,
      cart: updated,
    };
  }

  // TOTAL CART ITEM
  if (action.type === "CART_TOTAL_ITEM") {
    const totalItem = state.cart.reduce(
      (acc, item) => acc + Number(item.amount || 0),
      0,
    );

    return {
      ...state,
      total_item: totalItem,
    };
  }

  // TOTAL CART PRICE
  if (action.type === "CART_TOTAL_PRICE") {
    const total = state.cart.reduce(
      (acc, item) => acc + Number(item.price || 0) * Number(item.amount || 0),
      0,
    );

    return {
      ...state,
      total_price: total,
    };
  }

  // ADD TO WISHLIST
  // if (action.type === "ADD_TO_WISHLIST") {
  //   const product = action.payload;

  //   const exist = state.wishlist.find(
  //     (item) => Number(item.id) === Number(product.id),
  //   );

  //   // Already in wishlist
  //   if (exist) {
  //     return state;
  //   }

  //   return {
  //     ...state,
  //     wishlist: [
  //       ...state.wishlist,
  //       {
  //         ...product,
  //         addedAt: new Date().toISOString(),
  //       },
  //     ],
  //   };
  // }
  if (action.type === "ADD_TO_WISHLIST") {
    const exist = state.wishlist.find((item) => item.id === action.payload.id);

    if (exist) return state;

    const wishlistProduct = {
      ...action.payload,

      // save current date
      addedAt: new Date().toISOString(),
    };

    return {
      ...state,
      wishlist: [...state.wishlist, wishlistProduct],
    };
  }

  // REMOVE FROM WISHLIST
  if (action.type === "REMOVE_WISHLIST") {
    return {
      ...state,
      wishlist: state.wishlist.filter((item) => item.id !== action.payload),
    };
  }

  // CLEAR WISHLIST
  if (action.type === "CLEAR_WISHLIST") {
    return {
      ...state,
      wishlist: [],
    };
  }

  return state;
};

export default CartReducer;
