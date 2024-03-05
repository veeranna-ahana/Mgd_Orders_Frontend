import { React, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";

function BulkChangeModal(props) {
  const {
    bulkChnangMdl,
    setBulkChnangMdl,
    handlebulkChnangMdl,
    handleClosesetBulkChnangMdl,
    // ------------------------------------
    OrderData,
    OrderCustData,
    OrdrDetailsData,
    importdwgshow,
    setImportDwgShow,
    handleImportDwg,
    handleCloseImportDwg,
    importdrawings,
    mtrldata,
    selectMtrl,
    strmtrlcode,
    procdata,
    selectProc,
    selectMtrlSrc,
    tolerancedata,
    selectTolerance,
    inspdata,
    selectInsp,
    packdata,
    selectPack,
    InputField,
    quantity,
    setQuantity,
    jwRate,
    setJwRate,
    materialRate,
    setMaterialRate,
    unitPrice,
    setUnitPrice,
    DwgName,
    handleDwgInputChange,
    PostSrlData,
    insertnewsrldata,
    handleMtrlCodeTypeaheadChange,
    PostOrderDetails,
    selectedPartId,
    setSelectedPartId,
    BomArry,
    setBomArry,
    handleSelectChange,
    options,
    HasBOM,
    setHasBOM,
    LastSlctedRow,
    setLastSlctedRow,
    selectedItems,
  } = props;
  const [isChecked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    const newCheckedValue = !isChecked;
    setChecked(newCheckedValue);

    console.log("Checkbox is now:", newCheckedValue);
  };
  return (
    <div className="row mt-1">
      <Modal show={bulkChnangMdl} size="m">
        <Modal.Header
          className="justify-content-md-center"
          style={{
            paddingTop: "10px",
            backgroundColor: "#283E81",
            color: "#ffffff",
          }}
        >
          <Modal.Title>Bulk Change Parameters</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-style">
            {/* <Form onSubmit={importdrawings} style={{ overflowY: "scroll" }}> */}
            <div className="row mb-1">
              <div className="col">
                <div className="row">
                  <Form.Group controlId="strmtrlcode">
                    <div className="md-col-2">
                      <Form.Label className="form-label">
                        Dwg / Part Name
                      </Form.Label>
                      <Form.Label className="form-label">
                        <input
                          type="checkbox"
                          style={{ marginLeft: "165px" }}
                          className="checkBoxStyle "
                          onChange={handleCheckboxChange}
                          checked={isChecked}
                          //   checked={props.OrderData?.Delivery === 1}
                        />
                      </Form.Label>

                      <input
                        value={
                          // selectedItems[0]?.DwgName || " "
                          LastSlctedRow?.DwgName || " "
                        }
                        // onChange={handleDwgInputChange}
                        required
                      />
                    </div>
                  </Form.Group>
                </div>
                <div className="row">
                  <Form.Group controlId="strmtrlcode">
                    <div className="md-col-2">
                      <Form.Label className="form-label">Material</Form.Label>
                      <Form.Label className="form-label">
                        <input
                          type="checkbox"
                          style={{ marginLeft: "215px" }}
                          className="checkBoxStyle "
                          //   checked={props.OrderData?.Delivery === 1}
                        />
                      </Form.Label>
                      {mtrldata.length > 0 || mtrldata != null ? (
                        <Typeahead
                          id="basic-example"
                          labelKey="Mtrl_Code"
                          onChange={handleMtrlCodeTypeaheadChange}
                          selected={selectedItems} // Use selected prop instead of defaultInputValue
                          options={mtrldata}
                          placeholder="Choose a Material..."
                          required
                        ></Typeahead>
                      ) : (
                        ""
                      )}
                    </div>
                  </Form.Group>
                </div>

                <div className="row mt-1">
                  <Form.Group controlId="source">
                    <div className="md-col-4">
                      <label className="form-label">Material Source</label>
                      <Form.Label className="form-label">
                        <input
                          type="checkbox"
                          style={{ marginLeft: "175px" }}
                          //   className="checkBoxStyle "
                          //   checked={props.OrderData?.Delivery === 1}
                        />
                      </Form.Label>
                      <select
                        className="ip-select"
                        id="strsource"
                        onChange={selectMtrlSrc}
                      >
                        <option
                          value={LastSlctedRow?.Mtrl_Source || " "}
                          disabled
                          selected
                        >
                          ** Select **
                        </option>
                        <option value={"Customer"}>Customer</option>
                        <option value={"Magod"}>Magod</option>
                      </select>
                    </div>
                  </Form.Group>
                </div>

                <div className="row mt-1">
                  <Form.Group controlId="strprocess">
                    {/* <div className="md-col-4">
                      <label className="form-label">Operation</label>
                      {procdata.length > 0 ? (
                        <select
                          className="ip-select"
                          id="strprocess"
                          onChange={selectProc}
                        >
                          <option value="" disabled selected>
                            ** Select **
                          </option>
                          {procdata.map((proc) => {
                            return (
                              <option value={proc["ProcessDescription"]}>
                                {proc["ProcessDescription"]}
                              </option>
                            );
                          })}
                        </select>
                      ) : (
                        ""
                      )}
                    </div> */}
                    <div className="md-col-4">
                      <label className="form-label">Operation</label>
                      {procdata?.length > 0 ? (
                        <select
                          className="ip-select"
                          id="strprocess"
                          onChange={selectProc}
                        >
                          <option
                            value={LastSlctedRow?.Operation || " "}
                            disabled
                            selected
                          >
                            ** Select **
                          </option>
                          {procdata.map((proc) => {
                            // Check if "Service" column has non-zero values
                            if (props.OrderData?.Type === "Service") {
                              if (proc["Service"] !== 0) {
                                return (
                                  <option
                                    key={proc["ProcessDescription"]}
                                    value={proc["ProcessDescription"]}
                                  >
                                    {proc["ProcessDescription"]}
                                  </option>
                                );
                              }
                            } else if (
                              props.OrderData?.Type === "Fabrication"
                            ) {
                              if (proc["MultiOperation"] !== 0) {
                                return (
                                  <option
                                    key={proc["ProcessDescription"]}
                                    value={proc["ProcessDescription"]}
                                  >
                                    {proc["ProcessDescription"]}
                                  </option>
                                );
                              }
                            } else {
                              if (proc["Profile"] !== 0) {
                                return (
                                  <option
                                    key={proc["ProcessDescription"]}
                                    value={proc["ProcessDescription"]}
                                  >
                                    {proc["ProcessDescription"]}
                                  </option>
                                );
                              }
                            }

                            return null; // Exclude options with zero values in "Service" column
                          })}
                        </select>
                      ) : (
                        ""
                      )}
                    </div>
                  </Form.Group>
                </div>

                {/* <div className="row mt-1">
                  <div className="md-col-4">
                    <label className="form-label">Operation</label>
                    {tolerancedata.length > 0 ? (
                      <select
                        className="ip-select"
                        id="strtolerance"
                        onChange={selectTolerance}
                      >
                        <option value="" disabled selected>
                          ** Select **
                        </option>
                        {tolerancedata.map((toltype) => {
                          return (
                            <option value={toltype["ToleranceType"]}>
                              {toltype["ToleranceType"]}
                            </option>
                          );
                        })}
                      </select>
                    ) : (
                      ""
                    )}
                  </div>
                </div> */}
                <div className="row mt-1">
                  <div className="col-md-6">
                    <InputField
                      label="Quantity"
                      id="Qty"
                      value={LastSlctedRow?.Qty_Ordered || " "}
                      onChangeCallback={setQuantity}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <Form.Group controlId="rates">
                      <InputField
                        label="JW Rate"
                        id="Qty"
                        value={LastSlctedRow?.JWCost || " "}
                        onChangeCallback={setJwRate}
                      />
                    </Form.Group>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <Form.Group controlId="rates">
                      <InputField
                        label="UnitPrice"
                        id="Qty"
                        value={LastSlctedRow?.UnitPrice || " "}
                        onChangeCallback={setUnitPrice}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    {" "}
                    <Form.Group controlId="rates">
                      <InputField
                        label="Material Rate"
                        id="Qty"
                        value={LastSlctedRow?.MtrlCost || " "}
                        onChangeCallback={setMaterialRate}
                      />
                    </Form.Group>
                  </div>
                </div>

                <div className="row mt-1">
                  <div className="col-md-6">
                    <label className="form-label">Insp Level</label>
                    {inspdata.length > 0 ? (
                      <select
                        id="strinsp"
                        className="ip-select"
                        onChange={selectInsp}
                      >
                        <option
                          value={LastSlctedRow?.InspLevel || " "}
                          disabled
                          selected
                        >
                          ** Select **
                        </option>
                        {inspdata.map((insplvl) => {
                          return (
                            <option value={insplvl["InspLevel"]}>
                              {insplvl["InspLevel"]}
                            </option>
                          );
                        })}
                      </select>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Packing Level</label>
                    {packdata.length > 0 ? (
                      <select
                        id="strpkng"
                        className="ip-select"
                        onChange={selectPack}
                      >
                        <option
                          value={LastSlctedRow?.PackingLevel || " "}
                          disabled
                          selected
                        >
                          ** Select **
                        </option>
                        {packdata.map((packlvl) => {
                          return (
                            <option value={packlvl["PkngLevel"]}>
                              {packlvl["PkngLevel"]}
                            </option>
                          );
                        })}
                      </select>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="row mt-1"></div>
              </div>
            </div>
            {/* </Form> */}
          </div>
        </Modal.Body>
        <Modal.Footer>
          {" "}
          <div className="row ">
            <button
              className="button-style"
              type="submit"
              style={{ width: "100px" }}
            >
              Save
            </button>

            <button
              className="button-style"
              style={{ width: "100px", backgroundColor: "gray" }}
              variant="secondary"
              onClick={() => handleClosesetBulkChnangMdl()}
            >
              Close
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default BulkChangeModal;
