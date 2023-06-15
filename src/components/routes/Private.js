import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import React from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";

const Private = () => {
  const [auth, setAuth] = useAuth();
  let [success, setSuccess] = useState(false);

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/user-auth`
      );
      if (res.data.success) {
        setSuccess(true);
      } else {
        setSuccess(false);
      }
    };
    if (auth?.authtoken) authCheck();
  }, [auth?.authtoken]);

  return success ? <Outlet /> : <Spinner />;
};

export default Private;
