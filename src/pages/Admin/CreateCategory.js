import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import Adminmenu from "../../components/layout/Adminmenu";
import axios from "axios";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import Categoryform from "../../components/forms/Categoryform";
import { useAuth } from "../../context/authContext";
import { Modal } from "antd";

const CreateCategory = () => {
  const [auth] = useAuth();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [updatedName, setUpdatedName] = useState("");
  const [vissible, setVissible] = useState(false);
  const [categoryId, setCategoryId] = useState(null);

  // creating new categories
  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/category/create-category`,
        { name },
        {
          headers: {
            Authorization: auth?.authtoken,
          },
        }
      );
      if (res?.data?.success) {
        toast.success(`Successfully created ${name} category`);
        getAllCategories();
        setName("");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while creating category");
    }
  };

  // fetching all category
  const getAllCategories = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-categories`
      );
      if (res?.data?.success) {
        console.log("category are ", res.data);
        setCategories(res.data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };
  useEffect(() => {
    getAllCategories();
  }, []);

  // updating the category
  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/category/update-category/${categoryId}`,
        { name: updatedName },

        {
          headers: {
            Authorization: auth?.authtoken,
          },
        }
      );
      if (res.data.success) {
        toast.success(`${updatedName} updated succefully`);
        setCategoryId(null);
        setVissible(false);
        setUpdatedName("");
        getAllCategories();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while updating the category");
    }
  };

  // deleting the categories
  const handleDeleteCategory = async (id, name) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/delete-category/${id}`,

        {
          headers: {
            Authorization: auth?.authtoken,
          },
        }
      );
      if (res?.data?.success) {
        toast.success(`Successfully deleted ${name} category`);

        getAllCategories();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while deleting the category");
    }
  };

  return (
    <Layout title={"Dashboard - Create Category - Chocolate Crisp"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <Adminmenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Categories</h1>
            <div className="p-3 w-50">
              <Categoryform
                value={name}
                setValue={setName}
                handleAddCategory={handleAddCategory}
                btnText="Add"
              />
            </div>
            <div className="Text-center container ">
              <table className="table w-75 ">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((value) => (
                    <>
                      {" "}
                      <tr key={uuidv4()}>
                        <td>{value.name}</td>
                        <td>
                          <i
                            className="fa-solid fa-trash m-2"
                            onClick={() => {
                              handleDeleteCategory(value._id, value.name);
                            }}
                            style={{ cursor: "pointer" }}
                          ></i>
                          <i
                            className="fa-solid fa-file-pen m-2"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              setVissible(true);
                              setUpdatedName(value.name);
                              setCategoryId(value._id);
                            }}
                          ></i>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setVissible(false)}
              visible={vissible}
              footer={null}
            >
              <Categoryform
                value={updatedName}
                setValue={setUpdatedName}
                handleAddCategory={handleUpdateCategory}
                btnText="Update"
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
