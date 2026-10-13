// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import { Link } from "react-router";
// import {
//   FaFacebookSquare,
//   FaTwitterSquare,
//   FaPinterestSquare,
//   FaYoutube,
//   FaVimeoSquare,
//   FaChevronUp,
// } from "react-icons/fa";

// const Footer = () => {
//   const currentYear = new Date().getFullYear();
//   const [showGoTop, setShowGoTop] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY >= 40) {
//         setShowGoTop(true);
//       } else {
//         setShowGoTop(false);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);

//     // Check initial scroll position
//     handleScroll();

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   const handleGoTop = (e) => {
//     e.preventDefault();

//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <Wrapper>
//       <footer>
//         {/* Go Top Button */}
//         <Link
//           className={`go-top ${showGoTop ? "active" : ""}`}
//           to="#"
//           onClick={handleGoTop}
//           aria-label="Go to top"
//         >
//           <FaChevronUp />
//         </Link>

//         <div className="container-fluid">
//           <div className="row">
//             <div className="col-sm-12">
//               <p className="copyright-line">
//                 All rights reserved {currentYear}. Designed & Developed by{" "}
//                 <Link
//                   to="https://www.ekattorit.com/"
//                   className="fw-bold footer-text"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <span style={{ color: "red" }}>EKATTOR</span>
//                   <span style={{ color: "green" }}> iT</span>
//                 </Link>
//               </p>
//             </div>

//             {/* <div className="col-sm-6">
//               <ul className="social-icons">
//                 <li>
//                   <Link className="facebook" to="#">
//                     <FaFacebookSquare />
//                   </Link>
//                 </li>

//                 <li>
//                   <Link className="twitter" to="#">
//                     <FaTwitterSquare />
//                   </Link>
//                 </li>

//                 <li>
//                   <Link className="pinterest" to="#">
//                     <FaPinterestSquare />
//                   </Link>
//                 </li>

//                 <li>
//                   <Link className="youtube" to="#">
//                     <FaYoutube size={18} />
//                   </Link>
//                 </li>

//                 <li>
//                   <Link className="vimeo" to="#">
//                     <FaVimeoSquare />
//                   </Link>
//                 </li>
//               </ul>
//             </div> */}
//           </div>
//         </div>
//       </footer>
//     </Wrapper>
//   );
// };

// const Wrapper = styled.section`footer a.go-top {
//   display: flex;
//   align-items: center;
//   justify-content: center;

//   width: 35px;
//   height: 35px;

//   font-size: 12px;
//   color: #696969;

//   text-align: center;
//   background: #e6e6e6;

//   position: absolute;
//   top: -70px;
//   right: 40px;

//   z-index: 2;

//   border-radius: 50%;

//   opacity: 0;
//   visibility: hidden;

//   transition:
//     opacity 0.3s ease,
//     visibility 0.3s ease;
// }

// footer a.go-top:hover {
//   color: #000;
// }

// footer a.go-top.active {
//   opacity: 1;
//   visibility: visible;
// }`;

// export default Footer;

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router";
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaPinterestSquare,
  FaYoutube,
  FaVimeoSquare,
  FaChevronUp,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showGoTop, setShowGoTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 40) {
        setShowGoTop(true);
      } else {
        setShowGoTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleGoTop = (e) => {
    e.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Wrapper>
      <footer>
        {/* Go Top Button */}
        <Link
          className={`go-top ${showGoTop ? "active" : ""}`}
          to="#"
          onClick={handleGoTop}
          aria-label="Go to top"
        >
          <FaChevronUp />
        </Link>

        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <p className="copyright-line">
                All rights reserved {currentYear}. Designed & Developed by{" "}
                <Link
                  to="https://www.ekattorit.com/"
                  className="fw-bold footer-text"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span style={{ color: "red" }}>EKATTOR</span>
                  <span style={{ color: "green" }}> iT</span>
                </Link>
              </p>
            </div>

            <div className="col-sm-6 d-none">
              <ul className="social-icons">
                <li>
                  <Link className="facebook" to="#">
                    <FaFacebookSquare />
                  </Link>
                </li>

                <li>
                  <Link className="twitter" to="#">
                    <FaTwitterSquare />
                  </Link>
                </li>

                <li>
                  <Link className="pinterest" to="#">
                    <FaPinterestSquare />
                  </Link>
                </li>

                <li>
                  <Link className="youtube" to="#">
                    <FaYoutube size={18} />
                  </Link>
                </li>

                <li>
                  <Link className="vimeo" to="#">
                    <FaVimeoSquare />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .social-icons {
    display: none;
  }

  .copyright-line {
    text-align: center;
  }

  footer a.go-top {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 35px;
    height: 35px;

    font-size: 12px;
    color: #696969;

    text-align: center;
    background: #e6e6e6;

    position: absolute;
    top: -70px;
    right: 40px;

    z-index: 2;

    border-radius: 50%;

    opacity: 0;
    visibility: hidden;

    transition:
      opacity 0.3s ease,
      visibility 0.3s ease;
  }

  footer a.go-top:hover {
    color: #000;
  }

  footer a.go-top.active {
    opacity: 1;
    visibility: visible;
  }
`;

export default Footer;
