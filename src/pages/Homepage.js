import React, { useContext } from "react";
import Layout from "../components/layout/Layout";
import { useAuth } from "../context/authContext";
const Homepage = () => {
  // const context = useContext(AuthContext);
  // eslint-disable-next-line
  const [auth, setAuth] = useAuth();
  return (
    <Layout title={"Best offers - Chocolate Crisp"}>
      <h1>{JSON.stringify(auth, null, 4)}</h1>
      {/* <h1></h1> */}
    </Layout>
  );
};

export default Homepage;
