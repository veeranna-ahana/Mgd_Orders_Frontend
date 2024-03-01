import React from "react";
import { Tab, Table, Tabs, Form } from "react-bootstrap";

export default function IQMTable(props) {
  return (
    <>
      <Table striped className="table-data border" style={{ border: "1px" }}>
        <thead className="tableHeaderBGColor">
          <tr>
            <th>SL No</th>
            <th>Drawing Name</th>
            <th>Material Code</th>
            <th>Source</th>
            <th>Operation</th>
            <th>Order Qty</th>
            <th>JW Cost</th>
            <th>Material Cost</th>
            <th>Unit Price</th>
          </tr>
        </thead>
        <tbody className="tablebody">
          <tr>
            <td>SL No</td>
            <td>Drawing Name</td>
            <td>Material Code</td>
            <td>Source</td>
            <td>Operation</td>
            <td>Order Qty</td>
            <td>JW Cost</td>
            <td>Material Cost</td>
            <td>Unit Price</td>
          </tr>{" "}
          <tr>
            <td>SL No</td>
            <td>Drawing Name</td>
            <td>Material Code</td>
            <td>Source</td>
            <td>Operation</td>
            <td>Order Qty</td>
            <td>JW Cost</td>
            <td>Material Cost</td>
            <td>Unit Price</td>
          </tr>{" "}
          <tr>
            <td>SL No</td>
            <td>Drawing Name</td>
            <td>Material Code</td>
            <td>Source</td>
            <td>Operation</td>
            <td>Order Qty</td>
            <td>JW Cost</td>
            <td>Material Cost</td>
            <td>Unit Price</td>
          </tr>{" "}
          <tr>
            <td>SL No</td>
            <td>Drawing Name</td>
            <td>Material Code</td>
            <td>Source</td>
            <td>Operation</td>
            <td>Order Qty</td>
            <td>JW Cost</td>
            <td>Material Cost</td>
            <td>Unit Price</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}
