import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    answer: "",
  });
  const navigate = useNavigate();
  const onchange = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, phone, address, answer } = register;

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        {
          name: name,
          email: email,
          password: password,
          phone: phone,
          address: address,
          answer: answer,
        }
      );
      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate("/userlogin");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log("error is ", error);
      toast.error("something went wrong");
    }
  };
  return (
    <Layout title={"Register now- Chocolate Crisp"}>
      <div
        className="form-container title"
        style={{ backgroundColor: "#FEFCED" }}
      >
        <h1 className="title">Register Page</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={register.name}
              name="name"
              onChange={onchange}
              required
            />
          </div>

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
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input
              type="Number"
              className="form-control"
              id="phone"
              value={register.phone}
              name="phone"
              onChange={onchange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              value={register.address}
              name="address"
              onChange={onchange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="answer" className="form-label">
              What is the name of your primary school?
            </label>
            <input
              type="text"
              className="form-control"
              id="answer"
              value={register.answer}
              name="answer"
              onChange={onchange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
