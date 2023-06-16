import React from "react";
import Layout from "../components/layout/Layout";
import Usermenu from "../components/layout/Usermenu";
import { useAuth } from "../context/authContext";
const UserDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Dashboard - Chocolate Crisp"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <Usermenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
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
