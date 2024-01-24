import React, { useState, useEffect } from "react";
import Axios from "axios";

import { Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
// import { apipoints } from "../../../api/OrderList/OrderList";
import { Typeahead } from "react-bootstrap-typeahead";

export default function Header(props) {
  const style = {
    boxHeight: {
      height: "auto",
    },
  };

  return (
    <>
      <div className="row">
        <div className="col-md-10">
          <div>
            <b>Search Order List</b>
            <div
              className="p-1 row d-flex align-items-center"
              style={{
                ...style.boxHeight,
                border: "1px solid lightgray",
                borderRadius: "5px",
              }}
            >
              {/* select customer */}
              <div className="col-md-9">
                <div>
                  <b>Customer</b>
                  <Typeahead
                    id="customerTypeahead"
                    placeholder="Select a customer..."
                    options={props.CustData}
                    onChange={props.handleCustomerChange}
                    // defaultSelected={[{ label: "All" }]}
                  />
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
              <div className="col-md-8">
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
              <div className="col-md-2">
                <button className="button-style m-0" style={{ width: "100%" }}>
                  Clear Filter
                </button>
              </div>
              <div className="col-md-2">
                <button className="button-style m-0" style={{ width: "100%" }}>
                  Close
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
                ...style.boxHeight,
                border: "1px solid lightgray",
                borderRadius: "5px",
              }}
            >
              <div className="col-md-12">
                <button className="button-style m-0" style={{ width: "100%" }}>
                  Open Order
                </button>
              </div>
              <div className="p-1"></div>
              <div className="col-md-12">
                <button className="button-style m-0" style={{ width: "100%" }}>
                  Exit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
