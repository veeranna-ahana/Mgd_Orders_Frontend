import React, { useEffect, useState } from "react";
import { Form, Tab, Table, Tabs } from "react-bootstrap";
import { Link } from "react-router-dom";
// import { Link, useNavigate } from "react-router-dom";
// import { Tab, Table, Tabs, Form } from "react-bootstrap";

export default function OrderDetails(props) {
  return (
    <>
      <div>
        <div className="row mt-4">
          <div className="col-md-2 mt-2 col-sm-12">
            <button
              className="button-style"
              // onClick={(e) => handleImportDwg()}
            >
              Import DWG
            </button>
          </div>
          <div className="col-md-2 mt-2 col-sm-12">
            <Link to="/Orders/ImportExcelForm">
              <button className="button-style ">Import EXCEL</button>
            </Link>
          </div>
          <div className="col-md-2 mt-2 col-sm-12">
            <Link to="/Orders/ImportQtn">
              {" "}
              <button className="button-style ">Import Qtn</button>
            </Link>
          </div>
          <div className="col-md-2 mt-2 col-sm-12">
            <button className="button-style ">Import Old Order</button>
          </div>
          <div className="col-md-2 mt-2 col-sm-12">
            <button className="button-style ">Delete</button>
          </div>
          <div className="col-md-2 mt-2 col-sm-12">
            <button className="button-style ">Bulk Change</button>
          </div>
          <div className="col-md-2 mt-2 col-sm-12">
            <button className="button-style ">Select All</button>
          </div>
          <div className="col-md-2 mt-2 col-sm-12">
            <button className="button-style ">Reverse</button>
          </div>

          <div className="col-md-2 mt-2 col-sm-12">
            <Link to={"/Orders/EditDXF"}>
              <button className="button-style ">Edit Dxf</button>
            </Link>
          </div>
          {/* {props.Type === "Profile" ? (
          ) : null}  */}
          {/* {props.Type === "Profile" ? (
            <div className="col-md-2 mt-2 col-sm-12">
              <Link to={"/Orders/EditDXF"}>
                <button className="button-style ">Edit Dxf</button>
              </Link>
            </div>
          ) : null} */}
        </div>
        <div className="row mt-5">
          <div className="col-md-6 col-sm-12">
            <div>
              <div className="row">
                <div style={{ overflowX: "scroll", overflowY: "scroll" }}>
                  <Table
                    striped
                    className="table-data border"
                    style={{ border: "1px", height: "860px" }}
                  >
                    <thead className="tableHeaderBGColor">
                      <tr>
                        <th>Select</th>
                        <th style={{ whiteSpace: "nowrap" }}>
                          Drawing/Part Name
                        </th>
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
                    <tbody className="tablebody">
                      <tr>
                        <th>Select</th>
                        <th style={{ whiteSpace: "nowrap" }}>
                          Drawing/Part Name
                        </th>
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
                      {/* {ordDwgtskDetsData.length > 0 ? (
                              ordDwgtskDetsData.map((orddwgtskdets, index) => {
                                return (
                                  <tr
                                    key={orddwgtskdets.index}
                                    onClick={() => selectItem(orddwgtskdets)}
                                  >
                                    <td>
                                      <Form.Check
                                        type="checkbox"
                                        id="selected"
                                      />
                                    </td>
                                    <td>{orddwgtskdets["DwgName"]}</td>
                                    <td>{orddwgtskdets["Dwg"]}</td>
                                    <td>{orddwgtskdets["Mtrl_Code"]}</td>
                                    <td>{orddwgtskdets["Operation"]}</td>
                                    <td>{orddwgtskdets["Mtrl_Source"]}</td>
                                    <td>{orddwgtskdets["InspLevel"]}</td>
                                    <td>{orddwgtskdets["Tolerance"]}</td>
                                    <td>{orddwgtskdets["PackingLevel"]}</td>
                                    <td>{orddwgtskdets["LOC"]}</td>
                                    <td>{orddwgtskdets["Holes"]}</td>
                                    <td>{orddwgtskdets["JWCost"]}</td>
                                    <td>{orddwgtskdets["MtrlCost"]}</td>
                                    <td>{orddwgtskdets["UnitRate"]}</td>
                                    <td>{orddwgtskdets["Qty_Ordered"]}</td>
                                    <td>{orddwgtskdets["Total"]}</td>
                                  </tr>
                                );
                              })
                            ) : (
                              <tr>
                                <td colspan={16}>No Items Added</td>
                              </tr>
                            )} */}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <Tabs>
              <Tab eventKey="drawing" title="Drawing">
                <div
                  id="dxf-content-container"
                  className="dxf-content-container"
                />
              </Tab>
              <Tab eventKey="orderDetailsForm" title="Order Details">
                <div>
                  <div className="row">
                    <div className="col-md-8 col-sm-12">
                      <Form className="mt-2">
                        <div className="ip-box form-bg">
                          <div className="row mt-3">
                            <div className="col-md-6 col-sm-12">
                              <h5>
                                <b>Order Details</b>
                              </h5>
                              <div className="row">
                                <div>
                                  <label
                                    className="form-label"
                                    style={{ whiteSpace: "nowrap" }}
                                  >
                                    Srl No
                                  </label>
                                  <input className="in-fields" type="text" />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6 mt-4 col-sm-12">
                              <Link to={"/Orders/Service/NewOrderSerial"}>
                                <button
                                  className="button-style "
                                  style={{ width: "135px" }}
                                >
                                  Add New Serial
                                </button>
                              </Link>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-6 col-sm-12">
                              <div className="row">
                                <div>
                                  <label
                                    className="form-label"
                                    style={{ whiteSpace: "nowrap" }}
                                  >
                                    Drawing Name
                                  </label>
                                  <input className="in-fields" type="text" />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                              <div className="row">
                                <div>
                                  <label
                                    className="form-label"
                                    style={{ whiteSpace: "nowrap" }}
                                  >
                                    Job Work Rate
                                  </label>
                                  <input className="in-fields" type="text" />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-6 col-sm-12">
                              <div className="row">
                                <div>
                                  <label className="form-label">Material</label>
                                  <select
                                    id=""
                                    className="ip-select dropdown-field "
                                  >
                                    <option value="option1">option 1</option>
                                    <option value="option2">option 2</option>
                                    <option value="option3">option 3</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                              <div className="row">
                                <div>
                                  <label
                                    className="form-label"
                                    style={{ whiteSpace: "nowrap" }}
                                  >
                                    Material Rate
                                  </label>
                                  <input className="in-fields" type="text" />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-6 col-sm-12">
                              <div className="row">
                                <div>
                                  <label
                                    className="form-label"
                                    style={{ whiteSpace: "nowrap" }}
                                  >
                                    Material Source
                                  </label>
                                  <select
                                    id=""
                                    className="ip-select dropdown-field "
                                  >
                                    <option value="option1">option 1</option>
                                    <option value="option2">option 2</option>
                                    <option value="option3">option 3</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                              <div className="row">
                                <div>
                                  <label
                                    className="form-label"
                                    style={{ whiteSpace: "nowrap" }}
                                  >
                                    Unit Price
                                  </label>
                                  <input className="in-fields" type="text" />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-6 col-sm-12">
                              <div className="row">
                                <div>
                                  <label className="form-label">
                                    Operation
                                  </label>
                                  <select
                                    id=""
                                    className="ip-select dropdown-field "
                                  >
                                    <option value="option1">option 1</option>
                                    <option value="option2">option 2</option>
                                    <option value="option3">option 3</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                              <div className="row">
                                <div>
                                  <label
                                    className="form-label"
                                    style={{ whiteSpace: "nowrap" }}
                                  >
                                    Inspection Level
                                  </label>
                                  <select
                                    id=""
                                    className="ip-select dropdown-field "
                                  >
                                    <option value="option1">option 1</option>
                                    <option value="option2">option 2</option>
                                    <option value="option3">option 3</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-6 col-sm-12">
                              <div className="row">
                                <div>
                                  <label className="form-label">Quantity</label>
                                  <input className="in-fields" type="text" />
                                  <div className="row">
                                    <div className="col-md-8  col-sm-12 mt-1">
                                      <label
                                        className="form-label"
                                        style={{
                                          whiteSpace: "nowrap",
                                          marginLeft: "-10px",
                                        }}
                                      >
                                        Has BOM
                                      </label>
                                    </div>
                                    <div className="col-md-4 col-sm-12 mt-2 mb-1">
                                      <input
                                        type="checkbox"
                                        className="checkBoxStyle"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                              <div className="row">
                                <div>
                                  <label
                                    className="form-label"
                                    style={{ whiteSpace: "nowrap" }}
                                  >
                                    Packing Level
                                  </label>
                                  <select
                                    id=""
                                    className="ip-select dropdown-field "
                                  >
                                    <option value="option1">option 1</option>
                                    <option value="option2">option 2</option>
                                    <option value="option3">option 3</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Form>
                    </div>

                    <div className="col-md-4 col-sm-12">
                      <Form className="mt-2">
                        <div
                          className="ip-box form-bg"
                          style={{ height: "570px", width: "190px" }}
                        >
                          <h5 className="mt-3">
                            <b>Process details</b>
                          </h5>
                          <div className="row">
                            <div>
                              <label className="form-label">Ordered</label>
                              <input className="in-fields" type="text" />
                            </div>
                          </div>
                          <div className="row">
                            <div>
                              <label className="form-label">Scheduled</label>
                              <input className="in-fields" type="text" />
                            </div>
                          </div>
                          <div className="row">
                            <div>
                              <label className="form-label">Produced</label>
                              <input className="in-fields" type="text" />
                            </div>
                          </div>
                          <div className="row">
                            <div>
                              <label className="form-label">Packed</label>
                              <input className="in-fields" type="text" />
                            </div>
                          </div>
                          <div className="row">
                            <div>
                              <label className="form-label">Delivered</label>
                              <input className="in-fields" type="text" />
                            </div>
                          </div>
                        </div>
                      </Form>
                    </div>
                  </div>
                  <Form
                    className="mt-2"
                    style={{ marginLeft: "10px", width: "575px" }}
                  >
                    <div className="ip-box form-bg">
                      <h5 className="mt-1">
                        <b>Load Drawing</b>
                      </h5>
                      <div className="row">
                        <div className="col-md-12 col-sm-12">
                          <div className="row">
                            <div className="col-md-6 com-sm-12">
                              <select
                                id=""
                                className="ip-select dropdown-field "
                                style={{ width: "230px" }}
                              >
                                <option value="option1">option 1</option>
                                <option value="option2">option 2</option>
                                <option value="option3">option 3</option>
                              </select>
                            </div>
                            <div className="col-md-6 com-sm-12">
                              <select
                                id=""
                                className="ip-select dropdown-field "
                                style={{ width: "230px" }}
                              >
                                <option value="option1">option 1</option>
                                <option value="option2">option 2</option>
                                <option value="option3">option 3</option>
                              </select>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-6 mt-3 com-sm-12">
                              <button
                                className="button-style "
                                style={{ width: "230px" }}
                              >
                                Add Drawing to Order
                              </button>
                            </div>
                            <div className="col-md-6 mt-3 com-sm-12">
                              <button
                                className="button-style "
                                style={{ width: "230px" }}
                              >
                                Save to Customer Drawings
                              </button>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6 com-sm-12">
                              <div className="row">
                                <div>
                                  <label className="form-label">LOC</label>
                                  <input className="in-fields" type="text" />
                                </div>
                              </div>
                              <div className="row">
                                <div>
                                  <label className="form-label">Process</label>
                                  <input className="in-fields" type="text" />
                                </div>
                              </div>
                              <div className="row">
                                <div>
                                  <label className="form-label">
                                    Pat Weight
                                  </label>
                                  <input className="in-fields" type="text" />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6 com-sm-12">
                              <div className="row">
                                <div>
                                  <label className="form-label">Process</label>
                                  <input className="in-fields" type="text" />
                                </div>
                              </div>
                              <div className="row">
                                <div>
                                  <label className="form-label">
                                    Job Work Cost
                                  </label>
                                  <input className="in-fields" type="text" />
                                </div>
                              </div>
                              <div className="row">
                                <div>
                                  <label className="form-label">
                                    Material Cost
                                  </label>
                                  <input className="in-fields" type="text" />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-2  col-sm-12 mt-1">
                                  <label
                                    className="form-label"
                                    style={{ whiteSpace: "nowrap" }}
                                  >
                                    Has BOM
                                  </label>
                                </div>
                                <div className="col-md-10 col-sm-12 mt-3 mb-4">
                                  <input
                                    className="in-fields checkBoxStyle"
                                    type="checkbox"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Form>
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}
