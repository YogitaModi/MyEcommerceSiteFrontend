import { createContext, useContext, useState, useEffect } from "react";

const cartContext = createContext();

const Cartprovider = (props) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let existingItem = localStorage.getItem("cart");
    if (existingItem) {
      setCart(JSON.parse(existingItem));
    }
  }, []);

  return (
    <cartContext.Provider value={[cart, setCart]}>
      {props.children}
    </cartContext.Provider>
  );
};

// custom hook
const useCart = () => useContext(cartContext);
export { Cartprovider, useCart };
