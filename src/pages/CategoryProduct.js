import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";
import toast from "react-hot-toast";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useCart();

  const getCategoriseProduct = async () => {
    setLoading(true);
    const res = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`
    );
    if (res?.data.success) {
      setLoading(false);
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
          {products?.length < 1 ? (
            <img src="/images/choco.png" alt="No products to display" />
          ) : (
            `${products?.length} Product found`
          )}
        </h6>
        {loading && (
          <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        <div className="row">
          <div className="d-flex flex-wrap">
            {!loading &&
              products?.map((item) => (
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
      </div>
    </Layout>
  );
};

export default CategoryProduct;
