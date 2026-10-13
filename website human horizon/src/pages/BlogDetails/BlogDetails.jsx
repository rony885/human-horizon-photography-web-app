import React, { useEffect } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router";
import {
  FaFacebookF,
  FaXTwitter,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa6";

// import blogArray from "../../DataJS/blogData.js";
import { useProductContext } from "../../context/ProductContext.jsx";

const BlogDetails = () => {
  // data fetching
  const { blog: blogs, fetchBlog } = useProductContext();
  // const [blogs, setBlogs] = useState([]);
  const { id } = useParams();

  // useEffect(() => {
  //   setBlogs(blogArray);
  // }, []);
  useEffect(() => {
    fetchBlog();
  }, [fetchBlog]);

  const findBlogDetails = blogs.find(
    (blogItem) => blogItem.id === parseInt(id),
  );

  return (
    <Wrapper>
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
            <div className="col-lg-12">
              <div className="blog-box standard">
                <div className="blog-post single-post">
                  <Link to="#" className="post-image">
                    <img
                      src={findBlogDetails && findBlogDetails.image}
                      alt="Blog Imagee"
                    />
                  </Link>
                  <div className="post-content">
                    <ul className="post-tags">
                      <li>{findBlogDetails && findBlogDetails.pub_date}</li>
                      <li>
                        <Link to="#">
                          <i className="fa fa-comment"></i>{" "}
                          {findBlogDetails && findBlogDetails.comments} comments
                        </Link>
                      </li>
                    </ul>
                    <h2>
                      <Link to="#">
                        {findBlogDetails && findBlogDetails.title}
                      </Link>
                    </h2>

                    <p
                      className="description"
                      dangerouslySetInnerHTML={{
                        __html: findBlogDetails?.description || "",
                      }}
                    />

                    <div className="share-tags-box">
                      <div className="row">
                        <div className="col-md-4">
                          <p>
                            Posted by{" "}
                            {findBlogDetails && findBlogDetails.author}
                          </p>
                        </div>
                        <div className="col-md-8">
                          <ul className="share-list">
                            <li>
                              <Link className="facebook" to="#">
                                <FaFacebookF size={15} />
                              </Link>
                            </li>

                            <li>
                              <Link className="twitter" to="#">
                                <FaXTwitter size={15} />
                              </Link>
                            </li>

                            <li>
                              <Link className="youtube" to="#">
                                <FaYoutube size={15} />
                              </Link>
                            </li>

                            <li>
                              <Link className="instagram" to="#">
                                <FaInstagram size={15} />
                              </Link>
                            </li>
                          </ul>

                          <ul className="tags-list">
                            <li>
                              <Link to="#">Social Link</Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .description {
    text-align: justify;
  }
`;

export default BlogDetails;
