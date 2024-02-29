import React from "react";
import { Table } from "react-bootstrap";

export default function SecondTable(props) {
  return (
    <>
      <div>
        <Table striped className="table-data border table-space">
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
            {props.DwgNameList.map((item, key) => {
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
          </tbody>
        </Table>
      </div>
    </>
  );
}
