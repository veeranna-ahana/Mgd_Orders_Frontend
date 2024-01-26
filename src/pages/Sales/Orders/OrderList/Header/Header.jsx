import React, { useState, useEffect } from "react";
import Axios from "axios";

import { Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

import { Typeahead } from "react-bootstrap-typeahead";

export default function Header(props) {
  const style = {
    boxHeight: {
      height: "111px",
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
                    id="CustomerDropdown"
                    placeholder="Select the Customer..."
                    options={props.CustData}
                    onChange={props.handleCustomerChange}
                  />
                </div>
              </div>
              {/* order status */}
              <div className="col-md-3">
                <div>
                  <b>Order Status</b>
                  <Typeahead
                    id="OrderStatusDropdown"
                    placeholder="Select Order Status..."
                    options={props.OrderStatus}
                    onChange={props.handleOrderStatusChange}
                  />
                </div>
              </div>
              {/* order type */}
              <div className="col-md-8">
                <b>Order Type</b>
                <div>
                  <div className="row">
                    {props.orderTypeButtons.map((val) => (
                      <div className="col-md-3">
                        <button
                          className="button-style m-0 p-0 border rounded"
                          style={
                            !(props.selectedOrderType === val)
                              ? {
                                  height: "auto",
                                  width: "100%",
                                  background: "none",
                                  color: "black",
                                }
                              : { height: "auto", width: "100%" }
                          }
                          id="OrderType"
                          name={val}
                          onClick={props.handleOrderTypeChange}
                        >
                          {val}
                        </button>
                      </div>
                    ))}
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
