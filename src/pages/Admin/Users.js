import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import Adminmenu from "../../components/layout/Adminmenu";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../context/authContext";

const Users = () => {
  const [auth] = useAuth();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  // api call for fetching all users
  const getAllUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/all-users`,
        { headers: { Authorization: auth?.authtoken } }
      );
      if (res?.data?.success) {
        setLoading(false);
        setUsers(res?.data?.users);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Error while fetching all users");
    }
  };
  useEffect(() => {
    if (auth?.authtoken) {
      getAllUsers();
    }
  }, [auth?.authtoken]);
  return (
    <Layout title={"Dashboard - All Users- Chocolate Crisp"}>
      <div
        className="container-fluid p-3"
        style={{
          backgroundColor: "#FEFCED",
          height: "100vh",
          marginTop: "65px",
        }}
      >
        <div className="row">
          <div className="col-md-3">
            <Adminmenu />
          </div>
          <div className="col-md-8">
            <h1>Users page</h1>
            {loading && (
              <div class="d-flex justify-content-center">
                <div class="spinner-border" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
            <div className="border shadow">
              <table className="table table-striped table-hover">
                <thead>
                  <tr style={{ backgroundColor: "pink" }}>
                    <th scope="col">Sr.no.</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Contact</th>
                    <th scope="col">Address</th>
                    <th scope="col">Joined</th>
                  </tr>
                </thead>

                <tbody>
                  {!loading &&
                    users?.map((item, index) => {
                      return (
                        <tr>
                          <td>{index + 1}</td>

                          <td>{item?.name}</td>
                          <td>{item?.email}</td>
                          <td>{item?.phone}</td>
                          <td>{item?.address}</td>
                          <td>{item?.date}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
