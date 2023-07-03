import React from "react";
import Layout from "../../components/layout/Layout";
import Adminmenu from "../../components/layout/Adminmenu";
import { useAuth } from "../../context/authContext";
const Admindashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div
        className="container-fluid m-3 p-3"
        style={{ backgroundColor: "#FEFCED", height: "100vh" }}
      >
        <div className="row">
          <div className="col-md-3">
            <Adminmenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h4>Admin name : {auth?.user?.name}</h4>
              <h4>Admin email : {auth?.user?.email}</h4>
              <h4>Admin contact : {auth?.user?.phone}</h4>
              <h4>Admin address : {auth?.user?.address}</h4>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Admindashboard;
