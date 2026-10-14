import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { Formik, Form as FormikForm } from "formik";
import * as yup from "yup";
import axios from "axios";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const initialValues = {
  email: "",
  password: "",
};

const schema = yup.object().shape({
  email: yup.string().required("Username is a required field!"),
  password: yup.string().required("Password is a required field!"),
});

const validate = (values) => {
  let errors = {};

  // if (!values.email) {
  //   errors.email = "Email or Username is required!";
  // } else if (/^[0-9\b]+$/.test(values.email) === false) {
  //   errors.email = "Only number!";
  // } else if (values.email.length !== 11) {
  //   errors.email = "Mobile Number contains 11 digit!";
  // }
  if (!values.email) {
    errors.email = "Email or Username is required!";
  } else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) === false) {
    errors.email = "Invalid Email!";
  }

  if (!values.password) {
    errors.password = "Password is required!";
  } else if (values.password.length < 4) {
    errors.password = "Password is too short!";
  }
  return errors;
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState();

  const AddLoginFunc = async (values) => {
    let formfield = new FormData();

    // Append individual fields
    formfield.append("email", values.email);
    formfield.append("password", values.password);

    await axios({
      method: "POST",
      url: `${process.env.REACT_APP_BASE_URL}/custom_user/login/`,
      headers: {
        "Content-Type": "application/json; charset=UTF-8; text/plain",
      },
      data: formfield,
    })
      .then((response) => {
        localStorage.setItem("humanhorizonAccessToken", response.data.access);
        localStorage.setItem("humanhorizonRefreshToken", response.data.refresh);
        navigate("/");
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.response.data.non_field_errors);
      });
  };

  const submitLoginForm = async (
    values,
    { setErrors, setSubmitting, resetForm },
  ) => {
    try {
      AddLoginFunc(values);
      setSubmitting(false);
      // resetForm();
    } catch (error) {
      setErrors({ error: error.message });
    }
  };

  return (
    <Wrapper>
      <div className="container py-5">
        <div className="login-box mx-auto p-3">
          <h2 className="text-center text-dark mb-4">Login To Your Account</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={submitLoginForm}
            validate={validate}
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
                <div className="row">
                  <div className="col-12">
                    {/*  User Name */}
                    <Form.Group className="form-group mb-3">
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

                  <div className="col-12">
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
                </div>

                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="btn login-btn w-100 mt-2"
                >
                  {isSubmitting ? "Signing..." : "Login"}
                </button>

                <p
                  style={{
                    textAlign: "center",
                    color: "red",
                    fontSize: "15px",
                    textTransform: "capitalize",
                  }}
                >
                  {message}
                </p>
              </FormikForm>
            )}
          </Formik>
          {/* 
          <button type="button" className="btn login-btn w-100 mt-2">
            Login
          </button> */}

          <div className="d-flex justify-content-between align-items-center mt-3">
            <div className="footer-text">
              New here? Please&nbsp;
              <Link
                to="/registration"
                className="text-dark text-decoration-underline"
              >
                Sign Up
              </Link>
            </div>

            <div className="footer-text">
              <Link
                to="/forgot-password"
                className="text-decoration-underline text-dark"
              >
                Forgotten Password?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 180px !important;
  margin-bottom: 140px !important;

  .login-box {
    max-width: 400px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .login-box h2 {
    font-size: 30px;
    font-family: serif;
  }

  .login-input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline-color: #e6e6e6;
  }

  .login-btn {
    padding: 10px;
    background-color: #e6e6e6;
    color: #000;
    border: 0;
    border-radius: 5px;
    font-size: 18px;
    font-weight: 700;
    font-family: serif;
  }

  .login-btn:hover {
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

    .login-box h2 {
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

export default Login;
