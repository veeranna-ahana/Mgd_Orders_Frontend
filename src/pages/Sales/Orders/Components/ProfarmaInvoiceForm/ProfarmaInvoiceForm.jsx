import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { Button, Table } from "react-bootstrap";
import { toast } from "react-toastify";

import { endpoints } from "../../../../api/constants";
import { getRequest, postRequest } from "../../../../api/apiinstance";
import ProductTable from "./Tables/ProductTable";
import TaxTable from "./Tables/TaxTable";
import Confirmation from "../Modals/Confirmation";

export default function ProfarmaInvoiceForm(props) {
  const location = useLocation();
  const todayDate = new Date();

  // console.log("location", location);
  const [ProfarmaID, setProfarmaID] = useState(location?.state);
  // console.log("profarmaID", ProfarmaID);

  const [runningNo, setRunningNo] = useState({});
  const [profarmaMainData, setProfarmaMainData] = useState({});
  const [profarmaDetailsData, setProfarmaDetailsData] = useState([]);
  const [profarmaTaxData, setProfarmaTaxData] = useState([]);

  const [taxDropdownData, setTaxDropdownData] = useState([]);

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

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

  // console.log("profarmaMainData", profarmaMainData);
  // console.log("profarmaDetailsData", profarmaDetailsData);
  // console.log("profarmaTaxData", profarmaTaxData);

  function saveInvoiceFunc() {
    // console.log("saveInvoiceFunc clicked");

    postRequest(
      endpoints.postSaveInvoice,
      {
        profarmaMainData: profarmaMainData,
        profarmaDetailsData: profarmaDetailsData,
        profarmaTaxData: profarmaTaxData,
      },
      (saveInvoiceResp) => {
        // console.log("saveInvoiceResp", saveInvoiceResp);

        if (saveInvoiceResp) {
          if (saveInvoiceResp.flag) {
            toast.success(saveInvoiceResp.message);
          } else {
            toast.error("uncaught backend error");
          }
        } else {
          toast.warning("uncaught frontend error");
        }
      }
    );
  }

  function modifyInputs(e) {
    // console.log("eeee", e.target.name, e.target.value);

    let discount = profarmaMainData.Discount || 0;
    let deliveryCharge = profarmaMainData.Del_Chg || 0;

    let taxAmount = 0;
    let invoiceTotal = 0;
    let roundOff = 0;
    let grandTotal = 0;
    let assessableValue = 0;

    if (e.target.name === "Discount") {
      discount = e.target.value || 0;
    } else if ((e.target.name = "Del_Chg")) {
      deliveryCharge = e.target.value || 0;
    }

    invoiceTotal =
      parseFloat(profarmaMainData?.Net_Total) -
      parseFloat(discount) +
      parseFloat(deliveryCharge);

    grandTotal = Math.round(invoiceTotal);
    roundOff = grandTotal - invoiceTotal;
    assessableValue = invoiceTotal;

    setProfarmaMainData({
      ...profarmaMainData,
      Discount: discount,
      Del_Chg: deliveryCharge,
      TaxAmount: taxAmount,
      InvTotal: invoiceTotal,
      Round_Off: roundOff,
      GrandTotal: grandTotal,
      AssessableValue: assessableValue,
    });

    setProfarmaTaxData([]);
    document.getElementById("taxDropdown").value = "none";

    // setProfarmaMainData({
    //   ...profarmaMainData,
    //   [e.target.name]: e.target.value || 0,
    // });
  }

  function deleteTaxes() {
    setProfarmaTaxData([]);
    document.getElementById("taxDropdown").value = "none";

    setProfarmaMainData({
      ...profarmaMainData,
      TaxAmount: "0.00",
      InvTotal:
        parseFloat(profarmaMainData?.Net_Total) -
        parseFloat(profarmaMainData?.Discount) +
        parseFloat(profarmaMainData?.Del_Chg),
      GrandTotal: Math.round(
        parseFloat(profarmaMainData?.Net_Total) -
          parseFloat(profarmaMainData?.Discount) +
          parseFloat(profarmaMainData?.Del_Chg)
      ),
      Round_Off:
        Math.round(
          parseFloat(profarmaMainData?.Net_Total) -
            parseFloat(profarmaMainData?.Discount) +
            parseFloat(profarmaMainData?.Del_Chg)
        ) -
        (parseFloat(profarmaMainData?.Net_Total) -
          parseFloat(profarmaMainData?.Discount) +
          parseFloat(profarmaMainData?.Del_Chg)),
    });
  }
  // console.log("profarmaMainData", profarmaMainData);

  function changeQTY(key, qty) {
    // console.log("key", key, "qty", qty);
    let arr = [];
    let netTotal = 0;

    for (let i = 0; i < profarmaDetailsData.length; i++) {
      const element = profarmaDetailsData[i];
      if (i === key) {
        element.Qty = qty;
        element.DC_Srl_Amt = (
          parseFloat(qty) * parseFloat(element.Unit_Rate)
        ).toFixed(2);

        // netTotal =
        //   parseFloat(netTotal) +
        //   parseFloat(qty) * parseFloat(element.Unit_Rate);
      }
      // netTotal =
      //   parseFloat(netTotal) +
      //   parseFloat(element.Qty) * parseFloat(element.Unit_Rate);
      arr.push(element);

      netTotal = parseFloat(netTotal) + parseFloat(element.DC_Srl_Amt);
      // console.log("netTotal", netTotal);
    }

    // console.log("arr", arr);

    setProfarmaDetailsData(arr);

    setProfarmaMainData({
      ...profarmaMainData,
      Net_Total: parseFloat(netTotal).toFixed(2),
      Discount: "0.00",
      Del_Chg: "0.00",
      TaxAmount: "0.00",
      InvTotal: parseFloat(netTotal).toFixed(2),
      GrandTotal: Math.round(parseFloat(netTotal).toFixed(2)),
      Round_Off: (
        Math.round(parseFloat(netTotal).toFixed(2)) -
        parseFloat(netTotal).toFixed(2)
      ).toFixed(2),
      AssessableValue: parseFloat(netTotal).toFixed(2),
    });

    setProfarmaTaxData([]);
    document.getElementById("taxDropdown").value = "none";
  }

  function getRunningNo() {
    let SrlType = "ProformaInvoice";
    let yyyy = todayDate.getFullYear();
    let UnitName = "Jigani";
    const insertRunningNoVal = {
      UnitName: UnitName,
      SrlType: SrlType,
      ResetPeriod: "FinanceYear",
      ResetValue: "0",
      EffectiveFrom_date:
        todayDate.getMonth() + 1 <= 3 ? `${yyyy - 1}-04-01` : `${yyyy}-04-01`,
      Reset_date:
        todayDate.getMonth() + 1 <= 3 ? `${yyyy}-04-01` : `${yyyy + 1}-04-01`,
      Running_No: "0",
      UnitIntial: "0",
      Prefix: UnitName.slice(0, 1),
      Suffix: "",
      Length: "3",
      Period:
        todayDate.getMonth() + 1 <= 3
          ? `${(yyyy - 1).toString().slice(-2)}/${yyyy.toString().slice(-2)}`
          : `${yyyy.toString().slice(-2)}${(yyyy + 1).toString().slice(-2)}`,
    };

    // console.log("insertRunningNoVal", insertRunningNoVal);
    postRequest(
      endpoints.getAndInsertRunningNo,
      insertRunningNoVal,
      (runningNo) => {
        setRunningNo(runningNo[0]);
      }
    );
  }

  // console.log("runningNo", runningNo);
  // getRunningNo();

  function createInvoiceFirst() {
    getRunningNo();
    setConfirmModalOpen(true);
  }
  function createInvoiceSecond() {
    // console.log("create invoice");

    let newRunningNo = parseInt(runningNo.Running_No) + 1;

    let series = newRunningNo.toString();
    for (let i = 0; i < parseInt(runningNo["Length"]); i++) {
      if (series.length < parseInt(runningNo["Length"])) {
        series = "0" + series;
      }
    }

    series = runningNo.Period + "/" + runningNo.Prefix + series;

    // console.log("seriesssss", series);

    postRequest(
      endpoints.postInvFormCreateInvoice,
      { series: series, ProfarmaID: profarmaMainData.ProfarmaID },
      (resp) => {
        // console.log("resp", resp);

        if (resp.affectedRows > 0 || resp.changedRows > 0) {
          toast.success("Proforma Invoice Created");
          fetchData();

          postRequest(
            endpoints.updateRunningNoBySrlType,
            {
              SrlType: runningNo.SrlType,
              Period: runningNo.Period,
              RunningNo: newRunningNo,
            },
            (updateRunningNo) => {
              if (resp.affectedRows > 0 || resp.changedRows > 0) {
              } else {
                toast.error("unable to update running no");
              }

              // console.log("update running no", updateRunningNo);
            }
          );
        } else {
          toast.error("uncaught error in backend");
        }
        // setRunningNo(runningNo[0]);
      }
    );
  }

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
            value={parseFloat(profarmaMainData?.Discount)}
            min={0}
            // max={parseFloat(profarmaMainData?.Net_Total)}
            name="Discount"
            onChange={modifyInputs}
            // disabled
            // className="input-disabled"
          />
        </div>
        <div className="col-md-3">
          <label className="form-label m-0">Delivery Charges</label>
          <input
            type="number"
            value={parseFloat(profarmaMainData?.Del_Chg)}
            min={0}
            name="Del_Chg"
            onChange={modifyInputs}
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
          <button className="button-style m-0" onClick={saveInvoiceFunc}>
            Save Invoice
          </button>
          <button className="button-style m-0" onClick={createInvoiceFirst}>
            Create Invoice
          </button>
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
              onChange={(e) => {
                const taxOn = taxDropdownData[e.target.value].TaxOn?.split(
                  "("
                )[0]
                  .split(")")[0]
                  .split("+");

                let applicableTaxes = [];
                let arr = [];

                let totalTaxAmount = 0;

                // console.log("taxOn", taxOn);
                for (let i = 0; i < taxOn.length; i++) {
                  const element = parseInt(taxOn[i]);
                  if (element === 1) {
                    // console.log("111", taxDropdownData[e.target.value]);
                    applicableTaxes.push(taxDropdownData[e.target.value]);
                  } else {
                    // console.log("else", taxDropdownData);

                    taxDropdownData
                      .filter((obj) => parseInt(obj.TaxID) === element)
                      .map((val, key) => applicableTaxes.push(val));
                  }
                }

                // console.log("applicableTaxes", applicableTaxes);

                for (let i = 0; i < applicableTaxes.length; i++) {
                  const element = applicableTaxes[i];

                  let taxableAmount = parseFloat(
                    profarmaMainData?.AssessableValue || 0
                  ).toFixed(2);

                  let taxAmount = parseFloat(
                    (taxableAmount * parseFloat(element.Tax_Percent)) / 100
                  ).toFixed(2);

                  const taxTableRow = {
                    ProfarmaID: profarmaMainData.ProfarmaID,
                    TaxID: element.TaxID,
                    Tax_Name: element.TaxName,
                    TaxOn: element.TaxOn,
                    TaxableAmount: taxableAmount,
                    TaxPercent: parseFloat(element.Tax_Percent).toFixed(2),
                    TaxAmt: taxAmount,
                  };

                  arr.push(taxTableRow);
                  totalTaxAmount =
                    parseFloat(totalTaxAmount) + parseFloat(taxAmount);

                  // console.log("taxTableRow", taxTableRow);
                  // console.log("taxprofarma", profarmaTaxData);
                  // if (profarmaTaxData.length > 0) {
                  //   setProfarmaTaxData([...profarmaTaxData, taxTableRow]);
                  // } else {
                  //   setProfarmaTaxData([taxTableRow]);
                  // }
                }

                let invTotal =
                  parseFloat(profarmaMainData.Net_Total) -
                  parseFloat(profarmaMainData.Discount) +
                  parseFloat(profarmaMainData.Del_Chg) +
                  parseFloat(totalTaxAmount);

                let grandTotal = Math.round(invTotal);
                setProfarmaTaxData(arr);
                setProfarmaMainData({
                  ...profarmaMainData,
                  TaxAmount: totalTaxAmount,
                  InvTotal: invTotal,
                  Round_Off: grandTotal - invTotal,
                  GrandTotal: grandTotal,
                });
              }}
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
            <button className="button-style m-0" onClick={deleteTaxes}>
              Delete Taxes
            </button>
          </div>
        </div>
      </div>
      <div className="p-1"></div>
      <div className="row">
        <div className="col-md-6">
          <ProductTable
            profarmaDetailsData={profarmaDetailsData}
            changeQTY={changeQTY}
          />
        </div>
        <div className="col-md-6">
          <TaxTable profarmaTaxData={profarmaTaxData} />
        </div>
      </div>
      <div className="p-2"></div>

      <Confirmation
        setConfirmModalOpen={setConfirmModalOpen}
        confirmModalOpen={confirmModalOpen}
        message={"Are you sure to create the Profarma Invoice"}
        yesClickedFunc={createInvoiceSecond}
      />
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
