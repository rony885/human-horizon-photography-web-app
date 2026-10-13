import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";

const ForgotPassword = () => {
  return (
    <Wrapper>
      <div className="container py-5">
        <div className="login-box mx-auto p-3">
          <h2 className="text-center text-dark mb-4">Login To Your Account</h2>
          <p
            style={{
              //   color: "#495057",
              fontSize: "14px",
              marginBottom: "20px",
              fontFamily: "Arial, sans-serif",
              textAlign: "justify",
            }}
          >
            Forgot your password? No problem! Simply provide your{" "}
            <span className="fw-bold">Email</span> and press the "Send OTP"
            button. We'll send you an OTP to help you set a new password.
          </p>

          {/* Phone */}
          <Form.Group className="mb-3">
            <Form.Label>
              Enter Email<span className="text-danger">*</span>
            </Form.Label>

            <Form.Control
              type="text"
              name="phone"
              id="phone"
              className="login-input"
            />
          </Form.Group>

          <button type="button" className="btn login-btn w-100 mt-2">
            Send
          </button>

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

  @media (max-width: 425px) {
    .container {
      padding-left: 10px !important;
      padding-right: 10px !important;
    }

    .login-box h2 {
      font-size: 26px;
    }
  }
`;

export default ForgotPassword;
