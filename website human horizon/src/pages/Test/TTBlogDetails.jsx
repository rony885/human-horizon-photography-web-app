import React from "react";
import { Link } from "react-router";

const BlogDetails = () => {
  return (
    <>
      <section
        className="page-banner-section blog-ban"
        style={{
          padding: "150px 0 80px",
        }}
      >
        <div className="container">
          <h1 className="fs-4">
            <Link className="text-dark" to="/">
              Home
            </Link>
            &gt; Blog Details
          </h1>
        </div>
      </section>

      <section className="blog-section">
        <div className="container">
          <p className="page-description">
            See what is cooking in pur website <br /> We got some interesting
            topics just for you
          </p>
          <div className="row">
            <div className="col-lg-8">
              <div className="blog-box standard">
                <div className="blog-post single-post">
                  <Link to="/blog-details" className="post-image">
                    <img src="/upload/blog/1.jpg" alt="" />
                  </Link>
                  <div className="post-content">
                    <ul className="post-tags">
                      <li>
                        <Link to="#">Nature</Link>
                      </li>
                      <li>12.02.2020</li>
                      <li>
                        <Link to="#">
                          <i className="fa fa-comment"></i> 53 comments
                        </Link>
                      </li>
                    </ul>
                    <h2>
                      <Link to="/blog-details">
                        waiting for the right moment
                      </Link>
                    </h2>
                    <p>
                      For quality results from any camera, the basics of
                      photography still apply no matter how an image is
                      captured. A tripod is always important if slow shutter
                      speeds are needed and big telephoto lenses are used. Fast
                      shutter speeds remain Link key way to stop action, and
                      f-stops continue to affect depth of field. The important
                      parts of Link scene still need to have the focus centered
                      on them, and dramatic light always helps make for dramatic
                      photos.
                    </p>
                    <p>
                      Photography is the art, application and practice of
                      creating durable images by recording light or other
                      electromagnetic radiation, either electronically by means
                      of an image sensor, or chemically by means of Link
                      light-sensitive material such as photographic film.
                    </p>
                    <p className="quote-desc">
                      A tripod is always important if slow shutter speeds are
                      needed and big telephoto lenses are used.{" "}
                    </p>
                    <p>
                      For quality results from any camera, the basics of
                      photography still apply no matter how an image is
                      captured. A tripod is always important if slow shutter
                      speeds are needed and big telephoto lenses are used. Fast
                      shutter speeds remain Link key way to stop action, and
                      f-stops continue to affect depth of field. The important
                      parts of Link scene still need to have the focus centered
                      on them, and dramatic light always helps make for dramatic
                      photos.
                    </p>
                    <div className="share-tags-box">
                      <div className="row">
                        <div className="col-md-4">
                          <p>Posted by John Levo</p>
                        </div>
                        <div className="col-md-8">
                          <ul className="share-list">
                            <li>
                              <Link className="facebook" to="#">
                                <i className="fa fa-facebook-square"></i>
                              </Link>
                            </li>
                            <li>
                              <Link className="twitter" to="#">
                                <i className="fa fa-twitter-square"></i>
                              </Link>
                            </li>
                            <li>
                              <Link className="pinterest" to="#">
                                <i className="fa fa-pinterest-square"></i>
                              </Link>
                            </li>
                            <li>
                              <Link className="youtube" to="#">
                                <i className="fa fa-youtube-play"></i>
                              </Link>
                            </li>
                          </ul>
                          <ul className="tags-list">
                            <li>
                              <Link to="#">interior,</Link>
                            </li>
                            <li>
                              <Link to="#">design,</Link>
                            </li>
                            <li>
                              <Link to="#">web</Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="comment-area-box">
                      <h2>Comments (2)</h2>
                      <ul className="comment-tree">
                        <li>
                          <div className="comment-box">
                            <img alt="" src="upload/blog/test1.jpg" />
                            <div className="comment-content">
                              <h4>Hansom Rob</h4>
                              <span>
                                19.06.2018 | 2 hours ago |{" "}
                                <Link to="#">REPLY</Link>
                              </span>
                              <p>
                                As an architect and interior designer, Dean
                                creates warm and inviting environments that
                                deliver the comfort of energy efficient,
                                naturally lit spaces. he spends Link lot of time
                                traveling, for work and pleasure, and relies on
                                her experiences with different cultures to gain
                                unique perspectives. This drives Dean to go Link
                                step further than mere design.
                              </p>
                            </div>
                          </div>
                          <ul className="depth">
                            <li>
                              <div className="comment-box">
                                <img alt="" src="upload/blog/test2.jpg" />
                                <div className="comment-content">
                                  <h4>Johny Bravo</h4>
                                  <span>
                                    19.06.2018 | 1 hours ago |{" "}
                                    <Link to="#">REPLY</Link>
                                  </span>
                                  <p>
                                    Work and pleasure, and relies on her
                                    experiences with different cultures to gain
                                    unique perspectives. This drives Dean to go
                                    Link step further than mere design.
                                  </p>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>

                    <div className="contact-form-box">
                      <h2>Leave Link Comment</h2>
                      <form id="comment-form">
                        <div className="row">
                          <div className="col-md-6">
                            <input
                              name="name"
                              id="name"
                              type="text"
                              placeholder="Name"
                            />
                            <input
                              name="mail"
                              id="mail"
                              type="text"
                              placeholder="Email"
                            />
                            <input
                              name="website"
                              id="website"
                              type="text"
                              placeholder="Subject"
                            />
                          </div>
                          <div className="col-md-6">
                            <textarea
                              name="comment"
                              id="comment"
                              placeholder="Message"
                            ></textarea>
                          </div>
                        </div>
                        <input
                          type="submit"
                          id="submit-contact"
                          value="Submit"
                        />
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="sidebar">
                <div className="text-widget widget">
                  <h2>About me</h2>
                  <img src="upload/blog/side-ab.jpg" alt="" />
                  <h2>david schmee</h2>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took Link galley of type and scrambled it to make
                    Link type specimen book.
                  </p>
                </div>
                <div className="social-widget widget">
                  <h2>Stay Connected</h2>
                  <ul className="social-list">
                    <li>
                      <Link className="facebook" to="#">
                        <i className="fa fa-facebook"></i>
                      </Link>
                    </li>
                    <li>
                      <Link className="twitter" to="#">
                        <i className="fa fa-twitter"></i>
                      </Link>
                    </li>
                    <li>
                      <Link className="dribbble" to="#">
                        <i className="fa fa-dribbble"></i>
                      </Link>
                    </li>
                    <li>
                      <Link className="github" to="#">
                        <i className="fa fa-github-alt"></i>
                      </Link>
                    </li>
                    <li>
                      <Link className="google" to="#">
                        <i className="fa fa-google-plus"></i>
                      </Link>
                    </li>
                    <li>
                      <Link className="vimeo" to="#">
                        <i className="fa fa-vimeo"></i>
                      </Link>
                    </li>
                    <li>
                      <Link className="youtube" to="#">
                        <i className="fa fa-youtube-play"></i>
                      </Link>
                    </li>
                    <li>
                      <Link className="pinterest" to="#">
                        <i className="fa fa-pinterest"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="instagram-widget widget">
                  <h2>Follow us on instagram</h2>
                  <ul className="insta-list">
                    <li>
                      <Link to="#">
                        <img src="upload/blog/s1.jpg" alt="" />
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <img src="upload/blog/s2.jpg" alt="" />
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <img src="upload/blog/s3.jpg" alt="" />
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <img src="upload/blog/s4.jpg" alt="" />
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <img src="upload/blog/s5.jpg" alt="" />
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <img src="upload/blog/s6.jpg" alt="" />
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="tags-widget widget">
                  <h2>Tags</h2>
                  <ul className="tags-list">
                    <li>
                      <Link to="#">interior</Link>
                    </li>
                    <li>
                      <Link to="#">design</Link>
                    </li>
                    <li>
                      <Link to="#">web</Link>
                    </li>
                    <li>
                      <Link to="#">house</Link>
                    </li>
                    <li>
                      <Link to="#">nature</Link>
                    </li>
                    <li>
                      <Link to="#">architecture</Link>
                    </li>
                    <li>
                      <Link to="#">food</Link>
                    </li>
                    <li>
                      <Link to="#">photography</Link>
                    </li>
                    <li>
                      <Link to="#">lifestyle</Link>
                    </li>
                    <li>
                      <Link to="#">photoshop</Link>
                    </li>
                  </ul>
                </div>
                <div className="category-widget widget">
                  <h2>Categories</h2>
                  <ul className="category-list">
                    <li>
                      <Link to="#">
                        Lifestyle <span>(4)</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        Food <span>(2)</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        Architecture <span>(9)</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        Video <span>(15)</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        Uncategorized <span>(4)</span>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="subscribe-widget widget">
                  <h2>Subscribe to our newsletter</h2>
                  <form>
                    <input
                      type="text"
                      name="sub-email"
                      id="sub-email"
                      placeholder="Email"
                    />
                    <button type="submit">Submit</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogDetails;
