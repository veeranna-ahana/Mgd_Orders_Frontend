import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Tab, Table, Tabs, Form } from "react-bootstrap";
export default function OrderInfo(props) {
  //console.log("propssss", props.OrderData);
  //console.log("props.OrderData?.salesContact", props.OrderData?.SalesContact);
  //console.log("props.OrderData?.Order_Status", props.OrderData?.Order_Status);

  const orderDateISOString = props.OrderData?.Delivery_Date;
  const orderDate = new Date(orderDateISOString);

  // Get day, month, and year
  const day = orderDate.getDate();
  const month = orderDate.getMonth() + 1; // Month is zero-based, so add 1
  const year = orderDate.getFullYear();

  // Format the date as dd mm yyyy
  const formattedDate = `${year}-${month}-${day}`;
  //console.log(formattedDate);

  return (
    <>
      <div>
        <div className="row mt-2">
          <div className="col-md-2 sm-12 ">
            <label className="form-label">Order Type</label>
            <input
              type="text"
              id="orderType"
              value={props.OrderData?.Order_Type}
            />
          </div>
          <div className="col-md-2 sm-12 ">
            <label className="form-label">Delivery Date</label>
            <input
              type="date"
              className="mt-1"
              id="deliveryDate"
              value={formattedDate}
            />
          </div>

          <div className="col-md-4 sm-12 ">
            <label className="form-label" style={{ marginLeft: "30%" }}>
              Magod Delivery
            </label>

            <input
              type="checkbox"
              className="checkBoxStyle mt-1"
              style={{ width: "20px", marginLeft: "45%" }}
            />
          </div>
          <div className="col-md-4 sm-12 ">
            <label className="form-label">Sales Contact</label>
            <input
              type="text"
              id="salesContact"
              value={props.OrderData?.SalesContact}
            />
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-md-4 sm-12 ">
            <label className="form-label">Order Status</label>
            <input
              type="text"
              id="orderStatus"
              value={props.OrderData?.Order_Status}
            />
          </div>

          <div className="col-md-4 sm-12 ">
            <label className="form-label">Delivery</label>
            <input
              type="text"
              id="delivery"
              value={props.OrderData?.Delivery}
              readOnly
            />
          </div>
          <div className="col-md-4 sm-12 ">
            <label className="form-label">Received By</label>
            <input type="text" value={props.OrderData?.Order_Received_By} />
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-md-4 sm-12 ">
            <label className="form-label">Payment Terms</label>
            <input type="text" value={props.OrderData?.Payment} readOnly />
          </div>
          <div className="col-md-4 sm-12 ">
            <label className="form-label">Delivery Mode</label>
            <input type="text" value={props.OrderData?.Del_Mode} readOnly />
            {/* <select id="formDeliveryMode" className="ip-select">
              <option value="">Select Delivery Mode</option>
              <option value="By Lorry">By Lorry</option>
              <option value="By Courier">By Courier</option>
              <option value="By Air Cargo">By Air Cargo</option>
              <option value="By Ship">By Ship</option>
            </select> */}
          </div>

          <div className="col-md-4 sm-12 ">
            <label className="form-label">Recorded By</label>
            <input type="text" value={props.OrderData?.RecordedBy} />
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 sm-12 ">
            <label className="form-label">PO No</label>
            <input type="text" value={props.OrderData?.Purchase_Order} />
          </div>
          <div className="col-md-4 sm-12 ">
            <label className="form-label">Transport Charges</label>
            <input type="text" value={props.OrderData?.TptCharges} readOnly />

            {/* <select id="" className="ip-select">
              <option value=""> Select </option>
              <option value="Customer Account">Customer Account</option>
              <option value="Magod Account">Magod Account</option>
            </select> */}
          </div>
          <div className="col-md-4 sm-12 ">
            <label className="form-label">Dealing Engineer</label>
            {/* <select className="ip-select" id="formDealingEngineer">
              <option>*** Select ***</option>
              {salesExecdata.map((sdata) => {
                    return <option value={sdata["ID"]}>{sdata["Name"]}</option>;
                  })}
            </select> */}
            <input type="text" value={props.OrderData?.Dealing_Engineer} />
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-md-4 sm-12 ">
            <label className="form-label">Contact Name</label>
            <input type="text" value={props.OrderData?.Contact_Name} />
          </div>
          <div className="col-md-4 sm-12 ">
            <label className="form-label">Quotation No</label>
            <input type="text" value={props.OrderData?.QtnNo} />
          </div>
          {/* <div className="col-md-4 sm-12 ">
            <label className="form-label">Order Value</label>
            <input type="text" value={props.OrderData?.OrderValue} />
          </div> */}
          {/* <div className="col-md-4 sm-12 ">
            <label className="form-label">Delivery</label>
            <input type="text" id="delivery" value={props.OrderData?.Delivery} />
          </div> */}
        </div>

        <div className="row mt-2">
          <div className="col-md-4 sm-12 ">
            <label className="form-label">Order Value</label>
            <input type="text" value={props.OrderData?.OrderValue} />
          </div>
        </div>
      </div>
    </>
  );
}
