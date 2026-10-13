import React from "react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <section className="error-section">
      <div className="container">
        <h1>
          YOU’R LOST! <br />
          ERROR 404
        </h1>
        <h2>
          Sorry! <br />
          The requested page cannot be found
        </h2>
        <p>
          Can't find what you need? Take a moment and do a search below
          <br />
          or start from our <Link to="/">Home Page.</Link>
        </p>
      </div>
    </section>
  );
};

export default NotFound;
