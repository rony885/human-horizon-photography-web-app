import React from "react";
import { Link } from "react-router";
import styled from "styled-components";

import { useCartContext } from "../../context/CartContext";

const Checkout = () => {
  const { cart, total_item, total_price } = useCartContext();

  return (
    <Wrapper>
      <div
        className="container"
        style={{ marginTop: "130px", marginBottom: "80px" }}
      >
        <div className="d-flex align-items-center gap-2 mb-4">
          <Link className="text-dark fw-bold text-decoration-none" to="/">
            Home
          </Link>

          <span>&gt;</span>

          <span>Checkout</span>
        </div>

        <div className="row g-5 mt-1">
          {/* ===== Billing Details ===== */}
          <div className="col-lg-7">
            <h2 className="fs-5 fw-bold text-dark">Billing Details</h2>

            <form>
              {/* Customer Name */}
              <div className="mb-3">
                <label
                  htmlFor="customerName"
                  className="form-label fw-semibold small"
                >
                  Customer Name*
                </label>

                <input
                  type="text"
                  className="form-control border-secondary rounded-1 px-3 py-2 shadow-none"
                  id="customerName"
                  required
                />
              </div>

              {/* Email */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-semibold small">
                  Email*
                </label>

                <input
                  type="email"
                  className="form-control border-secondary rounded-1 px-3 py-2 shadow-none"
                  id="email"
                  required
                />
              </div>

              {/* District & Upazila */}
              <div className="row mb-3">
                <div className="col-md-6 mb-3 mb-md-0">
                  <label
                    htmlFor="district"
                    className="form-label fw-semibold small"
                  >
                    District*
                  </label>

                  <select
                    className="form-select border-secondary rounded-1 px-3 py-2 shadow-none"
                    id="district"
                    required
                  >
                    <option value="">Select</option>
                    <option value="dhaka">Dhaka</option>
                    <option value="chittagong">Chittagong</option>
                    <option value="sylhet">Sylhet</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label
                    htmlFor="upazila"
                    className="form-label fw-semibold small"
                  >
                    Upazila*
                  </label>

                  <select
                    className="form-select border-secondary rounded-1 px-3 py-2 shadow-none"
                    id="upazila"
                    required
                  >
                    <option value="">Select</option>
                    <option value="dhanmondi">Dhanmondi</option>
                    <option value="gulshan">Gulshan</option>
                    <option value="uttara">Uttara</option>
                  </select>
                </div>
              </div>

              {/* Customer Address */}
              <div className="mb-3">
                <label
                  htmlFor="address"
                  className="form-label fw-semibold small"
                >
                  Customer Address*
                </label>

                <textarea
                  className="form-control border-secondary rounded-1 px-3 py-2 shadow-none"
                  id="address"
                  rows="2"
                  required
                ></textarea>
              </div>

              {/* Password */}
              <div className="mb-3">
                <label
                  htmlFor="password"
                  className="form-label fw-semibold small"
                >
                  Password
                </label>

                <input
                  type="password"
                  className="form-control border-secondary rounded-1 px-3 py-2 shadow-none"
                  id="password"
                />
              </div>

              {/* Payment Method */}
              <div className="mb-3">
                <label
                  htmlFor="deliveryType"
                  className="form-label fw-semibold small"
                >
                  Payment method
                </label>

                <select
                  className="form-select border-secondary rounded-1 px-3 py-2 shadow-none"
                  id="deliveryType"
                >
                  <option value="">Select</option>
                  <option value="bkash">Bkash</option>
                  <option value="negad">Negad</option>
                  <option value="rocket">Rocket</option>
                  <option value="card">Card</option>
                </select>
              </div>
            </form>
          </div>

          {/* ===== Your Order ===== */}
          <div className="col-lg-5">
            <h2 className="fs-5 fw-bold text-dark mb-4">
              Order summary ({total_item} {total_item === 1 ? "item" : "items"})
            </h2>

            <div className="border rounded-1 overflow-hidden">
              <table className="table mb-0">
                <thead>
                  <tr>
                    <th className="small fw-bold px-2 py-2 border-bottom">
                      Image
                    </th>

                    <th className="small fw-bold text-end px-2 py-2 border-bottom">
                      Amount
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {cart.length > 0 ? (
                    cart.map((item) => {
                      const itemTotal =
                        Number(item.price || 0) * Number(item.amount || 1);

                      return (
                        <tr key={item.id}>
                          <td className="px-2 py-3">
                            <div className="d-flex align-items-start gap-3">
                              <img
                                src={item.image}
                                alt={item.name || "Product"}
                                className="product-img rounded-1 border"
                              />

                              <div>
                                <p className="small text-dark lh-sm mb-1">
                                  {item.name}
                                </p>

                                <p className="small text-dark lh-sm mb-1">
                                  {item.product_code}
                                </p>

                                <p className="small text-dark lh-sm mb-1">
                                  {item.licenseName}
                                </p>

                                {Number(item.amount) > 1 && (
                                  <p className="small text-secondary lh-sm mb-0">
                                    Quantity: {item.amount}
                                  </p>
                                )}
                              </div>
                            </div>
                          </td>

                          <td className="price-cell px-2 py-1">
                            <span className="small fw-semibold text-nowrap">
                              {/* <span className="fw-bold fs-5">৳$</span> */}$
                              {itemTotal}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="2" className="text-center text-danger py-4">
                        {/* Your order is empty */}
                        No item in cart...
                      </td>
                    </tr>
                  )}

                  {/* SUBTOTAL */}
                  <tr>
                    <td className="fw-semibold text-dark px-2 py-2">
                      Subtotal
                    </td>

                    <td className="fw-semibold text-end px-2 py-2 text-nowrap">
                      ${total_price}
                    </td>
                  </tr>

                  {/* DISCOUNT */}
                  {/* <tr>
                    <td className="fw-semibold text-dark px-2 py-2">
                      Discount
                    </td>

                    <td className="fw-semibold text-end px-2 py-2 text-nowrap">
                      <span className="fw-bold fs-5">৳</span>0
                    </td>
                  </tr> */}

                  {/* TOTAL */}
                  <tr>
                    <td className="fw-bold text-dark px-2 py-2">Total</td>

                    <td className="fw-bold text-end px-2 py-2 text-nowrap">
                      ${total_price}
                    </td>
                  </tr>

                  <tr>
                    <td colSpan="2" className="p-2 border-0">
                      <Link
                        to="/profile"
                        className="btn btn-danger w-100 fw-bold py-2 rounded-1"
                      >
                        Download
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>


      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .product-img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    flex-shrink: 0;
    background: #fff;
  }

  .price-cell {
    text-align: right;
    vertical-align: top !important;
    white-space: nowrap;
  }
`;

export default Checkout;
