import React from "react";
import Layout from "../components/layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

const Categories = () => {
  const [categories, loading] = useCategory();

  return (
    <Layout title={"Categories - Chocolate Crisp"}>
      <div style={{ backgroundColor: "#FEFCED" }}>
        <div className="container" style={{ padding: "50px" }}>
          {loading && (
            <div class="d-flex justify-content-center">
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          <div className="d-flex flex-row flex-wrap container-fluid m-2 p-3">
            {!loading &&
              categories?.map((item) => (
                <div className="col-md-4 mt-5 mb-3 gx-3 gy-3" key={item._id}>
                  <div
                    className="card"
                    style={{
                      color: "white",

                      backgroundColor: "#683B2B",
                      padding: "20px",
                      margin: "1px",
                      border: "none",
                      background: "linear-gradient(to bottom, #563727,#372C2E)",
                    }}
                  >
                    <Link
                      className="btn cat-btn p-4"
                      to={`/category/${item.slug}`}
                    >
                      <h4 style={{ color: "white" }}>{item.name}</h4>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
