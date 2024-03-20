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
    //---new -----
    blkChange,
    handleChange,
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
      <Modal show={bulkChnangMdl} size="m" onHide={handleClosesetBulkChnangMdl}>
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
                          name="blkCngDwgname"
                          type="checkbox"
                          onChange={() => handleblkCngCheckBox(0)}
                          checked={blkCngCheckBox[0]}
                        />
                      </div>
                    </div>

                    <input
                      className="in-fields"
                      name="blkCngDwgname"
                      // value={DwgName}
                      value={blkChange.DwgName}
                      // onChange={handleDwgInputChange}
                      onChange={handleChange}
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
                          className=" in-fields"
                          labelKey="Mtrl_Code"
                          name="blkCngMaterial"
                          onChange={handleMtrlCodeTypeaheadChange}
                          // onChange={handleChange}
                          selected={selectedItems}
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
                        name="blkCngMtrlSrc"
                        // onChange={selectMtrlSrc}
                        disabled={!blkCngCheckBox[2]}
                        value={blkChange.MtrlSrc}
                        onChange={handleChange}
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
                          name="blkCngOperation"
                          // onChange={selectProc}
                          disabled={!blkCngCheckBox[3]}
                          value={blkChange.Operation}
                          onChange={handleChange}
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
                            return null;
                          })}
                        </select>
                      ) : (
                        ""
                      )}
                    </div>
                  </Form.Group>
                </div>

                <div className="row mt-1">
                  <div className="col-md-6">
                    <InputField
                      className="ip-select in-fields"
                      label="Quantity"
                      id="Qty"
                      name="blkCngQty"
                      // value={quantity}
                      // onChangeCallback={setQuantity}
                      value={blkChange.quantity}
                      onChange={handleChange}
                      required
                      disabled={!blkCngCheckBox[4]}
                      onCheckboxChange={() => handleblkCngCheckBox(4)}
                      isChecked={blkCngCheckBox[4]}
                      checkboxIndex={4}
                      showCheckbox={true}
                    />
                  </div>
                  <div className="col-md-6">
                    <Form.Group controlId="rates">
                      <InputField
                        className="ip-select in-fields"
                        label="JW Rate"
                        id="JWRate"
                        name="blkCngJWRate"
                        // value={jwRate}
                        // onChangeCallback={setJwRate}
                        value={blkChange.jwRate}
                        onChange={handleChange}
                        disabled={!blkCngCheckBox[5]}
                        onCheckboxChange={() => handleblkCngCheckBox(5)}
                        isChecked={blkCngCheckBox[5]}
                        checkboxIndex={5}
                        showCheckbox={true}
                      />
                    </Form.Group>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <Form.Group controlId="rates">
                      <InputField
                        className="ip-select in-fields"
                        label="UnitPrice"
                        id="UnitPrice"
                        name="blkCngUnitPrice"
                        // value={unitPrice}
                        // onChangeCallback={setUnitPrice}
                        value={blkChange.unitPrice}
                        onChange={handleChange}
                        disabled={!blkCngCheckBox[6]}
                        onCheckboxChange={() => handleblkCngCheckBox(6)}
                        isChecked={blkCngCheckBox[6]}
                        checkboxIndex={6}
                        showCheckbox={true}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    {" "}
                    <Form.Group controlId="rates">
                      <InputField
                        className="ip-select in-fields"
                        label="Material Rate"
                        id="Mrate"
                        name="blkCngMrate"
                        // value={materialRate}
                        // onChangeCallback={setMaterialRate}
                        value={blkChange.materialRate}
                        onChange={handleChange}
                        disabled={!blkCngCheckBox[7]}
                        onCheckboxChange={() => handleblkCngCheckBox(7)}
                        isChecked={blkCngCheckBox[7]}
                        checkboxIndex={7}
                        showCheckbox={true}
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
                        // onChange={selectInsp}
                        name="blkCngInspLvl"
                        disabled={!blkCngCheckBox[8]}
                        value={blkChange.PkngLvl}
                        onChange={handleChange}
                      >
                        <option value="" selected>
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
                        name="blkCngPkngLvl"
                        // onChange={selectPack}
                        disabled={!blkCngCheckBox[9]}
                        value={blkChange.PkngLvl}
                        onChange={handleChange}
                      >
                        <option value="" selected>
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
