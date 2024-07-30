import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
// import { Tab, Table, Tabs, Form } from "react-bootstrap";
// Table

export default function FindOldPart(props) {
  const { OrderData, findOldpart, setfindOldpart } = props;
  // console.log("OrderData",OrderData)
  // console.log("findOldpart",findOldpart)
  const [selectedParts, setSelectedParts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const selectItem = (findOldpartItem) => {
    const isSelected = selectedParts.some(
      (item) => item.id === findOldpartItem.id
    );

    setSelectedParts((prevSelectedParts) => {
      const updatedSelectedItems = isSelected
        ? prevSelectedParts.filter((item) => item.id !== findOldpartItem.id)
        : [...prevSelectedParts, findOldpartItem];

      ////  console.log("Selected Order details Rows:", updatedSelectedItems);

      return updatedSelectedItems;
    });
  };

  const filteredFindOldpart = findOldpart?.filter((item) =>
    item.DwgName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <div>
        <div className="row">
          <div className="col-md-4 col-sm-12">
            <div className="row">
              <div className="col-md-5 mb-2 col-sm-12">
                <label className="form-label" style={{ whiteSpace: "nowrap" }}>
                  Search Part Name
                </label>
              </div>
              <div className="col-md-7 mt-2 col-sm-12">
                <input
                  className="in-field"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Enter DWG Name"
                />
              </div>
            </div>
          </div>
        </div>
        <div style={{ overflowY: "scroll", height: "300px" }}>
          <Table
            striped
            className="table-data border"
            style={{ border: "1px" }}
          >
            <thead
              className="tableHeaderBGColor"
              style={{ textAlign: "center" }}
            >
              <tr>
                <th>DWG Name</th>
                <th>Material</th>
                <th>Operation</th>
                <th>Source</th>
                <th>Order No</th>
                <th>Unit Price</th>
                <th>Material Price</th>
              </tr>
            </thead>

            <tbody className="tablebody" style={{ textAlign: "center" }}>
              {filteredFindOldpart?.length > 0 ? (
                filteredFindOldpart.map((findOldpartItem, index) => {
                  const isSelected = selectedParts.includes(findOldpartItem);

                  return (
                    <tr
                      key={index}
                      onClick={() => selectItem(findOldpartItem)}
                      style={{
                        cursor: "pointer",
                        backgroundColor: isSelected ? "#98a8f8" : "",
                      }}
                    >
                      <td>{findOldpartItem.DwgName}</td>
                      <td>{findOldpartItem.Mtrl_Code}</td>
                      <td>{findOldpartItem.Operation}</td>
                      <td>{findOldpartItem.Mtrl_Source}</td>
                      <td>{findOldpartItem.Order_No}</td>
                      <td>{findOldpartItem.UnitPrice}</td>
                      <td>{findOldpartItem.MtrlCost}</td>
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
      </div>
    </>
  );
}
