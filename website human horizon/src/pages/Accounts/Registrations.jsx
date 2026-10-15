import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { Formik, Form as FormikForm } from "formik";
import * as yup from "yup";
import axios from "axios";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

import { useProductContext } from "../../context/ProductContext";

const initialValues = {
  email: "",
  name: "",
  district: "",
  upazila: "",
  address: "",
  phone: "",
  eemmaaiill: "",
  password: "",
  confirm_password: "",
};

const schema = yup.object().shape({
  email: yup.string().required("Username is a required field!"),
  name: yup.string().required("Customer Name is a required field!"),
  district: yup.string().required("Customer District is a required field!"),
  upazila: yup.string().required("Customer Upazila is a required field!"),
  address: yup.string().required("Customer Address is a required field!"),
  phone: yup.string().required("Phone is a required field!"),
  eemmaaiill: yup.string().required("Email is a required field!"),
  password: yup.string().required("Password is a required field!"),
  // confirm_password: yup
  //   .string()
  //   .required("Confirm Password is a required field!"),
  confirm_password: yup
    .string()
    .required("Confirm Password is a required field!")
    .oneOf([yup.ref("password")], "Passwords do not match!"),
});

const validate = (values) => {
  let errors = {};

  if (!values.phone) {
    errors.phone = "Phone is required!";
  } else if (/^[0-9\b]+$/.test(values.phone) === false) {
    errors.phone = "Only number!";
  } else if (values.phone.length !== 11) {
    errors.phone = "Mobile Number contains 11 digit!";
  }

  if (!values.eemmaaiill) {
    errors.eemmaaiill = "Email is required!";
  } else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.eemmaaiill) === false) {
    errors.eemmaaiill = "Invalid Email!";
  }

  if (!values.password) {
    errors.password = "Password is required!";
  } else if (values.password.length < 4) {
    errors.password = "Password is too short!";
  }

  if (!values.confirm_password) {
    errors.confirm_password = "Confirm password is required!";
  } else if (values.confirm_password.length < 4) {
    errors.confirm_password = "Confirm password is too short!";
  }

  return errors;
};

const Registrations = () => {
  const { district, upazila, fetchDistrict, fetchUpazila } =
    useProductContext();

  useEffect(() => {
    fetchDistrict();
    fetchUpazila();
  }, [fetchDistrict, fetchUpazila]);

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState();

  const AddRegFunc = async (values) => {
    let formfield = new FormData();

    // Append individual fields
    formfield.append("email", values.email);
    formfield.append("name", values.name);
    formfield.append("district", values.district);
    formfield.append("upazila", values.upazila);
    formfield.append("address", values.address);
    formfield.append("phone", values.phone);
    formfield.append("eemmaaiill", values.eemmaaiill);
    formfield.append("password", values.password);
    formfield.append("confirm_password", values.confirm_password);

    await axios({
      method: "POST",
      url: `${process.env.REACT_APP_BASE_URL}/custom_user/register/`,
      headers: {
        "Content-Type": "application/json; charset=UTF-8; text/plain",
      },
      data: formfield,
    })
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        console.error(
          "Registration failed:",
          error.response?.data || error.message,
        );

        setMessage(
          error.response?.data?.email ||
            error.response?.data?.detail ||
            "Registration failed. Please try again.",
        );
      });
  };

  const submitRegisterForm = async (
    values,
    { setErrors, setSubmitting, resetForm },
  ) => {
    try {
      AddRegFunc(values);
      setSubmitting(false);
      // resetForm();
    } catch (error) {
      setErrors({ error: error.message });
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

  return (
    <Wrapper>
      <div className="container py-5">
        <div className="registration-box mx-auto p-3">
          <h2 className="text-center text-dark mb-4">Registration</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={submitRegisterForm}
            validate={validate}
          >
            {({
              handleSubmit,
              handleChange,
              values,
              touched,
              errors,
              isSubmitting,
              setFieldValue,
            }) => (
              <FormikForm noValidate onSubmit={(e) => handleSubmit(e)}>
                <div className="row">
                  <div className="col-lg-12">
                    {/* User Name */}
                    <Form.Group className="form-group mb-3 ">
                      <Form.Label>
                        Username<span className="text-danger">*</span>
                      </Form.Label>
                      <InputGroup hasValidation>
                        <Form.Control
                          type="text"
                          name="email"
                          id="email"
                          value={values.email}
                          onChange={handleChange}
                          isInvalid={!!touched.email && !!errors.email}
                          isValid={touched.email && !errors.email}
                          className="form-control my-0"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </div>

                  <div className="col-lg-12">
                    {/* Customer Name */}
                    <Form.Group className="form-group mb-3 ">
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
                          className="form-control my-0"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.name}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </div>

                  <div className="col-lg-6">
                    {/* District */}
                    <Form.Group className="form-group mb-3 ">
                      <Form.Label>
                        District<span className="text-danger">*</span>
                      </Form.Label>
                      <InputGroup hasValidation>
                        <Form.Select
                          name="district"
                          id="district"
                          value={selectedDistrict ? selectedDistrict.name : ""}
                          onChange={(e) => {
                            handleChange(e);
                            handleDistrictChange(e);
                          }}
                          isInvalid={!!touched.district && !!errors.district}
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
                  <div className="col-lg-6">
                    {/* Upazila */}
                    <Form.Group className="form-group mb-3 ">
                      <Form.Label>
                        Upazila<span className="text-danger">*</span>
                      </Form.Label>
                      <InputGroup hasValidation>
                        <Form.Select
                          name="upazila"
                          id="upazila"
                          value={selectedUpazila ? selectedUpazila.name : ""}
                          onChange={(e) => {
                            handleChange(e);
                            handleUpazilaChange(e);
                          }}
                          isInvalid={!!touched.upazila && !!errors.upazila}
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
                                  <option key={upazila.id} value={upazila.name}>
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

                  <div className="col-lg-12">
                    {/* Customer Address */}
                    <Form.Group className="form-group mb-3 ">
                      <Form.Label>
                        Customer Address<span className="text-danger">*</span>
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
                  </div>

                  <div className="col-lg-6">
                    {/* Email */}
                    <Form.Group className="form-outline mb-3">
                      <Form.Label>
                        Email
                        <span className="text-danger">*</span>
                      </Form.Label>
                      <InputGroup hasValidation>
                        {/* <InputGroup.Text>@</InputGroup.Text> */}
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
                  </div>
                  <div className="col-lg-6">
                    {/* Phone */}
                    <Form.Group className="form-outline mb-3">
                      <Form.Label>
                        Phone
                        <span className="text-danger">*</span>
                      </Form.Label>
                      <InputGroup hasValidation>
                        {/* <InputGroup.Text>@</InputGroup.Text> */}
                        <Form.Control
                          type="text"
                          name="phone"
                          id="phone"
                          value={values.phone}
                          onChange={handleChange}
                          isInvalid={!!touched.phone && !!errors.phone}
                          isValid={touched.phone && !errors.phone}
                          className="form-control"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.phone}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </div>

                  <div className="col-lg-6">
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
                          isInvalid={!!touched.password && !!errors.password}
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
                  <div className="col-lg-6">
                    {/* Confirm Password */}
                    <Form.Group className="form-group mb-4">
                      <Form.Label>
                        Confirm Password<span className="text-danger">*</span>
                      </Form.Label>

                      <InputGroup
                        hasValidation
                        className="password-input-group"
                      >
                        <Form.Control
                          type={showPassword1 ? "text" : "password"}
                          name="confirm_password"
                          id="confirm_password"
                          value={values.confirm_password}
                          onChange={handleChange}
                          isInvalid={
                            !!touched.confirm_password &&
                            !!errors.confirm_password
                          }
                          isValid={
                            touched.confirm_password && !errors.confirm_password
                          }
                          className="form-control my-0"
                          autoComplete="on"
                        />

                        <span
                          className="password-eye-icon"
                          onClick={() => setShowPassword1((prev) => !prev)}
                        >
                          {showPassword1 ? <FaEyeSlash /> : <FaEye />}
                        </span>

                        <Form.Control.Feedback type="invalid">
                          {errors.confirm_password}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </div>
                </div>

                {/* message  */}
                {message && (
                  <h6 className="text-center my-4 m-2  text-capitalize">
                    {message}
                  </h6>
                )}

                <button
                  className="btn registration-btn w-100 mt-2"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Register"}
                </button>
              </FormikForm>
            )}
          </Formik>

          <div className="text-center mt-3">
            <p className="mb-0">
              Already have an account?&nbsp;
              <Link to="/login" className="text-dark text-decoration-underline">
                Please Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 100px !important;

  .registration-box {
    max-width: 450px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  .registration-box h2 {
    font-size: 30px;
    font-family: serif;
  }
  .registration-input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline-color: #e6e6e6;
  }
  .registration-btn {
    padding: 10px;
    background-color: #e6e6e6;
    color: #000;
    border: 0;
    border-radius: 5px;
    font-size: 18px;
    font-weight: 700;
    font-family: serif;
  }
  .registration-btn:hover {
    background-color: #d9d9d9;
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

  @media (max-width: 425px) {
    .container {
      padding-left: 10px !important;
      padding-right: 10px !important;
    }
    .registration-box h2 {
      font-size: 26px;
    }
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
export default Registrations;
