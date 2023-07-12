import React, { useEffect, useState } from "react";
import Adminmenu from "../../components/layout/Adminmenu";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { toast } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  //   fetching products from database
  const gettingAllProducts = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-products`
      );
      if (res?.data?.success) {
        toast.success(res.data.message);

        setProducts(res.data.product);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    gettingAllProducts();
  }, []);

  return (
    <Layout title={"Product Page - Chocolate Crisp"}>
      <div
        className="container-fluid p-3"
        style={{ backgroundColor: "#FEFCED", marginTop: "65px" }}
      >
        <div className="row">
          <div className="col-md-3">
            <Adminmenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Products</h1>
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <Link
                  to={`/dashboard/admin/product/${p.slug}`}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    className="card m-2"
                    key={uuidv4()}
                    style={{ width: "20rem", minHeight: "36rem" }}
                  >
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-image/${p._id}`}
                      className="card-img-top p-3"
                      alt={p.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">{p.description}</p>
                      <p className="card-text">Price : {p.price}</p>
                      <p className="card-text">Category : {p.category.name}</p>
                      <p className="card-text">{p.shipping}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
