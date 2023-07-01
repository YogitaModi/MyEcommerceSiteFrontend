import React from "react";
import Layout from "../components/layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";
import "../style/categories.css";

const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title={"Categories - Chocolate Crisp"}>
      <div className="container" style={{ marginTop: "100px" }}>
        <div className="d-flex flex-row flex-wrap container-fluid m-2 p-3">
          {categories?.map((item) => (
            <div className="col-md-4 mt-5 mb-3 gx-3 gy-3" key={item._id}>
              <div
                className="card"
                style={{
                  color: "white",
                  backgroundColor: "#264522",
                  padding: "20px",
                  margin: "1px",
                  // background: "linear-gradient(to bottom, black,gray)",
                }}
              >
                <Link className="btn cat-btn p-4" to={`/category/${item.slug}`}>
                  <h4 style={{ color: "white" }}>{item.name}</h4>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
