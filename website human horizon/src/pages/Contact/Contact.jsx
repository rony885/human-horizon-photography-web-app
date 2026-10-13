// import React, { useEffect, useState } from "react";
// import { Link } from "react-router";
// import styled from "styled-components";

// import { useProductContext } from "../../context/ProductContext";

// import { Formik, Form as FormikForm } from "formik";
// import Form from "react-bootstrap/Form";
// // import InputGroup from "react-bootstrap/InputGroup";
// import * as yup from "yup";
// import axios from "axios";

// const initialValues = {
//   name: "",
//   email: "",
//   phone: "",
//   address: "",
//   subject: "",
//   message: "",
// };

// const schema = yup.object().shape({
//   name: yup.string().required("Name is a required field!"),
//   email: yup.string().required("Email is a required field!"),
//   phone: yup.string().required("Phone is a required field!"),
//   address: yup.string().required("Address is a required field!"),
//   subject: yup.string().required("Subject is a required field!"),
//   message: yup.string().required("Message is a required field!"),
// });

// const validate = (values) => {
//   let errors = {};

//   if (!values.phone) {
//     errors.phone = "Phone is required!";
//   } else if (/^[0-9\b]+$/.test(values.phone) === false) {
//     errors.phone = "Only number!";
//   } else if (values.phone.length !== 11) {
//     errors.phone = "Mobile Number contains 11 digit!";
//   }

//   return errors;
// };

// const Contact = () => {
//   // data fetching
//   // const { unpaginate_general_settings, fetchUnpaginateGeneralSettings } =
//   //   useProductContext();

//   // useEffect(() => {
//   //   fetchUnpaginateGeneralSettings();
//   // }, [fetchUnpaginateGeneralSettings]);

//   const [message, setMessage] = useState();

//   // add
//   const AddContactFunc = async (values) => {
//     let formfield = new FormData();

//     formfield.append("name", values.name);
//     formfield.append("email", values.email);
//     formfield.append("phone", values.phone);
//     formfield.append("address", values.address);
//     formfield.append("subject", values.subject);
//     formfield.append("message", values.message);

//     await axios({
//       method: "POST",
//       url: `${process.env.REACT_APP_BASE_URL}/contact_api/unpaginate_contact/`,
//       data: formfield,
//     })
//       .then((response) => {
//         setMessage(response.success, "Contact is successfuly created...");
//         // navigate("/");
//         window.location.reload(false);
//       })
//       .catch((error) => {
//         setMessage(error.message, "Error");
//         console.log(error);
//       });
//   };

//   const submitAddContactForm = async (
//     values,
//     { setErrors, setSubmitting, resetForm },
//   ) => {
//     try {
//       setSubmitting(true);
//       await AddContactFunc(values);
//       setSubmitting(false);
//       // resetForm();
//     } catch (error) {
//       setErrors({ error: error.message });
//       setSubmitting(false);
//     }
//   };

//   return (
//     <Wrapper>
//       <div
//         className="container"
//         style={{ marginTop: "130px", marginBottom: "80px" }}
//       >
//         <div className="d-flex align-items-center gap-2 mb-4">
//           <Link className="text-dark fw-bold text-decoration-none" to="/">
//             Home
//           </Link>
//           <span>&gt;</span>
//           <span>Contact</span>
//         </div>

//         {/* Contact Information */}
//         <div className="row g-4 mb-4">
//           {/* Address */}
//           <div className="col-lg-4 col-md-6 col-12">
//             <div className="contact-card h-100 d-flex justify-content-between align-items-start p-4">
//               <div className="pe-2">
//                 <h3 className="contact-title">Address</h3>
//                 <p className="contact-text">
//                   F/11, Road No: 5/4, DOREEN VINCITA, Rupnagar R/A, Mirpur 1216,
//                   Dhaka.
//                 </p>
//               </div>

//               <div className="contact-icon flex-shrink-0">
//                 <i className="fa-solid fa-map-location-dot"></i>
//               </div>
//             </div>
//           </div>

//           {/* Phone */}
//           <div className="col-lg-4 col-md-6 col-12">
//             <div className="contact-card h-100 d-flex justify-content-between align-items-start p-4">
//               <div className="pe-2">
//                 <h3 className="contact-title">Contact Number</h3>

//                 <p className="contact-text fst-italic mb-0">01911246653</p>
//               </div>

//               <div className="contact-icon flex-shrink-0">
//                 <i className="fa-solid fa-phone"></i>
//               </div>
//             </div>
//           </div>

//           {/* Email */}
//           <div className="col-lg-4 col-md-6 col-12">
//             <div className="contact-card h-100 d-flex justify-content-between align-items-start p-4">
//               <div className="pe-2">
//                 <h3 className="contact-title">E-mail</h3>

//                 <p className="contact-text fst-italic text-break mb-0">
//                   antiessentialist@gmail.com
//                 </p>
//               </div>

//               <div className="contact-icon flex-shrink-0">
//                 <i className="fa-solid fa-envelope"></i>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Contact Form */}
//         <section className="contact-form-section p-4 p-md-5">
//           <div className="text-center mb-4">
//             <h2 className="section-title">Contact Us</h2>
//           </div>

//           <Formik
//             initialValues={initialValues}
//             validationSchema={schema}
//             onSubmit={submitAddContactForm}
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
//               <FormikForm
//                 noValidate
//                 onSubmit={(e) => handleSubmit(e)}
//                 className="custom-form"
//                 name="contactform"
//                 id="contactform"
//               >
//                 <div id="contactForm">
//                   <div className="row g-3">
//                     <div className="col-md-6">
//                       {/* Name */}
//                       {/* <div className="form-group position-relative mb-3">
//                         <input
//                           type="text"
//                           className="form-control"
//                           placeholder="Name"
//                           required
//                         />
//                         <i className="fa-solid fa-user"></i>
//                       </div> */}

//                       {/* <Form.Group className="form-group position-relative mb-3">
//                         <div className="input-single">
//                           <Form.Control
//                             type="text"
//                             name="name"
//                             id="name"
//                             placeholder="Name"
//                             value={values.name}
//                             onChange={handleChange}
//                             isInvalid={!!touched.name && !!errors.name}
//                             isValid={touched.name && !errors.name}
//                             required
//                           />
//                           <i className="fa-solid fa-user"></i>
//                         </div>

//                         <Form.Control.Feedback type="invalid">
//                           {errors.name}
//                         </Form.Control.Feedback>
//                       </Form.Group> */}
//                       <Form.Group className="form-group w-100">
//                         <div className="input-single">
//                           <Form.Control
//                             type="text"
//                             name="name"
//                             id="name"
//                             placeholder="Name"
//                             value={values.name}
//                             onChange={handleChange}
//                             isInvalid={!!touched.name && !!errors.name}
//                             required
//                           />
//                           <i className="fas fa-user"></i>
//                         </div>

//                         <Form.Control.Feedback
//                           type="invalid"
//                           className="error-message"
//                         >
//                           {errors.name}
//                         </Form.Control.Feedback>
//                       </Form.Group>

//                       {/* Phone */}
//                       {/* <div className="form-group position-relative mb-3">
//                         <input
//                           type="tel"
//                           className="form-control"
//                           placeholder="Phone Number"
//                           required
//                         />
//                         <i className="fa-solid fa-phone"></i>
//                       </div> */}
//                       {/* <Form.Group className="form-group position-relative mb-3">
//                         <div className="input-single">
//                           <Form.Control
//                             type="text"
//                             name="phone"
//                             id="phone"
//                             placeholder="Phone"
//                             value={values.phone}
//                             onChange={handleChange}
//                             isInvalid={!!touched.phone && !!errors.phone}
//                             isValid={touched.phone && !errors.phone}
//                             required
//                           />
//                           <i className="fa-solid fa-user"></i>
//                         </div>

//                         <Form.Control.Feedback type="invalid">
//                           {errors.phone}
//                         </Form.Control.Feedback>
//                       </Form.Group> */}

//                       {/* Subject */}
//                       {/* <div className="form-group position-relative mb-3">
//                         <input
//                           type="text"
//                           className="form-control"
//                           placeholder="Subject"
//                           required
//                         />
//                         <i className="fa-solid fa-pencil"></i>
//                       </div> */}
//                       <Form.Group className="form-group position-relative mb-3">
//                         <div className="input-single">
//                           <Form.Control
//                             type="text"
//                             name="subject"
//                             id="subject"
//                             placeholder="Subject"
//                             value={values.subject}
//                             onChange={handleChange}
//                             isInvalid={!!touched.subject && !!errors.subject}
//                             isValid={touched.subject && !errors.subject}
//                             required
//                           />
//                           <i className="fa-solid fa-user"></i>
//                         </div>

//                         <Form.Control.Feedback type="invalid">
//                           {errors.subject}
//                         </Form.Control.Feedback>
//                       </Form.Group>
//                     </div>

//                     <div className="col-md-6">
//                       {/* Email */}
//                       {/* <div className="form-group position-relative mb-3">
//                         <input
//                           type="email"
//                           className="form-control"
//                           placeholder="Email"
//                           required
//                         />
//                         <i className="fa-solid fa-envelope"></i>
//                       </div> */}
//                       <Form.Group className="form-group position-relative mb-3">
//                         <div className="input-single">
//                           <Form.Control
//                             type="text"
//                             name="email"
//                             id="email"
//                             placeholder="Email"
//                             value={values.email}
//                             onChange={handleChange}
//                             isInvalid={!!touched.email && !!errors.email}
//                             isValid={touched.email && !errors.email}
//                             required
//                           />
//                           <i className="fa-solid fa-user"></i>
//                         </div>

//                         <Form.Control.Feedback type="invalid">
//                           {errors.email}
//                         </Form.Control.Feedback>
//                       </Form.Group>

//                       {/* Address */}
//                       {/* <div className="form-group position-relative mb-3">
//                         <input
//                           type="text"
//                           className="form-control"
//                           placeholder="Address"
//                         />
//                         <i className="fa-solid fa-location-dot"></i>
//                       </div> */}
//                       <Form.Group className="form-group position-relative mb-3">
//                         <div className="input-single">
//                           <Form.Control
//                             type="text"
//                             name="address"
//                             id="address"
//                             placeholder="Address"
//                             value={values.address}
//                             onChange={handleChange}
//                             isInvalid={!!touched.address && !!errors.address}
//                             isValid={touched.address && !errors.address}
//                             required
//                           />
//                           <i className="fa-solid fa-user"></i>
//                         </div>

//                         <Form.Control.Feedback type="invalid">
//                           {errors.address}
//                         </Form.Control.Feedback>
//                       </Form.Group>

//                       {/* Message */}
//                       {/* <div className="form-group mb-3">
//                         <textarea
//                           className="form-control"
//                           placeholder="Write your message here..."
//                           required
//                         ></textarea>
//                       </div> */}

//                       <Form.Group className="form-group mb-3">
//                         <div
//                           className="input-single"
//                           style={{ alignItems: "start" }}
//                         >
//                           <Form.Control
//                             as="textarea"
//                             name="message"
//                             id="message"
//                             rows={7}
//                             placeholder="Write your message here..."
//                             value={values.message}
//                             onChange={handleChange}
//                             isInvalid={!!touched.message && !!errors.message}
//                             isValid={touched.message && !errors.message}
//                             required
//                           />
//                           <i className="fa-solid fa-comments mt-3"></i>
//                         </div>

//                         <Form.Control.Feedback type="invalid">
//                           {errors.message}
//                         </Form.Control.Feedback>
//                       </Form.Group>
//                     </div>
//                   </div>

//                   <div className="text-center pt-2">
//                     <button
//                       className="submit-button"
//                       type="submit"
//                       disabled={isSubmitting}
//                     >
//                       {isSubmitting ? "Sending..." : "Send Message"}
//                     </button>
//                   </div>
//                 </div>

//                 {/* message  */}
//                 {message && <h2 className="text-center m-5">{message}</h2>}
//               </FormikForm>
//             )}
//           </Formik>
//         </section>
//       </div>
//     </Wrapper>
//   );
// };

// const Wrapper = styled.section`
//   //formik css
//   .invalid-feedback {
//     font-size: 12px;
//     color: red;
//   }

//   .imgDiv {
//     max-width: 100%;
//     display: flex;
//     flex-direction: column;
//   }
//   //formik css

//   .contact-card,
//   .contact-form-section {
//     background: #f4f4f4;
//     border-radius: 16px;
//   }

//   .contact-card {
//     min-height: 125px;
//   }

//   .contact-title {
//     color: #333;
//     font-size: 18px;
//     font-weight: 700;
//     line-height: 1.3;
//     margin-bottom: 8px;
//   }

//   .contact-text {
//     color: #333;
//     font-size: 13px;
//     line-height: 1.7;
//     font-weight: 700;
//     letter-spacing: 0.5px;
//     margin: 0;
//   }

//   .contact-icon {
//     width: 48px;
//     height: 48px;
//     border-radius: 16px;
//     background: #fff;
//     border: 1px solid #d6d6d6;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     color: #555;
//     font-size: 18px;
//   }

//   .contact-form-section {
//     width: 100%;
//   }

//   .section-title {
//     color: #333;
//     font-size: 30px;
//     font-weight: 800;
//     line-height: 1.3;
//     margin: 0;
//   }

//   .form-group .form-control {
//     height: 42px;
//     border: 1px solid transparent;
//     border-radius: 8px;
//     background: #fff;
//     color: #333;
//     font-size: 13px;
//     font-weight: 500;
//     padding: 10px 42px 10px 16px;
//     box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
//   }

//   .form-group textarea.form-control {
//     height: 100px;
//     min-height: 100px;
//     padding: 14px 16px;
//     resize: none;
//     line-height: 1.5;
//   }

//   .form-control::placeholder {
//     color: #777;
//     opacity: 1;
//   }

//   .form-control:focus {
//     border-color: #999;
//     box-shadow: 0 0 0 2px rgba(100, 100, 100, 0.12);
//   }

//   .form-group i {
//     position: absolute;
//     right: 16px;
//     top: 50%;
//     transform: translateY(-50%);
//     color: #555;
//     font-size: 13px;
//     pointer-events: none;
//   }

//   .submit-button {
//     border: 0;
//     outline: 0;
//     cursor: pointer;
//     background: #333;
//     color: #fff;
//     font-size: 14px;
//     font-weight: 700;
//     padding: 10px 40px;
//     border-radius: 50px;
//     transition:
//       background 0.2s ease,
//       box-shadow 0.2s ease,
//       transform 0.2s ease;
//   }

//   .submit-button:hover {
//     background: #222;
//     box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
//   }

//   .submit-button:active {
//     transform: translateY(1px);
//   }

//   .toast-message {
//     display: none;
//     width: 100%;
//     margin-top: 20px;
//     padding: 12px;
//     text-align: center;
//     color: #333;
//     background: #eee;
//     border: 1px solid #ccc;
//     border-radius: 8px;
//     font-size: 13px;
//     font-weight: 600;
//   }

//   .toast-message.show {
//     display: block;
//   }

//   @media (max-width: 480px) {
//     .contact-card {
//       padding: 20px !important;
//     }

//     .contact-title {
//       font-size: 20px;
//     }

//     .contact-text {
//       font-size: 12px;
//     }

//     .contact-icon {
//       width: 44px;
//       height: 44px;
//       border-radius: 14px;
//       font-size: 16px;
//     }

//     .section-title {
//       font-size: 23px;
//     }

//     .form-group textarea.form-control {
//       height: 110px;
//       min-height: 110px;
//     }

//     .submit-button {
//       padding: 10px 30px;
//       font-size: 13px;
//     }
//   }
// `;

// export default Contact;

import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import styled from "styled-components";

import { useProductContext } from "../../context/ProductContext";

import { Formik, Form as FormikForm } from "formik";
import Form from "react-bootstrap/Form";
// import InputGroup from "react-bootstrap/InputGroup";
import * as yup from "yup";
import axios from "axios";

const initialValues = {
  name: "",
  email: "",
  phone: "",
  address: "",
  subject: "",
  message: "",
};

const schema = yup.object().shape({
  name: yup.string().trim().required("Name is required!"),
  email: yup.string().required("Email is required!"),
  phone: yup.string().required("Phone is required!"),
  address: yup.string().required("Address is required!"),
  subject: yup.string().required("Subject is required!"),
  message: yup.string().required("Message is required!"),
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

  return errors;
};

const Contact = () => {
  // data fetching
  const { unpaginate_general_settings, fetchUnpaginateGeneralSettings } =
    useProductContext();

  useEffect(() => {
    fetchUnpaginateGeneralSettings();
  }, [fetchUnpaginateGeneralSettings]);

  const [message, setMessage] = useState();

  // add
  const AddContactFunc = async (values) => {
    let formfield = new FormData();

    formfield.append("name", values.name);
    formfield.append("email", values.email);
    formfield.append("phone", values.phone);
    formfield.append("address", values.address);
    formfield.append("subject", values.subject);
    formfield.append("message", values.message);

    await axios({
      method: "POST",
      url: `${process.env.REACT_APP_BASE_URL}/contact_api/unpaginate_contact/`,
      data: formfield,
    })
      .then((response) => {
        setMessage(response.success, "Contact is successfuly created...");
        // navigate("/");
        window.location.reload(false);
      })
      .catch((error) => {
        setMessage(error.message, "Error");
        console.log(error);
      });
  };

  const submitAddContactForm = async (
    values,
    { setErrors, setSubmitting, resetForm },
  ) => {
    try {
      setSubmitting(true);
      await AddContactFunc(values);
      setSubmitting(false);
      // resetForm();
    } catch (error) {
      setErrors({ error: error.message });
      setSubmitting(false);
    }
  };

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
          <span>Contact</span>
        </div>

        {/* Contact Information */}
        <div className="row g-4 mb-4">
          {/* Address */}
          <div className="col-lg-4 col-md-6 col-12">
            <div className="contact-card h-100 d-flex justify-content-between align-items-start p-4">
              <div className="pe-2">
                <h3 className="contact-title">Address</h3>
                <p className="contact-text">
                  {/* F/11, Road No: 5/4, DOREEN VINCITA, Rupnagar R/A, Mirpur 1216,
                  Dhaka. */}
                  {unpaginate_general_settings &&
                    unpaginate_general_settings.address}
                </p>
              </div>

              <div className="contact-icon flex-shrink-0">
                <i className="fa-solid fa-map-location-dot"></i>
              </div>
            </div>
          </div>

          {/* Phone */}
          <div className="col-lg-4 col-md-6 col-12">
            <div className="contact-card h-100 d-flex justify-content-between align-items-start p-4">
              <div className="pe-2">
                <h3 className="contact-title">Contact Number</h3>

                <p className="contact-text fst-italic mb-0">
                  {/* 01911246653 */}
                  {unpaginate_general_settings &&
                    unpaginate_general_settings.company_phone}
                </p>
              </div>

              <div className="contact-icon flex-shrink-0">
                <i className="fa-solid fa-phone"></i>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="col-lg-4 col-md-6 col-12">
            <div className="contact-card h-100 d-flex justify-content-between align-items-start p-4">
              <div className="pe-2">
                <h3 className="contact-title">E-mail</h3>

                <p className="contact-text fst-italic text-break mb-0">
                  {/* antiessentialist@gmail.com */}
                  {unpaginate_general_settings &&
                    unpaginate_general_settings.email}
                </p>
              </div>

              <div className="contact-icon flex-shrink-0">
                <i className="fa-solid fa-envelope"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <section className="contact-form-section p-4 p-md-5">
          <div className="text-center mb-4">
            <h2 className="section-title">Contact Us</h2>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={submitAddContactForm}
            validate={validate}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              errors,
              isSubmitting,
            }) => (
              <FormikForm
                noValidate
                onSubmit={handleSubmit}
                className="custom-form"
                name="contactform"
                id="contactform"
              >
                <div id="contactForm">
                  <div className="row g-3">
                    {/* LEFT COLUMN */}
                    <div className="col-md-6">
                      {/* Name */}
                      <Form.Group className="form-group position-relative mb-3">
                        <div className="input-single">
                          <Form.Control
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.name && !!errors.name}
                            required
                          />
                          <i className="fa-solid fa-user"></i>
                        </div>

                        <Form.Control.Feedback
                          type="invalid"
                          className="error-message"
                        >
                          {errors.name}
                        </Form.Control.Feedback>
                      </Form.Group>

                      {/* Phone */}
                      <Form.Group className="form-group position-relative mb-3">
                        <div className="input-single">
                          <Form.Control
                            type="tel"
                            name="phone"
                            id="phone"
                            placeholder="Phone"
                            value={values.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.phone && !!errors.phone}
                            required
                          />
                          <i className="fa-solid fa-phone"></i>
                        </div>

                        <Form.Control.Feedback
                          type="invalid"
                          className="error-message"
                        >
                          {errors.phone}
                        </Form.Control.Feedback>
                      </Form.Group>

                      {/* Subject */}
                      <Form.Group className="form-group position-relative mb-3">
                        <div className="input-single">
                          <Form.Control
                            type="text"
                            name="subject"
                            id="subject"
                            placeholder="Subject"
                            value={values.subject}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.subject && !!errors.subject}
                            required
                          />
                          <i className="fa-solid fa-pencil"></i>
                        </div>

                        <Form.Control.Feedback
                          type="invalid"
                          className="error-message"
                        >
                          {errors.subject}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="col-md-6">
                      {/* Email */}
                      <Form.Group className="form-group position-relative mb-3">
                        <div className="input-single">
                          <Form.Control
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.email && !!errors.email}
                            required
                          />
                          <i className="fa-solid fa-envelope"></i>
                        </div>

                        <Form.Control.Feedback
                          type="invalid"
                          className="error-message"
                        >
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>

                      {/* Address */}
                      <Form.Group className="form-group position-relative mb-3">
                        <div className="input-single">
                          <Form.Control
                            type="text"
                            name="address"
                            id="address"
                            placeholder="Address"
                            value={values.address}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.address && !!errors.address}
                            required
                          />
                          <i className="fa-solid fa-location-dot"></i>
                        </div>

                        <Form.Control.Feedback
                          type="invalid"
                          className="error-message"
                        >
                          {errors.address}
                        </Form.Control.Feedback>
                      </Form.Group>

                      {/* Message */}
                      <Form.Group className="form-group mb-3">
                        <div className="input-single">
                          <Form.Control
                            as="textarea"
                            name="message"
                            id="message"
                            rows={4}
                            placeholder="Write your message here..."
                            value={values.message}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.message && !!errors.message}
                            required
                          />
                          <i className="fa-solid fa-comments"></i>
                        </div>

                        <Form.Control.Feedback
                          type="invalid"
                          className="error-message"
                        >
                          {errors.message}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>
                  </div>

                  {/* SUBMIT BUTTON */}
                  <div className="text-center pt-2">
                    <button
                      className="submit-button"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                  </div>
                </div>

                {/* RESPONSE MESSAGE */}
                {message && <h2 className="text-center m-4">{message}</h2>}
              </FormikForm>
            )}
          </Formik>
        </section>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  //formik css
  .invalid-feedback {
    font-size: 12px;
    color: red;
  }

  .error-message {
    display: block !important;
    font-size: 12px;
    position: relative;
    z-index: 1;
    margin-top: 4px;
  }

  .imgDiv {
    max-width: 100%;
    display: flex;
    flex-direction: column;
  }
  //formik css

  .contact-card,
  .contact-form-section {
    background: #f4f4f4;
    border-radius: 16px;
  }

  .contact-card {
    min-height: 125px;
  }

  .contact-title {
    color: #333;
    font-size: 18px;
    font-weight: 700;
    line-height: 1.3;
    margin-bottom: 8px;
  }

  .contact-text {
    color: #333;
    font-size: 13px;
    line-height: 1.7;
    font-weight: 700;
    letter-spacing: 0.5px;
    margin: 0;
  }

  .contact-icon {
    width: 48px;
    height: 48px;
    border-radius: 16px;
    background: #fff;
    border: 1px solid #d6d6d6;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #555;
    font-size: 18px;
  }

  .contact-form-section {
    width: 100%;
  }

  .section-title {
    color: #333;
    font-size: 30px;
    font-weight: 800;
    line-height: 1.3;
    margin: 0;
  }

  .form-group .form-control {
    height: 42px;
    border: 1px solid transparent;
    border-radius: 8px;
    background: #fff;
    color: #333;
    font-size: 13px;
    font-weight: 500;
    padding: 10px 42px 10px 16px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  }

  .form-group textarea.form-control {
    height: 100px;
    min-height: 100px;
    padding: 14px 16px;
    resize: none;
    line-height: 1.5;
  }

  .form-control::placeholder {
    color: #777;
    opacity: 1;
  }

  .form-control:focus {
    border-color: #999;
    box-shadow: 0 0 0 2px rgba(100, 100, 100, 0.12);
  }

  .form-group i {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: #555;
    font-size: 13px;
    pointer-events: none;
  }

  .submit-button {
    border: 0;
    outline: 0;
    cursor: pointer;
    background: #333;
    color: #fff;
    font-size: 14px;
    font-weight: 700;
    padding: 10px 40px;
    border-radius: 50px;
    transition:
      background 0.2s ease,
      box-shadow 0.2s ease,
      transform 0.2s ease;
  }

  .submit-button:hover {
    background: #222;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  }

  .submit-button:active {
    transform: translateY(1px);
  }

  .toast-message {
    display: none;
    width: 100%;
    margin-top: 20px;
    padding: 12px;
    text-align: center;
    color: #333;
    background: #eee;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
  }

  .toast-message.show {
    display: block;
  }

  @media (max-width: 480px) {
    .contact-card {
      padding: 20px !important;
    }

    .contact-title {
      font-size: 20px;
    }

    .contact-text {
      font-size: 12px;
    }

    .contact-icon {
      width: 44px;
      height: 44px;
      border-radius: 14px;
      font-size: 16px;
    }

    .section-title {
      font-size: 23px;
    }

    .form-group textarea.form-control {
      height: 110px;
      min-height: 110px;
    }

    .submit-button {
      padding: 10px 30px;
      font-size: 13px;
    }
  }

  /* RED BORDER WHEN VALIDATION FAILS */
  .form-group .form-control.is-invalid,
  .form-group .form-control.is-invalid:focus {
    border: 1px solid #dc3545 !important;
    background-image: none;
    box-shadow: 0 0 0 1px rgba(220, 53, 69, 0.12) !important;
  }

  /* NORMAL FOCUS */
  .form-group .form-control:focus {
    border-color: #999;
    box-shadow: 0 0 0 2px rgba(100, 100, 100, 0.12);
  }

  /* KEEP INVALID BORDER RED EVEN WHEN FOCUSED */
  .form-group .form-control.is-invalid:focus {
    border-color: #dc3545 !important;
    box-shadow: 0 0 0 1px rgba(220, 53, 69, 0.15) !important;
  }

  /* RIGHT-SIDE ICON ALIGNMENT */
  .form-group .input-single > i {
    position: absolute;
    right: 16px;
    top: 21px;
    transform: translateY(-50%);
    color: #555;
    font-size: 13px;
    pointer-events: none;
    z-index: 2;
  }

  /* TEXTAREA MESSAGE ICON - CENTER RIGHT */
  .form-group .input-single textarea.form-control + i {
    top: 60%;
    right: 16px;
    transform: translateY(-60%);
  }
`;

export default Contact;
