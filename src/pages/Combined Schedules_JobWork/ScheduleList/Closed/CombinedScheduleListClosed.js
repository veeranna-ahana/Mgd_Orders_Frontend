import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { endpoints } from "../../../api/constants";
import { getRequest } from "../../../api/apiinstance";

export default function CombinedScheduleListClosed({ type }) {
  console.log("type closed form is", type);
  const navigate = useNavigate();

  //ScheduleList Orders
  const [scheduleListClosed, setScheduleListClosed] = useState([]);
  const getScheduleListData = () => {
    if (type === "JobWork") {
      getRequest(endpoints.ScheduleListClosed, (response) => {
        console.log(response);
        setScheduleListClosed(response);
      });
    } else {
      getRequest(endpoints.ScheduleListClosedSales, (response) => {
        console.log(response);
        setScheduleListClosed(response);
      });
    }
  };

  useEffect(() => {
    getScheduleListData();
  }, []);

  //row select
  const [selectedRow, setSelectedRow] = useState({});
  const rowSelectFunc = (item, index) => {
    let list = { ...item, index: index };
    setSelectedRow(list);
  };

  // console.log(selectedRow);

  const handleClick = () => {
    const path = type === "JobWork" 
      ? "/Orders/JobWork/ScheduleList/Closed/OpenDetailForm" 
      : "/Orders/Sales/ScheduleList/Closed/OpenDetailForm";
    
    navigate(path, { state: { selectedRow: selectedRow } });
  };

  return (
    <div>
      <h4 className="title">Combined Schedule List</h4>
      <div className="">
        <button
          className="button-style"
          onClick={handleClick}
        >
          Open
        </button>
      </div>
      <div className="mt-1" style={{ overflowY: "scroll" }}>
        <Table
          striped
          className="table-data border"
          style={{ border: "1px", height: "350px", overflowY: "scroll" }}
        >
          <thead className="tableHeaderBGColor">
            <tr>
              {/* <th>Selected</th> */}
              <th>Schedule No</th>
              <th>Customer</th>
              <th>Target Date</th>
              <th>Delivary Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className="tablebody">
            {scheduleListClosed.map((item, key) => {
              return (
                <>
                  <tr
                    onClick={() => rowSelectFunc(item, key)}
                    className={
                      key === selectedRow?.index ? "selcted-row-clr" : ""
                    }
                  >
                    {" "}
                    {/* <td>
                      <input type="checkbox" />
                    </td> */}
                    <td>{item.OrdSchNo}</td>
                    <td>{item.Cust_name}</td>
                    <td>
                      {new Date(item.schTgtDate).toLocaleDateString("en-GB")}
                    </td>
                    <td>
                      {new Date(item.Delivery_Date).toLocaleDateString("en-GB")}
                    </td>
                    <td>{item.Schedule_Status}</td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
