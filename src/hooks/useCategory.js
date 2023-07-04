import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const useCategory = () => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-categories`
      );
      if (res?.data.success) {
        setCategories(res?.data?.category);
      }
    } catch (error) {
      toast.error("Error while fetching all categories");
    }
  };
  useEffect(() => {
    getCategories();
  }, []);
  return categories;
};

export default useCategory;
