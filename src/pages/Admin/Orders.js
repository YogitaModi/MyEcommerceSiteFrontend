import { toast } from "react-hot-toast";
import Adminmenu from "../../components/layout/Adminmenu";
import Layout from "../../components/layout/Layout";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
import axios from "axios";
import moment from "moment";
import { Select } from "antd";
const { Option } = Select;

const Orders = () => {
  const [status, setStatus] = useState([
    "Not Processed",
    "Processing",
    "Shipped",
    "Out for Delivery",
    "Deliverd",
    "Cancelled",
  ]);

  const [allOrders, setAllOrders] = useState([]);
  const [auth] = useAuth();
  const fetchAllOrders = async () => {
    try {
      const res = await axios(
        `${process.env.REACT_APP_API}/api/v1/auth/all-orders`,
        {
          headers: {
            Authorization: auth?.authtoken,
          },
        }
      );
      if (res?.data?.success) {
        setAllOrders(res?.data?.orders);
      }
    } catch (error) {
      toast.error("Error while fetching all orders");
    }
  };
  useEffect(() => {
    if (auth?.authtoken) fetchAllOrders();
  }, [auth?.authtoken]);

  const handleStatus = async (orderId, value) => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`,
        { status: value },
        {
          headers: {
            Authorization: auth?.authtoken,
          },
        }
      );
      if (res) {
        fetchAllOrders();
      }
    } catch (error) {}
  };
  return (
    <Layout>
      <div
        className="container-fluid  p-3"
        style={{ backgroundColor: "#FEFCED", marginTop: "65px" }}
      >
        <div className="row">
          <div className="col-md-3">
            <Adminmenu />
          </div>
          <div className="col-md-8">
            <h1 className="text-center">ALL ORDERS</h1>
            {allOrders?.map((item, index) => {
              return (
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
                      <tr>
                        <td>{index + 1}</td>
                        <td>
                          <Select
                            bordered={false}
                            onChange={(value) => handleStatus(item._id, value)}
                            defaultValue={item?.status}
                          >
                            {status?.map((s, index) => (
                              <Option key={index} value={s}>
                                {s}
                              </Option>
                            ))}
                          </Select>
                        </td>
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
                        className="row card flex-row m-2 d-flex flex-wrap p-2"
                        key={item._id}
                      >
                        <div className="col-md-3">
                          <img
                            src={`${process.env.REACT_APP_API}/api/v1/product/product-image/${item._id}`}
                            className="card-img-top m-2"
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

export default Orders;
