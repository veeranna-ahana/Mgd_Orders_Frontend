import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Tab, Table, Tabs, Form } from "react-bootstrap";
export default function ProfarmaInvoiceList() {
  return (
    <>
      <div>
        <div className="row justify-content-center mt-3">
          <div className="col-md-2 col-sm-12">
            <button className="button-style ">Create Invoice</button>
          </div>
          <div className="col-md-2 col-sm-12">
            <button className="button-style ">Delete</button>
          </div>
          <div className="col-md-2 col-sm-12">
            <Link to={"/Orders/Service/ProfamaInvoiceForm"}>
              <button className="button-style ">Open Invoice</button>
            </Link>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-3 col-md-12" style={{ overflowY: "scroll" }}>
            <Table
              striped
              className="table-data border"
              style={{ border: "1px", height: "400px" }}
            >
              <thead className="tableHeaderBGColor">
                <tr>
                  <th>Inv Type</th>
                  <th>Proforma Inv No</th>
                  <th>Grand Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody className="tablebody">
                <tr>
                  <th>Inv Type</th>
                  <th>Proforma Inv No</th>
                  <th>Grand Total</th>
                  <th>Status</th>
                </tr>{" "}
                <tr>
                  <th>Inv Type</th>
                  <th>Proforma Inv No</th>
                  <th>Grand Total</th>
                  <th>Status</th>
                </tr>{" "}
                <tr>
                  <th>Inv Type</th>
                  <th>Proforma Inv No</th>
                  <th>Grand Total</th>
                  <th>Status</th>
                </tr>
                {/* {ordProformaData.length > 0 ? (
                        ordProformaData.map((ordproforma, index) => {
                          return (
                            <tr
                              key={ordproforma.index}
                              onClick={() => selectItem(ordproforma)}
                            >
                              <td>{ordproforma["InvType"]}</td>
                              <td>{ordproforma["ProformaInvNo"]}</td>
                              <td>{ordproforma["GrandTotal"]}</td>
                              <td>{ordproforma["Status"]}</td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colspan={4}>No Items Added</td>
                        </tr>
                      )} */}
              </tbody>
            </Table>
          </div>
          <div
            className="col-md-9 col-md-12"
            style={{ overflowY: "scroll", overflowX: "scroll" }}
          >
            <Table
              striped
              className="table-data border mt-2"
              style={{ border: "1px", height: "400px" }}
            >
              <thead className="tableHeaderBGColor">
                <tr>
                  <th>Srl</th>
                  <th style={{ whiteSpace: "nowrap" }}>Drawing Name</th>
                  <th style={{ whiteSpace: "nowrap" }}>Material Code</th>
                  <th>Quantity</th>
                  <th style={{ whiteSpace: "nowrap" }}>Unit Rate</th>
                  <th style={{ whiteSpace: "nowrap" }}>Profarma Deatil Id</th>
                  <th style={{ whiteSpace: "nowrap" }}>Profarma Id</th>
                  <th style={{ whiteSpace: "nowrap" }}>Profarma Srl</th>
                  <th>Dwg_No</th>
                  <th>Mtrl</th>
                  <th>Qty</th>
                  <th style={{ whiteSpace: "nowrap" }}>Unit Rate</th>
                  <th style={{ whiteSpace: "nowrap" }}>Srl Amount</th>
                  <th>Excise_CL_No</th>
                </tr>
              </thead>
              <tbody className="tablebody">
                <tr>
                  <th>Srl</th>
                  <th style={{ whiteSpace: "nowrap" }}>Drawing Name</th>
                  <th style={{ whiteSpace: "nowrap" }}>Material Code</th>
                  <th>Quantity</th>
                  <th style={{ whiteSpace: "nowrap" }}>Unit Rate</th>
                  <th style={{ whiteSpace: "nowrap" }}>Profarma Deatil Id</th>
                  <th style={{ whiteSpace: "nowrap" }}>Profarma Id</th>
                  <th style={{ whiteSpace: "nowrap" }}>Profarma Srl</th>
                  <th>Dwg_No</th>
                  <th>Mtrl</th>
                  <th>Qty</th>
                  <th style={{ whiteSpace: "nowrap" }}>Unit Rate</th>
                  <th style={{ whiteSpace: "nowrap" }}>Srl Amount</th>
                  <th>Excise_CL_No</th>
                </tr>{" "}
                <tr>
                  <th>Srl</th>
                  <th style={{ whiteSpace: "nowrap" }}>Drawing Name</th>
                  <th style={{ whiteSpace: "nowrap" }}>Material Code</th>
                  <th>Quantity</th>
                  <th style={{ whiteSpace: "nowrap" }}>Unit Rate</th>
                  <th style={{ whiteSpace: "nowrap" }}>Profarma Deatil Id</th>
                  <th style={{ whiteSpace: "nowrap" }}>Profarma Id</th>
                  <th style={{ whiteSpace: "nowrap" }}>Profarma Srl</th>
                  <th>Dwg_No</th>
                  <th>Mtrl</th>
                  <th>Qty</th>
                  <th style={{ whiteSpace: "nowrap" }}>Unit Rate</th>
                  <th style={{ whiteSpace: "nowrap" }}>Srl Amount</th>
                  <th>Excise_CL_No</th>
                </tr>{" "}
                <tr>
                  <th>Srl</th>
                  <th style={{ whiteSpace: "nowrap" }}>Drawing Name</th>
                  <th style={{ whiteSpace: "nowrap" }}>Material Code</th>
                  <th>Quantity</th>
                  <th style={{ whiteSpace: "nowrap" }}>Unit Rate</th>
                  <th style={{ whiteSpace: "nowrap" }}>Profarma Deatil Id</th>
                  <th style={{ whiteSpace: "nowrap" }}>Profarma Id</th>
                  <th style={{ whiteSpace: "nowrap" }}>Profarma Srl</th>
                  <th>Dwg_No</th>
                  <th>Mtrl</th>
                  <th>Qty</th>
                  <th style={{ whiteSpace: "nowrap" }}>Unit Rate</th>
                  <th style={{ whiteSpace: "nowrap" }}>Srl Amount</th>
                  <th>Excise_CL_No</th>
                </tr>
                {/* {ordProformaMatData.length > 0 ? (
                        ordProformaMatData.map((ordproformamat, index) => {
                          return (
                            <tr
                              key={ordproformamat.index}
                              onClick={() => selectItem(ordproformamat)}
                            >
                              <td>{ordproformamat["ProFarmaSrl"]}</td>
                              <td>{ordproformamat["Dwg_No"]}</td>
                              <td>{ordproformamat["Mtrl"]}</td>
                              <td>{ordproformamat["Qty"]}</td>
                              <td>{ordproformamat["Unit_Rate"]}</td>
                              <td>{ordproformamat["ProfarmaDetailID"]}</td>
                              <td>{ordproformamat["ProfarmaID"]}</td>
                              <td>{ordproformamat["ProfarmaSrl"]}</td>
                              <td>{ordproformamat["Dwg_No"]}</td>
                              <td>{ordproformamat["Mtrl"]}</td>
                              <td>{ordproformamat["Qty"]}</td>
                              <td>{ordproformamat["Unit_Rate"]}</td>
                              <td>{ordproformamat["SrlAmount"]}</td>
                              <td>{ordproformamat["Excise_CL_no"]}</td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colspan={14}>No Items Added</td>
                        </tr>
                      )} */}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
