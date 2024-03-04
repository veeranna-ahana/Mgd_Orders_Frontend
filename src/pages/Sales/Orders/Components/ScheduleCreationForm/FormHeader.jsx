import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Tab, Table, Tabs, Form } from "react-bootstrap";

export default function FormHeader(props) {
  let navigate = useNavigate();
  const { OrderData, OrderCustData, handleRegisterBtn, handleSaveBtn } = props;

  return (
    <>
      <div className="col-md-12">
        <h4 className="title">Schedule List Creation Form</h4>
      </div>
      <div className="row">
        <div className="col-md-7">
          <h5 className="mt-2">
            <b>
              Order No: {props.OrderData?.Type} - {props.OrderData?.Order_No}
            </b>
            <> </>
            <b>
              {props.OrderCustData?.Cust_name} - (
              {props.OrderCustData?.Cust_Code})
            </b>
          </h5>
        </div>
        <div className="col-md-5">
          <button
            className="button-style"
            onClick={() => {
              handleRegisterBtn();
            }}
          >
            Register Order
          </button>
          <button
            className="button-style"
            onClick={() => {
              handleSaveBtn();
            }}
          >
            Save
          </button>
          <Link to={"/Orders/FindOrder"}>
            <button className="button-style " onClick={() => navigate(-1)}>
              Close
            </button>
          </Link>
        </div>
      </div>

      {/* <div className="row">
        <div className="col-md-6 "></div>
        <div className="col-md-6">
          <button
            className="button-style"
            // onClick={() => {
            //   openRegisterOrder();
            // }}
          >
            Register Order
          </button>
          <button
            className="button-style"
            // onClick={openModal}
          >
            Save
          </button>
          <Link to={"/Orders/FindOrder"}>
            <button
              className="button-style "
              // onClick={() => navigate(-1)}
            >
              Close
            </button>
          </Link>
        </div>
      </div> */}
    </>
  );
}
