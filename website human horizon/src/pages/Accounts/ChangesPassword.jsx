import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";

const ChangesPassword = () => {
  return (
    <Wrapper>
      {/* <div className="container py-5"> */}
      <div className="container" style={{ marginTop: "150px" }}>
        <div className="registration-box mx-auto p-3">
          <h2 className="text-center text-dark mb-4">Changes Password</h2>

          {/* Old Password */}
          <Form.Group className="mb-3">
            <Form.Label>
              Old Password<span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="customer_name"
              id="customer_name"
              className="registration-input"
            />
          </Form.Group>

          {/* Phone */}
          <Form.Group className="mb-3">
            <Form.Label>
              New Password<span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              id="phone"
              className="registration-input"
              autoComplete="tel"
            />
          </Form.Group>

          {/* Password */}
          <Form.Group className="mb-4">
            <Form.Label>
              Confirm New Password<span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="password"
              name="password"
              id="password"
              className="registration-input"
              autoComplete="new-password"
            />
          </Form.Group>

          <button type="button" className="btn registration-btn w-100 mt-2">
            Register
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
  margin-top: 100px !important;

  .registration-box {
    max-width: 400px;
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
  @media (max-width: 425px) {
    .container {
      padding-left: 10px !important;
      padding-right: 10px !important;
    }
    .registration-box h2 {
      font-size: 26px;
    }
  }
`;
export default ChangesPassword;
