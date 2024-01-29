import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
// import { Tab, Table, Tabs, Form } from "react-bootstrap";
// Table

export default function FindOldPart() {
  return (
    <>
      <div>
        <div className="row mt-3 mb-3">
          <div className="col-md-4 col-sm-12">
            <div className="row">
              <div className="col-md-5 mb-2 col-sm-12">
                <label className="form-label" style={{ whiteSpace: "nowrap" }}>
                  Search Part Name
                </label>
              </div>
              <div className="col-md-7  mb-2 col-sm-12">
                <input class="" type="text" />
              </div>
            </div>
          </div>
        </div>
        <Table
          striped
          className="table-data border mt-2"
          style={{ border: "1px", height: "200px", overflowY: "scroll" }}
        >
          <thead className="tableHeaderBGColor">
            <tr>
              <th>DWG Name</th>
              <th>Material</th>
              <th>Operation</th>
              <th>Source</th>
              <th>Order No</th>
            </tr>
          </thead>
          <tbody className="tablebody">
            <tr>
              <th>DWG Name</th>
              <th>Material</th>
              <th>Operation</th>
              <th>Source</th>
              <th>Order No</th>
            </tr>{" "}
            <tr>
              <th>DWG Name</th>
              <th>Material</th>
              <th>Operation</th>
              <th>Source</th>
              <th>Order No</th>
            </tr>{" "}
            <tr>
              <th>DWG Name</th>
              <th>Material</th>
              <th>Operation</th>
              <th>Source</th>
              <th>Order No</th>
            </tr>
            {/* {ordDwgDetsData.length > 0 ? (
                  ordDwgDetsData.map((orddwgdets, index) => {
                    return (
                      <tr
                        key={orddwgdets.index}
                        onClick={() => selectItem(orddwgdets)}
                      >
                        <td>{orddwgdets["DwgName"]}</td>
                        <td>{orddwgdets["Mtrl_Code"]}</td>
                        <td>{orddwgdets["Operation"]}</td>
                        <td>{orddwgdets["Mtrl_Source"]}</td>
                        <td>{orddwgdets["Order_No"]}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colspan={5}>No Items Added</td>
                  </tr>
                )} */}
          </tbody>
        </Table>
      </div>
    </>
  );
}
