import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getRequest } from "../../../api/apiinstance";
import { endpoints } from "../../../api/constants";

export default function CombinedScheduleList({ type }) {
  console.log("type", type);
  const navigate = useNavigate();

  //ScheduleList Orders
  const [scheduleListOrders, setScheduleListOrder] = useState([]);
  const getScheduleListData = () => {
    if (type === "JobWork") {
      getRequest(endpoints.ScheduleListOrdered, (response) => {
        console.log(response);
        setScheduleListOrder(response);
      });
    } else {
      getRequest(endpoints.ScheduleListOrderedSales, (response) => {
        console.log(response);
        setScheduleListOrder(response);
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

  return (
    <div>
      <h4 className="title">Combined Schedule List</h4>{" "}
      <div className="row mt-4 mb-1 ">
        <button
          className="button-style"
          onClick={() =>
            navigate("/Orders/JobWork/ScheduleList/Order/OpenDetailForm", {
              state: { selectedRow: selectedRow },
            })
          }
          style={{ width: "130px" }}
        >
          Open
        </button>
      </div>
      <div style={{ overflowY: "scroll" }}>
        <Table
          striped
          className="table-data border mt-2"
          style={{ border: "1px", height: "400px", overflowY: "scroll" }}
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
            {scheduleListOrders.map((item, key) => {
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
