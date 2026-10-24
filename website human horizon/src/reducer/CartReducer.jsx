// const CartReducer = (state, action) => {
//   // ADD TO CART
//   if (action.type === "ADD_TO_CART") {
//     const { product, selectedLicense, licenseOptions = [] } = action.payload;

//     const exist = state.cart.find(
//       (item) => Number(item.productId) === Number(product.id),
//     );

//     if (exist) {
//       return state;
//     }

//     // Use the selected license from the API.
//     const selected =
//       selectedLicense ||
//       licenseOptions.find((item) => item.status) ||
//       product.license ||
//       null;

//     const cartProduct = {
//       ...product,

//       id: product.id,
//       productId: product.id,

//       title: product.name || product.title || "Untitled Product",
//       name: product.name || product.title || "Untitled Product",

//       image:
//         product.thumbnail_image || product.preview_image || product.image || "",

//       thumbnail_image: product.thumbnail_image || product.image || "",

//       preview_image:
//         product.preview_image || product.thumbnail_image || product.image || "",

//       assetId: product.assetId || product.product_code || "",

//       category_id: product.category_id ?? product.category?.id ?? null,
//       category: product.category || null,

//       year_id: product.year_id ?? product.year?.id ?? null,
//       year: product.year || null,

//       formats: product.formats || [],

//       premium: product.premium ?? false,
//       premiumText: product.premium_text || product.premiumText || "",

//       // Save all available licenses for the header dropdown.
//       licenseOptions,

//       // Save the selected license and its actual API price.
//       licenseId: selected ? String(selected.id) : "",
//       license: selected ? String(selected.id) : "",
//       licenseName: selected?.name || "",
//       licenseDescription: selected?.description || "",
//       price: Number(selected?.price || 0),

//       amount: 1,
//     };

//     return {
//       ...state,
//       cart: [...state.cart, cartProduct],
//     };
//   }

//   // CHANGE LICENSE
//   if (action.type === "CHANGE_LICENSE") {
//     const { id, licenseId } = action.payload;

//     const updatedCart = state.cart.map((item) => {
//       if (Number(item.id) !== Number(id)) {
//         return item;
//       }

//       // Find the newly selected license by its API ID.
//       const selected = (item.licenseOptions || []).find(
//         (license) => String(license.id) === String(licenseId),
//       );

//       // Do not update if the license ID is invalid.
//       if (!selected) {
//         return item;
//       }

//       return {
//         ...item,
//         license: String(selected.id),
//         licenseId: String(selected.id),
//         licenseName: selected.name,
//         licenseDescription: selected.description || "",
//         price: Number(selected.price || 0),
//       };
//     });

//     return {
//       ...state,
//       cart: updatedCart,
//     };
//   }

//   // REMOVE FROM CART
//   if (action.type === "REMOVE_ITEM") {
//     return {
//       ...state,
//       cart: state.cart.filter((item) => item.id !== action.payload),
//     };
//   }

//   // CLEAR CART
//   if (action.type === "CLEAR_CART") {
//     return {
//       ...state,
//       cart: [],
//     };
//   }

//   // INCREMENT
//   if (action.type === "SET_INCREMENT") {
//     const updated = state.cart.map((item) => {
//       if (Number(item.id) === Number(action.payload)) {
//         return {
//           ...item,
//           amount: Math.min(Number(item.amount) + 1, 10),
//         };
//       }

//       return item;
//     });

//     return {
//       ...state,
//       cart: updated,
//     };
//   }

//   // DECREMENT
//   if (action.type === "SET_DECREMENT") {
//     const updated = state.cart.map((item) => {
//       if (Number(item.id) === Number(action.payload)) {
//         return {
//           ...item,
//           amount: Math.max(Number(item.amount) - 1, 1),
//         };
//       }

//       return item;
//     });

//     return {
//       ...state,
//       cart: updated,
//     };
//   }

//   // TOTAL CART ITEM
//   if (action.type === "CART_TOTAL_ITEM") {
//     const totalItem = state.cart.reduce(
//       (acc, item) => acc + Number(item.amount || 0),
//       0,
//     );

//     return {
//       ...state,
//       total_item: totalItem,
//     };
//   }

//   // TOTAL CART PRICE
//   if (action.type === "CART_TOTAL_PRICE") {
//     const total = state.cart.reduce(
//       (acc, item) => acc + Number(item.price || 0) * Number(item.amount || 0),
//       0,
//     );

//     return {
//       ...state,
//       total_price: total,
//     };
//   }

//   // ADD TO WISHLIST
//   // if (action.type === "ADD_TO_WISHLIST") {
//   //   const product = action.payload;

//   //   const exist = state.wishlist.find(
//   //     (item) => Number(item.id) === Number(product.id),
//   //   );

//   //   // Already in wishlist
//   //   if (exist) {
//   //     return state;
//   //   }

//   //   return {
//   //     ...state,
//   //     wishlist: [
//   //       ...state.wishlist,
//   //       {
//   //         ...product,
//   //         addedAt: new Date().toISOString(),
//   //       },
//   //     ],
//   //   };
//   // }

//   if (action.type === "ADD_TO_WISHLIST") {
//     const exist = state.wishlist.find((item) => item.id === action.payload.id);

//     if (exist) return state;

//     const wishlistProduct = {
//       ...action.payload,

//       // save current date
//       addedAt: new Date().toISOString(),
//     };

//     return {
//       ...state,
//       wishlist: [...state.wishlist, wishlistProduct],
//     };
//   }

//   // REMOVE FROM WISHLIST
//   if (action.type === "REMOVE_WISHLIST") {
//     return {
//       ...state,
//       wishlist: state.wishlist.filter((item) => item.id !== action.payload),
//     };
//   }

//   // CLEAR WISHLIST
//   if (action.type === "CLEAR_WISHLIST") {
//     return {
//       ...state,
//       wishlist: [],
//     };
//   }

//   return state;
// };

// export default CartReducer;

const CartReducer = (state, action) => {
  // Helper: normalize license ID
  const getLicenseId = (license) => {
    if (!license) return "";

    if (typeof license === "object") {
      return String(license.id ?? license.license_id ?? "");
    }

    return String(license);
  };

  // Helper: find a license by ID or name
  const findLicense = (licenses = [], selectedLicense) => {
    if (!Array.isArray(licenses) || licenses.length === 0) {
      return null;
    }

    if (selectedLicense && typeof selectedLicense === "object") {
      const selectedId = getLicenseId(selectedLicense);

      return (
        licenses.find((license) => String(license.id) === selectedId) ||
        selectedLicense
      );
    }

    const selectedId = getLicenseId(selectedLicense);

    if (selectedId) {
      const matched = licenses.find(
        (license) => String(license.id) === selectedId,
      );

      if (matched) return matched;
    }

    // Default license for Home and Wishlist
    return (
      licenses.find((license) =>
        String(license.name || "")
          .toLowerCase()
          .includes("standard"),
      ) ||
      licenses.find((license) => license.status === true) ||
      licenses[0]
    );
  };

  // Helper: normalize product data from Product API
  const normalizeProduct = (product) => ({
    ...product,

    id: product.id,
    productId: product.id,

    title: product.name || product.title || "Untitled Product",
    name: product.name || product.title || "Untitled Product",

    image:
      product.thumbnail_image || product.image || product.preview_image || "",

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

    amount: Number(product.amount || 1),
  });

  // ADD TO CART
  if (action.type === "ADD_TO_CART") {
    const { product, selectedLicense, licenseOptions = [] } = action.payload;

    if (!product || !product.id) return state;

    const existing = state.cart.find(
      (item) => Number(item.productId ?? item.id) === Number(product.id),
    );

    if (existing) return state;

    const options =
      licenseOptions.length > 0
        ? licenseOptions
        : Array.isArray(product.licenseOptions)
          ? product.licenseOptions
          : Array.isArray(product.licenses)
            ? product.licenses
            : [];

    const selected = findLicense(options, selectedLicense);

    const cartProduct = {
      ...normalizeProduct(product),

      licenseOptions: options,

      licenseId: selected ? String(selected.id) : "",
      license: selected ? String(selected.id) : "",

      licenseName: selected?.name || "",
      licenseDescription: selected?.description || "",

      price: Number(selected.price ?? selected.displayed_price ?? 0),

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

    const cart = state.cart.map((item) => {
      if (Number(item.productId ?? item.id) !== Number(id)) {
        return item;
      }

      const selected = (item.licenseOptions || []).find(
        (license) => String(license.id) === String(licenseId),
      );

      if (!selected) return item;

      return {
        ...item,

        licenseId: String(selected.id),
        license: String(selected.id),

        licenseName: selected.name || "",
        licenseDescription: selected.description || "",

        price: Number(selected.price ?? 0),
      };
    });

    return {
      ...state,
      cart,

      total_price: cart.reduce(
        (total, item) =>
          total + Number(item.price || 0) * Number(item.amount || 1),
        0,
      ),
    };
  }

  // REMOVE FROM CART
  if (action.type === "REMOVE_ITEM") {
    const cart = state.cart.filter(
      (item) => Number(item.id) !== Number(action.payload),
    );

    return {
      ...state,
      cart,
      total_item: cart.reduce(
        (total, item) => total + Number(item.amount || 0),
        0,
      ),
      total_price: cart.reduce(
        (total, item) =>
          total + Number(item.price || 0) * Number(item.amount || 1),
        0,
      ),
    };
  }

  // CLEAR CART
  if (action.type === "CLEAR_CART") {
    return {
      ...state,
      cart: [],
      total_item: 0,
      total_price: 0,
    };
  }

  // INCREMENT
  if (action.type === "SET_INCREMENT") {
    const cart = state.cart.map((item) =>
      Number(item.id) === Number(action.payload)
        ? {
            ...item,
            amount: Math.min(Number(item.amount || 1) + 1, 10),
          }
        : item,
    );

    return {
      ...state,
      cart,
      total_item: cart.reduce(
        (total, item) => total + Number(item.amount || 0),
        0,
      ),
      total_price: cart.reduce(
        (total, item) =>
          total + Number(item.price || 0) * Number(item.amount || 1),
        0,
      ),
    };
  }

  // DECREMENT
  if (action.type === "SET_DECREMENT") {
    const cart = state.cart.map((item) =>
      Number(item.id) === Number(action.payload)
        ? {
            ...item,
            amount: Math.max(Number(item.amount || 1) - 1, 1),
          }
        : item,
    );

    return {
      ...state,
      cart,
      total_item: cart.reduce(
        (total, item) => total + Number(item.amount || 0),
        0,
      ),
      total_price: cart.reduce(
        (total, item) =>
          total + Number(item.price || 0) * Number(item.amount || 1),
        0,
      ),
    };
  }

  // TOTAL CART ITEMS
  if (action.type === "CART_TOTAL_ITEM") {
    return {
      ...state,
      total_item: state.cart.reduce(
        (total, item) => total + Number(item.amount || 0),
        0,
      ),
    };
  }

  // TOTAL CART PRICE
  if (action.type === "CART_TOTAL_PRICE") {
    return {
      ...state,
      total_price: state.cart.reduce(
        (total, item) =>
          total + Number(item.price || 0) * Number(item.amount || 1),
        0,
      ),
    };
  }

  // ADD TO WISHLIST
  if (action.type === "ADD_TO_WISHLIST") {
    const product = action.payload;

    if (!product || !product.id) return state;

    const exists = state.wishlist.some(
      (item) => Number(item.id) === Number(product.id),
    );

    if (exists) return state;

    const wishlistProduct = normalizeProduct(product);

    return {
      ...state,
      wishlist: [
        ...state.wishlist,
        {
          ...wishlistProduct,
          addedAt: new Date().toISOString(),
        },
      ],
    };
  }

  // REMOVE FROM WISHLIST
  if (action.type === "REMOVE_WISHLIST") {
    return {
      ...state,
      wishlist: state.wishlist.filter(
        (item) => Number(item.id) !== Number(action.payload),
      ),
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
