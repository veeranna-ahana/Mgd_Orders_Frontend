import React, { useState, useEffect } from "react";
import Axios from "axios";

import { Form, Table } from "react-bootstrap";

export default function OLTable(props) {
  return (
    <>
      <div style={{ maxHeight: "50vh", overflow: "auto" }}>
        <Table striped className="table-data border" style={{ border: "1px" }}>
          <thead className="tableHeaderBGColor">
            <tr>
              <th>SL No</th>
              <th>Status</th>
              <th>Order No</th>
              <th>Date</th>
              <th>Customer</th>
              <th>Delivery Date</th>
              <th>Contact Name</th>
              <th>PO No</th>
              <th>Special Instructions</th>
            </tr>
          </thead>
          <tbody className="tablebody">
            {props.FilteredOrderListData.map((val, key) => (
              <>
                <tr
                  onClick={() => {
                    props.handleOrderRowSelection(val);
                  }}
                  className={
                    val.Order_No === props.selectedOrderRow?.Order_No
                      ? "rowSelectedClass"
                      : ""
                  }
                >
                  <td>{key + 1}</td>
                  <td>{val.Order_Status}</td>
                  <td>{val.Order_No}</td>
                  <td>{val.Printable_Order_Date}</td>
                  <td>{val.Cust_name}</td>
                  <td>{val.Printable_Delivery_Date}</td>
                  <td>{val.Contact_Name}</td>
                  <td>{val.Purchase_Order}</td>
                  <td>{val.Special_Instructions}</td>
                </tr>
              </>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}
