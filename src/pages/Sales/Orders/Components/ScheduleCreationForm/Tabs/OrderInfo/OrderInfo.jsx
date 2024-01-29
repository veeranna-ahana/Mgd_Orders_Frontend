import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Tab, Table, Tabs, Form } from "react-bootstrap";
export default function OrderInfo() {
  return (
    <>
      <div>
        <div className="row mt-2">
          <div className="col-md-4 sm-12 ">
            <label className="form-label">Order Type</label>
            <input
              type="text"
              id="orderType"
              //  value={orders?.ordertype}
            />
          </div>
          <div className="col-md-4 sm-12 ">
            <label className="form-label">Delivery Date</label>
            <input
              type="date"
              className="mt-1"
              id="deliveryDate"
              // value={deliveryDate}
            />
          </div>
          <div className="col-md-4 sm-12 ">
            <label className="form-label">Sales Contact</label>
            <input
              type="text"
              id="salesContact"
              // value={salesExecContact}
            />
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-md-4 sm-12 ">
            <label className="form-label">Order Status</label>
            <input type="text" id="orderStatus" value={"Created"} />
          </div>
          <div className="col-md-4 sm-12 ">
            <label className="form-label">Received By</label>
            <input
              type="text"
              //  value={receivedby}
            />
          </div>
          <div className="col-md-4 sm-12 ">
            <label className="form-label">Quotation No</label>
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-md-4 sm-12 ">
            <label className="form-label">Payment Terms</label>
          </div>
          <div className="col-md-4 sm-12 ">
            <label className="form-label">Magod Delivery</label>
            <input
              type="checkbox"
              className="checkBoxStyle mt-3"
              style={{ width: "20px" }}
            />
          </div>
          <div className="col-md-4 sm-12 ">
            <label className="form-label">Recorded By</label>
            <input
              type="text"
              //  value={recordedby}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 sm-12 ">
            <label className="form-label">PO No</label>
          </div>
          <div className="col-md-4 sm-12 ">
            <label className="form-label">Delivery Mode</label>
            <select id="formDeliveryMode" className="ip-select">
              <option value="">Select Delivery Mode</option>
              <option value="By Lorry">By Lorry</option>
              <option value="By Courier">By Courier</option>
              <option value="By Air Cargo">By Air Cargo</option>
              <option value="By Ship">By Ship</option>
            </select>
          </div>
          <div className="col-md-4 sm-12 ">
            <label className="form-label">Dealing Engineer</label>
            <select className="ip-select" id="formDealingEngineer">
              <option>*** Select ***</option>
              {/* {salesExecdata.map((sdata) => {
                    return <option value={sdata["ID"]}>{sdata["Name"]}</option>;
                  })} */}
            </select>
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-md-4 sm-12 ">
            <label className="form-label">Contact Name</label>
            <input type="text" className="mt-2" />
          </div>
          <div className="col-md-4 sm-12 ">
            <label className="form-label">Transport Charges</label>
            <select id="" className="ip-select">
              <option value=""> Select </option>
              <option value="Customer Account">Customer Account</option>
              <option value="Magod Account">Magod Account</option>
            </select>
          </div>
          <div className="col-md-4 sm-12 ">
            <label className="form-label">Order Value</label>
            <input type="text" className="mt-2" />
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-md-12 sm-12 ">
            <label className="form-label">Delivery</label>

            <input type="text" className="mt-1" id="delivery" />
          </div>
        </div>
      </div>
    </>
  );
}
