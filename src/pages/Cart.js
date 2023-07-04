import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { useAuth } from "../context/authContext";
import { useCart } from "../context/cartContext";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

const Cart = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const navigate = useNavigate();
  const [instance, setinstance] = useState("");
  const [loading, setLoading] = useState(false);

  // handler for removing item
  const removeCartItem = (id) => {
    try {
      const newCart = cart.filter((item) => item._id !== id);

      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
      toast.success("item removed successfully");
    } catch (error) {
      toast.error("error while removing item from cart");
    }
  };

  // get payment getway token
  const getClientToken = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/token`
      );
      if (res) {
        setClientToken(res?.data?.clientToken);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.authtoken) getClientToken();
  }, [auth?.authtoken]);

  // handler for total price
  const subtotal = () => {
    try {
      let total = 0;
      for (let i = 0; i < cart?.length; i++) {
        let x = cart[i].price;
        total += x;
      }
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const totalCost = () => {
    try {
      const charge = 100;
      let total = 0;
      for (let i = 0; i < cart?.length; i++) {
        total += cart[i].price;
      }

      let totalCost = total + charge;
      return totalCost.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };
  // payment handler
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/payments`,
        { cart, nonce },
        {
          headers: {
            Authorization: auth?.authtoken,
          },
        }
      );
      if (res?.data?.success) {
        setLoading(false);
        localStorage.removeItem("cart");
        setCart([]);
        navigate("/dashboard/user/orders");
        toast.success("Payment Successful ");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Error while making payment");
    }
  };
  return (
    <Layout title={"Your Cart - Chocolate Crisp"}>
      <div className="container" style={{ backgroundColor: "#FEFCED" }}>
        <div className="row">
          <div className="col-md-12">
            <h5 className="text-center  p-2 mb-2">
              {auth?.authtoken ? `Hello ${auth?.user?.name}` : "Hello Guest"}
            </h5>
            <h5 className="text-center p-2 mb-2">
              {auth?.authtoken
                ? cart?.length > 1
                  ? `You have ${cart.length} items in your cart`
                  : `You have ${cart.length} item in your cart`
                : `You have ${cart.length} items in your cart ...Please Login to checkout`}
            </h5>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart?.length < 1 && (
              <img
                src="/images/cart.jpg"
                style={{
                  width: "40vw",
                  height: "80vh",
                  backgroundColor: "white",
                }}
                alt="Your cart is empty"
              />
            )}
            {cart?.map((item) => (
              <div
                className="row card flex-row m-2 d-flex flex-wrap p-2"
                key={uuidv4()}
              >
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
                <div className="row container">
                  <div className="col-md-8"> </div>
                  <div className="col-md-2 d-flex flex-row m-2">
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
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center">
            <h3>CART SUMMARY</h3>
            <p>Total | Checkout | Payments</p>
            <hr />
            <h6>subtotal : {subtotal()}</h6>
            {cart?.length >= 1 && <h6>Delivery charge : 100</h6>}
            <hr />
            {cart?.length >= 1 && <h5>Total cost : {totalCost()}</h5>}
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h5>Shipping Address</h5>
                  <h6>{auth?.user?.address}</h6>
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

            <div className="mt-2">
              {!clientToken || !auth?.authtoken || cart?.length < 1 ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => {
                      setinstance(instance);
                    }}
                  />
                  <button
                    className="btn btn-primary mb-2"
                    disabled={
                      loading ||
                      !instance ||
                      !auth?.user?.address ||
                      !auth?.authtoken
                    }
                    onClick={handlePayment}
                  >
                    {loading ? "Processing..." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
