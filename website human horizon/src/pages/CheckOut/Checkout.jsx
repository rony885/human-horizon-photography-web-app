import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { useCartContext } from "../../context/CartContext";
import { useProductContext } from "../../context/ProductContext";

import axios from "axios";
import * as yup from "yup";
import Form from "react-bootstrap/Form";
import { Formik, Form as FormikForm } from "formik";
import InputGroup from "react-bootstrap/InputGroup";

const initialValues = {
  // courier: "",
  // customer: "",
  // delivery_type: "",

  // order_date: "",
  // delivery_status: "",
  // payment_method: "",
  // note: "",

  total_item: "",
  total_amount: "",
  // discount: "",
  // payable_amount: "",
  // paid_amount: "",
  // due_amount: "",
  // delivery_charge: "",
  grand_total_amount: "",

  name: "",
  eemmaaiill: "",
  password: "",
  district: "",
  upazila: "",
  address: "",
};

const schema = yup.object().shape({
  // courier: yup.string().required("Courier is a required field!"),
  // customer: yup.string(),
  // delivery_type: yup.string().required("Delivery Type is a required field!"),

  // order_date: yup.string().required("Order Date is a required field!"),
  // payment_method: yup.string().required("Payment Method is a required field!"),
  // delivery_status: yup.string(),
  // note: yup.string(),

  total_item: yup.string(),
  total_amount: yup.string(),
  discount: yup.string(),
  // payable_amount: yup.string(),
  // paid_amount: yup.string(),
  // due_amount: yup.string(),
  // delivery_charge: yup.string(),
  grand_total_amount: yup.string(),
});

const validate = (values) => {
  let errors = {};

  return errors;
};

const customerSchema = yup.object().shape({
  // courier: yup.string().required("Courier is a required field!"),
  // customer: yup.string(),
  // customer_type: yup.string().required("Customer Type is a required field!"),
  // delivery_type: yup.string().required("Delivery Type is a required field!"),

  // order_date: yup.string().required("Order Date is a required field!"),
  // payment_method: yup.string().required("Payment Method is a required field!"),
  // delivery_status: yup.string(),
  // note: yup.string(),

  total_item: yup.string(),
  total_amount: yup.string(),
  discount: yup.string(),
  // payable_amount: yup.string(),
  // paid_amount: yup.string(),
  // due_amount: yup.string(),
  // delivery_charge: yup.string(),
  grand_total_amount: yup.string(),

  name: yup.string().required("Customer Name is a required field!"),
  eemmaaiill: yup.string().required("Customer Email is a required field!"),
  // password: yup.string().required("Password is a required field!"),
  district: yup.string().required("Customer District is a required field!"),
  upazila: yup.string().required("Customer Upazila is a required field!"),
  address: yup.string().required("Customer Address is a required field!"),
});

const customerValidate = (values) => {
  let errors = {};

  if (!values.eemmaaiill) {
    errors.eemmaaiill = "Email or Username is required!";
  } else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.eemmaaiill) === false) {
    errors.eemmaaiill = "Invalid Email!";
  }

  if (values.password && values.password.length < 4) {
    errors.password = "Password is too short!";
  }
  return errors;
};

const Checkout = ({ aT, c_user }) => {
  // const { cart, total_item, total_price } = useCartContext();

  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    cart,
    total_item,
    total_price,
    total_discount,
    // total_special_price,
    // paid_amount,
  } = useCartContext();

  const {
    district,
    upazila,
    // unpaginate_deliveryType,
    fetchDistrict,
    fetchUpazila,
    // fetchUnpaginateDeliveryType,
  } = useProductContext();

  useEffect(() => {
    // fetchUnpaginateDeliveryType();
    fetchDistrict();
    fetchUpazila();
  }, [fetchDistrict, fetchUpazila]);

  // const isActiveDeliveryType =
  //   unpaginate_deliveryType &&
  //   unpaginate_deliveryType.filter((item) => item.status === true);

  // const [deliveryPrice, setDeliveryPrice] = useState(0);
  // const handleDelTypeChange = (e) => {
  //   const selectedDeliveryTypeId = parseInt(e.target.value); // Assuming delivery type IDs are integers

  //   // Find the selected delivery type from the unpaginate_delivery_type array
  //   const selectedDeliveryType = unpaginate_deliveryType.find(
  //     (item) => item.id === selectedDeliveryTypeId,
  //   );

  //   // Update the state with the selected delivery type's price
  //   if (selectedDeliveryType) {
  //     setDeliveryPrice(selectedDeliveryType.amount); // Update state with selected delivery type price
  //   } else {
  //     setDeliveryPrice(null); // Clear delivery price if no delivery type is selected
  //   }
  // };

  const AddCustomerFunc = async (values) => {
    let formfield = new FormData();

    // Append individual fields
    formfield.append("name", values.name);
    formfield.append("eemmaaiill", values.eemmaaiill);
    formfield.append("password", values.password ? values.password : "123456");
    formfield.append("district", values.district ? values.district : "ABCXYZ");
    formfield.append("upazila", values.upazila ? values.upazila : "ABCXYZ");
    formfield.append("address", values.address);

    await axios({
      method: "POST",
      url: `${process.env.REACT_APP_BASE_URL}/custom_user/register/`,
      headers: {
        "Content-Type": "application/json; charset=UTF-8; text/plain",
      },
      data: formfield,
    })
      .then((response) => {
        const AddOrderFunc = async () => {
          let formfield = new FormData();

          values.total_item = total_item;
          values.total_amount = total_price;
          values.discount = total_discount;
          // values.delivery_charge = deliveryPrice;
          // values.payable_amount = total_special_price + Number(deliveryPrice);

          // values.paid_amount = paid_amount;
          // values.due_amount =
          //   total_special_price + Number(deliveryPrice) - paid_amount;

          // values.grand_total_amount =
          //   total_special_price + Number(deliveryPrice);
          values.grand_total_amount = total_price;

          // Append individual fields
          formfield.append("customer", Number(response.data.id));
          // formfield.append("delivery_type", Number(values.delivery_type));

          formfield.append(
            "payment_method",
            values.payment_method ? values.payment_method : "Cash On Delivery",
          );

          // Append Order_details as separate items in FormData
          cart.forEach((detail, index) => {
            formfield.append(
              `order_details[${index}][product]`,
              parseInt(detail.id.match(/\d+/)[0]),
            );
            formfield.append(`order_details[${index}][bdtRate]`, detail.price);
            formfield.append(
              `order_details[${index}][quantity]`,
              detail.amount,
            );
            formfield.append(
              `order_details[${index}][linePrice]`,
              detail.price * detail.amount,
            );
            // formfield.append(`order_details[${index}][size]`, detail.size);
            // formfield.append(`order_details[${index}][color]`, detail.color);
          });

          // Append individual fields
          formfield.append("total_item", Number(values.total_item));
          formfield.append("total_amount", Number(values.total_amount));
          formfield.append("discount", Number(values.discount));
          // formfield.append("payable_amount", Number(values.payable_amount));
          // formfield.append("paid_amount", Number(values.paid_amount));
          // formfield.append("due_amount", Number(values.due_amount));
          // formfield.append("delivery_charge", Number(values.delivery_charge));
          formfield.append(
            "grand_total_amount",
            Number(values.grand_total_amount),
          );

          await axios({
            method: "POST",
            url: `${process.env.REACT_APP_BASE_URL}/order/`,
            headers: {
              "Content-Type": "application/json; charset=UTF-8; text/plain",
            },
            data: formfield,
          })
            .then((response) => {
              setMsg(response.success, "Order is successfuly created...");
              // setOrderSubmitted(true);
              // clearCart();
            })
            .catch((error) => {
              console.log(error);
            });
        };

        AddOrderFunc();
      })
      .catch((error) => {
        console.log(error);
        setMsg(error.response.data.eemmaaiill);
      });
  };

  // const submitOrderForm = async (
  //   values,
  //   { setErrors, setSubmitting, resetForm },
  // ) => {
  //   try {
  //     AddCustomerFunc(values);
  //     setSubmitting(false);
  //     // handleShowModal();
  //     // resetForm();
  //   } catch (error) {
  //     setErrors({ error: error.message });
  //   }
  // };

  const submitOrderForm = async (values, { setErrors, setSubmitting }) => {
    try {
      await AddCustomerFunc(values);
    } catch (error) {
      console.error("Checkout error:", error);

      setErrors({
        eemmaaiill:
          error.response?.data?.eemmaaiill?.[0] ||
          error.response?.data?.eemmaaiill ||
          "",
      });

      setMsg(
        error.response?.data?.detail ||
          "Unable to process your order. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const AddLoginOrderFunc = async (values) => {
    let formfield = new FormData();

    values.total_item = total_item;
    values.total_amount = total_price;
    values.discount = total_discount;
    // values.delivery_charge = deliveryPrice;
    // values.payable_amount = total_special_price + Number(deliveryPrice);

    // values.paid_amount = paid_amount;
    // values.due_amount =
    //   total_special_price + Number(deliveryPrice) - paid_amount;

    // values.grand_total_amount = total_special_price + Number(deliveryPrice);
    values.grand_total_amount = total_price;

    // Append individual fields
    formfield.append("customer", c_user && c_user);
    // formfield.append("delivery_type", Number(values.delivery_type));

    formfield.append(
      "payment_method",
      // values.payment_method ? values.payment_method : "Cash On Delivery",
      values.payment_method,
    );

    // Append Order_details as separate items in FormData
    // cart.forEach((detail, index) => {
    //   formfield.append(
    //     `order_details[${index}][product]`,
    //     parseInt(detail.id.match(/\d+/)[0]),
    //   );
    //   formfield.append(`order_details[${index}][bdtRate]`, detail.price);
    //   formfield.append(`order_details[${index}][quantity]`, detail.amount);
    //   formfield.append(
    //     `order_details[${index}][linePrice]`,
    //     detail.price * detail.amount,
    //   );
    // });

    cart.forEach((detail, index) => {
      formfield.append(
        `order_details[${index}][product]`,
        Number(detail.productId ?? detail.id),
      );

      formfield.append(
        `order_details[${index}][license]`,
        Number(detail.licenseId),
      );

      formfield.append(
        `order_details[${index}][quantity]`,
        Number(detail.amount || 1),
      );
    });

    // Append individual fields
    formfield.append("total_item", Number(values.total_item));
    formfield.append("total_amount", Number(values.total_amount));
    formfield.append("discount", Number(values.discount));
    // formfield.append("payable_amount", Number(values.payable_amount));
    // formfield.append("paid_amount", Number(values.paid_amount));
    // formfield.append("due_amount", Number(values.due_amount));
    // formfield.append("delivery_charge", Number(values.delivery_charge));
    formfield.append("grand_total_amount", Number(values.grand_total_amount));

    await axios({
      method: "POST",
      url: `${process.env.REACT_APP_BASE_URL}/order/`,
      headers: {
        "Content-Type": "application/json; charset=UTF-8; text/plain",
      },
      data: formfield,
    })
      .then((response) => {
        setMsg(response.success, "Order is successfuly created...");
        // setOrderSubmitted(true);
        // clearCart();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const submitLoginOrderForm = async (
  //   values,
  //   { setErrors, setSubmitting, resetForm },
  // ) => {
  //   try {
  //     AddLoginOrderFunc(values);
  //     setSubmitting(false);
  //     // handleShowModal();
  //     // resetForm();
  //   } catch (error) {
  //     setErrors({ error: error.message });
  //   }
  // };

const submitLoginOrderForm = async (
  values,
  { setSubmitting },
) => {
  try {
    await AddLoginOrderFunc(values);
  } catch (error) {
    console.error("Checkout error:", error);

    setMsg(
      error.response?.data?.detail ||
        "Unable to process your order. Please try again.",
    );
  } finally {
    setSubmitting(false);
  }
};

  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");

  const handleDistrictChange = (e) => {
    const selectedDistrictName = e.target.value;
    setSelectedDistrict(
      district.find((district) => district.name === selectedDistrictName),
    );
    setSelectedUpazila("");
  };

  const handleUpazilaChange = (e) => {
    const selectedUpazilaName = e.target.value;
    setSelectedUpazila(
      upazila.find((upazila) => upazila.name === selectedUpazilaName),
    );
  };

  // const [showModal, setShowModal] = useState(false);
  // const [orderSubmitted, setOrderSubmitted] = useState(false);

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

        <Formik
          initialValues={initialValues}
          validationSchema={aT ? schema : customerSchema}
          validate={aT ? validate : customerValidate}
          onSubmit={aT ? submitLoginOrderForm : submitOrderForm}
        >
          {({
            handleSubmit,
            handleChange,
            isSubmitting,
            values,
            errors,
            touched,
          }) => (
            <FormikForm noValidate onSubmit={(e) => handleSubmit(e)}>
              <div className="row g-5 mt-1">
                {/* ===== Billing Details ===== */}
                <div className="col-lg-7">
                  <h2 className="fs-5 fw-bold text-dark">Billing Details</h2>

                  {aT ? (
                    ""
                  ) : (
                    <>
                      <div className="new_customer_field">
                        {/* Customer Name */}
                        <Form.Group className="form-group mb-3">
                          <Form.Label>
                            Customer Name<span className="text-danger">*</span>
                          </Form.Label>
                          <InputGroup hasValidation>
                            <Form.Control
                              type="text"
                              name="name"
                              id="name"
                              value={values.name}
                              onChange={handleChange}
                              isInvalid={!!touched.name && !!errors.name}
                              isValid={touched.name && !errors.name}
                              className="form-control"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.name}
                            </Form.Control.Feedback>
                          </InputGroup>
                        </Form.Group>

                        {/* Email */}
                        <Form.Group className="form-group mb-3">
                          <Form.Label>
                            Email<span className="text-danger">*</span>
                          </Form.Label>
                          <InputGroup hasValidation>
                            <Form.Control
                              type="text"
                              name="eemmaaiill"
                              id="eemmaaiill"
                              value={values.eemmaaiill}
                              onChange={handleChange}
                              isInvalid={
                                !!touched.eemmaaiill && !!errors.eemmaaiill
                              }
                              isValid={touched.eemmaaiill && !errors.eemmaaiill}
                              className="form-control"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.eemmaaiill}
                            </Form.Control.Feedback>
                          </InputGroup>
                        </Form.Group>

                        {/* District & Upazila */}
                        <div className="row mb-0">
                          <div className="col-md-6">
                            <Form.Group className="form-group">
                              <Form.Label>
                                District<span className="text-danger">*</span>
                              </Form.Label>
                              <InputGroup hasValidation>
                                <Form.Select
                                  name="district"
                                  id="district"
                                  value={
                                    selectedDistrict
                                      ? selectedDistrict.name
                                      : ""
                                  }
                                  onChange={(e) => {
                                    handleChange(e);
                                    handleDistrictChange(e);
                                  }}
                                  isInvalid={
                                    !!touched.district && !!errors.district
                                  }
                                  isValid={touched.district && !errors.district}
                                  className="form-control my-0"
                                >
                                  <option value="">Select</option>
                                  {district &&
                                    district.map((d, i) => {
                                      return (
                                        <option value={d.name} key={i}>
                                          {d.name}-{d.bn_name}
                                        </option>
                                      );
                                    })}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                  {errors.district}
                                </Form.Control.Feedback>
                              </InputGroup>
                            </Form.Group>
                          </div>

                          <div className="col-md-6">
                            <Form.Group className="form-group">
                              <Form.Label>
                                Upazila<span className="text-danger">*</span>
                              </Form.Label>
                              <InputGroup hasValidation>
                                <Form.Select
                                  name="upazila"
                                  id="upazila"
                                  value={
                                    selectedUpazila ? selectedUpazila.name : ""
                                  }
                                  onChange={(e) => {
                                    handleChange(e);
                                    handleUpazilaChange(e);
                                  }}
                                  isInvalid={
                                    !!touched.upazila && !!errors.upazila
                                  }
                                  isValid={touched.upazila && !errors.upazila}
                                  className="form-control my-0"
                                >
                                  <option value="">Select</option>
                                  {upazila &&
                                    upazila
                                      .filter(
                                        (upazila) =>
                                          upazila.district ===
                                          (selectedDistrict
                                            ? selectedDistrict.id
                                            : null),
                                      )
                                      .map((upazila) => {
                                        return (
                                          <option
                                            key={upazila.id}
                                            value={upazila.name}
                                          >
                                            {upazila.name}-{upazila.bn_name}
                                          </option>
                                        );
                                      })}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                  {errors.upazila}
                                </Form.Control.Feedback>
                              </InputGroup>
                            </Form.Group>
                          </div>
                        </div>

                        {/* Customer Address */}
                        <Form.Group className="form-group mb-3 ">
                          <Form.Label>
                            Customer Address
                            <span className="text-danger">*</span>
                          </Form.Label>
                          <InputGroup hasValidation>
                            <Form.Control
                              as="textarea"
                              name="address"
                              id="address"
                              value={values.address}
                              onChange={handleChange}
                              isInvalid={!!touched.address && !!errors.address}
                              isValid={touched.address && !errors.address}
                              className="form-control my-0"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.address}
                            </Form.Control.Feedback>
                          </InputGroup>
                        </Form.Group>

                        {/* Password */}
                        <Form.Group className="form-group mb-4">
                          <Form.Label>
                            Password<span className="text-danger">*</span>
                          </Form.Label>

                          <InputGroup
                            hasValidation
                            className="password-input-group"
                          >
                            <Form.Control
                              type={showPassword ? "text" : "password"}
                              name="password"
                              id="password"
                              value={values.password}
                              onChange={handleChange}
                              isInvalid={
                                !!touched.password && !!errors.password
                              }
                              isValid={touched.password && !errors.password}
                              className="form-control my-0"
                              autoComplete="on"
                            />

                            <span
                              className="password-eye-icon"
                              onClick={() => setShowPassword((prev) => !prev)}
                            >
                              {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>

                            <Form.Control.Feedback type="invalid">
                              {errors.password}
                            </Form.Control.Feedback>
                          </InputGroup>
                        </Form.Group>
                      </div>
                    </>
                  )}

                  <div className="">
                    {/* Payment Method */}
                    <div className="mb-3">
                      <label
                        htmlFor="deliveryType"
                        className="form-label fw-semibold small"
                      >
                        Payment Method
                      </label>

                      <select
                        className="form-select border-secondary rounded-1 px-3 py-2 shadow-none"
                        id="deliveryType"
                      >
                        <option value="">Select</option>
                        <option value="bkash">Shurjo Pay</option>
                        <option value="bkash">Bkash</option>
                        <option value="negad">Negad</option>
                        <option value="rocket">Rocket</option>
                        <option value="card">Card</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* ===== Your Order ===== */}
                <div className="col-lg-5">
                  <h2 className="fs-5 fw-bold text-dark mb-4">
                    Order summary ({total_item}{" "}
                    {total_item === 1 ? "item" : "items"})
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
                              Number(item.price || 0) *
                              Number(item.amount || 1);

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
                                    {/* <span className="fw-bold fs-5">৳$</span> */}
                                    ${itemTotal}
                                  </span>
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td
                              colSpan="2"
                              className="text-center text-danger py-4"
                            >
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
                            <span className="fw-bold fs-5">$৳</span>0
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
                            {/* <button
                              type="button"
                              onClick={() => {
                                navigate(aT ? "/profile" : "/");
                              }}
                              className="btn btn-danger w-100 fw-bold py-2 rounded-1"
                            >
                              Download
                            </button> */}
                            <button
                              type="submit"
                              disabled={isSubmitting || cart.length === 0}
                              className="btn btn-danger w-100 fw-bold py-2 rounded-1"
                            >
                              {isSubmitting ? "Processing..." : "Download"}
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <p
                style={{
                  marginTop: "10px",
                  textAlign: "center",
                  color: "red",
                  fontSize: "15px",
                  textTransform: "capitalize",
                }}
              >
                {msg}
              </p>
              {/* {orderSubmitted && renderOrderSummaryModal()} */}
            </FormikForm>
          )}
        </Formik>
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

  /* Remove Blue Focus Outline From All Fields */
  .form-control:focus,
  .form-select:focus {
    outline: none !important;
    box-shadow: none !important;
    border-color: #ced4da !important;
  }

  /* Keep Red Error Border */
  .form-control.is-invalid:focus,
  .form-select.is-invalid:focus {
    border-color: #dc3545 !important;
    box-shadow: none !important;
  }

  /* Keep Green Valid Border */
  .form-control.is-valid:focus,
  .form-select.is-valid:focus {
    border-color: #198754 !important;
    box-shadow: none !important;
  }

  /* ===== Password icon ===== */
  .password-input-group {
    position: relative;
  }
  .password-input-group .form-control {
    padding-right: 42px;
  }
  .password-eye-icon {
    position: absolute;
    right: 13px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    cursor: pointer;
    color: #777;
    font-size: 16px;
    display: flex;
    align-items: center;
  }
  .password-eye-icon:hover {
    color: #ff0000;
  }
  .password-input-group .invalid-feedback {
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 2px;
  }
`;

export default Checkout;
