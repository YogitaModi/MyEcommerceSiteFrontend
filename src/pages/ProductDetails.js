import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";
import { toast } from "react-hot-toast";

const ProductDetails = () => {
  const [details, setDetails] = useState({});
  const navigate = useNavigate();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const params = useParams();
  const [cart, setCart] = useCart();

  const RelatedProducts = async (pid, cid) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`
      );
      if (res?.data.success) {
        setRelatedProducts(res?.data?.products);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const productDetails = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      if (res?.data?.success) {
        setDetails(res.data.product);
        RelatedProducts(
          res?.data?.product._id,
          res?.data?.product.category._id
        );
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
            width={"200px"}
            height={"450px"}
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
          <button
            className="btn btn-secondary m-2"
            onClick={(e) => {
              localStorage.setItem("cart", JSON.stringify([...cart, details]));

              setCart([...cart, details]);
              toast.success("Product added to cart");
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
      <div className="row m-2">
        <h1>Similar Products</h1>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap mb-2">
          {relatedProducts?.map((item) => (
            <div className="card m-2" style={{ width: "20rem" }}>
              <img
                src={`${process.env.REACT_APP_API}/api/v1/product/product-image/${item._id}`}
                className="card-img-top"
                alt={item.name}
              />
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">
                  {item.description.substring(0, 30)}...
                </p>

                <p className="card-text">INR : {item.price}</p>
                <button
                  className="btn btn-primary ms-1"
                  onClick={() => navigate(`/product-details/${item.slug}`)}
                >
                  More Details
                </button>

                <button
                  className="btn btn-secondary m-2"
                  onClick={(e) => {
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([...cart, item])
                    );
                    setCart([...cart, item]);
                    toast.success("Product added to cart");
                  }}
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
