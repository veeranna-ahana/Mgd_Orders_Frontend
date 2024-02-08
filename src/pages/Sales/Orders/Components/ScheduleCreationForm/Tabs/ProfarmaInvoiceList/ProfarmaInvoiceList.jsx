import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Tab, Table, Tabs, Form } from "react-bootstrap";

import Axios from "axios";
import DetailsTable from "./Tables/DetailsTable";
import MainTable from "./Tables/MainTable";

export default function ProfarmaInvoiceList(props) {
  // console.log("propsss in proforma inv list", props);

  const [selectedProfarmaMainRow, setSelectedProfarmaMainRow] = useState({});
  const [filteredDetailsData, setFilteredDetailsData] = useState([]);

  const filterDetailsRow = (val) => {
    if (selectedProfarmaMainRow.ProfarmaID === val.ProfarmaID) {
      setSelectedProfarmaMainRow({});
      setFilteredDetailsData([]);
    } else {
      setSelectedProfarmaMainRow(val);
      const arr = props.profarmaInvDetails?.filter(
        (obj) => obj.ProfarmaID === val.ProfarmaID
      );
      setFilteredDetailsData(arr);
    }
  };

  return (
    <>
      <div>
        <div className="row d-flex justify-content-center p-2">
          <div className="col-md-2">
            <button className="button-style m-0">Create Invoice</button>
          </div>
          <div className="col-md-2">
            <button className="button-style m-0">Delete</button>
          </div>
          <div className="col-md-2">
            <Link to={"/Orders/Service/ProfamaInvoiceForm"}>
              <button className="button-style m-0">Open Invoice</button>
            </Link>
          </div>
        </div>

        <div className="row">
          <div
            className="col-md-6"
            style={{ height: "400px", overflow: "auto" }}
          >
            <MainTable
              profarmaInvMain={props.profarmaInvMain}
              setSelectedProfarmaMainRow={setSelectedProfarmaMainRow}
              selectedProfarmaMainRow={selectedProfarmaMainRow}
              filterDetailsRow={filterDetailsRow}
            />
          </div>
          <div
            className="col-md-6"
            style={{ height: "400px", overflow: "auto" }}
          >
            <DetailsTable filteredDetailsData={filteredDetailsData} />
          </div>
        </div>
        <div className="p-3"></div>
      </div>
    </>
  );
}
