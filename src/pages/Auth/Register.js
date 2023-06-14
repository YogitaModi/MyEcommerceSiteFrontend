import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import { toast } from "react-toastify";

const Register = () => {
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    register: "",
  });
  const onchange = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("registered easily");
  };
  return (
    <Layout title={"Register now- Chocolate Crisp"}>
      <div className="register container">
        <h1>Register Page</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              value={register.name}
              name="name"
              onChange={onchange}
              required
            />
          </div>

          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              value={register.email}
              name="email"
              onChange={onchange}
              required
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={register.password}
              name="password"
              onChange={onchange}
              required
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Phone
            </label>
            <input
              type="Number"
              className="form-control"
              id="exampleInputEmail1"
              value={register.phone}
              name="phone"
              onChange={onchange}
              required
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              value={register.address}
              name="address"
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
