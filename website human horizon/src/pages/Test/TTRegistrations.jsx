import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";

const Registrations = () => {
  return (
    <Wrapper>
      <div className="container py-5">
        <div className="registration-box mx-auto p-3">
          <h2 className="text-center text-dark mb-4">Registration</h2>

          {/* User Name */}
          <Form.Group className="mb-3">
            <Form.Label>
              Username<span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="customer_name"
              id="customer_name"
              className="registration-input"
            />
          </Form.Group>

          {/* District */}
          <Form.Group className="mb-3">
            <Form.Label>
              District<span className="text-danger">*</span>
            </Form.Label>
            <Form.Select
              name="district"
              id="district"
              className="registration-input"
            >
              <option value="">Select District</option>
              <option value="dhaka">Dhaka</option>
              <option value="chattogram">Chattogram</option>
            </Form.Select>
          </Form.Group>

          {/* Upazila */}
          <Form.Group className="mb-3">
            <Form.Label>
              Upazila<span className="text-danger">*</span>
            </Form.Label>
            <Form.Select
              name="upazila"
              id="upazila"
              className="registration-input"
            >
              <option value="">Select Upazila</option>
              <option value="savar">Savar</option>
              <option value="dhamrai">Dhamrai</option>
            </Form.Select>
          </Form.Group>

          {/* Customer Address */}
          <Form.Group className="mb-3">
            <Form.Label>
              Customer Address<span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={1}
              name="customer_address"
              id="customer_address"
              className="registration-input"
            />
          </Form.Group>

          {/* Phone */}
          <Form.Group className="mb-3">
            <Form.Label>
              Phone<span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              id="phone"
              className="registration-input"
              autoComplete="tel"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              Email<span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="email"
              id="email"
              className="registration-input"
              autoComplete="tel"
            />
          </Form.Group>

          {/* Password */}
          <Form.Group className="mb-4">
            <Form.Label>
              Password<span className="text-danger">*</span>
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
export default Registrations;


   <div className="container py-5">
        <div className="registration-box mx-auto p-3">
          <h2 className="text-center text-dark mb-4">Registration</h2>

          <div className="row">
            <div className="col-lg-12">
              {/* User Name */}
              <Form.Group className="mb-3">
                <Form.Label>
                  Username<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="customer_name"
                  id="customer_name"
                  className="registration-input"
                />
              </Form.Group>
            </div>

            <div className="col-lg-6">
              {/* District */}
              <Form.Group className="mb-3">
                <Form.Label>
                  District<span className="text-danger">*</span>
                </Form.Label>
                <Form.Select
                  name="district"
                  id="district"
                  className="registration-input"
                >
                  <option value="">Select District</option>
                  <option value="dhaka">Dhaka</option>
                  <option value="chattogram">Chattogram</option>
                </Form.Select>
              </Form.Group>
            </div>
            <div className="col-lg-6">
              {/* Upazila */}
              <Form.Group className="mb-3">
                <Form.Label>
                  Upazila<span className="text-danger">*</span>
                </Form.Label>
                <Form.Select
                  name="upazila"
                  id="upazila"
                  className="registration-input"
                >
                  <option value="">Select Upazila</option>
                  <option value="savar">Savar</option>
                  <option value="dhamrai">Dhamrai</option>
                </Form.Select>
              </Form.Group>
            </div>

            <div className="col-lg-12">
              {/* Customer Address */}
              <Form.Group className="mb-3">
                <Form.Label>
                  Customer Address<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={1}
                  name="customer_address"
                  id="customer_address"
                  className="registration-input"
                />
              </Form.Group>
            </div>

            <div className="col-lg-6">
              {/* Phone */}
              <Form.Group className="mb-3">
                <Form.Label>
                  Phone<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  id="phone"
                  className="registration-input"
                  autoComplete="tel"
                />
              </Form.Group>
            </div>
            <div className="col-lg-6">
              {/* Email */}
              <Form.Group className="mb-3">
                <Form.Label>
                  Email<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  id="email"
                  className="registration-input"
                  autoComplete="tel"
                />
              </Form.Group>
            </div>

            <div className="col-lg-6">
              {/* Password */}
              <Form.Group className="mb-4">
                <Form.Label>
                  Password<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  id="password"
                  className="registration-input"
                  autoComplete="new-password"
                />
              </Form.Group>
            </div>
            <div className="col-lg-6">
              {/* Confirm Password */}
              <Form.Group className="mb-4">
                <Form.Label>
                  Confirm Password<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  id="password"
                  className="registration-input"
                  autoComplete="new-password"
                />
              </Form.Group>
            </div>
          </div>

          <button type="button" className="btn registration-btn w-100 mt-2">
            Register
          </button>

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