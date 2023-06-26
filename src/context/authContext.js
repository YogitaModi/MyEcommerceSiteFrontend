import { createContext, useContext, useEffect, useState } from "react";

const authContext = createContext();

const Authprovider = (props) => {
  const [auth, setAuth] = useState({
    user: null,
    authtoken: "",
  });

  // setting headers by default
  // axios.defaults.headers.common["Authorization"] = auth?.authtoken;

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parsedata = JSON.parse(data);

      setAuth({
        ...auth,
        user: parsedata.user,
        authtoken: parsedata.authtoken,
      });
    }
    // eslint-disable-next-line
  }, []);
  return (
    <authContext.Provider value={[auth, setAuth]}>
      {props.children}
    </authContext.Provider>
  );
};
// custom hook
const useAuth = () => useContext(authContext);
export { Authprovider, useAuth };
