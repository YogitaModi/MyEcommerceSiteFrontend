import React from "react";
import Layout from "../components/layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title={"Categories - Chocolate Crisp"}>
      <div className="container">
        <div className="row">
          {categories?.map((item) => (
            <div className="col-md-6 mt-6 mb-3 gx-3 gy-3" key={item._id}>
              <Link
                className="btn btn-primary text-light"
                to={`/category/${item.slug}`}
              >
                {item.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
