import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import RegisterTable from "./Tables/RegisterTable";
import DetailTable from "./Tables/DetailTable";

export default function PackingNoteAndInvoice(props) {
  const [registerSelectedRow, setRegisterSelectedRow] = useState({});
  const [filteredDetailsData, setFilteredDetailsData] = useState([]);

  console.log("filteredDetailsData", filteredDetailsData);
  return (
    <>
      <button className="button-style">Show Invoice</button>
      <div className="row">
        <div
          className="col-md-5"
          style={{
            height: "400px",
            overflow: "auto",
          }}
        >
          <RegisterTable
            PNAndInvRegisterData={props.PNAndInvRegisterData}
            PNAndInvDetailsData={props.PNAndInvDetailsData}
            registerSelectedRow={registerSelectedRow}
            setRegisterSelectedRow={setRegisterSelectedRow}
            setFilteredDetailsData={setFilteredDetailsData}
          />
        </div>

        <div
          className="col-md-7"
          style={{
            height: "400px",
            overflow: "auto",
          }}
        >
          <DetailTable
            filteredDetailsData={filteredDetailsData}
            registerSelectedRow={registerSelectedRow}
          />
        </div>
      </div>
    </>
  );
}
