import React, { useState, useEffect } from "react";
import Axios from "axios";

import { Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { apipoints } from "../../../api/OrderList/OrderList";
import { Typeahead } from "react-bootstrap-typeahead";

export default function OrderList(props) {
  const style = {
    boxHeight: {
      height: "18vh",
    },
  };

  const [OrderListData, setOrderListData] = useState([]);

  const fetchData = () => {
    Axios.post(apipoints.getOrderListByType, { type: props.type }).then(
      (res) => {
        setOrderListData(res.data);
      }
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log("propssss", props);
  console.log("OrderListData", OrderListData);
  return (
    <>
      <div>
        <div className="row">
          <h4 className="title">Order List : Service - All</h4>
        </div>
        <div className="row">
          <div className="col-md-10">
            <div>
              <b>Search Order List</b>
              <div
                className="p-1 row d-flex align-items-center"
                style={{
                  border: "1px solid lightgray",
                  borderRadius: "5px",

                  ...style.boxHeight,
                }}
              >
                {/* select customer */}
                <div className="col-md-9">
                  <div>
                    <b>Select Customer</b>
                    <input value="Customer" className="" />
                  </div>
                </div>
                {/* order status */}
                <div className="col-md-3">
                  <div>
                    <b>Order Status</b>
                    <input value="Order status" className="" />
                  </div>
                </div>
                {/* order type */}
                <div className="col-md-9">
                  <b>Order Type</b>
                  <div>
                    <div className="row">
                      <div className="col-md-3">
                        <button
                          className="border rounded p-0 m-0"
                          style={{ background: "none", width: "100%" }}
                        >
                          <div className="d-flex flex-row justify-content-evenly">
                            <input type="radio" style={{ width: "auto" }} />
                            <b>Completed</b>
                          </div>
                        </button>
                      </div>{" "}
                      <div className="col-md-3">
                        <button
                          className="border rounded p-0 m-0"
                          style={{ background: "none", width: "100%" }}
                        >
                          <div className="d-flex flex-row justify-content-evenly">
                            <input type="radio" style={{ width: "auto" }} />
                            <b>Scheduled</b>
                          </div>
                        </button>
                      </div>{" "}
                      <div className="col-md-3">
                        <button
                          className="border rounded p-0 m-0"
                          style={{ background: "none", width: "100%" }}
                        >
                          <div className="d-flex flex-row justify-content-evenly">
                            <input type="radio" style={{ width: "auto" }} />
                            <b>Open</b>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* clear filter */}
                <div className="col-md-3">
                  <button className="button-style m-0 mt-2">
                    Clear Filter
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-2">
            <div>
              <b>Task Pane</b>
              <div
                className="p-1 row d-flex align-items-center"
                style={{
                  border: "1px solid lightgray",
                  borderRadius: "5px",
                  ...style.boxHeight,
                }}
              >
                <button className="button-style m-0">Open Order</button>
                <button className="button-style m-0">Exit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// <div className="row">
//   <Typeahead
//     id="basic-example"
//     placeholder="Select a customer..."
//     // options={AllCust}
//     // onChange={handleCustomerChange}
//     // defaultSelected={[{ label: "All" }]}
//   />
// </div>
