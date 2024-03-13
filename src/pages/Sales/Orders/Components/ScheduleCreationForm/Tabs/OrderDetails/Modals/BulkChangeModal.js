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
    updateOrdrData,
    handleblkCngCheckBox,
    blkCngCheckBox,
    setBlkCngCheckBox,
  } = props;
  console.log("blkCngCheckBox", blkCngCheckBox);

  console.log("blkCngCheckBox", blkCngCheckBox[0]);
  console.log("blkCngCheckBox", blkCngCheckBox[1]);
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
                  {/* <div className="col-md-3"></div>
                  <div className="col-md-3"></div> */}
                  <Form.Group controlId="strmtrlcode">
                    {/* <div className="md-col-2"> */}
                    <div className="row">
                      <div className="col-md-10">
                        <Form.Label className="form-label">
                          Dwg / Part Name
                        </Form.Label>
                      </div>
                      <div className="col-md-2 mt-3">
                        <input
                          type="checkbox"
                          onChange={() => handleblkCngCheckBox(0)}
                          checked={blkCngCheckBox[0]}
                        />
                      </div>
                    </div>

                    <input
                      className="in-fields"
                      value={DwgName}
                      onChange={handleDwgInputChange}
                      required
                      disabled={!blkCngCheckBox[0]}
                    />
                    {/* </div> */}
                  </Form.Group>
                </div>
                <div className="row">
                  <Form.Group controlId="strmtrlcode">
                    <div className="row">
                      <div className="col-md-10">
                        <Form.Label className="form-label">Material</Form.Label>
                      </div>
                      <div className="col-md-2 mt-3">
                        <input
                          type="checkbox"
                          onChange={() => handleblkCngCheckBox(1)}
                          checked={blkCngCheckBox[1]}
                        />
                      </div>
                      {mtrldata.length > 0 || mtrldata != null ? (
                        <Typeahead
                          // className="ip-select"
                          labelKey="Mtrl_Code"
                          onChange={handleMtrlCodeTypeaheadChange}
                          selected={selectedItems} // Use selected prop instead of defaultInputValue
                          options={mtrldata}
                          placeholder="Choose a Material..."
                          required
                          disabled={!blkCngCheckBox[1]}
                        ></Typeahead>
                      ) : (
                        ""
                      )}
                    </div>
                  </Form.Group>
                </div>

                <div className="row mt-1">
                  <Form.Group controlId="source">
                    <div className="row">
                      <div className="col-md-10">
                        <label className="form-label">Material Source</label>
                      </div>
                      <div className="col-md-2 mt-3">
                        <input
                          type="checkbox"
                          onChange={() => handleblkCngCheckBox(2)}
                          checked={blkCngCheckBox[2]}
                        />
                      </div>
                      <select
                        className="ip-select in-fields"
                        id="strsource"
                        onChange={selectMtrlSrc}
                        disabled={!blkCngCheckBox[2]}
                      >
                        <option value="" disabled selected>
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
                    <div className="row">
                      <div className="col-md-10">
                        <label className="form-label">Operation</label>
                      </div>
                      <div className="col-md-2 mt-3">
                        <input
                          type="checkbox"
                          onChange={() => handleblkCngCheckBox(3)}
                          checked={blkCngCheckBox[3]}
                        />
                      </div>
                      {procdata?.length > 0 ? (
                        <select
                          className="ip-select in-fields"
                          id="strprocess"
                          onChange={selectProc}
                          disabled={!blkCngCheckBox[3]}
                        >
                          <option
                            value=""
                            // disabled={!blkCngCheckBox[3]}
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
                    {/* <input
                      type="checkbox"
                      onChange={() => handleblkCngCheckBox(4)}
                      checked={blkCngCheckBox[4]}
                    /> */}
                    <InputField
                      className="ip-select in-fields"
                      label="Quantity"
                      id="Qty"
                      value={quantity}
                      onChangeCallback={setQuantity}
                      required
                      disabled={!blkCngCheckBox[4]}
                      onCheckboxChange={() => handleblkCngCheckBox(4)}
                      isChecked={blkCngCheckBox[4]}
                      checkboxIndex={4} // Pass the index as a prop
                    />
                  </div>
                  <div className="col-md-6">
                    <Form.Group controlId="rates">
                      {/* <input
                        type="checkbox"
                        onChange={() => handleblkCngCheckBox(5)}
                      /> */}
                      <InputField
                        className="ip-select in-fields"
                        label="JW Rate"
                        id="JWRate"
                        value={jwRate}
                        onChangeCallback={setJwRate}
                        disabled={!blkCngCheckBox[5]}
                        onCheckboxChange={() => handleblkCngCheckBox(5)}
                        isChecked={blkCngCheckBox[5]}
                        checkboxIndex={5} // Pass the index as a prop
                      />
                    </Form.Group>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <Form.Group controlId="rates">
                      {/* <input
                        type="checkbox"
                        onChange={() => handleblkCngCheckBox(6)}
                        checked={blkCngCheckBox[6]}
                      /> */}
                      <InputField
                        className="ip-select in-fields"
                        label="UnitPrice"
                        id="UnitPrice"
                        value={unitPrice}
                        onChangeCallback={setUnitPrice}
                        disabled={!blkCngCheckBox[6]}
                        onCheckboxChange={() => handleblkCngCheckBox(6)}
                        isChecked={blkCngCheckBox[6]}
                        checkboxIndex={6} // Pass the index as a prop
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    {" "}
                    {/* <input
                      type="checkbox"
                      onChange={() => handleblkCngCheckBox(7)}
                      checked={blkCngCheckBox[7]}
                      style={{ marginLeft: "30px" }}
                    /> */}
                    <Form.Group controlId="rates">
                      <InputField
                        className="ip-select in-fields"
                        label="Material Rate"
                        id="Mrate"
                        value={materialRate}
                        onChangeCallback={setMaterialRate}
                        disabled={!blkCngCheckBox[7]}
                        onCheckboxChange={() => handleblkCngCheckBox(7)}
                        isChecked={blkCngCheckBox[7]}
                        checkboxIndex={7} // Pass the index as a prop
                      />
                    </Form.Group>
                  </div>
                </div>

                <div className="row mt-1">
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-9">
                        <label className="form-label">Insp Level</label>
                      </div>
                      <div className="col-md-3 mt-3">
                        <input
                          type="checkbox"
                          onChange={() => handleblkCngCheckBox(8)}
                          checked={blkCngCheckBox[8]}
                        />
                      </div>
                    </div>
                    {inspdata.length > 0 ? (
                      <select
                        id="strinsp"
                        className="ip-select in-fields"
                        onChange={selectInsp}
                        disabled={!blkCngCheckBox[8]}
                      >
                        <option
                          // value={LastSlctedRow?.InspLevel || " "}
                          value=""
                          // disabled={!blkCngCheckBox[8]}
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
                    <div className="row">
                      <div className="col-md-9">
                        <label className="form-label">Packing Level</label>
                      </div>
                      <div className="col-md-3 mt-3">
                        <input
                          type="checkbox"
                          onChange={() => handleblkCngCheckBox(9)}
                          checked={blkCngCheckBox[9]}
                        />
                      </div>
                    </div>
                    {packdata.length > 0 ? (
                      <select
                        id="strpkng"
                        className="ip-select in-fields"
                        onChange={selectPack}
                        disabled={!blkCngCheckBox[9]}
                      >
                        <option
                          // value={LastSlctedRow?.PackingLevel || " "}
                          value=""
                          // disabled={!blkCngCheckBox[9]}
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
              onClick={updateOrdrData}
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
