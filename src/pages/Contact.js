import React from "react";

import { BiSupport, BiPhoneCall, BiMailSend } from "react-icons/bi";
import Layout from "../components/layout/Layout";

const Contact = () => {
  return (
    <Layout title={"Contact us - Chocolate Crisp"}>
      <div className="row" style={{ backgroundColor: "#FEFCED" }}>
        <div className="col-md-6">
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
        <div className="col-md-6 mt-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
            For any query and info about product feel free to call anytime we
            24X7 available
          </p>
          <p className="mt-3">
            <BiMailSend /> : www.help@chocolate.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 012-3456789
          </p>
          <p className="mt-3">
            <BiSupport /> : 1800-0000-0000 (toll free)
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
