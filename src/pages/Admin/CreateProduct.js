import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import Adminmenu from "../../components/layout/Adminmenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import useCategory from "../../hooks/useCategory";

const CreateProduct = () => {
  const [auth] = useAuth();
  const navigate = useNavigate();
  const { Option } = Select;
  const categories = useCategory();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState("");
  const [shipping, setShipping] = useState("");

  // creating new product
  const handleCreateProduct = async (e) => {
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
      productData.append("image", image);
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/create-product`,
        productData,
        { headers: { Authorization: auth?.authtoken } }
      );
      if (res?.data?.success) {
        toast.success(res.data.message);
        navigate("/dashboard/admin/products");
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
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
              >
                {categories?.map((value) => (
                  <Option key={value._id} value={value._id}>
                    {value.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {image ? image.name : "Image Uploaded"}
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
                {image && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Product-image"
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
                >
                  <Option value="1">Yes</Option>
                  <Option value="0">No</Option>
                </Select>
              </div>
              <div className="mb-3 text-center">
                <button
                  className="btn btn-primary"
                  onClick={handleCreateProduct}
                >
                  Create Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
