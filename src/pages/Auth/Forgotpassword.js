import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Forgotpassword = () => {
  const [forgotpassword, setforgotpassword] = useState({
    email: "",
    newPassword: "",
    answer: "",
  });
  const navigate = useNavigate();

  const onchange = (e) => {
    setforgotpassword({ ...forgotpassword, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, newPassword, answer } = forgotpassword;

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
        {
          email: email,
          newPassword: newPassword,
          answer: answer,
        }
      );
      if (res && res.data.success) {
        navigate("/userlogin");
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"Forgot Password - Chocolate Crisp"}>
      <div className="form-container title">
        <h1 className="title">RESET PASSWORD</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={forgotpassword.email}
              name="email"
              onChange={onchange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="answer" className="form-label">
              Which is your favourite Chocolate?
            </label>
            <input
              type="text"
              className="form-control"
              id="answer"
              value={forgotpassword.answer}
              name="answer"
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
              value={forgotpassword.newPassword}
              name="newPassword"
              onChange={onchange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Reset password
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Forgotpassword;
