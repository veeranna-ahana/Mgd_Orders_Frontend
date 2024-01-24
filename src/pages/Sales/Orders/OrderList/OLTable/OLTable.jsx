import React, { useState, useEffect } from "react";
import Axios from "axios";

import { Form, Table } from "react-bootstrap";

export default function OLTable() {
  return (
    <>
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
          <tr>
            <td>SL No</td>
            <td>Status</td>
            <td>Order No</td>
            <td>Date</td>
            <td>Customer</td>
            <td>Delivery Date</td>
            <td>Contact Name</td>
            <td>PO No</td>
            <td>Special Instructions</td>
          </tr>

          <tr>
            <td>SL No</td>
            <td>Status</td>
            <td>Order No</td>
            <td>Date</td>
            <td>Customer</td>
            <td>Delivery Date</td>
            <td>Contact Name</td>
            <td>PO No</td>
            <td>Special Instructions</td>
          </tr>

          <tr>
            <td>SL No</td>
            <td>Status</td>
            <td>Order No</td>
            <td>Date</td>
            <td>Customer</td>
            <td>Delivery Date</td>
            <td>Contact Name</td>
            <td>PO No</td>
            <td>Special Instructions</td>
          </tr>

          <tr>
            <td>SL No</td>
            <td>Status</td>
            <td>Order No</td>
            <td>Date</td>
            <td>Customer</td>
            <td>Delivery Date</td>
            <td>Contact Name</td>
            <td>PO No</td>
            <td>Special Instructions</td>
          </tr>

          <tr>
            <td>SL No</td>
            <td>Status</td>
            <td>Order No</td>
            <td>Date</td>
            <td>Customer</td>
            <td>Delivery Date</td>
            <td>Contact Name</td>
            <td>PO No</td>
            <td>Special Instructions</td>
          </tr>
          <tr>
            <td>SL No</td>
            <td>Status</td>
            <td>Order No</td>
            <td>Date</td>
            <td>Customer</td>
            <td>Delivery Date</td>
            <td>Contact Name</td>
            <td>PO No</td>
            <td>Special Instructions</td>
          </tr>

          <tr>
            <td>SL No</td>
            <td>Status</td>
            <td>Order No</td>
            <td>Date</td>
            <td>Customer</td>
            <td>Delivery Date</td>
            <td>Contact Name</td>
            <td>PO No</td>
            <td>Special Instructions</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}
