import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import * as yup from "yup";
import axios from "axios";
import { Formik, Form as FormikForm } from "formik";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const initialValues = {
  old_password: "",
  new_password: "",
  confirm_new_password: "",
};

const schema = yup.object().shape({
  old_password: yup.string().required("Old password is a required field!"),
  new_password: yup.string().required("New Password is a required field!"),
  confirm_new_password: yup
    .string()
    .required("Confirm Password is a required field!"),
});

const validate = (values) => {
  let errors = {};

  if (!values.old_password) {
    errors.old_password = "Old Password is required!";
  } else if (values.old_password.length < 4) {
    errors.old_password = "Old Password is too short!";
  }

  if (!values.new_password) {
    errors.new_password = "New Password is required!";
  } else if (values.new_password.length < 4) {
    errors.new_password = "New Password is too short!";
  }

  if (!values.confirm_new_password) {
    errors.confirm_new_password = "Confirm Password is required!";
  } else if (values.confirm_new_password.length < 4) {
    errors.confirm_new_password = "Confirm Password is too short!";
  }

  return errors;
};

const ChangesPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const [message, setMessage] = useState();
  const navigate = useNavigate();
  const aT = localStorage.getItem("operaPublicationAccessToken");

  // add
  const AddChangeFunc = async (values) => {
    let formfield = new FormData();

    formfield.append("old_password", values.old_password);
    formfield.append("new_password", values.new_password);
    formfield.append("confirm_new_password", values.confirm_new_password);

    await axios({
      method: "POST",
      url: `${process.env.REACT_APP_BASE_URL}/custom_user/change_password/`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${aT}`,
      },
      data: formfield,
    })
      .then((response) => {
        setMessage(response.success, "User is successfuly created...");
        navigate("/");
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
        setMessage(
          error.response.data.old_password ||
            error.response.data.new_password ||
            error.response.data.confirm_new_password ||
            error.response.data.non_field_errors ||
            error.response.data.error ||
            error.message,
          "Error",
        );
      });
  };

  const submitChangeForm = async (
    values,
    { setErrors, setSubmitting, resetForm },
  ) => {
    try {
      setSubmitting(true); // Disable button during submission
      await AddChangeFunc(values); // Ensure this function returns a promise
      setSubmitting(false); // Re-enable button if necessary after submission
      // resetForm(); // Uncomment if you want to reset the form after submission
    } catch (error) {
      setErrors({ error: error.message });
      setSubmitting(false); // Re-enable button in case of an error
    }
  };

  return (
    <Wrapper>
      {/* <div className="container py-5"> */}
      <div className="container" style={{ marginTop: "150px" }}>
        <div className="registration-box mx-auto p-3">
          <h2 className="text-center text-dark mb-4">Changes Password</h2>

          <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={submitChangeForm}
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
                    {/* Old Password */}
                    <Form.Group className="form-group mb-3">
                      <Form.Label className="mb-0">
                        Old Password<span className="text-danger">*</span>
                      </Form.Label>

                      <InputGroup
                        hasValidation
                        className="password-input-group"
                      >
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          name="old_password"
                          id="old_password"
                          value={values.old_password}
                          onChange={handleChange}
                          isInvalid={
                            !!touched.old_password && !!errors.old_password
                          }
                          isValid={touched.old_password && !errors.old_password}
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
                          {errors.old_password}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </div>

                  <div className="col-lg-12">
                    {/* New Password */}
                    <Form.Group className="form-group mb-3">
                      <Form.Label className="mb-0">
                        New Password<span className="text-danger">*</span>
                      </Form.Label>

                      <InputGroup
                        hasValidation
                        className="password-input-group"
                      >
                        <Form.Control
                          type={showPassword1 ? "text" : "password"}
                          name="new_password"
                          id="new_password"
                          value={values.new_password}
                          onChange={handleChange}
                          isInvalid={
                            !!touched.new_password && !!errors.new_password
                          }
                          isValid={touched.new_password && !errors.new_password}
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
                          {errors.new_password}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </div>

                  <div className="col-lg-12">
                    {/* Confirm New Password */}
                    <Form.Group className="form-group mb-3">
                      <Form.Label className="mb-0">
                        Confirm New Password
                        <span className="text-danger">*</span>
                      </Form.Label>

                      <InputGroup
                        hasValidation
                        className="password-input-group"
                      >
                        <Form.Control
                          type={showPassword2 ? "text" : "password"}
                          name="confirm_new_password"
                          id="confirm_new_password"
                          value={values.confirm_new_password}
                          onChange={handleChange}
                          isInvalid={
                            !!touched.confirm_new_password &&
                            !!errors.confirm_new_password
                          }
                          isValid={
                            touched.confirm_new_password &&
                            !errors.confirm_new_password
                          }
                          className="form-control my-0"
                          autoComplete="on"
                        />

                        <span
                          className="password-eye-icon"
                          onClick={() => setShowPassword2((prev) => !prev)}
                        >
                          {showPassword2 ? <FaEyeSlash /> : <FaEye />}
                        </span>

                        <Form.Control.Feedback type="invalid">
                          {errors.confirm_new_password}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </div>
                </div>

                {/* message  */}
                {message && (
                  <h6 className="text-center my-4 m-2 ">{message}</h6>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn registration-btn w-100 mt-2"
                >
                  {isSubmitting ? "Changing..." : "Change Password"}
                </button>
              </FormikForm>
            )}
          </Formik>

          <div className="text-center mt-3">
            <Link to="/login" className="text-dark text-decoration-underline">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

// const Wrapper = styled.section`
//   margin-top: 100px !important;

//   .registration-box {
//     max-width: 400px;
//     border: 1px solid #ccc;
//     border-radius: 5px;
//     box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//   }
//   .registration-box h2 {
//     font-size: 30px;
//     font-family: serif;
//   }
//   .registration-input {
//     padding: 10px;
//     border: 1px solid #ccc;
//     border-radius: 5px;
//     outline-color: #e6e6e6;
//   }
//   .registration-btn {
//     padding: 10px;
//     background-color: #e6e6e6;
//     color: #000;
//     border: 0;
//     border-radius: 5px;
//     font-size: 18px;
//     font-weight: 700;
//     font-family: serif;
//   }
//   .registration-btn:hover {
//     background-color: #d9d9d9;
//   }

//   /* Remove Blue Focus Outline From All Fields */
//   .form-control:focus,
//   .form-select:focus {
//     outline: none !important;
//     box-shadow: none !important;
//     border-color: #ced4da !important;
//   }

//   /* Keep Red Error Border */
//   .form-control.is-invalid:focus,
//   .form-select.is-invalid:focus {
//     border-color: #dc3545 !important;
//     box-shadow: none !important;
//   }

//   /* Keep Green Valid Border */
//   .form-control.is-valid:focus,
//   .form-select.is-valid:focus {
//     border-color: #198754 !important;
//     box-shadow: none !important;
//   }

//   @media (max-width: 425px) {
//     .container {
//       padding-left: 10px !important;
//       padding-right: 10px !important;
//     }
//     .registration-box h2 {
//       font-size: 26px;
//     }
//   }

//   /* ===== Password icon ===== */
//   .password-input-group {
//     position: relative;
//   }
//   .password-input-group .form-control {
//     padding-right: 42px;
//   }
//   .password-eye-icon {
//     position: absolute;
//     right: 13px;
//     top: 50%;
//     transform: translateY(-50%);
//     z-index: 10;
//     cursor: pointer;
//     color: #777;
//     font-size: 16px;
//     display: flex;
//     align-items: center;
//   }
//   .password-eye-icon:hover {
//     color: #ff0000;
//   }
//   .password-input-group .invalid-feedback {
//     position: absolute;
//     top: 100%;
//     left: 0;
//     margin-top: 2px;
//   }
// `;

const Wrapper = styled.section`
  margin-top: 100px;

  .registration-box {
    max-width: 400px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 12px;
  }

  .registration-box h2 {
    font-size: 30px;
    font-family: serif;
    margin-bottom: 18px;
  }

  .registration-input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline-color: #e6e6e6;
  }

  /* INPUT FIELD SPACING */
  .form-group {
    margin-bottom: 18px;
  }

  .form-group .form-label {
    margin-bottom: 4px;
  }

  .password-input-group {
    position: relative;
    margin-bottom: 0;
  }

  .password-input-group .form-control {
    padding: 8px 42px 8px 10px;
    min-height: 38px;
  }

  /* VALIDATION ERRORS */
  .password-input-group .invalid-feedback {
    display: block;
    position: static;
    margin-top: 4px;
    margin-bottom: 0;
    font-size: 12px;
    line-height: 1.4;
  }

  /* FOCUS AND VALIDATION */
  .form-control:focus,
  .form-select:focus {
    outline: none;
    box-shadow: none;
    border-color: #ced4da;
  }

  .form-control.is-invalid:focus,
  .form-select.is-invalid:focus {
    border-color: #dc3545;
    box-shadow: none;
  }

  .form-control.is-valid:focus,
  .form-select.is-valid:focus {
    border-color: #198754;
    box-shadow: none;
  }

  /* PASSWORD ICON */
  .password-eye-icon {
    position: absolute;
    right: 13px;
    top: 19px;
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

  /* SUBMIT BUTTON */
  .registration-btn {
    padding: 8px 10px;
    background-color: #e6e6e6;
    color: #000;
    border: 0;
    border-radius: 5px;
    font-size: 18px;
    font-weight: 700;
    font-family: serif;
    margin-top: 0;
  }

  .registration-btn:hover {
    background-color: #d9d9d9;
  }

  /* MESSAGE SPACING */
  .registration-box h6 {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  /* BACK TO LOGIN */
  .registration-box .text-center.mt-3 {
    margin-top: 12px;
  }

  @media (max-width: 425px) {
    .container {
      padding-left: 10px;
      padding-right: 10px;
    }

    .registration-box h2 {
      font-size: 26px;
    }
  }
`;

export default ChangesPassword;
