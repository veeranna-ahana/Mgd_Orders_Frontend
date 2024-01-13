import React from "react";
import { Table } from "react-bootstrap";

export default function OrderListCreated() {
  return (
    <div>
      <div className="col-md-12">
        <div className="row">
          <h4 className="title">Sales Department</h4>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 col-sm-12">
          <h6>
            <b>Task Plan</b>
          </h6>
          <button className="button-style  group-button">Open Order</button>
          <button className="button-style  group-button">Exit</button>
        </div>
        <div className="col-md-6 col-sm-12">
          <h6>
            <b>Search Order List</b>
          </h6>

          <div className="row">
            <div className="col-md-6 col-sm-12">
              <div className="row">
                <div className="col-md-4 mb-2 col-sm-12">
                  <label
                    className="form-label"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Order No
                  </label>
                </div>
                <div className="col-md-8  mb-2 col-sm-12">
                  <input
                    class="form-control"
                    type="text"
                    style={{ borderRadius: "0", width: "180px" }}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="row">
                <div className="col-md-4  mb-2 col-sm-12">
                  <label
                    className="form-label"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    PO No
                  </label>
                </div>
                <div className="col-md-8  mb-2 col-sm-12">
                  <input
                    class="form-control"
                    type="text"
                    style={{ borderRadius: "0", width: "195px" }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-3 mt-2 col-sm-12">
              <div className="row">
                <div className="col-md-2 mt-2 col-sm-12">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="defaultCheck1"
                  />
                </div>
                <div className="col-md-2  mb-2 col-sm-12">
                  <label className="form-label">Complete</label>
                </div>
              </div>
            </div>
            <div className="col-md-3 mt-2 col-sm-12">
              <div className="row">
                <div className="col-md-2 mt-2 col-sm-12">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="defaultCheck1"
                  />
                </div>
                <div className="col-md-2   col-sm-12">
                  <label className="form-label">Scheduled</label>
                </div>
              </div>
            </div>
            <div className="col-md-3 mt-2 col-sm-12">
              <div className="row">
                <div className="col-md-2 mt-2  col-sm-12">
                  <input
                    class="form-check-input "
                    type="checkbox"
                    value=""
                    id="defaultCheck1"
                  />
                </div>
                <div className="col-md-2  mb-2 col-sm-12">
                  <label className="form-label">Open</label>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-12">
              <button className="button-style  group-button">
                Clear Filter
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr
        style={{
          backgroundColor: "black",
          height: "3px",
        }}
      />

      <Table
        striped
        className="table-data border"
        style={{border: "1px" }}
      >
        <thead className="tableHeaderBGColor">
          <tr>
            <th >Status</th>
            <th >Order No</th>
            <th >Date</th>
            <th>Customer</th>
            <th>Delivery Date</th>
            <th>Contact Name</th>
            <th>PO No</th>
            <th>Special Instruction</th>
          </tr>
        </thead>
        <tbody className="tablebody"></tbody>
      </Table>
    </div>
  );
}
