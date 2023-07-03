import React from "react";
import Layout from "../components/layout/Layout";
import Usermenu from "../components/layout/Usermenu";
import { useAuth } from "../context/authContext";
const UserDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Dashboard - Chocolate Crisp"}>
      <div
        className="container-fluid  p-3"
        style={{ backgroundColor: "#ddd0c7", height: "100vh" }}
      >
        <div className="row">
          <div className="col-md-3">
            <Usermenu />
          </div>
          <div className="col-md-9">
            <div
              className="card w-75 p-3 shadow"
              style={{
                background: "linear-gradient(to right ,whitesmoke, #DAB692)",
              }}
            >
              <h4>User Name : {auth?.user?.name} </h4>
              <h4>User email : {auth?.user?.email}</h4>
              <h4>User Contact : {auth?.user?.phone}</h4>
              <h4>User Address : {auth?.user?.address}</h4>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
