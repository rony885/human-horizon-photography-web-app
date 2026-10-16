

// import React, { useState } from "react";
// import styled from "styled-components";
// import { Link, useNavigate } from "react-router-dom";

// import * as yup from "yup";
// import axios from "axios";
// import Form from "react-bootstrap/Form";
// import { Formik, Form as FormikForm } from "formik";
// import InputGroup from "react-bootstrap/InputGroup";

// const initialValues = {
//   eemmaaiill: "",
// };

// const schema = yup.object({
//   eemmaaiill: yup
//     .string()
//     .trim()
//     .email("Please enter a valid email address.")
//     .required("Email is required!"),
// });

// const ForgotPassword = () => {
//   const navigate = useNavigate();
//   const [message, setMessage] = useState("");
//   const [messageType, setMessageType] = useState("");

//   const submitForgotForm = async (values, { setSubmitting }) => {
//     setMessage("");
//     setMessageType("");

//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_BASE_URL}/custom_user/send_reset_otp/`,
//         {
//           eemmaaiill: values.eemmaaiill.trim().toLowerCase(),
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           timeout: 30000,
//         },
//       );

//       if (response.data.success) {
//         // Keep the email available on the reset page.
//         navigate("/reset-password", {
//           state: {
//             eemmaaiill: values.eemmaaiill.trim().toLowerCase(),
//           },
//         });
//       } else {
//         setMessage(response.data.message || "Unable to send OTP.");
//         setMessageType("danger");
//       }
//     } catch (error) {
//       console.error(
//         "Forgot password error:",
//         error.response?.data || error.message,
//       );

//       const data = error.response?.data;

//       let errorMessage =
//         data?.message ||
//         data?.eemmaaiill?.[0] ||
//         data?.detail ||
//         "Unable to send OTP. Please try again later.";

//       if (Array.isArray(data?.eemmaaiill)) {
//         errorMessage = data.eemmaaiill.join(" ");
//       }

//       if (error.response?.status === 503) {
//         errorMessage =
//           data?.message ||
//           "Email delivery failed. Please check the server email configuration.";
//       }

//       setMessage(errorMessage);
//       setMessageType("danger");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <Wrapper>
//       <div className="container">
//         <div className="login-box mx-auto">
//           <h2>Forgot Password</h2>

//           <p className="description">
//             Forgot your password? Enter your registered email address, and we
//             will send you a one-time password (OTP) to reset your password.
//           </p>

//           <Formik
//             initialValues={initialValues}
//             validationSchema={schema}
//             onSubmit={submitForgotForm}
//           >
//             {({
//               values,
//               errors,
//               touched,
//               handleChange,
//               handleBlur,
//               isSubmitting,
//             }) => (
//               <FormikForm noValidate>
//                 <Form.Group className="form-group">
//                   <Form.Label>
//                     Enter Email <span className="text-danger">*</span>
//                   </Form.Label>

//                   <InputGroup>
//                     <Form.Control
//                       type="email"
//                       name="eemmaaiill"
//                       id="eemmaaiill"
//                       placeholder="Enter your registered email"
//                       autoComplete="email"
//                       value={values.eemmaaiill}
//                       onChange={(event) => {
//                         handleChange(event);
//                         setMessage("");
//                       }}
//                       onBlur={handleBlur}
//                       isInvalid={touched.eemmaaiill && !!errors.eemmaaiill}
//                     />

//                     <Form.Control.Feedback type="invalid">
//                       {errors.eemmaaiill}
//                     </Form.Control.Feedback>
//                   </InputGroup>
//                 </Form.Group>

//                 {message && (
//                   <div
//                     className={`alert alert-${messageType} mt-3 mb-3`}
//                     role="alert"
//                   >
//                     {message}
//                   </div>
//                 )}

//                 {/* <button
//                   type="submit"
//                   className="login-btn"
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? "Sending OTP..." : "Send OTP"}
//                 </button> */}
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="btn login-btn w-100 mt-2"
//                 >
//                   {isSubmitting ? "Sending OTP..." : "Send OTP"}
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
//   padding: 100px 0 80px;

//   .login-box {
//     max-width: 420px;
//     padding: 30px;
//     border: 1px solid #e5e7eb;
//     border-radius: 12px;
//     background: #fff;
//     box-shadow: 0 8px 30px rgba(0, 0, 0, 0.07);
//   }

//   h2 {
//     margin-bottom: 20px;
//     color: #212529;
//     font-family: serif;
//     font-size: 30px;
//     font-weight: 700;
//     text-align: center;
//   }

//   .description {
//     margin-bottom: 25px;
//     color: #6c757d;
//     font-size: 14px;
//     line-height: 1.7;
//   }

//   .form-group {
//     margin-bottom: 20px;
//   }

//   .form-group label {
//     margin-bottom: 8px;
//     font-size: 14px;
//     font-weight: 600;
//   }

//   .form-control {
//     min-height: 46px;
//     border-radius: 6px;
//     font-size: 14px;
//   }

//   .login-btn {
//     padding: 10px;
//     border: 0;
//     border-radius: 5px;
//     background: #e6e6e6;
//     color: #000;
//     font-family: serif;
//     font-size: 18px;
//     font-weight: 700;
//   }

//   .login-btn:hover:not(:disabled) {
//     background: #d9d9d9;
//   }

//   .login-btn:disabled {
//     cursor: not-allowed;
//     opacity: 0.65;
//   }

//   @media (max-width: 425px) {
//     padding: 60px 10px;

//     .login-box {
//       padding: 22px 18px;
//     }

//     h2 {
//       font-size: 26px;
//     }
//   }
// `;

// export default ForgotPassword;

import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

import * as yup from "yup";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { Formik, Form as FormikForm } from "formik";
import InputGroup from "react-bootstrap/InputGroup";

const initialValues = {
  eemmaaiill: "",
};

const schema = yup.object().shape({
  eemmaaiill: yup.string().required("Email is a required field!"),
});

const validate = (values) => {
  const errors = {};
  const email = values.eemmaaiill.trim();

  if (!email) {
    errors.eemmaaiill = "Email is required!";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.eemmaaiill = "Invalid Email!";
  }

  return errors;
};

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const AddForgotFunc = async (values) => {
    const email = values.eemmaaiill.trim().toLowerCase();

    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/custom_user/send_reset_otp/`,
      {
        eemmaaiill: email,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 30000,
      },
    );

    return { response, email };
  };

  const submitForgotForm = async (values, { setSubmitting }) => {
    setMessage("");
    setMessageType("");

    try {
      const { response, email } = await AddForgotFunc(values);

      if (response.data?.success) {
        navigate("/reset-password", {
          state: {
            eemmaaiill: email,
          },
        });
      } else {
        setMessage(response.data?.message || "Unable to send OTP.");
        setMessageType("danger");
      }
    } catch (error) {
      console.error(
        "Forgot password error:",
        error.response?.data || error.message,
      );

      const data = error.response?.data;

      let errorMessage =
        data?.message ||
        data?.eemmaaiill?.[0] ||
        data?.non_field_errors?.[0] ||
        data?.detail ||
        "Unable to send OTP. Please try again later.";

      if (error.response?.status === 503) {
        errorMessage =
          data?.message ||
          "Email delivery failed. Please check the server email configuration.";
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
          <h2 className="text-center text-dark mb-4">Forgot Password</h2>

          <p className="description">
            Forgot your password? No problem! Simply provide your{" "}
            <span className="fw-bold">Email</span> and press the "Send OTP"
            button. We'll send you an OTP to help you set a new password.
          </p>

          <Formik
            initialValues={initialValues}
            validationSchema={schema}
            validate={validate}
            onSubmit={submitForgotForm}
          >
            {({
              handleChange,
              handleBlur,
              values,
              touched,
              errors,
              isSubmitting,
            }) => (
              <FormikForm noValidate>
                <div className="row">
                  <div className="col-lg-12">
                    <Form.Group className="form-group mb-3">
                      <Form.Label className="mb-2">
                        Enter Email
                        <span className="text-danger">*</span>
                      </Form.Label>

                      <InputGroup hasValidation>
                        <Form.Control
                          type="email"
                          name="eemmaaiill"
                          id="eemmaaiill"
                          placeholder="Enter your registered email"
                          autoComplete="email"
                          value={values.eemmaaiill}
                          onChange={(event) => {
                            handleChange(event);
                            setMessage("");
                          }}
                          onBlur={handleBlur}
                          isInvalid={touched.eemmaaiill && !!errors.eemmaaiill}
                        />

                        <Form.Control.Feedback type="invalid">
                          {errors.eemmaaiill}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </div>
                </div>

                {message && (
                  <div
                    className={`alert alert-${messageType} mt-3 mb-3`}
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
                  {isSubmitting ? "Sending OTP..." : "Send OTP"}
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
    max-width: 420px;
    padding: 30px;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    background: #fff;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.07);
  }

  h2 {
    margin-bottom: 20px;
    color: #212529;
    font-family: serif;
    font-size: 30px;
    font-weight: 700;
    text-align: center;
  }

  .description {
    margin-bottom: 25px;
    color: #6c757d;
    font-size: 14px;
    line-height: 1.7;
  }

  .form-group {
    margin-bottom: 20px;
  }

  .form-group label {
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 600;
  }

  .form-control {
    min-height: 46px;
    border-radius: 6px;
    font-size: 14px;
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

    .login-box {
      padding: 22px 18px;
    }

    h2 {
      font-size: 26px;
    }
  }
`;

export default ForgotPassword;
