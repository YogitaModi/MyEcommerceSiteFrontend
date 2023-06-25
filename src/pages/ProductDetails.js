import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const [details, setDetails] = useState({});
  const params = useParams();

  const productDetails = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      if (res?.data?.product) {
        setDetails(res.data.product);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (params?.slug) {
      productDetails();
    }
  }, [params?.slug]);
  return (
    <Layout>
      <div className="row container mt-2">
        <div className="col-md-6">
          <img
            src={`${process.env.REACT_APP_API}/api/v1/product/product-image/${details._id}`}
            className="card-img-top"
            alt={details.name}
          />
        </div>
        <div className="col-md-6">
          <h1>Product Details</h1>
          <h4>{details.name}</h4>
          <p>
            <strong>{details.description}</strong>
          </p>
          <p>
            Cost : <strong>INR {details.price}</strong>
          </p>
          <p>Category : {details?.category?.name}</p>
          <p>shipping : {details.shipping}</p>
          <button className="btn btn-secondary m-2">Add to cart</button>
        </div>
      </div>
      <div className="row m-2">Similar Products</div>
    </Layout>
  );
};

export default ProductDetails;
