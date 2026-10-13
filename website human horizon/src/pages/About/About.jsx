import React from "react";
import styled from "styled-components";
import { Link } from "react-router";
import { FaFacebookSquare, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const About = () => {
  return (
    <Wrapper>
      <section
        className="about-me-section"
        style={{ marginTop: "180px", marginBottom: "80px" }}
      >
        <div className="breadcrumb">
          <Link className="mb-4 text-dark fw-bold" to="/">
            Home
          </Link>
          <span> &gt; </span> <span className="">About</span>
        </div>

        <div className="about-box">
          <h1>A. F.M. Sarwar Jahan</h1>
          <ul className="social-icons">
            <li>
              <Link className="facebook" to="#">
                <FaFacebookSquare />
              </Link>
            </li>

            <li>
              <Link className="twitter" to="#">
                <FaXTwitter />
              </Link>
            </li>

            <li>
              <Link className="youtube" to="#">
                <FaYoutube />
              </Link>
            </li>

            <li>
              <Link className="instagram" to="#">
                <FaInstagram />
              </Link>
            </li>
          </ul>
          <p className="desc" style={{ textAlign: "justify" }}>
            I have a passion for nature photography. I want to share with you my
            search for capturing a photo-of-a-lifetime that, when enlarged and
            hung on the wall,
          </p>

          <p style={{ textAlign: "justify" }}>
            For quality results from any camera, the basics of photography still
            apply no matter how an image is captured. A tripod is always
            important if slow shutter speeds are needed and big telephoto lenses
            are used. Fast shutter speeds remain a key way to stop action, and
            f-stops continue to affect depth of field. The important parts of a
            scene still need to have the focus centered on them, and dramatic
            light always helps make for dramatic photos.
          </p>

          <p style={{ textAlign: "justify" }}>
            Photography is the art, application and practice of creating durable
            images by recording light or other electromagnetic radiation, either
            electronically by
          </p>

          <p>
            {/* <span>Clients: Riko, PAG, Mr. Bon, James Hayden, Guci</span> */}
            <span>Industry: Sports, News, Lifestyle, Traveling</span>
          </p>
        </div>

        <div className="image-holder">
          <img src="/upload/others/sarwar jahan.jpeg" alt="" />
        </div>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.section``;

export default About;
