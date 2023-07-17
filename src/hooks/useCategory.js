import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const useCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCategories = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-categories`
      );
      if (res?.data.success) {
        setLoading(false);
        setCategories(res?.data?.category);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Error while fetching all categories");
    }
  };
  useEffect(() => {
    getCategories();
  }, []);
  return [categories, loading];
};

export default useCategory;
