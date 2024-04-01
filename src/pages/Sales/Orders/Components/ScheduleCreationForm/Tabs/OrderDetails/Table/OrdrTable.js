import { React, useState } from "react";
import { Tab, Table, Tabs, Form, Modal } from "react-bootstrap";

function OrdrTable(props) {
  const {
    OrderData,
    OrderCustData,
    OrdrDetailsData,
    selectedItems,
    selectItem,
  } = props;

  console.log("OrderData", OrderData);
  return (
    <div style={{ overflow: "auto", height: "480px" }}>
      <Table striped className="table-data border" style={{ border: "1px" }}>
        <thead
          className="tableHeaderBGColor"
          style={{
            textAlign: "center",
            position: "sticky",
            top: "-1px",
            whiteSpace: "nowrap",
          }}
        >
          <tr>
            <th>Drawing/Part Name</th>
            {props.OrderData?.Type === "Profile" ? (
              <th style={{ whiteSpace: "nowrap" }}>Dwg Exists</th>
            ) : null}{" "}
            <th>Material</th>
            <th>Operation</th>
            <th>Source</th>
            <th>Insp Level</th>
            <th>Tolerance</th>
            <th>Packing Level</th>
            {/* <th>LOC</th> */}
            {/* <th>Pierces</th> */}
            <th>JW Cost</th>
            <th>Mtrl Cost</th>
            <th>Unit Rate</th>
            <th>Qty Ordered</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody style={{ textAlign: "center" }}>
          {OrdrDetailsData.map((OrdrDetailsItem, i) => {
            const isSelected = selectedItems?.includes(OrdrDetailsItem);
            return (
              <tr
                key={i}
                onClick={() => selectItem(OrdrDetailsItem)}
                style={{
                  cursor: "pointer",
                  backgroundColor: isSelected ? "#98a8f8" : "",
                }}
              >
                <td>{OrdrDetailsItem.DwgName}</td>
                {props.OrderData?.Type === "Profile" ? (
                  <td>
                    <Form.Check type="checkbox" id="selected" />
                  </td>
                ) : null}
                <td>{OrdrDetailsItem.Mtrl_Code}</td>
                <td>{OrdrDetailsItem.Operation}</td>
                <td>{OrdrDetailsItem.Mtrl_Source}</td>
                <td>{OrdrDetailsItem.InspLevel}</td>
                <td>{OrdrDetailsItem.tolerance}</td>
                <td>{OrdrDetailsItem.PackingLevel}</td>
                {/* <td>{OrdrDetailsItem.LOC}</td> */}
                {/* <td>{OrdrDetailsItem.Holes}</td> */}
                <td>{OrdrDetailsItem.JWCost}</td>
                <td>{OrdrDetailsItem.MtrlCost}</td>
                <td>{OrdrDetailsItem.UnitPrice}</td>
                <td>{OrdrDetailsItem.Qty_Ordered}</td>
                <td>{OrdrDetailsItem.Total}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default OrdrTable;
