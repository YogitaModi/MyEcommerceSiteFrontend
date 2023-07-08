import React from "react";
import Layout from "../components/layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Private policy- Chocolate Crisp"}>
      <div className="row" style={{ backgroundColor: "#FEFCED" }}>
        <div className="col-md-6 ">
          <img
            src="\images\contactus.jpg"
            alt="contact us"
            style={{
              width: "100%",
              height: "100%",
            }}
            className="shadow"
          />
        </div>
        <div className="col-md-6">
          <h1 className="bg-dark text-light text-center mt-3 p-2">
            Private Policy
          </h1>
          <p>privacy policy</p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
