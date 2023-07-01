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
        console.log(res?.data);
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
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-2">
            <Usermenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All orders</h1>
            <div className="border shadow">
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
                  {orders?.map((item, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item?.status}</td>
                      <td>{item?.buyer?.name}</td>
                      <td>{moment(item?.createdAt).fromNow()}</td>
                      <td>{item?.payments?.success ? "Success" : "Failed"}</td>
                      <td>{item?.products?.length}</td>
                      <td>{item?.payments?.transaction?.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Order;
