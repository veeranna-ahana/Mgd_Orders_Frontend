import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";

import ConfirmationModal from "../../../../../../../Modal/ConfirmationModal";

import { toast } from "react-toastify";

export default function IEFormHeader(props) {
  // const [importedExcelData, setImportedExcelData] = useState([]);

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  function exportExcelTemplate() {
    const excelTemplateArray = [
      {
        Dwg_Name: "",
        Mtrl_Code: "",
        Source: "",
        Operation: "",
        Order_Qty: "",
        JW_Cost: "",
        Mtrl_Cost: "",
      },
    ];

    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.json_to_sheet(excelTemplateArray);

    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");
    XLSX.writeFile(wb, "Import Customer Order Template.xlsx");
    toast.success("Import customer order template success.");
  }

  const noFileFoundFun = (e) => {
    // console.log("download the file.......");
    setConfirmModalOpen(false);
    props.setImportedExcelData([]);

    exportExcelTemplate();
  };

  const handleChange = (e) => {
    const reader = new FileReader();

    if (e.target.files.length > 0) {
      reader.readAsBinaryString(e.target.files[0]);
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet);
        if (
          parsedData.length > 0 &&
          !(
            parsedData[0].Dwg_Name === "" &&
            parsedData[0].Mtrl_Code === "" &&
            parsedData[0].Source === "" &&
            parsedData[0].Operation === "" &&
            parsedData[0].Order_Qty === "" &&
            parsedData[0].JW_Cost === "" &&
            parsedData[0].Mtrl_Cost === ""
          )
        ) {
          if (
            parsedData[0].Dwg_Name &&
            parsedData[0].Mtrl_Code &&
            parsedData[0].Source &&
            parsedData[0].Operation &&
            parsedData[0].Order_Qty &&
            parsedData[0].JW_Cost &&
            parsedData[0].Mtrl_Cost
          ) {
            props.setImportedExcelData(parsedData);
            toast.success("All order details correctly loaded.");
          } else {
            toast.error("Tempalate error.");
            props.setImportedExcelData([]);
          }
        } else {
          toast.warning("Excel file has no data to import");
          props.setImportedExcelData([]);
        }

        // console.log("dataaaaaa", parsedData);
      };
    } else {
      props.setImportedExcelData([]);

      setConfirmModalOpen(true);
    }
  };

  // const handleOnFocus = (e) => {
  //   console.log("eeee", e.target.files.length);

  //   if (e.target.files.length === 0) {
  //     console.log("no files");
  //     setConfirmModalOpen(true);
  //   } else {
  //     console.log("files");
  //     setConfirmModalOpen(false);
  //   }
  // };

  console.log("importedExcelData", props.importedExcelData);
  return (
    <>
      <div className="row">
        <b>Order Total</b>
        <input disabled />
      </div>
      <div className="row">
        <div className="col-md-3">
          <b>Load Excel</b>
          <input
            type="file"
            name=""
            id=""
            accept=".xlsx, .xls"
            onChange={handleChange}
            // onFocus={handleOnFocus}
            // className="button-style m-1"
          />
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <button className="button-style m-1">Update Para</button>
        <button className="button-style m-1">Set Material</button>
        <button className="button-style m-1">Set Operation</button>
        {/* <button className="button-style m-1">Load Excel</button> */}
        <button className="button-style m-1">Compare</button>
        <button className="button-style m-1">Load to Order</button>
      </div>

      <ConfirmationModal
        setConfirmModalOpen={setConfirmModalOpen}
        confirmModalOpen={confirmModalOpen}
        yesClickedFunc={noFileFoundFun}
        message={
          "You need a excel template for importing. Do you wish to save the template?"
        }
      />
    </>
  );
}
