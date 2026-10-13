import React from "react";
import { Link } from "react-router";
import styled from "styled-components";

const Checkout = () => {
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

        <div class="row g-5 mt-1">
          {/* <!-- Billing Details Section --> */}
          <div class="col-lg-7">
            <h2 class="section-title">Billing Details</h2>
            <form>
              {/* <!-- Customer Name --> */}
              <div class="mb-3">
                <label for="customerName" class="form-label">
                  Customer Name*
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="customerName"
                  required
                />
              </div>

              {/* <!-- Phone --> */}
              <div class="mb-3">
                <label for="phone" class="form-label">
                  Phone*
                </label>
                <input type="text" class="form-control" id="phone" required />
              </div>

              {/* <!-- District and Upazila --> */}
              <div class="row mb-3">
                <div class="col-md-6 mb-3 mb-md-0">
                  <label for="district" class="form-label">
                    District*
                  </label>
                  <select class="form-select" id="district" required>
                    <option value="" selected>
                      Select
                    </option>
                    <option value="dhaka">Dhaka</option>
                    <option value="chittagong">Chittagong</option>
                    <option value="sylhet">Sylhet</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label for="upazila" class="form-label">
                    Upazila*
                  </label>
                  <select class="form-select" id="upazila" required>
                    <option value="" selected>
                      Select
                    </option>
                    <option value="dhanmondi">Dhanmondi</option>
                    <option value="gulshan">Gulshan</option>
                    <option value="uttara">Uttara</option>
                  </select>
                </div>
              </div>

              {/* <!-- Customer Address --> */}
              <div class="mb-3">
                <label for="address" class="form-label">
                  Customer Address*
                </label>
                <textarea
                  class="form-control"
                  id="address"
                  rows="2"
                  required
                ></textarea>
              </div>

              {/* <!-- Password --> */}
              <div class="mb-3">
                <label for="password" class="form-label">
                  Password
                </label>
                <input type="password" class="form-control" id="password" />
              </div>

              {/* <!-- Delivery Type --> */}
              <div class="mb-3">
                <label for="deliveryType" class="form-label">
                  Delivery Type
                </label>
                <select class="form-select" id="deliveryType">
                  <option value="" selected>
                    Select
                  </option>
                  <option value="home">Home Delivery</option>
                  <option value="express">Express Delivery</option>
                </select>
              </div>
            </form>
          </div>

          {/* <!-- Your Order Section --> */}
          <div class="col-lg-5">
            <h2 class="section-title">Your Order</h2>
            <div class="order-summary-card">
              <table class="table-order">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th class="text-end">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {/* <!-- Product 1 --> */}
                  <tr>
                    <td>
                      <div class="d-flex align-items-center gap-3">
                        <img
                          src="https://i.pravatar.cc/150?img=3"
                          alt="JOYROOM Smart Watch"
                          class="product-img"
                        />
                        <div>
                          <div class="product-title">
                            JOYROOM JR-FC2 Pro Classic Series Smart Watch –
                            Moonlight Silver <strong>x 1</strong>
                          </div>
                          <div>
                            <span class="price-strike">4500 Tk</span>
                            <span class="price-current">3850 Tk</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="amount-col">Tk 4500</td>
                  </tr>

                  {/* <!-- Product 2 --> */}
                  <tr>
                    <td>
                      <div class="d-flex align-items-center gap-3">
                        <img
                          src="https://i.pravatar.cc/150?img=8"
                          alt="Philips Speaker"
                          class="product-img"
                        />
                        <div>
                          <div class="product-title">
                            Philips TAS1009 Mini Bluetooth Speaker- Compact
                            &amp; Powerful Sound <strong>x 1</strong>
                          </div>
                          <div>
                            <span class="price-strike">1190 Tk</span>
                            <span class="price-current">990 Tk</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="amount-col">Tk 1190</td>
                  </tr>

                  {/* <!-- Sub Total --> */}
                  <tr>
                    <td class="summary-label">Sub Total</td>
                    <td class="amount-col fw-bold">Tk 5690</td>
                  </tr>

                  {/* <!-- Discount --> */}
                  <tr>
                    <td class="summary-label">Discount</td>
                    <td class="amount-col fw-bold">Tk 850</td>
                  </tr>

                  {/* <!-- Shipping --> */}
                  <tr>
                    <td class="summary-label">Shipping</td>
                    <td class="amount-col fw-bold">Tk 0</td>
                  </tr>

                  {/* <!-- Payable Amount --> */}
                  <tr>
                    <td class="summary-label">Payable Amount</td>
                    <td class="amount-col fw-bold">Tk 4840</td>
                  </tr>

                  {/* <!-- Paid Amount --> */}
                  <tr>
                    <td class="summary-label">Paid Amount</td>
                    <td class="amount-col fw-bold">Tk 0</td>
                  </tr>

                  {/* <!-- Due Amount --> */}
                  <tr>
                    <td class="summary-label">Due Amount</td>
                    <td class="amount-col fw-bold">Tk 4840</td>
                  </tr>

                  {/* <!-- Total --> */}
                  <tr>
                    <td class="summary-label">Total</td>
                    <td class="amount-col fw-bold">Tk 4840</td>
                  </tr>

                  {/* <!-- Place Order Button Row --> */}
                  <tr>
                    <td colspan="2" class="p-3">
                      <button type="submit" class="btn btn-place-order">
                        Place Order
                      </button>
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
  h2.section-title {
    font-size: 1.15rem;
    font-weight: 700;
    color: #111111;
    margin-bottom: 24px;
  }

  /* Form Styles */
  .form-label {
    font-size: 0.88rem;
    font-weight: 600;
    color: #222222;
    margin-bottom: 6px;
  }

  .form-control,
  .form-select {
    /* background-color: #ffffff; */
    border: 1px solid #b0b0b0;
    border-radius: 4px;
    padding: 10px 14px;
    font-size: 0.9rem;
    box-shadow: none !important;
  }

  .form-control:focus,
  .form-select:focus {
    border-color: #b0b0b0;
    background-color: #ffffff;
  }

  textarea.form-control {
    resize: vertical;
    min-height: 80px;
  }

  /* Order Summary Table Styles */
  .order-summary-card {
    border: 1px solid #d0d4dc;
    border-radius: 2px;
    background-color: transparent;
    padding: 0;
  }

  .table-order {
    width: 100%;
    margin-bottom: 0;
    border-collapse: collapse;
  }

  .table-order th {
    font-size: 0.88rem;
    font-weight: 700;
    color: #111111;
    border-bottom: 1px solid #c8ccd4;
    padding: 12px 16px;
    background: transparent;
  }

  .table-order td {
    padding: 14px 16px;
    border-bottom: 1px solid #c8ccd4;
    font-size: 0.88rem;
    vertical-align: middle;
    background: transparent;
  }

  .table-order tr:last-child td {
    border-bottom: none;
  }

  .product-img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 4px;
    border: 1px solid #e0e0e0;
    background-color: #fff;
  }

  .product-title {
    font-size: 0.88rem;
    color: #222222;
    margin-bottom: 4px;
    line-height: 1.3;
  }

  .price-strike {
    text-decoration: line-through;
    color: #777777;
    margin-right: 6px;
  }

  .price-current {
    font-weight: 700;
    color: #000000;
  }

  .summary-label {
    font-weight: 700;
    color: #111111;
  }

  .amount-col {
    text-align: right;
    white-space: nowrap;
    font-weight: 600;
  }

  /* Place Order Button */
  .btn-place-order {
    background-color: #ef4444;
    color: #ffffff;
    font-weight: 700;
    font-size: 0.95rem;
    border: none;
    border-radius: 3px;
    padding: 12px;
    width: 100%;
    transition: background-color 0.2s ease;
  }

  .btn-place-order:hover {
    background-color: #dc2626;
    color: #ffffff;
  }
`;
