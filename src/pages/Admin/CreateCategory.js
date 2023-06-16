import React from "react";
import Layout from "../../components/layout/Layout";
import Adminmenu from "../../components/layout/Adminmenu";

const CreateCategory = () => {
  return (
    <Layout title={"Dashboard - Create Category - Chocolate Crisp"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <Adminmenu />
          </div>
          <div className="col-md-3">
            <h1>Create category page</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
