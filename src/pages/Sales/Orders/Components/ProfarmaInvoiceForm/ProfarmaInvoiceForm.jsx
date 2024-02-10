import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { Button, Table } from "react-bootstrap";
import { endpoints } from "../../../../api/constants";
import { getRequest, postRequest } from "../../../../api/apiinstance";
import ProductTable from "./Tables/ProductTable";
import TaxTable from "./Tables/TaxTable";

export default function ProfarmaInvoiceForm(props) {
  const location = useLocation();

  const [ProfarmaID, setProfarmaID] = useState(location?.state);
  // console.log("profarmaID", ProfarmaID);

  const [profarmaMainData, setProfarmaMainData] = useState({});
  const [profarmaDetailsData, setProfarmaDetailsData] = useState([]);
  const [profarmaTaxData, setProfarmaTaxData] = useState([]);
  const [taxDropdownData, setTaxDropdownData] = useState([]);

  const fetchData = () => {
    getRequest(endpoints.getTaxData, (taxData) => {
      setTaxDropdownData(taxData);
    });

    postRequest(
      endpoints.getProfarmaFormMain,
      { ProfarmaID: ProfarmaID },
      (profarmaMainData) => {
        setProfarmaMainData(profarmaMainData[0]);
        // console.log("qwqwqwqw", profarmaMainData);
      }
    );
    postRequest(
      endpoints.getProfarmaFormDetails,
      { ProfarmaID: ProfarmaID },
      (profarmaDetailsData) => {
        setProfarmaDetailsData(profarmaDetailsData);
        // console.log("qwqwqwqw", profarmaMainData);
      }
    );
    postRequest(
      endpoints.getProfarmaFormTaxes,
      { ProfarmaID: ProfarmaID },
      (profarmaTaxData) => {
        setProfarmaTaxData(profarmaTaxData);
        // console.log("qwqwqwqw", profarmaMainData);
      }
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log("profarmaMainData", profarmaMainData);
  console.log("profarmaDetailsData", profarmaDetailsData);
  console.log("profarmaTaxData", profarmaTaxData);

  return (
    <>
      <div>
        <h4 className="title m-0">Proforma Invoice Form</h4>
      </div>
      <div className="p-1"></div>
      <div className="row border rounded">
        <div className="col-md-3">
          <label className="form-label m-0">Invoice Type</label>
          <input
            value={profarmaMainData?.InvType || ""}
            disabled
            className="input-disabled"
          />
        </div>
        <div className="col-md-3">
          <label className="form-label m-0">Invoice No</label>
          <input
            value={profarmaMainData?.ProformaInvNo || ""}
            disabled
            className="input-disabled"
          />
        </div>
        <div className="col-md-3">
          <label className="form-label m-0">Invoice Date</label>
          <input
            value={profarmaMainData?.ProformaDate || ""}
            disabled
            className="input-disabled"
          />
        </div>
        <div className="col-md-3">
          <label className="form-label m-0">PO No</label>
          <input
            value={profarmaMainData?.PO_No || ""}
            disabled
            className="input-disabled"
          />
        </div>
        <div className="col-md-6 row p-0">
          <div className="col-md-12">
            <label className="form-label m-0">Customer Name</label>
            <input
              value={profarmaMainData?.Cust_Name || ""}
              disabled
              className="input-disabled"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label m-0">City</label>
            <input
              value={profarmaMainData?.Cust_Place || ""}
              disabled
              className="input-disabled"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label m-0">State</label>
            <input
              value={profarmaMainData?.Cust_State || ""}
              disabled
              className="input-disabled"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label m-0">PIN</label>
            <input
              value={profarmaMainData?.PIN_Code || ""}
              disabled
              className="input-disabled"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label m-0">GST No</label>
            <input
              value={profarmaMainData?.GSTNo || "Unregistered"}
              disabled
              className="input-disabled"
            />
          </div>
        </div>
        <div className="col-md-6">
          <label className="form-label m-0">Address</label>
          <textarea
            rows="6"
            style={{ width: "100%" }}
            value={profarmaMainData?.Cust_Address || ""}
            disabled
            className="input-disabled"
          ></textarea>
        </div>
      </div>
      <div className="p-1"></div>
      <div className="row border rounded">
        <div className="col-md-3">
          <label className="form-label m-0">Net Total</label>
          <input
            type="number"
            value={parseFloat(profarmaMainData?.Net_Total).toFixed(2)}
            disabled
            className="input-disabled"
          />
        </div>
        <div className="col-md-3">
          <label className="form-label m-0">Discount</label>
          <input
            type="number"
            value={parseFloat(profarmaMainData?.Discount).toFixed(2)}
            // disabled
            // className="input-disabled"
          />
        </div>
        <div className="col-md-3">
          <label className="form-label m-0">Delivery Charges</label>
          <input
            type="number"
            value={parseFloat(profarmaMainData?.Del_Chg).toFixed(2)}
            // disabled
            // className="input-disabled"
          />
        </div>
        <div className="col-md-3">
          <label className="form-label m-0">Tax Amount</label>
          <input
            type="number"
            value={parseFloat(profarmaMainData?.TaxAmount).toFixed(2)}
            disabled
            className="input-disabled"
          />
        </div>
        <div className="col-md-3">
          <label className="form-label m-0">Invoice Total</label>
          <input
            type="number"
            value={parseFloat(profarmaMainData?.InvTotal).toFixed(2)}
            disabled
            className="input-disabled"
          />
        </div>
        <div className="col-md-3">
          <label className="form-label m-0">Round Off</label>
          <input
            type="number"
            value={parseFloat(profarmaMainData?.Round_Off).toFixed(2)}
            disabled
            className="input-disabled"
          />
        </div>
        <div className="col-md-3">
          <label className="form-label m-0">Grand Total</label>
          <input
            type="number"
            value={parseFloat(profarmaMainData?.GrandTotal).toFixed(2)}
            disabled
            className="input-disabled"
          />
        </div>
        <div className="p-1"></div>
      </div>
      <div className="row">
        <div className="col-md-6 d-flex justify-content-between align-items-center">
          <button className="button-style m-0">Save Invoice</button>
          <button className="button-style m-0">Create Invoice</button>
          <button className="button-style m-0">Print Copy</button>
        </div>
        <div className="col-md-6 d-flex justify-content-between align-items-center">
          <div>
            <label className="form-label m-0">Assessable Value</label>
            <input
              type="number"
              value={parseFloat(profarmaMainData?.AssessableValue).toFixed(2)}
              disabled
              className="input-disabled"
            />
          </div>
          <div>
            <label className="form-label m-0">Select Taxes</label>
            <select
              id="taxDropdown"
              style={{ fontSize: "inherit", width: "100%" }}
              className="ip-select mt-1"
            >
              <option value="none" selected disabled hidden>
                Select an Option
              </option>
              {taxDropdownData?.map((taxVal, key) => (
                <option value={key}>{taxVal.TaxName}</option>
              ))}
            </select>
          </div>
          <div>
            <button className="button-style m-0">Delete Taxes</button>
          </div>
        </div>
      </div>
      <div className="p-1"></div>
      <div className="row">
        <div className="col-md-6">
          <ProductTable profarmaDetailsData={profarmaDetailsData} />
        </div>
        <div className="col-md-6">
          <TaxTable profarmaTaxData={profarmaTaxData} />
        </div>
      </div>
      <div className="p-2"></div>
    </>
  );
}

// <div>
//   <div className="row">
//     <div className="col-md-12">
//       <h4 className="title">Proforma Invoice Form</h4>
//     </div>
//   </div>
//   <div className="row mt-2">
//     <div className="col-md-4">
//       <label className="form-label m-0">Invoice Type</label>
//       <input type="text" />
//     </div>
//     <div className="col-md-4">
//       <label className="form-label m-0">Customer Name</label>
//       <input type="text" />
//     </div>
//     <div className="col-md-4">
//       <label className="form-label m-0">GST No</label>
//       <input type="text" />
//     </div>
//   </div>

//   <div className="row">
//     <div className="col-md-4">
//       <label className="form-label m-0">Invoice No</label>
//       <input type="text" />
//     </div>
//     <div className="col-md-4">
//       <label className="form-label m-0">Date</label>
//       <input type="date" />
//     </div>
//     <div className="col-md-4">
//       <label className="form-label m-0">City</label>
//       <input type="text" />
//     </div>
//   </div>

//   <div className="row">
//     <div className="col-md-4">
//       <label className="form-label m-0">Pin</label>
//       <input type="text" />
//     </div>
//     <div className="col-md-4">
//       <label className="form-label m-0">State</label>
//       <input type="text" />
//     </div>
//     <div className="col-md-4">
//       <label className="form-label m-0">PO No</label>
//       <input type="text" />
//     </div>
//   </div>

//   <div className="row">
//     <div className="col-md-4">
//       <label className="form-label m-0">Address</label>
//       <textarea
//         id="exampleFormControlTextarea1"
//         rows="3"
//         style={{ width: "360px" }}
//       ></textarea>
//     </div>
//   </div>

//   <div className="row">
//     <div className="col-md-6">
//       <div className="mt-3" style={{ overflowY: "scroll" }}>
//         <Table
//           striped
//           className="table-data border"
//           style={{ border: "1px" }}
//         >
//           <thead className="tableHeaderBGColor">
//             <tr>
//               <th>Srl</th>
//               <th>Drawing No</th>
//               <th>Material Code</th>
//               <th>Quantity</th>
//               <th>Unit Rate</th>
//               <th>Total</th>
//             </tr>
//           </thead>
//           <tbody className="tablebody"></tbody>
//         </Table>
//       </div>
//     </div>
//     <div className="col-md-6">
//       <div className="row">
//         <div className="col-md-4">
//           <div>
//             <label className="form-label m-0">Select Tax</label>
//             <select id="" className="ip-select">
//               <option value="option1">option 1</option>
//               <option value="option2">option 2</option>
//               <option value="option3">option 3</option>
//             </select>
//           </div>
//           <div>
//             <label className="form-label m-0">Assessable Value</label>
//             <input type="number" />
//           </div>
//           <div>
//             <label className="form-label m-0">Net Total</label>
//             <input type="number" />
//           </div>
//           <div>
//             <label className="form-label m-0">Discount</label>
//             <input type="number" />
//           </div>
//           <div>
//             <label className="form-label m-0">Delivery Charges</label>
//             <input type="number" />
//           </div>
//         </div>
//         <div className="col-md-4">
//           <button className="button-style">Save Invoice</button>
//           <button className="button-style">Delete Taxes</button>

//           <button className="button-style">Create Invoice</button>
//           <button className="button-style">Print Copy</button>
//         </div>
//         <div className="col-md-4">
//           <div>
//             <label className="form-label m-0">Tax Amount</label>
//             <input type="number" />
//           </div>
//           <div>
//             <label className="form-label m-0">Invoice Total</label>
//             <input type="number" />
//           </div>
//           <div>
//             <label className="form-label m-0">Round Off</label>
//             <input type="number" />
//           </div>
//           <div>
//             <label className="form-label m-0">Grand Total</label>
//             <input type="number" />
//           </div>
//         </div>
//       </div>
//       <div className="mt-3" style={{ overflowY: "scroll" }}>
//         <Table
//           striped
//           className="table-data border"
//           style={{ border: "1px" }}
//         >
//           <thead className="tableHeaderBGColor">
//             <tr>
//               <th>Srl</th>
//               <th>Drawing No</th>
//               <th>Material Code</th>
//               <th>Quantity</th>
//               <th>Unit Rate</th>
//               <th>Total</th>
//             </tr>
//           </thead>
//           <tbody className="tablebody"></tbody>
//         </Table>
//       </div>
//     </div>
//   </div>
// </div>
