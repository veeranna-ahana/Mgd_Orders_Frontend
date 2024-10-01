import React from "react";
import { Table } from "react-bootstrap";

export default function FirstTable(props) {
  
  return (
    <>
      <div>
        <Table striped className="table-data border">
          <thead className="tableHeaderBGColor">
            <tr>
              <th>Type</th>
              <th>No</th>
              <th>Status</th>
              <th>Delivered</th>
            </tr>
          </thead>
          <tbody className="tablebody">
            {props.scheduleListData.map((item, key) => {
              return (
                <>
                  <tr
                    onClick={() => props.onRowClickScheduleList(item, key)}
                    className={
                      key === props.rowScheduleList?.index
                        ? "selcted-row-clr"
                        : ""
                    }
                  ><td>
                    {item.ScheduleType}</td>
                    <td>{item.ScheduleNo}</td>
                    <td>{item.Schedule_Status}</td>
                    <td>{props.formatDate(item.Delivery_Date)}</td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
}
