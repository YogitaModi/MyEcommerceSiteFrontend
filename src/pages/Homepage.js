import React, { useContext, useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Price } from "../components/Pricefilter";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";
import { toast } from "react-hot-toast";

const Homepage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);
  // const [total, setTotal] = useState(0);
  // const [loading, setLoading] = useState(true);
  // const [page, setPage] = useState(1);

  // fetching category
  const getAllCategories = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-categories`
      );
      if (res?.data.success) {
        setCategory(res.data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCategories();
    // eslint-disable-next-line
  }, []);

  // fetching product
  const getAllProducts = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-products`
      );

      if (res?.data.success) {
        setProducts(res.data.product);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  // filter by category
  const handleFilterByCategory = (value, id) => {
    let all = [...checked];

    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  // filter products
  const FilterProduct = async () => {
    const res = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/product/filter-product`,
      { checked, radio }
    );
    if (res.data.success) {
      setProducts(res.data.products);
    }
  };
  useEffect(() => {
    if (checked.length || radio.length) FilterProduct();
  }, [checked, radio]);

  return (
    <Layout title={"Best offers - Chocolate Crisp"}>
      <div className="row">
        <div className="col-md-2">
          <h6 className="text-center m-2">Filter by category</h6>
          <div className="d-flex flex-column container-fluid m-3 p-3">
            {category?.map((item) => (
              <Checkbox
                key={item._id}
                value={item.name}
                onChange={(e) => {
                  handleFilterByCategory(e.target.checked, item._id);
                }}
              >
                {item.name}
              </Checkbox>
            ))}
          </div>
          <h6 className="text-center">Filter by Price</h6>
          <div className="d-flex flex-column container-fluid m-3 p-3">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Price?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column container-fluid m-3 p-3">
            <button
              className="btn btn-secondary"
              type="button"
              onClick={() => {
                window.location.reload();
              }}
            >
              Reset Filters
            </button>
          </div>
        </div>
        <div className="col-md-10">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {products?.map((item) => (
              <div
                className="card m-2"
                style={{ width: "20rem" }}
                key={item._id}
              >
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
                    onClick={() => {
                      navigate(`/product-details/${item.slug}`);
                    }}
                    className="btn btn-primary m-2"
                  >
                    More details
                  </button>
                  <button
                    className="btn btn-secondary m-2"
                    onClick={() => {
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, item])
                      );
                      setCart([...cart, item]);
                      toast.success("Product added to cart successfully");
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

export default Homepage;
