import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Tab, Table, Tabs, Form } from "react-bootstrap";

export default function FormHeader(props) {
  let navigate = useNavigate();
  const {
    OrderData,
    OrderCustData,
    handleRegisterBtn,
    handleSaveBtn,
    isButtonDisabled,
    openRegisterOrder,
    closeRegisterOrder,
    openModal,
    closeModal,
    updateOrdrData,
  } = props;

  const openFolder = () => {
    // Create a hidden file input element
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.setAttribute("directory", "");
    fileInput.setAttribute("webkitdirectory", ""); // For Safari support
    fileInput.setAttribute("mozdirectory", ""); // For Firefox support
    fileInput.setAttribute("msdirectory", ""); // For Edge support
    fileInput.setAttribute("odirectory", ""); // For Opera support
    fileInput.setAttribute("multiple", ""); // Allow selection of multiple directories (optional)

    fileInput.click();
  };

  return (
    <>
      <div className="col-md-12">
        <h4 className="title">Schedule List Creation Form</h4>
      </div>
      <div className="row">
        <div className="col-md-6">
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
        <div className="col-md-6">
          <button
            className="button-style"
            style={{ width: "23%" }}
            // onClick={() => {
            //   if (!isButtonDisabled) {
            //     handleRegisterBtn();
            //   }
            // }}
            onClick={props.openRegisterOrder}
            disabled={
              props.isButtonDisabled ||
              props.OrderData?.Order_Status === "Recorded"
            }
          >
            Register Order
          </button>
          <button
            className="button-style"
            style={{ width: "23%" }}
            onClick={() => {
              updateOrdrData();
            }}
            // onClick={props.openModal}
          >
            Save
          </button>
          <button
            className="button-style"
            style={{ width: "23%" }}
            // onClick={() => {
            //   handleSaveBtn();
            // }}
            onClick={openFolder}
          >
            Open folder
          </button>
          <Link to={"/Orders/FindOrder"}>
            <button
              className="button-style "
              style={{ width: "23%" }}
              onClick={() => navigate(-1)}
            >
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
