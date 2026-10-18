const CartReducer = (state, action) => {
  // ADD TO CART
  if (action.type === "ADD_TO_CART") {
    const { product, selectedLicense, licenseOptions = [] } = action.payload;

    const exist = state.cart.find(
      (item) => Number(item.productId) === Number(product.id),
    );

    if (exist) {
      return state;
    }

    // Use the selected license from the API.
    const selected =
      selectedLicense ||
      licenseOptions.find((item) => item.status) ||
      product.license ||
      null;

    const cartProduct = {
      ...product,

      id: product.id,
      productId: product.id,

      title: product.name || product.title || "Untitled Product",
      name: product.name || product.title || "Untitled Product",

      image:
        product.thumbnail_image || product.preview_image || product.image || "",

      thumbnail_image: product.thumbnail_image || product.image || "",

      preview_image:
        product.preview_image || product.thumbnail_image || product.image || "",

      assetId: product.assetId || product.product_code || "",

      category_id: product.category_id ?? product.category?.id ?? null,
      category: product.category || null,

      year_id: product.year_id ?? product.year?.id ?? null,
      year: product.year || null,

      formats: product.formats || [],

      premium: product.premium ?? false,
      premiumText: product.premium_text || product.premiumText || "",

      // Save all available licenses for the header dropdown.
      licenseOptions,

      // Save the selected license and its actual API price.
      licenseId: selected ? String(selected.id) : "",
      license: selected ? String(selected.id) : "",
      licenseName: selected?.name || "",
      licenseDescription: selected?.description || "",
      price: Number(selected?.price || 0),

      amount: 1,
    };

    return {
      ...state,
      cart: [...state.cart, cartProduct],
    };
  }

  // CHANGE LICENSE
  if (action.type === "CHANGE_LICENSE") {
    const { id, licenseId } = action.payload;

    const updatedCart = state.cart.map((item) => {
      if (Number(item.id) !== Number(id)) {
        return item;
      }

      // Find the newly selected license by its API ID.
      const selected = (item.licenseOptions || []).find(
        (license) => String(license.id) === String(licenseId),
      );

      // Do not update if the license ID is invalid.
      if (!selected) {
        return item;
      }

      return {
        ...item,
        license: String(selected.id),
        licenseId: String(selected.id),
        licenseName: selected.name,
        licenseDescription: selected.description || "",
        price: Number(selected.price || 0),
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

// const CartReducer = (state, action) => {
//   switch (action.type) {
//     // ADD TO CART
//     case "ADD_TO_CART": {
//       const { product } = action.payload;

//       // CHECK PRODUCT
//       if (!product || !product.id) {
//         return state;
//       }

//       // CHECK IF PRODUCT ALREADY EXISTS
//       const existingProduct = state.cart.find(
//         (item) => item.id === product.id
//       );

//       if (existingProduct) {
//         return state;
//       }

//       // CART PRODUCT
//       const cartProduct = {
//         // PRODUCT INFORMATION
//         ...product,

//         id: product.id,
//         productId: product.id,

//         // PRODUCT TITLE
//         title: product.name || product.title || "Untitled Product",
//         name: product.name || product.title || "Untitled Product",

//         // PRODUCT IMAGES
//         image:
//           product.thumbnail_image ||
//           product.preview_image ||
//           product.image ||
//           "",

//         thumbnail_image:
//           product.thumbnail_image ||
//           product.image ||
//           "",

//         preview_image:
//           product.preview_image ||
//           product.thumbnail_image ||
//           product.image ||
//           "",

//         // ASSET INFORMATION
//         assetId: product.assetId || "",

//         // CATEGORY
//         category_id:
//           product.category_id ?? product.category?.id ?? null,
//         category: product.category || null,

//         // YEAR
//         year_id: product.year_id ?? product.year?.id ?? null,
//         year: product.year || null,

//         // PRODUCT FORMATS
//         formats: product.formats || [],

//         // PREMIUM INFORMATION
//         premium: product.premium ?? false,
//         premiumText: product.premiumText || "",

//         // LICENSE INFORMATION
//         licenses: product.licenses || {},
//         license: "standard",
//         licenseName:
//           product.licenses?.standard?.name || "Standard License",
//         price: Number(product.licenses?.standard?.price || 0),

//         // QUANTITY
//         amount: 1,
//       };

//       return {
//         ...state,
//         cart: [...state.cart, cartProduct],
//       };
//     }

//     // REMOVE ITEM FROM CART
//     case "REMOVE_ITEM": {
//       return {
//         ...state,
//         cart: state.cart.filter(
//           (item) => item.id !== action.payload
//         ),
//       };
//     }

//     // CLEAR CART
//     case "CLEAR_CART": {
//       return {
//         ...state,
//         cart: [],
//         total_item: 0,
//         total_price: 0,
//       };
//     }

//     // CHANGE LICENSE
//     case "CHANGE_LICENSE": {
//       const { id, license } = action.payload;

//       const updatedCart = state.cart.map((item) => {
//         if (item.id === id) {
//           const selectedLicense = item.licenses?.[license];

//           return {
//             ...item,
//             license,
//             licenseName:
//               selectedLicense?.name ||
//               `${license.charAt(0).toUpperCase()}${license.slice(1)} License`,
//             price: Number(selectedLicense?.price || 0),
//           };
//         }

//         return item;
//       });

//       return {
//         ...state,
//         cart: updatedCart,
//       };
//     }

//     // INCREMENT ITEM QUANTITY
//     case "INCREMENT": {
//       const updatedCart = state.cart.map((item) => {
//         if (item.id === action.payload) {
//           if (item.amount >= 10) {
//             return item;
//           }

//           return {
//             ...item,
//             amount: item.amount + 1,
//           };
//         }

//         return item;
//       });

//       return {
//         ...state,
//         cart: updatedCart,
//       };
//     }

//     // DECREMENT ITEM QUANTITY
//     case "DECREMENT": {
//       const updatedCart = state.cart.map((item) => {
//         if (item.id === action.payload) {
//           return {
//             ...item,
//             amount: Math.max(1, item.amount - 1),
//           };
//         }

//         return item;
//       });

//       return {
//         ...state,
//         cart: updatedCart,
//       };
//     }

//     // CALCULATE TOTAL ITEMS
//     case "CART_TOTAL_ITEM": {
//       const total_item = state.cart.reduce(
//         (total, item) => total + Number(item.amount || 0),
//         0
//       );

//       return {
//         ...state,
//         total_item,
//       };
//     }

//     // CALCULATE TOTAL PRICE
//     case "CART_TOTAL_PRICE": {
//       const total_price = state.cart.reduce(
//         (total, item) =>
//           total +
//           Number(item.price || 0) * Number(item.amount || 0),
//         0
//       );

//       return {
//         ...state,
//         total_price,
//       };
//     }

//     // ADD TO WISHLIST
//     case "ADD_TO_WISHLIST": {
//       const product = action.payload;

//       if (!product || !product.id) {
//         return state;
//       }

//       const existingProduct = state.wishlist.some(
//         (item) => item.id === product.id
//       );

//       if (existingProduct) {
//         return state;
//       }

//       const wishlistProduct = {
//         ...product,

//         // PRODUCT TITLE
//         title: product.name || product.title || "Untitled Product",

//         // PRODUCT IMAGES
//         image:
//           product.thumbnail_image ||
//           product.preview_image ||
//           product.image ||
//           "",

//         thumbnail_image:
//           product.thumbnail_image ||
//           product.image ||
//           "",

//         preview_image:
//           product.preview_image ||
//           product.thumbnail_image ||
//           product.image ||
//           "",

//         // CATEGORY AND YEAR
//         category_id:
//           product.category_id ?? product.category?.id ?? null,
//         year_id: product.year_id ?? product.year?.id ?? null,

//         // WISHLIST DATE
//         addedAt: new Date().toISOString(),
//       };

//       return {
//         ...state,
//         wishlist: [...state.wishlist, wishlistProduct],
//       };
//     }

//     // REMOVE FROM WISHLIST
//     case "REMOVE_WISHLIST_WISHLIST": {
//       return {
//         ...state,
//         wishlist: state.wishlist.filter(
//           (item) => item.id !== action.payload
//         ),
//       };
//     }

//     // CLEAR WISHLIST
//     case "CLEAR_WISHLIST": {
//       return {
//         ...state,
//         wishlist: [],
//       };
//     }

//     // DEFAULT
//     default:
//       return state;
//   }
// };

// export default CartReducer;
