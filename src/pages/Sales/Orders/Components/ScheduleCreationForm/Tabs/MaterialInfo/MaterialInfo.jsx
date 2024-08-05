import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import { endpoints } from "../../../../../../api/constants";
import { getRequest, postRequest } from "../../../../../../api/apiinstance";
export default function MaterialInfo(props) {
  const { OrderData } = props;
  const [StockPosition, setStockPosition] = useState([]);
  const [LoadArrival1, setLoadArrival1] = useState([]);
  const [LoadArrival2, setLoadArrival2] = useState([]);
  const [checkboxValue, setCheckboxValue] = useState(0);
  //console.log("OrderData", OrderData?.Order_No);

  let getStockData = () => {
    postRequest(
      endpoints.loadStockPosition,
      { custcode: OrderData?.Cust_Code, CB_Magod: checkboxValue },
      (StockPositionData) => {
        // //console.log("StockPositionData......", StockPositionData);
        // //console.log("StockPositionData......", StockPositionData[0].Mtrl_Code);
        setStockPosition(StockPositionData);
      }
    );
  };

  let ArrivalData = () => {
    postRequest(
      endpoints.LoadArrival,
      { custcode: OrderData?.Cust_Code },
      (LoadArrivalData) => {
        console.log("LoadArrivalData......", LoadArrivalData);
        setLoadArrival1(LoadArrivalData);
      }
    );
  };

  let ArrivalData2 = () => {
    // postRequest(
    //   endpoints.LoadArrival2,
    //   { custcode: OrderData?.Cust_Code, CB_Magod: checkboxValue },
    //   (LoadArrivalData2) => {
    //     //console.log(
    //       "LoadArrivalData......",
    //       LoadArrivalData2.mtrlReceiptDetails
    //     );
    //     setLoadArrival2(LoadArrivalData2.mtrlReceiptDetails);
    //   }
    // );
  };
  const [selectedRow, setSelectedRow] = useState(null);
  const handleRowClick = (index) => {
    const clickedRow = LoadArrival1[index];
    console.log("clickedRow", clickedRow.RVID);
    // If the clicked row is already selected, deselect it; otherwise, select the new row
    setSelectedRow(selectedRow === clickedRow ? null : clickedRow);

    postRequest(
      endpoints.LoadArrival2,
      { custcode: OrderData?.Cust_Code, RVID: clickedRow.RVID },
      (LoadArrivalData2) => {
        console.log(
          "LoadArrivalData2......",
          LoadArrivalData2.mtrlReceiptDetails
        );

        setLoadArrival2(LoadArrivalData2);
        // setLoadArrival2(LoadArrivalData2.mtrlReceiptDetails);
      }
    );
  };

  // const handleRowClick = (index) => {
  //   const selectedRow = LoadArrival1[index];

  //   // Check if the row is already selected
  //   const isSelected = selectedRows.some(
  //     (row) => row.CustDocuNo === selectedRow.CustDocuNo
  //   );

  //   // If selected, remove from the selectedRows; otherwise, add to the selectedRows
  //   const newSelectedRows = isSelected
  //     ? selectedRows.filter((row) => row.CustDocuNo !== selectedRow.CustDocuNo)
  //     : [...selectedRows, selectedRow];

  //   //console.log("newSelectedRows", newSelectedRows);

  //   setSelectedRows(newSelectedRows);
  // };
  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    const newValue = isChecked ? 1 : 0;
    setCheckboxValue(newValue);
    // //console.log("Checkbox value:", newValue);
  };

  //console.log(checkboxValue);
  // console.log("1", StockPosition);
  console.log("LoadArrival1", LoadArrival1);
  console.log("LoadArrival2", LoadArrival2);

  return (
    <>
      <div>
        <div className="row">
          <div className="col-md-4 col-sm-12">
            <label className="form-label">Stock Position</label>

            <div className="row">
              <div className="col-md-4 col-sm-12">
                <button className="button-style" onClick={getStockData}>
                  Load
                </button>
              </div>
              <div className="col-md-4 col-sm-12">
                <div className="row mt-2">
                  <div className="col-md-5 col-sm-12">
                    <input
                      type="checkbox"
                      className="checkBoxStyle"
                      onChange={handleCheckboxChange}
                    />
                  </div>
                  <div
                    className="col-md-7 col-sm-12"
                    style={{ marginTop: "-13px" }}
                  >
                    <label className="form-label label-space">
                      Magod Laser
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="mt-1"
              style={{
                overflowY: "scroll",
                overflowX: "scroll",
                height: "250px",
              }}
            >
              <Table
                striped
                className="table-data border"
                style={{
                  border: "1px",
                }}
              >
                <thead className="tableHeaderBGColor">
                  <tr>
                    <th>Material</th>
                    <th>Width</th>
                    <th>Length</th>
                    <th style={{ whiteSpace: "nowrap" }}>In Stock</th>
                    <th>Locked</th>
                    <th>Scrap</th>
                  </tr>
                </thead>
                <tbody className="tablebody">
                  {StockPosition?.length ? (
                    StockPosition.map((item, index) => (
                      <tr key={index}>
                        <td>{item.Mtrl_Code}</td>
                        <td>{item.DynamicPara1}</td>
                        <td>{item.DynamicPara2}</td>
                        <td>{item.inStock}</td>
                        <td>{item.Locked}</td>
                        <td>{item.Scrap}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={2}>No Items Added</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </div>
          <div className="col-md-4 col-sm-12">
            <label className="form-label">Arrival</label>

            <div>
              <button className="button-style" onClick={ArrivalData}>
                Load
              </button>
            </div>
            <div
              className="mt-1"
              style={{
                overflowY: "scroll",
                overflowX: "scroll",
                height: "250px",
              }}
            >
              <Table
                striped
                className="table-data border"
                style={{
                  border: "1px",
                  // height: "200px",
                }}
              >
                <thead className="tableHeaderBGColor">
                  <tr>
                    <th style={{ whiteSpace: "nowrap" }}>Cust Docu No</th>
                    <th style={{ whiteSpace: "nowrap" }}>RV No</th>
                    <th style={{ whiteSpace: "nowrap" }}>Date</th>
                    <th style={{ whiteSpace: "nowrap" }}>Up Dated</th>
                  </tr>
                </thead>
                <tbody className="tablebody">
                  {LoadArrival1?.length ? (
                    LoadArrival1.map((item, index) => (
                      <tr
                        key={index}
                        onClick={() => handleRowClick(index)}
                        style={{
                          cursor: "pointer",
                          background:
                            selectedRow &&
                            selectedRow.CustDocuNo === item.CustDocuNo
                              ? "#98a8f8"
                              : "inherit",
                        }}
                      >
                        <td>{item.CustDocuNo}</td>
                        <td>{item.RV_No}</td>
                        <td>{item.RV_Date}</td>
                        <td>{item.updated}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={2}>No Items Added</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </div>
          <div className="col-md-4 col-sm-12">
            <br></br>
            <br></br>
            <br></br>
            <div
              className=""
              style={{
                overflowX: "scroll",
                overflowY: "scroll",
                height: "250px",
              }}
            >
              <Table
                striped
                className="table-data border"
                style={{ border: "1px" }}
              >
                <thead className="tableHeaderBGColor">
                  <tr>
                    <th>Length</th>
                    <th>Width</th>
                    <th>Quantity</th>
                    <th style={{ whiteSpace: "nowrap" }}>Up Dated</th>
                    <th style={{ whiteSpace: "nowrap" }}>Order No</th>
                  </tr>
                </thead>
                <tbody className="tablebody">
                  {LoadArrival2?.length ? (
                    LoadArrival2.map((item, index) => (
                      <tr key={index}>
                        <td>{item.DynamicPara1}</td>
                        <td>{item.DynamicPara2}</td>
                        <td>{item.Qty}</td>
                        <td>{item.updated}</td>
                        <td>{OrderData?.Order_No}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={2}>No Items Added</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
