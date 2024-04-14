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
              <tr>
                <td>{key + 1}</td>
                <td>{val.Dwg_Name}</td>
                <td>
                  {/* {val.Mtrl_Code} */}

                  <Typeahead
                    className={
                      val.materialError ? "border border-1 border-danger" : ""
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
                    defaultSelected={[{ label: val.Mtrl_Code }]}
                    placeholder="Choose a Material..."
                  />
                </td>
                <td>
                  {/* {val.Source} */}

                  <Typeahead
                    className={
                      val.sourceError ? "border border-1 border-danger" : ""
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
                    defaultSelected={[{ label: val.Source }]}
                    placeholder="Choose a Source..."
                  />
                </td>
                <td>
                  {/* {val.Operation} */}

                  <Typeahead
                    className={
                      val.operationError ? "border border-1 border-danger" : ""
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
                    defaultSelected={[{ label: val.Operation }]}
                    placeholder="Choose a Operation..."
                  />
                </td>
                <td>{val.Order_Qty}</td>
                <td>{val.JW_Cost}</td>
                <td>{val.Mtrl_Cost}</td>
                <td>
                  {(
                    parseFloat(val.JW_Cost) + parseFloat(val.Mtrl_Cost)
                  ).toFixed(2)}
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </Table>
    </>
  );
}
