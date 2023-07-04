import Layout from "../components/layout/Layout";
import React from "react";
import { useSearch } from "../context/searchContext";
import { toast } from "react-hot-toast";
import { useCart } from "../context/cartContext";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [search] = useSearch();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  return (
    <Layout title="Search - Results Chocolate Crisp">
      <div className="container" style={{ backgroundColor: "#FEFCED" }}>
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {search?.results.length < 1
              ? "No Product Found"
              : `found ${search?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {search.results?.map((item) => (
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
                    {item.description.substring(0, 30)}...
                  </p>

                  <p className="card-text">INR : {item.price}</p>

                  <button
                    to="#"
                    className="btn btn-primary m-2"
                    onClick={() => navigate(`/product-details/${item.slug}`)}
                  >
                    More details
                  </button>
                  <button
                    to="#"
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

export default Search;
