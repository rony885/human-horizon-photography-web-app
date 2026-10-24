// import React, { useState } from "react";
// import styled from "styled-components";
// import { Link } from "react-router";
// import { FaShoppingCart, FaTrashAlt } from "react-icons/fa";

// import { useCartContext } from "../../context/CartContext";
// // import { useProductContext } from "../../context/ProductContext";

// const Wishlist = () => {
//   const { wishlist, removeWishlist, addToCart, clearWishlist } =
//     useCartContext();

//   // data fetching
//   // const { license, fetchLicense } = useProductContext();
//   const [selectedLicenses, setSelectedLicenses] = useState({});

//   return (
//     <Wrapper>
//       <div
//         className="container"
//         style={{ marginTop: "130px", marginBottom: "80px" }}
//       >

//         <div className="breadcrumb mb-4">
//           <Link className="text-dark fw-bold text-decoration-none" to="/">
//             Home
//           </Link>

//           <span className="mx-2">&gt;</span>

//           <span>Wishlist</span>
//         </div>

//         {/* Wishlist Header */}
//         <div className="wishlist-header d-flex justify-content-between align-items-center mb-4 p-3 rounded-2">
//           <h1 className="h2 fw-bold m-0">
//             Your Wishlist ({wishlist.length}{" "}
//             {wishlist.length === 1 ? "item" : "items"})
//           </h1>

//           <button
//             type="button"
//             className="btn btn-action"
//             onClick={clearWishlist}
//             disabled={wishlist.length === 0}
//           >
//             Remove All
//           </button>
//         </div>

//         {/* {wishlistData.map((item) => ( */}
//         {wishlist.length > 0 ? (
//           wishlist.map((item) => (
//             <div
//               className="wishlist-item d-grid align-items-start py-4 border-bottom"
//               key={item.id}
//             >
//               <div className="d-flex flex-column align-items-start">
//                 <div className="d-flex align-items-start gap-3">
//                   <img
//                     // src={item.image}
//                     src={
//                       item.image ||
//                       item.thumbnail_image ||
//                       item.preview_image ||
//                       ""
//                     }
//                     alt="Wishlist"
//                     className="wishlist-item-img rounded-3 flex-shrink-0"
//                   />

//                   <div className="pt-1">
//                     {/* <p className="fw-semibold item-id mb-0">{item.title}</p> */}
//                     <p className="fw-semibold item-id mb-0">{item.name}</p>
//                     <p className="item-format mb-0">
//                       {item.product_code || "N/A"}
//                     </p>
//                     <p className="item-format mb-0">JPG</p>
//                   </div>
//                 </div>

//                 <div className="mt-3">
//                   <div className="license-label mb-1">License</div>

//                   <div className="select-wrapper">
//                     <select
//                       className="form-select custom-select"
//                       value={selectedLicenses[item.id] || "standard"}
//                       onChange={(e) => {
//                         setSelectedLicenses((prev) => ({
//                           ...prev,
//                           [item.id]: e.target.value,
//                         }));
//                       }}
//                     >
//                       <option value="free">
//                         {item.licenses?.free?.name || "Free License"}
//                       </option>

//                       <option value="standard">
//                         {item.licenses?.standard?.name || "Standard License"}
//                       </option>

//                       <option value="enhanced">
//                         {item.licenses?.enhanced?.name || "Enhanced License"}
//                       </option>
//                     </select>
//                   </div>
//                 </div>
//               </div>

//               <div className="item-price fw-bold">
//                 {/* <span className="fw-bold fs-5">৳</span> */}
//                 {/* {item.price} */}$
//                 {item.licenses?.[selectedLicenses[item.id] || "standard"]
//                   ?.price ?? 0}
//               </div>

//               <button
//                 type="button"
//                 className="add-cart-button"
//                 onClick={() => {
//                   addToCart(item.id, 1, item);
//                   removeWishlist(item.id);
//                 }}
//               >
//                 <FaShoppingCart />
//                 <span>Add to cart</span>
//               </button>

//               <button
//                 type="button"
//                 className="remove-button"
//                 onClick={() => removeWishlist(item.id)}
//               >
//                 <FaTrashAlt />
//                 <span>Remove</span>
//               </button>
//             </div>
//             // ))}
//           ))
//         ) : (
//           <div className="w-100 fs-5 d-flex justify-content-center align-items-center text-center text-danger">
//             Wishlist is empty
//           </div>
//         )}
//       </div>
//     </Wrapper>
//   );
// };

// const Wrapper = styled.section`
//   .wishlist-header {
//     background: #f4f4f4;
//   }

//   /* Remove All */
//   .btn-action {
//     border: 1px solid #d1d1d1;
//     background: #fff;
//     color: #000;
//     font-size: 0.85rem;
//     font-weight: 600;
//     padding: 7px 16px;
//     border-radius: 6px;
//     transition: 0.25s ease;
//   }

//   .btn-action:hover {
//     background: #000;
//     border-color: #000;
//     color: #fff;
//   }

//   .btn-action:active {
//     transform: translateY(1px);
//   }

//   /* Wishlist grid */
//   .wishlist-item {
//     grid-template-columns: minmax(350px, 1fr) 80px 140px 110px;
//     column-gap: 30px;
//   }

//   /* Image */
//   .wishlist-item-img {
//     width: 100px;
//     height: 100px;
//     object-fit: cover;
//   }

//   /* Text */
//   .item-id {
//     font-size: 0.95rem;
//     color: #333;
//   }

//   .item-format,
//   .license-label {
//     color: #666;
//     font-size: 12px;
//   }

//   .license-label {
//     color: #444;
//     font-size: 0.82rem;
//   }

//   /* License select */
//   .select-wrapper {
//     position: relative;
//     width: 200px;
//   }

//   .custom-select {
//     width: 100%;
//     padding-right: 38px;
//     border: 1px solid #767676;
//     border-radius: 8px;
//     font-size: 0.9rem;
//     color: #111;
//     cursor: pointer;
//     appearance: none;
//   }

//   .custom-select:focus {
//     border-color: #000;
//     box-shadow: none;
//   }

//   /* .select-icon {
//     position: absolute;
//     top: 50%;
//     right: 12px;
//     transform: translateY(-50%);
//     font-size: 11px;
//     color: #111;
//     pointer-events: none;
//   } */

//   /* Price */
//   .item-price {
//     font-size: 1.05rem;
//     color: #111;
//   }

//   /* Buttons */
//   .add-cart-button,
//   .remove-button {
//     display: inline-flex;
//     align-items: center;
//     justify-content: center;
//     gap: 8px;
//     width: 100%;
//     padding: 9px 14px;
//     border-radius: 6px;
//     font-size: 0.85rem;
//     font-weight: 600;
//     white-space: nowrap;
//     cursor: pointer;
//     transition: 0.2s ease;
//   }

//   .add-cart-button {
//     border: 1px solid #111;
//     background: #111;
//     color: #fff;
//   }

//   .add-cart-button:hover {
//     background: #2c2c2c;
//     border-color: #2c2c2c;
//   }

//   .remove-button {
//     border: 1px solid #d1d1d1;
//     background: #fff;
//     color: #000;
//   }

//   .remove-button:hover {
//     background: #f8f9fa;
//     border-color: #b0b0b0;
//   }

//   .add-cart-button svg {
//     font-size: 13px;
//   }

//   .remove-button svg {
//     font-size: 12px;
//   }

//   /* Tablet */
//   @media (max-width: 991px) {
//     .wishlist-item {
//       grid-template-columns: minmax(280px, 1fr) 70px 130px 100px;
//       column-gap: 18px;
//     }
//   }

//   /* Mobile */
//   @media (max-width: 767px) {
//     .wishlist-header {
//       padding: 18px !important;
//     }

//     .wishlist-item {
//       grid-template-columns: 1fr auto;
//       row-gap: 18px;
//       column-gap: 20px;
//     }

//     .wishlist-item > div:first-child {
//       grid-column: 1 / -1;
//     }

//     .item-price {
//       grid-column: 1;
//     }

//     .add-cart-button {
//       grid-column: 2;
//       width: auto;
//     }

//     .remove-button {
//       grid-column: 1 / -1;
//       width: 100%;
//     }
//   }

//   /* Small mobile */
//   @media (max-width: 575px) {
//     .wishlist-header h1 {
//       font-size: 1.4rem;
//     }

//     .wishlist-item-img {
//       width: 80px;
//       height: 80px;
//     }

//     .select-wrapper {
//       width: 180px;
//     }

//     .add-cart-button,
//     .remove-button {
//       padding: 8px 12px;
//       font-size: 0.8rem;
//     }
//   }
// `;

// export default Wishlist;

import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router";
import { FaShoppingCart, FaTrashAlt } from "react-icons/fa";

import { useCartContext } from "../../context/CartContext";
import { useProductContext } from "../../context/ProductContext.jsx";

const getLicensePrice = (license) =>
  Number(license?.price ?? license?.displayed_price ?? 0);

const getLicenseName = (license) => String(license?.name ?? "").toLowerCase();

const Wishlist = () => {
  const { wishlist, removeWishlist, addToCart, clearWishlist } =
    useCartContext();

  const { license, fetchLicense } = useProductContext();
  const [selectedLicenses, setSelectedLicenses] = useState({});

  useEffect(() => {
    fetchLicense?.();
  }, [fetchLicense]);

  const licenses = useMemo(
    () =>
      (Array.isArray(license) ? license : []).filter(
        (item) =>
          item.status == null ||
          [true, 1, "1", "true"].includes(
            typeof item.status === "string"
              ? item.status.toLowerCase()
              : item.status,
          ),
      ),
    [license],
  );

  const getSelectedLicense = (item) =>
    licenses.find(
      (lic) => String(lic.id) === String(selectedLicenses[item.id]),
    ) ||
    licenses.find((lic) => getLicenseName(lic).includes("standard")) ||
    licenses[0] ||
    null;

  const handleAddToCart = (item) => {
    const selected = getSelectedLicense(item);

    if (!selected) {
      window.alert("No active license is available. Please try again.");
      return;
    }

    addToCart(item.id, 1, item, selected, licenses);
    removeWishlist(item.id);
  };

  return (
    <Wrapper>
      <div
        className="container"
        style={{ marginTop: "130px", marginBottom: "80px" }}
      >
        <div className="breadcrumb mb-4">
          <Link className="text-dark fw-bold text-decoration-none" to="/">
            Home
          </Link>

          <span className="mx-2">&gt;</span>

          <span>Wishlist</span>
        </div>

        {/* Wishlist Header */}
        <div className="wishlist-header d-flex justify-content-between align-items-center mb-4 p-3 rounded-2">
          <h1 className="h2 fw-bold m-0">
            Your Wishlist ({wishlist.length}{" "}
            {wishlist.length === 1 ? "item" : "items"})
          </h1>

          <button
            type="button"
            className="btn btn-action"
            onClick={clearWishlist}
            disabled={wishlist.length === 0}
          >
            Remove All
          </button>
        </div>

        {wishlist.length > 0 ? (
          wishlist.map((item) => {
            const selected = getSelectedLicense(item);

            return (
              <div
                className="wishlist-item d-grid align-items-start py-4 border-bottom"
                key={item.id}
              >
                <div className="d-flex flex-column align-items-start">
                  <div className="d-flex align-items-start gap-3">
                    <img
                      src={
                        item.image ||
                        item.thumbnail_image ||
                        item.preview_image ||
                        ""
                      }
                      alt="Wishlist"
                      className="wishlist-item-img rounded-3 flex-shrink-0"
                    />

                    <div className="pt-1">
                      <p className="fw-semibold item-id mb-0">{item.name}</p>
                      <p className="item-format mb-0">
                        {item.product_code || "N/A"}
                      </p>
                      <p className="item-format mb-0">JPG</p>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="license-label mb-1">License</div>

                    <div className="select-wrapper">
                      <select
                        className="form-select custom-select"
                        value={selected ? String(selected.id) : ""}
                        disabled={licenses.length === 0}
                        onChange={(e) =>
                          setSelectedLicenses((prev) => ({
                            ...prev,
                            [item.id]: e.target.value,
                          }))
                        }
                      >
                        {licenses.length === 0 ? (
                          <option value="">Loading licenses...</option>
                        ) : (
                          licenses.map((lic) => (
                            <option key={lic.id} value={String(lic.id)}>
                              {lic.name}— $
                              {getLicensePrice(lic).toLocaleString("en-US")}
                            </option>
                          ))
                        )}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="item-price fw-bold">
                  ${getLicensePrice(selected).toLocaleString("en-US")}
                </div>

                <button
                  type="button"
                  className="add-cart-button"
                  disabled={!selected}
                  onClick={() => handleAddToCart(item)}
                >
                  <FaShoppingCart />
                  <span>Add to cart</span>
                </button>

                <button
                  type="button"
                  className="remove-button"
                  onClick={() => removeWishlist(item.id)}
                >
                  <FaTrashAlt />
                  <span>Remove</span>
                </button>
              </div>
            );
          })
        ) : (
          <div className="w-100 fs-5 d-flex justify-content-center align-items-center text-center text-danger">
            Wishlist is empty
          </div>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .wishlist-header {
    background: #f4f4f4;
  }

  .btn-action {
    border: 1px solid #d1d1d1;
    background: #fff;
    color: #000;
    font-size: 0.85rem;
    font-weight: 600;
    padding: 7px 16px;
    border-radius: 6px;
    transition: 0.25s ease;
  }

  .btn-action:hover {
    background: #000;
    border-color: #000;
    color: #fff;
  }

  .btn-action:active {
    transform: translateY(1px);
  }

  .wishlist-item {
    grid-template-columns: minmax(350px, 1fr) 80px 140px 110px;
    column-gap: 30px;
  }

  .wishlist-item-img {
    width: 100px;
    height: 100px;
    object-fit: cover;
  }

  .item-id {
    font-size: 0.95rem;
    color: #333;
  }

  .item-format,
  .license-label {
    color: #666;
    font-size: 12px;
  }

  .license-label {
    color: #444;
    font-size: 0.82rem;
  }

  .select-wrapper {
    position: relative;
    width: 200px;
  }

  .custom-select {
    width: 100%;
    padding-right: 38px;
    border: 1px solid #767676;
    border-radius: 8px;
    font-size: 0.9rem;
    color: #111;
    cursor: pointer;
    appearance: none;
  }

  .custom-select:focus {
    border-color: #000;
    box-shadow: none;
  }

  .item-price {
    font-size: 1.05rem;
    color: #111;
  }

  .add-cart-button,
  .remove-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    padding: 9px 14px;
    border-radius: 6px;
    font-size: 0.85rem;
    font-weight: 600;
    white-space: nowrap;
    cursor: pointer;
    transition: 0.2s ease;
  }

  .add-cart-button {
    border: 1px solid #111;
    background: #111;
    color: #fff;
  }

  .add-cart-button:hover {
    background: #2c2c2c;
    border-color: #2c2c2c;
  }

  .add-cart-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .remove-button {
    border: 1px solid #d1d1d1;
    background: #fff;
    color: #000;
  }

  .remove-button:hover {
    background: #f8f9fa;
    border-color: #b0b0b0;
  }

  .add-cart-button svg {
    font-size: 13px;
  }

  .remove-button svg {
    font-size: 12px;
  }

  @media (max-width: 991px) {
    .wishlist-item {
      grid-template-columns: minmax(280px, 1fr) 70px 130px 100px;
      column-gap: 18px;
    }
  }

  @media (max-width: 767px) {
    .wishlist-header {
      padding: 18px !important;
    }

    .wishlist-item {
      grid-template-columns: 1fr auto;
      row-gap: 18px;
      column-gap: 20px;
    }

    .wishlist-item > div:first-child {
      grid-column: 1 / -1;
    }

    .item-price {
      grid-column: 1;
    }

    .add-cart-button {
      grid-column: 2;
      width: auto;
    }

    .remove-button {
      grid-column: 1 / -1;
      width: 100%;
    }
  }

  @media (max-width: 575px) {
    .wishlist-header h1 {
      font-size: 1.4rem;
    }

    .wishlist-item-img {
      width: 80px;
      height: 80px;
    }

    .select-wrapper {
      width: 180px;
    }

    .add-cart-button,
    .remove-button {
      padding: 8px 12px;
      font-size: 0.8rem;
    }
  }
`;

export default Wishlist;
