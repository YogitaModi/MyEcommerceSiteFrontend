import React from "react";
import { useSearch } from "../../context/searchContext";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Searchinput = () => {
  const [search, setSearch] = useSearch();
  const navigate = useNavigate();
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/search/${search.keyword}`
      );
      if (res?.data?.success) {
        setSearch({ ...search, results: res.data.product });
        navigate("/search");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <div>
      <form className="d-flex" role="search" onSubmit={handleSearch}>
        <input
          style={{
            border: "none",
            padding: "8px",
            fontSize: "15px",
            border: "1px solid grey",
            float: "left",
            width: "80%",
            background: "#f1f1f1",
            borderRadius: "30px",
          }}
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={search.keyword}
          onChange={(e) => {
            setSearch({ ...search, keyword: e.target.value });
          }}
        />
        {/* <button className="btn btn-outline-success" type="submit">
          Search
        </button> */}
        <button type="submit" style={{ border: "none" }}>
          <i
            class="fa fa-search"
            style={{
              color: "black",
              backgroundColor: "whitesmoke",
              padding: "5px",
            }}
          ></i>
        </button>
      </form>
    </div>
  );
};

export default Searchinput;
