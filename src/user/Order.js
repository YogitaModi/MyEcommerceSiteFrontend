import React from "react";
import Layout from "../components/layout/Layout";
import Usermenu from "../components/layout/Usermenu";

const Order = () => {
  return (
    <Layout title={"Dashboard - Orders"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <Usermenu />
          </div>
          <div className="col-md-3">
            <h1>All orders</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Order;
