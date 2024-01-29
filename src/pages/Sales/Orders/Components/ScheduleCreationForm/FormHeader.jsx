import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Tab, Table, Tabs, Form } from "react-bootstrap";

export default function FormHeader() {
  return (
    <>
      <div className="col-md-12">
        <h4 className="title">Schedule List Creation Form</h4>
      </div>
      <h5 className="mt-1">
        <b>
          Order No: type - no
          {/* Order No: {props.Type} - {orders?.orderno} */}
        </b>
        <> </>
        <b>
          cust name - code
          {/* {customername} - ({custCode}) */}
        </b>
      </h5>
      <div className="row">
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
      </div>
    </>
  );
}
