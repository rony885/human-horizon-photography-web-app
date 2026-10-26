// const CartReducer = (state, action) => {
//   // Helper: normalize license ID
//   const getLicenseId = (license) => {
//     if (!license) return "";

//     if (typeof license === "object") {
//       return String(license.id ?? license.license_id ?? "");
//     }

//     return String(license);
//   };

//   // Helper: find a license by ID or name
//   const findLicense = (licenses = [], selectedLicense) => {
//     if (!Array.isArray(licenses) || licenses.length === 0) {
//       return null;
//     }

//     if (selectedLicense && typeof selectedLicense === "object") {
//       const selectedId = getLicenseId(selectedLicense);

//       return (
//         licenses.find((license) => String(license.id) === selectedId) ||
//         selectedLicense
//       );
//     }

//     const selectedId = getLicenseId(selectedLicense);

//     if (selectedId) {
//       const matched = licenses.find(
//         (license) => String(license.id) === selectedId,
//       );

//       if (matched) return matched;
//     }

//     // Default license for Home and Wishlist
//     return (
//       licenses.find((license) =>
//         String(license.name || "")
//           .toLowerCase()
//           .includes("standard"),
//       ) ||
//       licenses.find((license) => license.status === true) ||
//       licenses[0]
//     );
//   };

//   // Helper: normalize product data from Product API
//   const normalizeProduct = (product) => ({
//     ...product,

//     id: product.id,
//     productId: product.id,

//     title: product.name || product.title || "Untitled Product",
//     name: product.name || product.title || "Untitled Product",

//     image:
//       product.thumbnail_image || product.image || product.preview_image || "",

//     thumbnail_image: product.thumbnail_image || product.image || "",

//     preview_image:
//       product.preview_image || product.thumbnail_image || product.image || "",

//     assetId: product.assetId || product.product_code || "",

//     category_id: product.category_id ?? product.category?.id ?? null,

//     category: product.category || null,

//     year_id: product.year_id ?? product.year?.id ?? null,

//     year: product.year || null,

//     formats: product.formats || [],

//     premium: product.premium ?? false,

//     premiumText: product.premium_text || product.premiumText || "",

//     amount: Number(product.amount || 1),
//   });

//   // ADD TO CART
//   if (action.type === "ADD_TO_CART") {
//     const { product, selectedLicense, licenseOptions = [] } = action.payload;

//     if (!product || !product.id) return state;

//     const existing = state.cart.find(
//       (item) => Number(item.productId ?? item.id) === Number(product.id),
//     );

//     if (existing) return state;

//     const options =
//       licenseOptions.length > 0
//         ? licenseOptions
//         : Array.isArray(product.licenseOptions)
//           ? product.licenseOptions
//           : Array.isArray(product.licenses)
//             ? product.licenses
//             : [];

//     const selected = findLicense(options, selectedLicense);

//     const cartProduct = {
//       ...normalizeProduct(product),

//       licenseOptions: options,

//       licenseId: selected ? String(selected.id) : "",
//       license: selected ? String(selected.id) : "",

//       licenseName: selected?.name || "",
//       licenseDescription: selected?.description || "",

//       price: Number(selected.price ?? selected.displayed_price ?? 0),

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

//     const cart = state.cart.map((item) => {
//       if (Number(item.productId ?? item.id) !== Number(id)) {
//         return item;
//       }

//       const selected = (item.licenseOptions || []).find(
//         (license) => String(license.id) === String(licenseId),
//       );

//       if (!selected) return item;

//       return {
//         ...item,

//         licenseId: String(selected.id),
//         license: String(selected.id),

//         licenseName: selected.name || "",
//         licenseDescription: selected.description || "",

//         price: Number(selected.price ?? 0),
//       };
//     });

//     return {
//       ...state,
//       cart,

//       total_price: cart.reduce(
//         (total, item) =>
//           total + Number(item.price || 0) * Number(item.amount || 1),
//         0,
//       ),
//     };
//   }

//   // REMOVE FROM CART
//   if (action.type === "REMOVE_ITEM") {
//     const cart = state.cart.filter(
//       (item) => Number(item.id) !== Number(action.payload),
//     );

//     return {
//       ...state,
//       cart,
//       total_item: cart.reduce(
//         (total, item) => total + Number(item.amount || 0),
//         0,
//       ),
//       total_price: cart.reduce(
//         (total, item) =>
//           total + Number(item.price || 0) * Number(item.amount || 1),
//         0,
//       ),
//     };
//   }

//   // CLEAR CART
//   if (action.type === "CLEAR_CART") {
//     return {
//       ...state,
//       cart: [],
//       total_item: 0,
//       total_price: 0,
//     };
//   }

//   // INCREMENT
//   if (action.type === "SET_INCREMENT") {
//     const cart = state.cart.map((item) =>
//       Number(item.id) === Number(action.payload)
//         ? {
//             ...item,
//             amount: Math.min(Number(item.amount || 1) + 1, 10),
//           }
//         : item,
//     );

//     return {
//       ...state,
//       cart,
//       total_item: cart.reduce(
//         (total, item) => total + Number(item.amount || 0),
//         0,
//       ),
//       total_price: cart.reduce(
//         (total, item) =>
//           total + Number(item.price || 0) * Number(item.amount || 1),
//         0,
//       ),
//     };
//   }

//   // DECREMENT
//   if (action.type === "SET_DECREMENT") {
//     const cart = state.cart.map((item) =>
//       Number(item.id) === Number(action.payload)
//         ? {
//             ...item,
//             amount: Math.max(Number(item.amount || 1) - 1, 1),
//           }
//         : item,
//     );

//     return {
//       ...state,
//       cart,
//       total_item: cart.reduce(
//         (total, item) => total + Number(item.amount || 0),
//         0,
//       ),
//       total_price: cart.reduce(
//         (total, item) =>
//           total + Number(item.price || 0) * Number(item.amount || 1),
//         0,
//       ),
//     };
//   }

//   // TOTAL CART ITEMS
//   if (action.type === "CART_TOTAL_ITEM") {
//     return {
//       ...state,
//       total_item: state.cart.reduce(
//         (total, item) => total + Number(item.amount || 0),
//         0,
//       ),
//     };
//   }

//   // TOTAL CART PRICE
//   if (action.type === "CART_TOTAL_PRICE") {
//     return {
//       ...state,
//       total_price: state.cart.reduce(
//         (total, item) =>
//           total + Number(item.price || 0) * Number(item.amount || 1),
//         0,
//       ),
//     };
//   }

//   // ADD TO WISHLIST
//   if (action.type === "ADD_TO_WISHLIST") {
//     const product = action.payload;

//     if (!product || !product.id) return state;

//     const exists = state.wishlist.some(
//       (item) => Number(item.id) === Number(product.id),
//     );

//     if (exists) return state;

//     const wishlistProduct = normalizeProduct(product);

//     return {
//       ...state,
//       wishlist: [
//         ...state.wishlist,
//         {
//           ...wishlistProduct,
//           addedAt: new Date().toISOString(),
//         },
//       ],
//     };
//   }

//   // REMOVE FROM WISHLIST
//   if (action.type === "REMOVE_WISHLIST") {
//     return {
//       ...state,
//       wishlist: state.wishlist.filter(
//         (item) => Number(item.id) !== Number(action.payload),
//       ),
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

const getLicenseId = (license) => {
  if (!license) return "";

  if (typeof license === "object") {
    return String(license.id ?? license.license_id ?? "");
  }

  return String(license);
};

const getLicensePrice = (license) =>
  Number(license?.price ?? license?.displayed_price ?? 0);

const isActiveLicense = (license) =>
  license?.status === undefined ||
  license?.status === true ||
  license?.status === 1 ||
  license?.status === "1" ||
  license?.status === "true";

// LICENSE HELPERS
const findLicense = (licenses = [], selectedLicense) => {
  if (!Array.isArray(licenses) || licenses.length === 0) {
    return null;
  }

  const activeLicenses = licenses.filter(isActiveLicense);
  const availableLicenses =
    activeLicenses.length > 0 ? activeLicenses : licenses;

  const selectedId = getLicenseId(selectedLicense);

  if (selectedId) {
    const matched = availableLicenses.find(
      (license) => getLicenseId(license) === selectedId,
    );

    if (matched) return matched;
  }

  if (typeof selectedLicense === "string") {
    const matchedByName = availableLicenses.find(
      (license) =>
        String(license.name || "").toLowerCase() ===
        selectedLicense.toLowerCase(),
    );

    if (matchedByName) return matchedByName;
  }

  // Default license for Home and Wishlist
  return (
    availableLicenses.find((license) =>
      String(license.name || "")
        .toLowerCase()
        .includes("standard"),
    ) ||
    availableLicenses[0] ||
    null
  );
};

// PRODUCT HELPERS
const normalizeProduct = (product) => {
  const productId = product.id ?? product.product_id;

  return {
    ...product,

    id: productId,
    productId,

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

    amount: Math.max(1, Number(product.amount || 1)),
  };
};

// CART TOTALS
const calculateTotals = (cart) => ({
  total_item: cart.reduce((total, item) => total + Number(item.amount || 1), 0),

  total_price: cart.reduce(
    (total, item) => total + Number(item.price || 0) * Number(item.amount || 1),
    0,
  ),
});

const CartReducer = (state, action) => {
  switch (action.type) {
    // ADD TO CART
    case "ADD_TO_CART": {
      const {
        id,
        amount,
        product,
        selectedLicense,
        licenseOptions = [],
      } = action.payload || {};

      if (!product) return state;

      const normalizedProduct = normalizeProduct({
        ...product,
        id: product.id ?? product.product_id ?? id,
      });

      if (normalizedProduct.id === undefined || normalizedProduct.id === null) {
        return state;
      }

      // Keep one cart entry per image
      const existing = state.cart.find(
        (item) =>
          String(item.productId ?? item.id) === String(normalizedProduct.id),
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
        ...normalizedProduct,

        licenseOptions: options,

        licenseId: selected ? getLicenseId(selected) : "",
        license: selected ? getLicenseId(selected) : "",

        licenseName: selected?.name || "",
        licenseDescription: selected?.description || "",

        price: selected ? getLicensePrice(selected) : 0,

        amount: Math.max(1, Number(amount || 1)),
      };

      const cart = [...state.cart, cartProduct];

      return {
        ...state,
        cart,
        ...calculateTotals(cart),
      };
    }

    // CHANGE LICENSE
    case "CHANGE_LICENSE": {
      const { id, licenseId } = action.payload || {};

      const cart = state.cart.map((item) => {
        const itemId = item.productId ?? item.id;

        if (String(itemId) !== String(id)) {
          return item;
        }

        const selected = (item.licenseOptions || []).find(
          (license) => getLicenseId(license) === String(licenseId),
        );

        if (!selected || !isActiveLicense(selected)) {
          return item;
        }

        return {
          ...item,

          licenseId: getLicenseId(selected),
          license: getLicenseId(selected),

          licenseName: selected.name || "",
          licenseDescription: selected.description || "",

          price: getLicensePrice(selected),
        };
      });

      return {
        ...state,
        cart,
        ...calculateTotals(cart),
      };
    }

    // REMOVE FROM CART
    case "REMOVE_ITEM": {
      const cart = state.cart.filter(
        (item) => String(item.productId ?? item.id) !== String(action.payload),
      );

      return {
        ...state,
        cart,
        ...calculateTotals(cart),
      };
    }

    // CLEAR CART
    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
        total_item: 0,
        total_price: 0,
      };

    // INCREMENT
    case "SET_INCREMENT": {
      const cart = state.cart.map((item) =>
        String(item.productId ?? item.id) === String(action.payload)
          ? {
              ...item,
              amount: Math.min(Number(item.amount || 1) + 1, 10),
            }
          : item,
      );

      return {
        ...state,
        cart,
        ...calculateTotals(cart),
      };
    }

    // DECREMENT
    case "SET_DECREMENT": {
      const cart = state.cart.map((item) =>
        String(item.productId ?? item.id) === String(action.payload)
          ? {
              ...item,
              amount: Math.max(Number(item.amount || 1) - 1, 1),
            }
          : item,
      );

      return {
        ...state,
        cart,
        ...calculateTotals(cart),
      };
    }

    // RECALCULATE TOTAL ITEMS
    case "CART_TOTAL_ITEM":
      return {
        ...state,
        total_item: calculateTotals(state.cart).total_item,
      };

    // RECALCULATE TOTAL PRICE
    case "CART_TOTAL_PRICE":
      return {
        ...state,
        total_price: calculateTotals(state.cart).total_price,
      };

    // ADD TO WISHLIST
    case "ADD_TO_WISHLIST": {
      const product = action.payload;

      if (!product) return state;

      const normalizedProduct = normalizeProduct(product);

      if (normalizedProduct.id === undefined || normalizedProduct.id === null) {
        return state;
      }

      const exists = state.wishlist.some(
        (item) =>
          String(item.productId ?? item.id) === String(normalizedProduct.id),
      );

      if (exists) return state;

      return {
        ...state,
        wishlist: [
          ...state.wishlist,
          {
            ...normalizedProduct,
            addedAt: new Date().toISOString(),
          },
        ],
      };
    }

    // REMOVE FROM WISHLIST
    case "REMOVE_WISHLIST":
      return {
        ...state,
        wishlist: state.wishlist.filter(
          (item) =>
            String(item.productId ?? item.id) !== String(action.payload),
        ),
      };

    // CLEAR WISHLIST
    case "CLEAR_WISHLIST":
      return {
        ...state,
        wishlist: [],
      };

    default:
      return state;
  }
};

export default CartReducer;
