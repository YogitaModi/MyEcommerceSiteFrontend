import React from "react";
import { MdAttachEmail } from "react-icons/md";
import { BsTelephoneFill } from "react-icons/bs";
import { BiSupport } from "react-icons/bi";
import Layout from "../components/layout/Layout";

const Contact = () => {
  return (
    <Layout title={"Contact us - Chocolate Crisp"}>
      <div style={{ minHeight: "75vh" }} className="row contact">
        <div className="col-md-6">
          <img
            src="\images\contactus.jpg"
            alt="contact us"
            style={{
              width: "60vh",
              height: "70vh",
              margin: "10px",
              marginLeft: "100px",
            }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark text-light text-center p-2 ">CONTACT US</h1>
          <p className="text justify mt-2">
            <BiSupport />
            For any query feel free to contact available 24x7
          </p>
          <p className="mt-3">
            <MdAttachEmail />
            www.help@chocolatecrisp.com
          </p>
          <p>
            <BsTelephoneFill />
            +91 5455454545
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
