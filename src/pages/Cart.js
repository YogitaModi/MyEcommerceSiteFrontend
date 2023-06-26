import React from "react";
import Layout from "../components/layout/Layout";
import { useAuth } from "../context/authContext";
import { useCart } from "../context/cartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  // handler for removing item
  const removeCartItem = (id) => {
    try {
      const newCart = cart.filter((item) => item._id !== id);

      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    } catch (error) {
      console.log(error);
    }
  };

  // handler for total price
  const TotalCost = () => {
    try {
      let total = 0;
      for (let i = 0; i < cart?.length; i++) {
        total += cart[i].price;
      }
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h3 className="text-center bg-light p-2 mb-2">
              Hello {auth && auth?.authtoken && auth?.user?.name}
            </h3>
            <h4 className="text-center bg-light p-2 mb-2">
              {auth?.authtoken
                ? cart?.length > 1
                  ? `You have ${cart.length} items in your cart`
                  : `You have ${cart.length} item in your cart`
                : `You have ${cart.length} items in your cart ...Please Login to checkout`}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-7">
            {cart?.map((item) => (
              <div className="row card flex-row m-2 d-flex flex-wrap p-2">
                <div className="col-md-5">
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-image/${item._id}`}
                    className="card-img-top m-2"
                    alt={item.name}
                    height={"160px"}
                  />
                </div>
                <div className="col-md-5">
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.description}</p>

                    <p className="card-text">INR : {item.price}</p>
                  </div>
                </div>
                <div className="col-md-2 text-center">
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      removeCartItem(item._id);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-5 text-center">
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payments</p>
            <hr />
            <h5>Total : {TotalCost()}</h5>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="mb-3">
                  {auth?.authtoken ? (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => {
                        navigate("/userlogin", { state: "/cart" });
                      }}
                    >
                      Please Login
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
