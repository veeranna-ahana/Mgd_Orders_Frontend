import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
// import { Link, useNavigate } from "react-router-dom";
// import { Tab, Table, Tabs, Form } from "react-bootstrap";

export default function ScheduleList() {
  return (
    <>
      <div>
        <div className="row mt-3">
          <div className="col-md-2 col-sm-12">
            <button
              className="button-style "
              // onClick={openModal}
            >
              Delete Schedule
            </button>
          </div>
          <div className="col-md-2 col-sm-12">
            <Link to={"/Orders/Service/ServiceOpenSchedule"}>
              <button className="button-style ">Open Schedule</button>
            </Link>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-3 col-md-12" style={{ overflowY: "scroll" }}>
            <Table
              striped
              className="table-data border "
              style={{ border: "1px", height: "400px" }}
            >
              <thead className="tableHeaderBGColor">
                <tr>
                  <th>Type</th>
                  <th>No</th>
                  <th>Status</th>
                  <th>Delivered</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="tablebody">
                <tr>
                  <th>Type</th>
                  <th>No</th>
                  <th>Status</th>
                  <th>Delivered</th>
                  <th></th>
                </tr>{" "}
                <tr>
                  <th>Type</th>
                  <th>No</th>
                  <th>Status</th>
                  <th>Delivered</th>
                  <th></th>
                </tr>{" "}
                <tr>
                  <th>Type</th>
                  <th>No</th>
                  <th>Status</th>
                  <th>Delivered</th>
                  <th></th>
                </tr>
                {/* {ordDetsData.length > 0 ? (
                        ordDetsData.map((orddets, index) => {
                          return (
                            <tr
                              key={orddets.index}
                              onClick={() => selectItem(orddets)}
                            >
                              <td>{orddets["ScheduleType"]}</td>
                              <td>{orddets["ScheduleNo"]}</td>
                              <td>{orddets["Schedule_Status"]}</td>
                              <td>{orddets["Delivery_Date"]}</td>
                              <td>{orddets["ScheduleId"]}</td>
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
          <div className="col-md-9 col-md-12" style={{ overflowY: "scroll" }}>
            <Table
              striped
              className="table-data border mt-2"
              style={{
                border: "1px",
                height: "400px",
                overflowY: "scroll",
              }}
            >
              <thead className="tableHeaderBGColor">
                <tr>
                  <th>Dwg Name</th>
                  <th>Mtrl Code</th>
                  <th>Operation</th>
                  <th>Scheduled</th>
                  <th>Produced</th>
                  <th>Packed</th>
                  <th>Delivered</th>
                  <th>JW Cost</th>
                  <th>Mtrl Cost</th>
                </tr>
              </thead>
              <tbody className="tablebody">
                <tr>
                  <th>Dwg Name</th>
                  <th>Mtrl Code</th>
                  <th>Operation</th>
                  <th>Scheduled</th>
                  <th>Produced</th>
                  <th>Packed</th>
                  <th>Delivered</th>
                  <th>JW Cost</th>
                  <th>Mtrl Cost</th>
                </tr>{" "}
                <tr>
                  <th>Dwg Name</th>
                  <th>Mtrl Code</th>
                  <th>Operation</th>
                  <th>Scheduled</th>
                  <th>Produced</th>
                  <th>Packed</th>
                  <th>Delivered</th>
                  <th>JW Cost</th>
                  <th>Mtrl Cost</th>
                </tr>{" "}
                <tr>
                  <th>Dwg Name</th>
                  <th>Mtrl Code</th>
                  <th>Operation</th>
                  <th>Scheduled</th>
                  <th>Produced</th>
                  <th>Packed</th>
                  <th>Delivered</th>
                  <th>JW Cost</th>
                  <th>Mtrl Cost</th>
                </tr>
                {/* {ordDetsDwgData.length > 0 ? (
                        ordDetsDwgData.map((orddetsdwg, index) => {
                          return (
                            <tr
                              key={orddetsdwg.index}
                              onClick={() => selectItem(orddetsdwg)}
                            >
                              <td>{orddetsdwg["DwgName"]}</td>
                              <td>{orddetsdwg["Mtrl_Code"]}</td>
                              <td>{orddetsdwg["Operation"]}</td>
                              <td>{orddetsdwg["QtyScheduleId"]}</td>
                              <td>{orddetsdwg["QtyProduced"]}</td>
                              <td>{orddetsdwg["QtyPacked"]}</td>
                              <td>{orddetsdwg["QtyDelivered"]}</td>
                              <td>{orddetsdwg["JWCost"]}</td>
                              <td>{orddetsdwg["MtrlCost"]}</td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colspan={9}>No Items Added</td>
                        </tr>
                      )} */}
              </tbody>
            </Table>
          </div>
        </div>
        {/* <AlertModal
                show={alertModal}
                onHide={(e) => setAlertModal(e)}
                firstbutton={closeModal}
                title="magod_Order"
                message="Select Draft Schedules to Delete"
                firstbuttontext="Ok"
              /> */}
      </div>
    </>
  );
}
