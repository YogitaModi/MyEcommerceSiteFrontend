import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charset="UTF-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "90vh" }}>{children}</main>
      <Footer />
      <ToastContainer />
    </div>
  );
};
Layout.defaultProps = {
  title: "Chocolate Crisp",
  description: "mern stack project",
  keywords: "mern reactjs mongodb nodejs expressjs",
  author: "Yogita Modi",
};
export default Layout;
