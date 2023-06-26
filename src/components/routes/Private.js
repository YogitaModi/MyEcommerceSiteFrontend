import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import React from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";

const Private = () => {
  const [auth] = useAuth();
  let [success, setSuccess] = useState(false);

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/user-auth`,
        {
          headers: {
            Authorization: auth?.authtoken,
          },
        }
      );
      if (res.data.success && auth?.user?.role === 0) {
        setSuccess(true);
      } else {
        setSuccess(false);
      }
    };
    if (auth?.authtoken) authCheck();
  }, [auth?.authtoken, auth?.user?.role]);

  return success ? <Outlet /> : <Spinner path="" />;
};

export default Private;
