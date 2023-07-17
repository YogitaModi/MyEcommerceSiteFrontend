import React from "react";
import { Link, NavLink } from "react-router-dom";
import { GiChocolateBar } from "react-icons/gi";
import { BsShop } from "react-icons/bs";
import { useAuth } from "../../context/authContext";
import toast from "react-hot-toast";
import Searchinput from "../forms/Searchinput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cartContext";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const [categories] = useCategory();
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
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
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
              <Searchinput />
              <li className="nav-item">
                <NavLink className="nav-link text-light " to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown ">
                <NavLink
                  className="nav-link dropdown-toggle text-light"
                  to="/categories"
                  data-bs-toggle="dropdown"
                >
                  Category
                </NavLink>

                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={`/categories`}>
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((item) => (
                    <li key={item._id}>
                      <Link
                        className="dropdown-item"
                        to={`/category/${item.slug}`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link text-light" to="/register">
                      Register
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink className="nav-link text-light" to="/userlogin">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown text-light">
                    <NavLink
                      className="nav-link dropdown-toggle text-light"
                      to="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to="/userlogin"
                          onClick={handleLogout}
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              <li className="nav-item">
                <NavLink className="nav-link text-light" to="/cart">
                  <BsShop />
                  <span className="position-relative translate-middle badge rounded-pill bg-danger">
                    {cart?.length}
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
