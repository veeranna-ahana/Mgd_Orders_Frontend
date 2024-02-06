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

  // const [selectedItems, setSelectedItems] = useState([]);

  // const selectItem = (OrdrDetailsItem) => {
  //   const isSelected = selectedItems.includes(OrdrDetailsItem);

  //   // Use the callback function to log the updated state after the update
  //   setSelectedItems((prevSelectedItems) => {
  //     const updatedSelectedItems = isSelected
  //       ? prevSelectedItems.filter((item) => item !== OrdrDetailsItem)
  //       : [...prevSelectedItems, OrdrDetailsItem];

  //     // Log the updated state
  //     console.log("Selected Order details Rows:", updatedSelectedItems);

  //     return updatedSelectedItems;
  //   });
  // };

  return (
    <div style={{ overflowX: "scroll", overflowY: "scroll", height: "860px" }}>
      <Table striped className="table-data border" style={{ border: "1px" }}>
        <thead className="tableHeaderBGColor">
          <tr>
            <th>Select</th>
            <th style={{ whiteSpace: "nowrap" }}>Drawing/Part Name</th>
            <th style={{ whiteSpace: "nowrap" }}>Dwg Exists</th>
            <th>Material</th>
            <th>Operation</th>
            <th>Source</th>
            <th style={{ whiteSpace: "nowrap" }}>Insp Level</th>
            <th>Tolerance</th>
            <th style={{ whiteSpace: "nowrap" }}>Packing Level</th>
            <th>LOC</th>
            <th>Pierces</th>
            <th style={{ whiteSpace: "nowrap" }}>JW Cost</th>
            <th style={{ whiteSpace: "nowrap" }}>Mtrl Cost</th>
            <th style={{ whiteSpace: "nowrap" }}>Unit Rate</th>
            <th style={{ whiteSpace: "nowrap" }}>Qty Ordered</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody className="tablebody" style={{ textAlign: "center" }}>
          {OrdrDetailsData?.length > 0 ? (
            OrdrDetailsData?.map((OrdrDetailsItem, i) => {
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
                  <td>
                    <Form.Check type="checkbox" id="selected" />
                  </td>
                  <td>{OrdrDetailsItem.DwgName}</td>
                  <td>
                    <Form.Check type="checkbox" id="selected" />
                  </td>
                  <td>{OrdrDetailsItem.Mtrl_Code}</td>
                  <td>{OrdrDetailsItem.Operation}</td>
                  <td>{OrdrDetailsItem.Mtrl_Source}</td>
                  <td>{OrdrDetailsItem.InspLevel}</td>
                  <td>{OrdrDetailsItem.tolerance}</td>
                  <td>{OrdrDetailsItem.PackingLevel}</td>
                  <td>{OrdrDetailsItem.LOC}</td>
                  <td>{OrdrDetailsItem.Holes}</td>
                  <td>{OrdrDetailsItem.JWCost}</td>
                  <td>{OrdrDetailsItem.MtrlCost}</td>
                  <td>{OrdrDetailsItem.UnitPrice}</td>
                  <td>{OrdrDetailsItem.Qty_Ordered}</td>
                  <td>{OrdrDetailsItem["Total"]}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={2}>No Items Added</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default OrdrTable;
