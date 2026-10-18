
import React from "react";
import { Link } from "react-router";
import styled from "styled-components";
import { useCartContext } from "../../context/CartContext";

const Cart = () => {
  const {
    cart,
    removeCart,
    total_item,
    total_price,
    clearCart,
    changeLicense,
  } = useCartContext();

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
          <span>Cart</span>
        </div>

        <div className="row g-5">
          <div className="col-lg-7 col-md-12">
            <div className="cart-header d-flex justify-content-between align-items-center mb-4 p-3 rounded-2">
              <h1 className="h2 fw-bold m-0">
                Your Cart ({total_item} {total_item === 1 ? "item" : "items"})
              </h1>

              {cart.length > 0 && (
                <button
                  type="button"
                  className="btn btn-action"
                  onClick={clearCart}
                >
                  Remove All
                </button>
              )}
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-5">
                <h4 className="fw-bold mb-3">Your cart is empty</h4>

                <Link to="/" className="btn btn-checkout px-4">
                  Continue Shopping
                </Link>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  className="cart-item pb-4 mb-4 border-bottom"
                  key={item.id}
                >
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="d-flex align-items-start gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="cart-item-img rounded-3"
                      />

                      <div className="pt-1">
                        <p className="fw-semibold text-dark small mb-1">
                          {item.name}
                        </p>

                        <p className="text-secondary small mb-0">
                          {item.assetId || "N/A"}
                        </p>

                        <p className="text-secondary small mb-0">
                          {item.formats?.[0]?.type || "JPG"}
                        </p>
                      </div>
                    </div>

                    {/* Current Selected License Price */}
                    <div className="fw-bold">
                      {/* <span className="fw-bold fs-5">৳</span> */}$
                      {Number(item.price || 0).toLocaleString("en-US")}
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-end mt-3">
                    <div>
                      <div className="small text-dark mb-2">License</div>

                      <div className="select-wrapper">
                        <select
                          className="form-select custom-select"
                          value={item.license || "standard"}
                          onChange={(e) =>
                            changeLicense(item.id, e.target.value)
                          }
                        >
                          <option value="standard">Standard</option>
                          <option value="enhanced">Enhanced</option>
                          <option value="free">Free</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="btn btn-action"
                      onClick={() => removeCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="col-lg-5 col-md-12">
            <div className="summary-card bg-light rounded-3 p-4">
              <h2 className="fs-5 fw-bold mb-4">Order summary</h2>

              <div className="d-flex justify-content-between align-items-center mb-3 small">
                <span>
                  {total_item === 1 ? "Image" : "Images"} ({total_item})
                </span>

                <span>
                  {/* <span className="fw-bold fs-5">৳</span> */}$
                  {Number(total_price || 0).toLocaleString("en-US")}
                </span>
              </div>

              <div className="d-flex justify-content-between align-items-center fw-bold mb-4">
                <span>Estimated amount due today</span>

                <span>
                  {/* <span className="fw-bold fs-5">৳</span> */}$
                  {Number(total_price || 0).toLocaleString("en-US")}
                </span>
              </div>

              <Link
                to={cart.length > 0 ? "/checkout" : "#"}
                className={`btn btn-checkout w-100 ${
                  cart.length === 0 ? "disabled" : ""
                }`}
              >
                Start checkout
              </Link>

              <Link
                to="/"
                className="d-block text-center mt-3 text-dark text-decoration-underline small fw-medium"
              >
                Continue shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .cart-header {
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

  .cart-item-img {
    width: 100px;
    height: 100px;
    object-fit: cover;
  }

  .select-wrapper {
    position: relative;
    width: 200px;
  }

  .custom-select {
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

  .btn-checkout {
    background: #111;
    color: #fff;
    font-size: 0.95rem;
    font-weight: 600;
    padding: 12px 20px;
    border: 0;
    border-radius: 8px;
  }

  .btn-checkout:hover {
    background: #2c2c2c;
    color: #fff;
  }

  .btn-checkout.disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  @media (max-width: 575px) {
    .cart-item-img {
      width: 80px;
      height: 80px;
    }

    .select-wrapper {
      width: 180px;
    }

    .btn-action {
      padding: 7px 12px;
    }

    .cart-item {
      overflow: hidden;
    }
  }
`;

export default Cart;
