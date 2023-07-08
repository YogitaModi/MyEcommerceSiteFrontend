import React from "react";
import Layout from "../components/layout/Layout";

const About = () => {
  return (
    <Layout title={"About us - Chocolate Crisp"}>
      <div
        className="row"
        style={{ backgroundColor: "#FEFCED", marginTop: "60px" }}
      >
        <div className="col-md-6  ">
          <img
            src="\images\about.jpg"
            alt="About us"
            style={{ width: "100%", height: "100%" }}
            className="shadow"
          />
        </div>
        <div className="col-md-6 text-center">
          <h1>ABOUT US</h1>
          <hr className="mt-2" />
          <h3>Hello Everyone</h3>
          <p>
            I am From Rajasthan (<strong>INDIA</strong>) . I love to bake so, I
            started to make Chocolates at home by following traditional methods
            and thought to make everyone taste healthy and tasty Chocolates.
          </p>
          <h3>About Chocolate Crisp</h3>
          <p>
            Chocolate Crisp prepares different kind of Chocolates which includes
            "Dark Chocolate","Milk Chocolate", "White Chocolate", "Excotic Dark
            Chocolates" and "Chocolate Truffles" by using organic raw materials
            and delicately conched for appropriate time period, which gives
            Chocolate Smooth and shinny texture and best part is that they are
            homemade which gives a plus point to hygiene and health.
          </p>
          <p>
            All products are prepared in small batches. So, it remains fresh and
            healthy
          </p>
          <p>Supply all over India for more information Contact us</p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
