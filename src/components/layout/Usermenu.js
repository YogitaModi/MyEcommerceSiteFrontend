import React from "react";
import { NavLink } from "react-router-dom";

const Usermenu = () => {
  return (
    <>
      <div className="Text-center">
        <div className="list-group">
          <h4>Dashboard</h4>
          <NavLink
            to="/dashboard/user/profile"
            className="list-group-item list-group-item-action"
          >
            Your Profile
          </NavLink>
          <NavLink
            to="/dashboard/user/orders"
            className="list-group-item list-group-item-action"
          >
            Your Orders
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Usermenu;
