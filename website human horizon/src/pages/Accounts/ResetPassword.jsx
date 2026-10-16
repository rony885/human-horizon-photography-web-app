// import React, { useState } from "react";
// import styled from "styled-components";
// import { Link, useNavigate } from "react-router-dom";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// import * as yup from "yup";
// import axios from "axios";
// import Form from "react-bootstrap/Form";
// import { Formik, Form as FormikForm } from "formik";
// import InputGroup from "react-bootstrap/InputGroup";

// const initialValues = {
//   eemmaaiill: "",
//   otp: "",
//   new_password: "",
//   confirm_password: "",
// };

// const schema = yup.object().shape({
//   eemmaaiill: yup.string().required("Email is a required field!"),
//   otp: yup.string().required("OTP is a required field!"),
//   new_password: yup.string().required("New Password is a required field!"),
//   confirm_password: yup
//     .string()
//     .required("Confirm Password is a required field!"),
// });

// const validate = (values) => {
//   let errors = {};

//   if (!values.eemmaaiill) {
//     errors.eemmaaiill = "Email is required!";
//   } else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.eemmaaiill) === false) {
//     errors.eemmaaiill = "Invalid Email!";
//   }

//   if (!values.new_password) {
//     errors.new_password = "Password is required!";
//   } else if (values.new_password.length < 4) {
//     errors.new_password = "Password is too short!";
//   }

//   if (!values.confirm_password) {
//     errors.confirm_password = "Confirm password is required!";
//   } else if (values.confirm_password.length < 4) {
//     errors.confirm_password = "Confirm password is too short!";
//   }

//   return errors;
// };

// const ResetPassword = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showPassword1, setShowPassword1] = useState(false);

//   const [message, setMessage] = useState();
//   const navigate = useNavigate();

//   // add
//   const AddResetFunc = async (values) => {
//     let formfield = new FormData();

//     formfield.append("eemmaaiill", values.eemmaaiill);
//     formfield.append("otp", values.otp);
//     formfield.append("new_password", values.new_password);
//     formfield.append("confirm_password", values.confirm_password);

//     await axios({
//       method: "POST",
//       url: `${process.env.REACT_APP_BASE_URL}/custom_user/reset_password/`,
//       headers: {
//         "Content-Type": "application/json; charset=UTF-8; text/plain",
//       },
//       data: formfield,
//     })
//       .then((response) => {
//         setMessage(response.success, "User is successfuly created...");
//         navigate("/");
//         window.location.reload(false);
//       })
//       .catch((error) => {
//         console.log(error);
//         setMessage(
//           error.response.data.eemmaaiill ||
//             error.response.data.otp ||
//             error.response.data.new_password ||
//             error.response.data.confirm_password ||
//             error.response.data.non_field_errors ||
//             error.message,
//           "Error",
//         );
//       });
//   };

//   const submitResetForm = async (
//     values,
//     { setErrors, setSubmitting, resetForm },
//   ) => {
//     try {
//       setSubmitting(true); // Disable button during submission
//       await AddResetFunc(values); // Ensure this function returns a promise
//       setSubmitting(false); // Re-enable button if necessary after submission
//       // resetForm(); // Uncomment if you want to reset the form after submission
//     } catch (error) {
//       setErrors({ error: error.message });
//       setSubmitting(false); // Re-enable button in case of an error
//     }
//   };

//   return (
//     <Wrapper>
//       <div className="container py-5">
//         <div className="login-box mx-auto p-3">
//           <h2 className="text-center text-dark mb-4">Generate New Password</h2>
//           <p
//             style={{
//               color: "#495057",
//               fontSize: "14px",
//               marginBottom: "20px",
//               fontFamily: "Arial, sans-serif",
//               textAlign: "justify",
//             }}
//           >
//             We received your password reset request. Please enter the{" "}
//             <span className="fw-bold">One-Time Password (OTP)</span> sent to
//             your registered email to proceed.
//           </p>

//           <Formik
//             initialValues={initialValues}
//             validationSchema={schema}
//             onSubmit={submitResetForm}
//             validate={validate}
//           >
//             {({
//               handleSubmit,
//               handleChange,
//               values,
//               touched,
//               errors,
//               isSubmitting,
//               setFieldValue,
//             }) => (
//               <FormikForm noValidate onSubmit={(e) => handleSubmit(e)}>
//                 <div className="row">
//                   <div className="col-lg-12">
//                     {/* Email */}
//                     <Form.Group className="form-group  mb-3">
//                       <Form.Label className="mb-0">
//                         Enter Email
//                         <span className="text-danger">*</span>
//                       </Form.Label>
//                       <InputGroup hasValidation>
//                         <Form.Control
//                           type="text"
//                           name="eemmaaiill"
//                           id="eemmaaiill"
//                           value={values.eemmaaiill}
//                           onChange={handleChange}
//                           isInvalid={
//                             !!touched.eemmaaiill && !!errors.eemmaaiill
//                           }
//                           isValid={touched.eemmaaiill && !errors.eemmaaiill}
//                           className="form-control"
//                         />
//                         <Form.Control.Feedback type="invalid">
//                           {errors.eemmaaiill}
//                         </Form.Control.Feedback>
//                       </InputGroup>
//                     </Form.Group>
//                   </div>

//                   <div className="col-lg-12">
//                     {/* OTP */}
//                     <Form.Group className="form-group mb-3">
//                       <Form.Label className="mb-0">
//                         OTP
//                         <span className="text-danger">*</span>
//                       </Form.Label>
//                       <InputGroup hasValidation>
//                         <Form.Control
//                           type="text"
//                           name="otp"
//                           id="otp"
//                           value={values.otp}
//                           onChange={handleChange}
//                           isInvalid={!!touched.otp && !!errors.otp}
//                           isValid={touched.otp && !errors.otp}
//                           className="form-control"
//                         />
//                         <Form.Control.Feedback type="invalid">
//                           {errors.otp}
//                         </Form.Control.Feedback>
//                       </InputGroup>
//                     </Form.Group>
//                   </div>

//                   <div className="col-lg-12 mb-3">
//                     {/* New Password */}
//                     <Form.Group className="form-group mb-3">
//                       <Form.Label className="mb-0">
//                         New Password<span className="text-danger">*</span>
//                       </Form.Label>

//                       <InputGroup
//                         hasValidation
//                         className="password-input-group"
//                       >
//                         <Form.Control
//                           type={showPassword ? "text" : "password"}
//                           name="new_password"
//                           id="new_password"
//                           value={values.new_password}
//                           onChange={handleChange}
//                           isInvalid={
//                             !!touched.new_password && !!errors.new_password
//                           }
//                           isValid={touched.new_password && !errors.new_password}
//                           className="form-control my-0"
//                           autoComplete="on"
//                         />

//                         <span
//                           className="password-eye-icon"
//                           onClick={() => setShowPassword((prev) => !prev)}
//                         >
//                           {showPassword ? <FaEyeSlash /> : <FaEye />}
//                         </span>

//                         <Form.Control.Feedback type="invalid">
//                           {errors.new_password}
//                         </Form.Control.Feedback>
//                       </InputGroup>
//                     </Form.Group>
//                   </div>

//                   <div className="col-lg-12 mb-4">
//                     {/*   Confirm New Password */}
//                     <Form.Group className="form-group mb-4">
//                       <Form.Label className="mb-0">
//                         Confirm New Password
//                         <span className="text-danger">*</span>
//                       </Form.Label>

//                       <InputGroup
//                         hasValidation
//                         className="password-input-group"
//                       >
//                         <Form.Control
//                           type={showPassword1 ? "text" : "password"}
//                           name="confirm_password"
//                           id="confirm_password"
//                           value={values.confirm_password}
//                           onChange={handleChange}
//                           isInvalid={
//                             !!touched.confirm_password &&
//                             !!errors.confirm_password
//                           }
//                           isValid={
//                             touched.confirm_password && !errors.confirm_password
//                           }
//                           className="form-control my-0"
//                           autoComplete="on"
//                         />

//                         <span
//                           className="password-eye-icon"
//                           onClick={() => setShowPassword1((prev) => !prev)}
//                         >
//                           {showPassword1 ? <FaEyeSlash /> : <FaEye />}
//                         </span>

//                         <Form.Control.Feedback type="invalid">
//                           {errors.confirm_password}
//                         </Form.Control.Feedback>
//                       </InputGroup>
//                     </Form.Group>
//                   </div>
//                 </div>

//                 {/* message  */}
//                 {message && (
//                   <h6 className="text-center my-4 m-2  text-capitalize">
//                     {message}
//                   </h6>
//                 )}

//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="btn login-btn w-100 mt-2"
//                 >
//                   {isSubmitting ? "Reseting..." : "Reset Password"}
//                 </button>
//               </FormikForm>
//             )}
//           </Formik>

//           <div className="text-center mt-3">
//             <Link to="/login" className="text-dark text-decoration-underline">
//               Back to Login
//             </Link>
//           </div>
//         </div>
//       </div>
//     </Wrapper>
//   );
// };

// const Wrapper = styled.section`
//   margin-top: 180px !important;
//   margin-bottom: 140px !important;

//   .login-box {
//     max-width: 400px;
//     border: 1px solid #ccc;
//     border-radius: 5px;
//     box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//   }

//   .login-box h2 {
//     font-size: 30px;
//     font-family: serif;
//   }

//   .login-input {
//     padding: 10px;
//     border: 1px solid #ccc;
//     border-radius: 5px;
//     outline-color: #e6e6e6;
//   }

//   .login-btn {
//     padding: 10px;
//     background-color: #e6e6e6;
//     color: #000;
//     border: 0;
//     border-radius: 5px;
//     font-size: 18px;
//     font-weight: 700;
//     font-family: serif;
//   }

//   .login-btn:hover {
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

//     .login-box h2 {
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

// export default ResetPassword;

import React, { useState } from "react";
import styled from "styled-components";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";

import * as yup from "yup";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { Formik, Form as FormikForm } from "formik";
import InputGroup from "react-bootstrap/InputGroup";

const schema = yup.object({
  eemmaaiill: yup
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .required("Email is required!"),

  otp: yup
    .string()
    .matches(/^\d{6}$/, "OTP must contain exactly 6 digits.")
    .required("OTP is required!"),

  new_password: yup
    .string()
    .min(4, "Password must contain at least 4 characters.")
    .required("New password is required!"),

  confirm_password: yup
    .string()
    .oneOf([yup.ref("new_password")], "Passwords do not match.")
    .required("Confirm password is required!"),
});

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("danger");

  const initialValues = {
    eemmaaiill: location.state?.eemmaaiill || "",
    otp: "",
    new_password: "",
    confirm_password: "",
  };

  const submitResetForm = async (values, { setSubmitting }) => {
    setMessage("");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/custom_user/reset_password/`,
        {
          eemmaaiill: values.eemmaaiill.trim().toLowerCase(),
          otp: values.otp.trim(),
          new_password: values.new_password,
          confirm_password: values.confirm_password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 30000,
        },
      );

      if (response.data.success) {
        navigate("/login", {
          state: {
            message:
              response.data.message ||
              "Password reset successfully. Please log in.",
          },
        });
      } else {
        setMessage(response.data.message || "Unable to reset your password.");
        setMessageType("danger");
      }
    } catch (error) {
      console.error(
        "Reset password error:",
        error.response?.data || error.message,
      );

      const data = error.response?.data;
      let errorMessage = "Unable to reset password. Please try again.";

      if (data && typeof data === "object") {
        const messages = Object.entries(data).flatMap(([field, errors]) => {
          const fieldMessages = Array.isArray(errors) ? errors : [errors];

          return fieldMessages.map((item) => {
            const label =
              {
                eemmaaiill: "Email",
                otp: "OTP",
                new_password: "New password",
                confirm_password: "Confirm password",
                non_field_errors: "",
                detail: "",
                error: "",
              }[field] ?? field;

            return `${label ? `${label}: ` : ""}${String(item)}`;
          });
        });

        if (messages.length) {
          errorMessage = messages.join(" ");
        }
      }

      setMessage(errorMessage);
      setMessageType("danger");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Wrapper>
      <div className="container py-5">
        <div className="login-box mx-auto p-3">
          <h2 className="text-center text-dark mb-4">Generate New Password</h2>

          <p className="description">
            Enter your registered email address, the six-digit{" "}
            <span className="text-dark fw-bold">OTP</span> sent to your email, and your
            new password.
          </p>

          <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={submitResetForm}
            enableReinitialize
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              isSubmitting,
            }) => (
              <FormikForm noValidate>
                {/* EMAIL */}
                <Form.Group className="form-group">
                  <Form.Label className="mb-0">
                    Enter your registered email{" "}
                    <span className="text-danger">*</span>
                  </Form.Label>

                  <Form.Control
                    type="email"
                    name="eemmaaiill"
                    value={values.eemmaaiill}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="email"
                    isInvalid={touched.eemmaaiill && !!errors.eemmaaiill}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.eemmaaiill}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* OTP */}
                <Form.Group className="form-group">
                  <Form.Label className="mb-0">
                    Enter 6-digit OTP <span className="text-danger">*</span>
                  </Form.Label>

                  <Form.Control
                    type="text"
                    name="otp"
                    value={values.otp}
                    onChange={(event) => {
                      const value = event.target.value
                        .replace(/\D/g, "")
                        .slice(0, 6);

                      handleChange({
                        target: {
                          name: "otp",
                          value,
                        },
                      });
                    }}
                    onBlur={handleBlur}
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    isInvalid={touched.otp && !!errors.otp}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.otp}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* NEW PASSWORD */}
                <Form.Group className="form-group">
                  <Form.Label className="mb-0">
                    Enter new password <span className="text-danger">*</span>
                  </Form.Label>

                  <InputGroup className="password-input-group">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      name="new_password"
                      value={values.new_password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete="new-password"
                      isInvalid={touched.new_password && !!errors.new_password}
                    />

                    <button
                      type="button"
                      className="password-eye-icon"
                      onClick={() => setShowPassword((previous) => !previous)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>

                    <Form.Control.Feedback type="invalid">
                      {errors.new_password}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                {/* CONFIRM PASSWORD */}
                <Form.Group className="form-group">
                  <Form.Label className="mb-0">
                    Confirm New Password <span className="text-danger">*</span>
                  </Form.Label>

                  <InputGroup className="password-input-group">
                    <Form.Control
                      type={showPassword1 ? "text" : "password"}
                      name="confirm_password"
                      value={values.confirm_password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete="new-password"
                      isInvalid={
                        touched.confirm_password && !!errors.confirm_password
                      }
                    />

                    <button
                      type="button"
                      className="password-eye-icon"
                      onClick={() => setShowPassword1((previous) => !previous)}
                      aria-label={
                        showPassword1 ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword1 ? <FaEyeSlash /> : <FaEye />}
                    </button>

                    <Form.Control.Feedback type="invalid">
                      {errors.confirm_password}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                {/* SERVER MESSAGE */}
                {message && (
                  <div
                    className={`alert alert-${messageType} mt-3`}
                    role="alert"
                  >
                    {message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn login-btn w-100 mt-2"
                >
                  {isSubmitting ? "Resetting..." : "Reset Password"}
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

const Wrapper = styled.section`
  padding: 100px 0 80px;

  .login-box {
    max-width: 400px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .login-box h2 {
    font-size: 30px;
    font-family: serif;
  }

  .description {
    margin-bottom: 22px;
    color: #495057;
    font-size: 14px;
    line-height: 1.7;
    text-align: justify;
  }

  .form-group {
    margin-bottom: 24px;
  }

  .form-group > .form-control,
  .password-input-group .form-control {
    min-height: 42px;
  }

  .form-group > .form-control {
    margin-bottom: 0;
  }

  .password-input-group {
    position: relative;
  }

  .password-input-group .form-control {
    padding-right: 44px;
  }

  .password-eye-icon {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 5;
    display: flex;
    width: 42px;
    height: 42px;
    align-items: center;
    justify-content: center;
    border: 0;
    background: transparent;
    color: #777;
    cursor: pointer;
  }

  .password-eye-icon:hover {
    color: #ff3333;
  }

  .password-input-group .invalid-feedback {
    flex-basis: 100%;
    order: 3;
    margin-top: 4px;
  }

  .login-btn {
    padding: 10px;
    border: 0;
    border-radius: 5px;
    background: #e6e6e6;
    color: #000;
    font-family: serif;
    font-size: 18px;
    font-weight: 700;
  }

  .login-btn:hover:not(:disabled) {
    background: #d9d9d9;
  }

  .login-btn:disabled {
    cursor: not-allowed;
    opacity: 0.65;
  }

  @media (max-width: 425px) {
    padding: 60px 10px;

    .login-box h2 {
      font-size: 26px;
    }
  }
`;

export default ResetPassword;
