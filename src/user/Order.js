import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import Usermenu from "../components/layout/Usermenu";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/authContext";
import axios from "axios";
import moment from "moment";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();
  const getAllOrders = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/orders`,
        {
          headers: {
            Authorization: auth?.authtoken,
          },
        }
      );
      if (res) {
        setOrders(res?.data);
      }
    } catch (error) {
      toast.error("Error while fetching orders");
    }
  };
  useEffect(() => {
    if (auth?.authtoken) getAllOrders();
  }, [auth?.authtoken]);

  return (
    <Layout title={"Dashboard - Orders"}>
      <div
        className="container-fluid m-3  p-3"
        style={{ backgroundColor: "#FEFCED" }}
      >
        <div className="row">
          <div className="col-md-2">
            <Usermenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All orders</h1>
            {orders?.map((item, index) => {
              return (
                <div className="border shadow" key={item._id}>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Sr.no.</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Orders</th>
                        <th scope="col">Payments</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Amount(INR)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{index + 1}</td>
                        <td>{item?.status}</td>
                        <td>{item?.buyer?.name}</td>
                        <td>{moment(item?.createdAt).fromNow()}</td>
                        <td>
                          {item?.payments?.success ? "Success" : "Failed"}
                        </td>
                        <td>{item?.products?.length}</td>
                        <td>{item?.payments?.transaction?.amount}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {item?.products?.map((item) => (
                      <div
                        className="row card flex-row mb-2 d-flex flex-wrap p-2"
                        key={item._id}
                      >
                        <div className="col-md-3">
                          <img
                            src={`${process.env.REACT_APP_API}/api/v1/product/product-image/${item._id}`}
                            className="card-img-top "
                            alt={item.name}
                            height={"160px"}
                          />
                        </div>
                        <div className="col-md-9">
                          <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                            <p className="card-text">{item.description}</p>

                            <p className="card-text">INR : {item.price}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Order;
