import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const getCategoriseProduct = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`
    );
    if (res?.data.success) {
      setProducts(res.data.products);
      setCategory(res?.data.category);
    }
  };
  useEffect(() => {
    if (params?.slug) getCategoriseProduct();
  }, [params?.slug]);

  return (
    <Layout title={"Product found - CHOCOLATE CRISP"}>
      <div
        className="container"
        style={{ backgroundColor: "#FEFCED", marginTop: "65px" }}
      >
        <h4 className="text-center">Category {category?.name}</h4>
        <h6 className="text-center">
          {products?.length < 1
            ? "No products to display"
            : `${products?.length} Product found`}
        </h6>
        <div className="row">
          <div className="d-flex flex-wrap">
            {products?.map((item) => (
              <div
                className="card m-2"
                style={{ width: "20rem" }}
                key={item?._id}
              >
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-image/${item._id}`}
                  className="card-img-top"
                  alt={item.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">
                    {item.description.substring(0, 60)}...
                  </p>

                  <p className="card-text">INR : {item.price}</p>

                  <button
                    onClick={() => {
                      navigate(`/product-details/${item.slug}`);
                    }}
                    className="btn btn-primary m-2"
                  >
                    More details
                  </button>
                  <button className="btn btn-secondary m-2">Add to cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
