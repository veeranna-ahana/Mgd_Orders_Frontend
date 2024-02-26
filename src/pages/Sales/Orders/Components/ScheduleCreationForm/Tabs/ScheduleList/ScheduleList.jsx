import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { postRequest } from "../../../../../../api/apiinstance";
import { endpoints } from "../../../../../../api/constants";
import FirstTable from "./Tables/FirstTable";
import SecondTable from "./Tables/SecondTable";
// import { Link, useNavigate } from "react-router-dom";
// import { Tab, Table, Tabs, Form } from "react-bootstrap";

export default function ScheduleList({ OrderData, OrderCustData }) {
  // console.log(OrderCustData);

  // console.log(OrderData);

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


  return (
    <>
      <div>
        <div className="row d-flex justify-content-center p-2">
          <div className="col-md-2">
            <button
              className="button-style m-0"
              // onClick={openModal}
            >
              Delete Schedule
            </button>
          </div>
          <div className="col-md-2">
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

        <div className="row">
          <div
            className="col-md-6"
            style={{ height: "400px", overflow: "auto" }}
          >
            <FirstTable
              scheduleListData={scheduleListData}
              onRowClickScheduleList={onRowClickScheduleList}
              rowScheduleList={rowScheduleList}
              formatDate={formatDate}
            />
          </div>
          <div
            className="col-md-6"
            style={{ height: "400px", overflow: "auto" }}
          >
            <SecondTable DwgNameList={DwgNameList} />
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
