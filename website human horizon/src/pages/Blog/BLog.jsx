import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router";

// import blogArray from "../../DataJS/blogData.js";
import { useProductContext } from "../../context/ProductContext.jsx";

const BLog = () => {
  // data fetching
  const { blog: blogs, fetchBlog } = useProductContext();

  useEffect(() => {
    fetchBlog();
  }, [fetchBlog]);

  // const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const blogsPerPage = 4;

  // useEffect(() => {
  //   setBlogs(blogArray);
  // }, []);

  // PAGINATION
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;

  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <Wrapper>
      <section
        className="page-banner-section blog-ban"
        style={{ padding: "150px 0 80px" }}
      >
        <div className="container">
          <h1 className="fs-4 mb-0">
            <Link className="text-dark text-decoration-none" to="/">
              Home
            </Link>{" "}
            &gt; Blog
          </h1>
        </div>
      </section>

      <section className="blog-section py-5">
        <div className="container">
          <p className="page-description mb-5">
            See what is cooking in pur website <br />
            We got some interesting topics just for you
          </p>

          <div className="row g-4">
            {/* {blogs.map((blog) => ( */}
            {currentBlogs.map((blog) => (
              <div className="col-lg-6 col-md-6 col-12" key={blog.id}>
                <div className="blog-post h-100">
                  <Link
                    to={`/blog/blog-details/${blog.id}`}
                    className="d-block overflow-hidden"
                  >
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="img-fluid w-100"
                    />
                  </Link>

                  <div className="pt-3">
                    <ul className="list-unstyled d-flex flex-wrap align-items-center gap-3 mb-3">
                      {/* <li>
                        <Link to="#" className="text-dark text-decoration-none">
                          {blog.category}
                        </Link>
                      </li> */}

                      <li>{blog.pub_date}</li>

                      <li>
                        <Link to="#" className="text-dark text-decoration-none">
                          <i className="fa fa-comment me-1"></i>
                          {blog.comments} comments
                        </Link>
                      </li>
                    </ul>

                    <h2 className="h4 mb-3">
                      <Link
                        to={`/blog/blog-details/${blog.id}`}
                        className="text-dark text-decoration-none"
                      >
                        {blog.title}
                      </Link>
                    </h2>

                    <p
                      className="mb-3 description"
                      dangerouslySetInnerHTML={{
                        __html:
                          blog.description.length > 200
                            ? `${blog.description.slice(0, 200)}...`
                            : blog.description,
                      }}
                    />

                    <Link
                      to={`/blog/blog-details/${blog.id}`}
                      className="text-dark text-decoration-none fw-semibold"
                    >
                      Read More
                      <i className="fa fa-long-arrow-right ms-1"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* <ul className="list-unstyled d-flex flex-wrap justify-content-center gap-2 mt-5 mb-0">
            <li>
              <Link to="#" className="pagination-link">
                Prev
              </Link>
            </li>

            {[1, 2, 3, 4, 5].map((page) => (
              <li key={page}>
                <Link to="#" className="pagination-link">
                  {page}
                </Link>
              </li>
            ))}

            <li>
              <Link to="#" className="pagination-link">
                Next
              </Link>
            </li>
          </ul> */}
          {/* PAGINATION */}
          {totalPages > 1 && (
            <ul className="list-unstyled d-flex flex-wrap justify-content-center align-items-center gap-2 mt-5 mb-0">
              <li>
                <button
                  type="button"
                  className="pagination-link"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Prev
                </button>
              </li>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <li key={page}>
                    <button
                      type="button"
                      className={`pagination-link ${
                        currentPage === page ? "active" : ""
                      }`}
                      onClick={() => handlePageChange(page)}
                      aria-current={currentPage === page ? "page" : undefined}
                    >
                      {page}
                    </button>
                  </li>
                ),
              )}

              <li>
                <button
                  type="button"
                  className="pagination-link"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </li>
            </ul>
          )}
        </div>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .blog-post img {
    height: 300px;
    object-fit: cover;
  }

  .description {
    text-align: justify;
  }

  .pagination-link {
    display: inline-block;
    padding: 8px 12px;
    border: 1px solid #ddd;
    color: #333;
    text-decoration: none;
  }

  .pagination-link:hover {
    background: #ff3333;
    color: #fff;
    border-color: #ff3333;
  }

  @media (max-width: 767px) {
    .blog-post img {
      height: 250px;
    }
  }
`;

export default BLog;
