import React from "react";
import { Tab, Table, Tabs, Form } from "react-bootstrap";

export default function IETable(props) {
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
          {props.importedExcelData?.map((val, key) => (
            <>
              <tr>
                <td>{key + 1}</td>
                <td>{val.Dwg_Name}</td>
                <td>{val.Mtrl_Code}</td>
                <td>{val.Source}</td>
                <td>{val.Operation}</td>
                <td>{val.Order_Qty}</td>
                <td>{val.JW_Cost}</td>
                <td>{val.Mtrl_Cost}</td>
                <td>
                  {(
                    parseFloat(val.JW_Cost) + parseFloat(val.Mtrl_Cost)
                  ).toFixed(2)}
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </Table>
    </>
  );
}
