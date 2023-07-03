import React from "react";
import { NavLink } from "react-router-dom";

const Adminmenu = () => {
  return (
    <>
      <div className="text-center ">
        <div className="list-group">
          <h4>ADMIN-PANEL</h4>
          <NavLink
            to="/dashboard/admin/create-category"
            className="list-group-item list-group-item-warning"
          >
            Create Category
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-product"
            className="list-group-item list-group-item-secondary"
          >
            Create product
          </NavLink>
          <NavLink
            to="/dashboard/admin/products"
            className="list-group-item list-group-item-warning"
          >
            Products
          </NavLink>
          <NavLink
            to="/dashboard/admin/users"
            className="list-group-item list-group-item-secondary"
          >
            Users
          </NavLink>
          <NavLink
            to="/dashboard/admin/all-orders"
            className="list-group-item list-group-item-warning"
          >
            Orders
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Adminmenu;
