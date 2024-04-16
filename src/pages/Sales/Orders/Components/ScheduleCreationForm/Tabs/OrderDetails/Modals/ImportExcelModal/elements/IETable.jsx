import React from "react";
import { Tab, Table, Tabs, Form } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";

export default function IETable(props) {
  // console.log("propssss", props);

  const handleChange = (
    key,
    name,
    val,
    materialError,
    sourceError,
    operationError
  ) => {
    // console.log("key", key);
    // console.log("name", name);
    // console.log("val", val);
    // console.log("materialError", materialError);
    // console.log("sourceError", sourceError);
    // console.log("operationError", operationError);

    let arr = [];
    for (let i = 0; i < props.importedExcelData.length; i++) {
      let element = props.importedExcelData[i];
      if (i === key) {
        element[name] = val;
        element.materialError = materialError;
        element.sourceError = sourceError;
        element.operationError = operationError;
      }
      arr.push(element);
    }

    // console.log("arr", arr);
    props.setImportedExcelData(arr);
    // console.log("importedExcelData", importedExcelData);
  };

  // console.log("props.selectedRows", props.selectedRows);
  return (
    <>
      <Table striped className="table-data border" style={{ border: "1px" }}>
        <thead className="tableHeaderBGColor">
          <tr>
            <th>SL No</th>
            <th>Drawing Name</th>
            <th>Material Code</th>
            <th>Source</th>
            <th>Operation</th>
            <th>Order Qty</th>
            <th>JW Cost</th>
            <th>Material Cost</th>
            <th>Unit Price</th>
          </tr>
        </thead>
        <tbody className="tablebody">
          {props.importedExcelData?.map((val, key) => (
            <>
              <tr
                className={
                  props.selectedRows.includes(key) ? "selected-row" : ""
                }
                onClick={(e) => {
                  if (props.selectedRows.includes(key)) {
                    props.setSelectedRows(
                      props.selectedRows.filter((obj) => obj != key)
                    );
                  } else {
                    props.setSelectedRows([...props.selectedRows, key]);
                  }
                }}
              >
                <td>{key + 1}</td>
                <td>
                  <input
                    value={val.Dwg_Name}
                    name="Dwg_Name"
                    style={{ background: "transparent", border: "none" }}
                    onChange={(e) => {
                      handleChange(
                        key,
                        e.target.name,
                        e.target.value || "",
                        val.materialError,
                        val.sourceError,
                        val.operationError
                      );
                    }}
                  />
                </td>
                <td>
                  {/* {val.Mtrl_Code} */}

                  <Typeahead
                    className={
                      val.materialError
                        ? "border rounded border-1 border-danger typeaheadClass"
                        : "typeaheadClass"
                    }
                    // className="ip-select"
                    id="Mtrl_Code"
                    name="Mtrl_Code"
                    // labelKey="Mtrl_Code"
                    onChange={(e) => {
                      handleChange(
                        key,
                        "Mtrl_Code",
                        e.length > 0 ? e[0].label : "",
                        e.length > 0 ? false : true,
                        val.sourceError,
                        val.operationError
                      );
                    }}
                    options={props.mtrldata}
                    selected={[{ label: val.Mtrl_Code }]}
                    placeholder="Choose a Material..."
                  />
                </td>
                <td>
                  {/* {val.Source} */}

                  <Typeahead
                    className={
                      val.sourceError
                        ? "border rounded border-1 border-danger typeaheadClass"
                        : "typeaheadClass"
                    }
                    // className="ip-select"
                    id="Source"
                    name="Source"
                    // labelKey="Operation"
                    onChange={(e) => {
                      handleChange(
                        // key, "Source", e[0]
                        key,
                        "Source",
                        e.length > 0 ? e[0].label : "",
                        val.materialError,
                        e.length > 0 ? false : true,
                        val.operationError
                      );
                    }}
                    options={props.materialSource}
                    selected={[{ label: val.Source }]}
                    placeholder="Choose a Source..."
                  />
                </td>
                <td>
                  {/* {val.Operation} */}

                  <Typeahead
                    className={
                      val.operationError
                        ? "border rounded border-1 border-danger typeaheadClass"
                        : "typeaheadClass"
                    }
                    // className="ip-select border-0"
                    id="Operation"
                    name="Operation"
                    // labelKey="Operation"
                    onChange={(e) => {
                      handleChange(
                        // key, "Operation", e[0]
                        key,
                        "Operation",
                        e.length > 0 ? e[0].label : "",
                        val.materialError,
                        val.sourceError,
                        e.length > 0 ? false : true
                      );
                    }}
                    options={props.procdata}
                    selected={[{ label: val.Operation }]}
                    placeholder="Choose a Operation..."
                  />
                </td>
                <td>
                  <input
                    type="number"
                    min="0"
                    value={val.Order_Qty}
                    name="Order_Qty"
                    style={{ background: "transparent", border: "none" }}
                    onChange={(e) => {
                      handleChange(
                        key,
                        e.target.name,
                        e.target.value,
                        val.materialError,
                        val.sourceError,
                        val.operationError
                      );
                    }}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    min="0"
                    // value={val.JW_Cost}
                    value={val.JW_Cost}
                    name="JW_Cost"
                    style={{ background: "transparent", border: "none" }}
                    onChange={(e) => {
                      handleChange(
                        key,
                        e.target.name,
                        e.target.value,
                        val.materialError,
                        val.sourceError,
                        val.operationError
                      );
                    }}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    min="0"
                    // value={val.Mtrl_Cost}
                    value={val.Mtrl_Cost}
                    name="Mtrl_Cost"
                    style={{ background: "transparent", border: "none" }}
                    onChange={(e) => {
                      handleChange(
                        key,
                        e.target.name,
                        e.target.value,
                        val.materialError,
                        val.sourceError,
                        val.operationError
                      );
                    }}
                  />
                </td>
                <td>
                  {(
                    parseFloat(
                      val.Source === "Magod" ? val.Mtrl_Cost || 0 : 0
                    ) + parseFloat(val.JW_Cost || 0)
                  ).toFixed(2)}

                  {/* {(
                    parseFloat(val.JW_Cost || 0) +
                    parseFloat(val.Mtrl_Cost || 0)
                  ).toFixed(2)} */}
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </Table>
    </>
  );
}
