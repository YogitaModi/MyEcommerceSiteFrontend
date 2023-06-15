import React from "react";
import { Link, NavLink } from "react-router-dom";
import { GiChocolateBar } from "react-icons/gi";
import { BsShop } from "react-icons/bs";
import { useAuth } from "../../context/authContext";

import toast from "react-hot-toast";
const Header = () => {
  const [auth, setAuth] = useAuth();
  const handleLogout = () => {
    localStorage.removeItem("auth");
    setAuth({
      ...auth,
      user: null,
      authtoken: "",
    });
    toast.success("Logout Successfully");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary ">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link className="navbar-brand" to="/">
              <GiChocolateBar /> Chocolate Crisp
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link " to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/category">
                  Category
                </NavLink>
              </li>
              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/register">
                      Register
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink className="nav-link" to="/userlogin">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/userlogin"
                    onClick={handleLogout}
                  >
                    Logout
                  </NavLink>
                </li>
              )}
              <li className="nav-item">
                <NavLink className="nav-link" to="/cart">
                  <BsShop />
                  <span className="position-fixed translate-middle badge rounded-pill bg-danger">
                    1<span className="visually-hidden">unread messages</span>
                  </span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
