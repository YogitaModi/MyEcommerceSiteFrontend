import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import Adminmenu from "../../components/layout/Adminmenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useAuth } from "../../context/authContext";
import { useNavigate, useParams } from "react-router-dom";

const Updateproduct = () => {
  const params = useParams();
  const [auth] = useAuth();
  const navigate = useNavigate();
  const { Option } = Select;
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [image, setImage] = useState("");
  const [shipping, setShipping] = useState("");
  const [id, setId] = useState("");
  // fetching all category
  const getAllCategories = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-categories`
      );
      if (res?.data?.success) {
        setCategories(res.data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };
  useEffect(() => {
    getAllCategories();
    // eslint-disable-next-line
  }, []);

  //   fetching single product
  const getSingleProduct = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      if (res?.data?.success) {
        setName(res.data.product.name);
        setId(res.data.product._id);
        setDescription(res.data.product.description);
        setPrice(res.data.product.price);
        setQuantity(res.data.product.quantity);
        setShipping(res.data.product.shipping);
        setCategory(res.data.product.category._id);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getSingleProduct();
    // eslint-disable-next-line
  }, []);

  // updating new product
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      // we have image as input that is why we are providing req.body like this
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("shipping", shipping);
      image && productData.append("image", image);
      const res = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`,
        productData,
        { headers: { Authorization: auth?.authtoken } }
      );
      if (res?.data.success) {
        toast.success(res.data.message);
        navigate("/dashboard/admin/products");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // Deleting the product

  const handleDeleteProduct = async (e) => {
    e.preventDefault();
    let confirmation = window.prompt("You really want to delete this product?");
    if (confirmation === "Yes") {
      try {
        const res = await axios.delete(
          `${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`,
          { headers: { Authorization: auth?.authtoken } }
        );
        if (res.data.success) {
          toast.success(res.data.message);
          navigate("/dashboard/admin/products");
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <Layout title={"Dashboard - Create Product - Chocolate Crisp"}>
      <div
        className="container-fluid m-3 p-3"
        style={{ backgroundColor: "#FEFCED" }}
      >
        <div className="row">
          <div className="col-md-3">
            <Adminmenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Products</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => setCategory(value)}
                value={category}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {image ? image.name : "Image Upload"}
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {image ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Product"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-image/${id}`}
                      alt="Product Image"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  placeholder="Write product name"
                  value={name}
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  className="form-control "
                />
              </div>
              <div className="mb-3">
                <textarea
                  placeholder="Write product description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <input
                  placeholder="Write product price"
                  value={price}
                  type="Number"
                  onChange={(e) => setPrice(e.target.value)}
                  className="form-control "
                />
              </div>
              <div className="mb-3">
                <input
                  placeholder="Write product quantity"
                  value={quantity}
                  type="Number"
                  onChange={(e) => setQuantity(e.target.value)}
                  className="form-control "
                />
              </div>

              <div className="m-1 w-75">
                <Select
                  bordered={false}
                  placeholder="select shipping"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => setShipping(value)}
                  value={shipping ? "Yes" : "No"}
                >
                  <Option value="1">Yes</Option>
                  <Option value="0">No</Option>
                </Select>
              </div>
              <div className="mb-3 text-center">
                <button
                  className="btn btn-primary m-2"
                  onClick={handleUpdateProduct}
                >
                  Update Product
                </button>
                <button
                  className="btn btn-danger m-2"
                  onClick={handleDeleteProduct}
                >
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Updateproduct;
