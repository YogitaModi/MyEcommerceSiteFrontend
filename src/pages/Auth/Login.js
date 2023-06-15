import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const Login = () => {
  const [auth, setAuth] = useAuth();
  const [register, setRegister] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const onchange = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = register;

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/userlogin`,
        {
          email: email,
          password: password,
        }
      );
      if (res && res.data.success) {
        setAuth({
          ...auth,
          user: res.data.user,
          authtoken: res.data.authtoken,
        });
        console.log(res);
        navigate(location.state || "/");
        toast.success(res.data.message);

        localStorage.setItem("auth", JSON.stringify(res.data));
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log("error is ", error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"Login now- Chocolate Crisp"}>
      <div className="form-container title">
        <h1 className="title">LOGIN PAGE</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={register.email}
              name="email"
              onChange={onchange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={register.password}
              name="password"
              onChange={onchange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
