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
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={search.keyword}
          onChange={(e) => {
            setSearch({ ...search, keyword: e.target.value });
          }}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default Searchinput;
