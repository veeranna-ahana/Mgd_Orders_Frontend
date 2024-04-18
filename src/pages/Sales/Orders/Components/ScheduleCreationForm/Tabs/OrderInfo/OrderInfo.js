import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Tab, Table, Tabs, Form } from "react-bootstrap";
export default function OrderInfo(props) {
  // console.log("propssss", props.OrderData);
  //console.log("props.OrderData?.salesContact", props.OrderData?.SalesContact);
  //console.log("props.OrderData?.Order_Status", props.OrderData?.Order_Status);

  const orderDateISOString = props.OrderData?.Delivery_Date;
  const orderDate = new Date(orderDateISOString);

  // Get day, month, and year
  const day = orderDate.getDate();
  const month = orderDate.getMonth() + 1; // Month is zero-based, so add 1
  const year = orderDate.getFullYear();

  // Format the date as dd mm yyyy
  const formattedDate = `${day}-${month}-${year}`;
  // console.log(formattedDate);

  return (
    <>
      <div>
        <div className="row mt-1">
          <div
            className="d-flex col-md-2 sm-12 field-gap"
            style={{ gap: "37px" }}
          >
            <label className="form-label label-space">Order Type</label>
            <input
              className="in-field"
              type="text"
              id="orderType"
              value={props.OrderData?.Order_Type}
            />
          </div>
          <div className="d-flex col-md-2 sm-12 field-gap">
            <label className="form-label label-space">Delivery Date</label>
            <input
              type="text"
              className="in-field"
              id="deliveryDate"
              value={formattedDate}
            />
          </div>

          <div
            className="d-flex col-md-2 sm-12 field-gap"
            style={{ gap: "25px" }}
          >
            <label className="form-label label-space">Magod Delivery</label>

            <input
              type="checkbox"
              className="checkBoxStyle mt-1 col-md-1"
              checked={props.OrderData?.Delivery === 1}
            />
          </div>
          <div
            className="d-flex col-md-2 sm-12 field-gap"
            style={{ gap: "18px" }}
          >
            <label className="form-label label-space">Sales Contact</label>
            <input
              className="in-field"
              type="text"
              id="salesContact"
              value={props.OrderData?.SalesContact}
            />
          </div>
          <div
            className="d-flex col-md-2 sm-12 field-gap"
            style={{ gap: "36px" }}
          >
            <label className="form-label label-space">Recorded By</label>
            <input
              className="in-field"
              type="text"
              value={props.OrderData?.RecordedBy}
            />
          </div>
          <div className="d-flex col-md-2 sm-12 field-gap">
            <label className="form-label label-space">Received By</label>
            <input
              className="in-field"
              type="text"
              value={props.OrderData?.Order_Received_By}
            />
          </div>
        </div>

        <div className="row">
          <div
            className="d-flex col-md-4 sm-12 field-gap"
            style={{ gap: "27px" }}
          >
            <label className="form-label label-space">Order Status</label>
            <input
              className="in-field"
              type="text"
              id="orderStatus"
              value={props.OrderData?.Order_Status}
            />
          </div>

          <div
            className="d-flex col-md-2 sm-12 field-gap"
            style={{ gap: "66px" }}
          >
            <label className="form-label label-space">Delivery</label>
            <input
              className="in-field"
              type="text"
              id="delivery"
              value={props.OrderData?.Delivery}
              readOnly
            />
          </div>
          <div className="col-md-2 sm-12 d-flex field-gap">
            <label className="form-label label-space">Delivery Mode</label>
            <input
              className="in-field"
              type="text"
              id="delivery"
              value={props.OrderData?.Del_Mode}
              readOnly
            />
          </div>
          <div className="col-md-4 sm-12 d-flex field-gap">
            <label className="form-label label-space">Dealing Engineer</label>
            {/* <select className="ip-select" id="formDealingEngineer">
              <option>*** Select ***</option>
              {salesExecdata.map((sdata) => {
                    return <option value={sdata["ID"]}>{sdata["Name"]}</option>;
                  })}
            </select> */}
            <input
              className="in-field"
              type="text"
              value={props.OrderData?.Dealing_Engineer}
            />
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-md-4 sm-12 d-flex field-gap">
            <label className="form-label label-space">Payment Terms</label>
            <input
              className="in-field"
              type="text"
              value={props.OrderData?.Payment}
              readOnly
            />
          </div>
          <div className="d-flex col-md-4 sm-12 field-gap">
            <label className="form-label label-space">Transport Charges</label>
            <input
              className="in-field"
              type="text"
              value={props.OrderData?.TptCharges}
              readOnly
            />

            {/* <select id="" className="ip-select">
              <option value=""> Select </option>
              <option value="Customer Account">Customer Account</option>
              <option value="Magod Account">Magod Account</option>
            </select> */}
          </div>
          <div
            className="d-flex col-md-4 sm-12 field-gap"
            style={{ gap: "26px" }}
          >
            <label className="form-label label-space">Contact Name</label>
            <input
              className="in-field"
              type="text"
              value={props.OrderData?.Contact_Name}
            />
          </div>
        </div>

        <div className="row mt-2">
          <div
            className="d-flex col-md-4 sm-12 field-gap"
            style={{ gap: "60px" }}
          >
            <label className="form-label label-space">PO No</label>
            <input
              className="in-field"
              type="text"
              value={props.OrderData?.Purchase_Order}
            />
          </div>
          <div
            className="d-flex col-md-4 sm-12 field-gap"
            style={{ gap: "33px" }}
          >
            <label className="form-label label-space">Quotation No</label>
            <input
              className="in-field"
              type="text"
              value={props.OrderData?.QtnNo}
            />
          </div>
          {/* <div className="col-md-4 sm-12 ">
            <label className="form-label">Order Value</label>
            <input type="text" value={props.OrderData?.OrderValue} />
          </div> */}
          {/* <div className="col-md-4 sm-12 ">
            <label className="form-label">Delivery</label>
            <input type="text" id="delivery" value={props.OrderData?.Delivery} />
          </div> */}
          <div
            className="d-flex col-md-4 sm-12 field-gap"
            style={{ gap: "38px" }}
          >
            <label className="form-label label-space">Order Value</label>
            <input
              className="in-field"
              type="text"
              value={props.OrderData?.OrderValue}
            />
          </div>
        </div>
      </div>
    </>
  );
}
