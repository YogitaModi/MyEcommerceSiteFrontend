import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";

const Pagenotfound = () => {
  return (
    <Layout title={"page not found"}>
      <div
        style={{
          minHeight: "75vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexFlow: "column",
        }}
      >
        <h1 style={{ fontSize: "180px" }}>404</h1>
        <h1 style={{ fontWeight: "normal" }}>Oops! Page not found</h1>
        <button className="pageNotFound">
          <Link to="/">Go Back</Link>
        </button>
      </div>
    </Layout>
  );
};

export default Pagenotfound;
