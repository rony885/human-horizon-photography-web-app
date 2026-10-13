import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const orders = [
  {
    id: "O-260800001",
    date: "2026-08-17",
    price: "540.00 BDT",
  },
  {
    id: "O-260800002",
    date: "2026-08-17",
    price: "540.00 BDT",
  },
  {
    id: "O-260800003",
    date: "2026-08-17",
    price: "540.00 BDT",
  },
  {
    id: "O-260800004",
    date: "2026-08-17",
    price: "540.00 BDT",
  },
  {
    id: "O-260800005",
    date: "2026-08-18",
    price: "540.00 BDT",
  },
  {
    id: "O-260800006",
    date: "2026-08-18",
    price: "540.00 BDT",
  },
  {
    id: "O-260800007",
    date: "2026-08-18",
    price: "1120.00 BDT",
  },
  {
    id: "O-260800008",
    date: "2026-08-18",
    price: "1120.00 BDT",
  },
  {
    id: "O-260800009",
    date: "2026-08-18",
    price: "1120.00 BDT",
  },
  {
    id: "O-260800010",
    date: "2026-08-18",
    price: "1120.00 BDT",
  },
  {
    id: "O-260800011",
    date: "2026-08-18",
    price: "1120.00 BDT",
  },
  {
    id: "O-260800012",
    date: "2026-08-18",
    price: "1120.00 BDT",
  },
  {
    id: "O-260800013",
    date: "2026-08-18",
    price: "1120.00 BDT",
  },
];

const Profile = ({ c_user }) => {
  return (
    <Wrapper>
      <section
        className="vs-blog-wrapper space-top space-extra-bottom"
        //  style={{ marginTop: "130px", marginBottom: "80px" }}
        style={{ marginTop: "130px" }}
      >
        <div className="container">
          <div className="d-flex align-items-center gap-2 mb-4">
            <Link className="text-dark fw-bold text-decoration-none" to="/">
              Home
            </Link>
            <span>&gt;</span>
            <span>Profle</span>
          </div>

          {/* Profile Header */}
          <div className="profile-section">
            <div className="profile-avatar">
              <img
                src="https://i.pravatar.cc/150?img=12"
                alt="Rony71 Profile"
              />
            </div>

            <div className="profile-info">
              <h2>Rony 71</h2>

              <p>rony71@gmail.com</p>

              <Link className="btn-profile-update">Profile update</Link>
            </div>
          </div>

          {/* Order History */}
          <h3 className="section-title">Order History</h3>

          <div className="order-table-wrapper">
            <table className="order-table">
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="col-id">{order.id}</td>

                    <td className="col-date">{order.date}</td>

                    <td className="col-price">{order.price}</td>

                    <td className="col-action">
                      <OverlayTrigger
                        placement="left"
                        overlay={
                          <Tooltip id={`view-order-${order.id}`}>
                            View Order
                          </Tooltip>
                        }
                      >
                        <Link to="/order-view" className="view-btn">
                          <i className="fa-regular fa-eye"></i>
                        </Link>
                      </OverlayTrigger>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .profile-section {
    display: flex;
    align-items: flex-start;
    gap: 20px;
    margin-bottom: 40px;
  }

  .profile-avatar {
    width: 80px;
    height: 80px;
    flex-shrink: 0;
    background-color: #e2e8f0;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #64748b;
    font-size: 14px;
    overflow: hidden;
  }

  .profile-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .profile-info h2 {
    font-size: 24px;
    font-weight: 400;
    color: #222222;
    margin: 0 0 6px;
  }

  .profile-info p {
    font-size: 15px;
    color: #777777;
    margin: 0 0 16px;
  }

  .btn-profile-update {
    background-color: #d9d9d9;
    color: #222222;
    border: none;
    padding: 8px 16px;
    font-size: 14px;
    border-radius: 3px;
    cursor: pointer;
    transition: background-color 0.2s ease;
    font-family: Arial, sans-serif;
  }

  .btn-profile-update:hover {
    background-color: #bfbfbf;
    color: #222222;
  }

  .section-title {
    font-size: 20px;
    font-weight: 400;
    color: #222222;
    margin: 0 0 15px;
    font-family: Arial, sans-serif;
  }

  .order-table-wrapper {
    width: 100%;
    overflow-x: auto;
    font-family: Arial, sans-serif;
  }

  .order-table {
    width: 100%;
    border-collapse: collapse;
  }

  .order-table td {
    padding: 6px 8px;
    border-bottom: 1px solid #e9e9e9;
    font-size: 14px;
    color: #555555;
    vertical-align: middle;
  }

  .order-table tr:last-child td {
    border-bottom: 1px solid #e9e9e9;
  }

  .col-id {
    width: 35%;
    text-align: left;
  }

  .col-date {
    width: 25%;
    text-align: center;
  }

  .col-price {
    width: 30%;
    text-align: right;
    padding-right: 15px !important;
  }

  .col-action {
    width: 10%;
    text-align: center;
  }

  .view-btn {
    color: #4d4d4d;
    text-decoration: none;
    font-size: 16px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s ease;
  }

  .view-btn:hover {
    color: #bfbfbf;
  }

  @media (max-width: 575px) {
    .profile-section {
      gap: 15px;
      margin-bottom: 30px;
    }

    .profile-avatar {
      width: 65px;
      height: 65px;
    }

    .profile-info h2 {
      font-size: 20px;
    }

    .profile-info p {
      font-size: 14px;
      margin-bottom: 12px;
    }

    .btn-profile-update {
      padding: 7px 12px;
      font-size: 13px;
    }

    .section-title {
      font-size: 18px;
    }

    .order-table {
      min-width: 550px;
    }

    .order-table td {
      padding: 12px 8px;
      font-size: 13px;
    }
  }
`;

export default Profile;
