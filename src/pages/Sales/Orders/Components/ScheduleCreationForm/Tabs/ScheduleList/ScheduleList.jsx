import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { postRequest } from "../../../../../../api/apiinstance";
import { endpoints } from "../../../../../../api/constants";
// import { Link, useNavigate } from "react-router-dom";
// import { Tab, Table, Tabs, Form } from "react-bootstrap";

export default function ScheduleList({ OrderData, OrderCustData }) {
  console.log(OrderCustData);

  console.log(OrderData);

  //date format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
    const year = date.getFullYear();
    // Use template literals to format the date
    return `${day}/${month}/${year}`;
  };

  //getScheduleList Table Data
  const [scheduleListData, setScheduleListData] = useState([]);
  // Fetch schedule list data when OrderData changes
  useEffect(() => {
    if (OrderData && OrderData.Order_No) {
      postRequest(
        endpoints.getScheduleListData,
        { Order_No: OrderData.Order_No },
        (response) => {
          setScheduleListData(response);
        }
      );
    }
  }, [OrderData]); // Watch for changes in OrderData

  // useEffect(() => {
  //   ScheduleListData();
  // }, []);

  //onClick ScheduleList table
  const [DwgNameList, setDwgNameList] = useState([]);
  const [rowScheduleList, setRowScheduleList] = useState({});
  const onRowClickScheduleList = (item, index) => {
    let list = { ...item, index: index };
    setRowScheduleList(list);
    postRequest(
      endpoints.getScheduleListDwgData,
      { ScheduleId: list.ScheduleId },
      (response) => {
        // console.log("orderData.....", response);
        setDwgNameList(response);
      }
    );
  };

  console.log(rowScheduleList);

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
            <Link
              to={"/Orders/Service/ServiceOpenSchedule"}
              state={DwgNameList}
            >
              <button
                className="button-style"
                disabled={Object.keys(rowScheduleList).length === 0 }
              >
                Open Schedule
              </button>
            </Link>
            {Object.keys(rowScheduleList).length === 0 && (
              <style>
                {`
            .button-style[disabled] {
                background-color: grey;
                cursor: not-allowed;
            }
            `}
              </style>
            )}
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
                </tr>
              </thead>
              <tbody className="tablebody">
                {scheduleListData.map((item, key) => {
                  return (
                    <>
                      <tr
                        onClick={() => onRowClickScheduleList(item, key)}
                        className={
                          key === rowScheduleList?.index
                            ? "selcted-row-clr"
                            : ""
                        }
                      >
                        <td>{item.Type}</td>
                        <td>{item.ScheduleNo}</td>
                        <td>{item.Schedule_Status}</td>
                        <td>{formatDate(item.Delivery_Date)}</td>
                      </tr>
                    </>
                  );
                })}
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
                {DwgNameList.map((item, key) => {
                  return (
                    <>
                      <tr>
                        <td>{item.DwgName}</td>
                        <td>{item.Mtrl_Code}</td>
                        <td>{item.Operation}</td>
                        <td>{item.QtyScheduled}</td>
                        <td>{item.QtyProduced}</td>
                        <td>{item.QtyPacked}</td>
                        <td>{item.QtyDelivered}</td>
                        <td>{item.JWCost}</td>
                        <td>{item.MtrlCost}</td>
                      </tr>
                    </>
                  );
                })}
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
