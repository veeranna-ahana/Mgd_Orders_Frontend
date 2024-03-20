import { React, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";

const {
  getRequest,
  postRequest,
} = require("../../../../../../../api/apiinstance");
const { endpoints } = require("../../../../../../../api/constants");

function AddNewSrlModal(props) {
  const {
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
    //---NEW ---------
    newSerial,
    setNewSerial,
    handleChange,
  } = props;

  return (
    <div className="row mt-1">
      <Modal
        name="SrlModal"
        show={importdwgshow}
        onHide={handleCloseImportDwg}
        // backdrop="static"
      >
        <Modal.Header
          className="justify-content-md-center"
          style={{
            paddingTop: "10px",
            backgroundColor: "#283E81",
            color: "#ffffff",
          }}
        >
          <Modal.Title>MagodLaser : New Order Serial</Modal.Title>
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
                      <input
                        name="newSrlDwgname"
                        // value={DwgName}
                        value={newSerial.DwgName}
                        // onChange={handleDwgInputChange}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </Form.Group>
                </div>
                <div className="row">
                  <Form.Group controlId="strmtrlcode">
                    <div className="md-col-2">
                      <Form.Label className="form-label">Material</Form.Label>
                      {mtrldata.length > 0 || mtrldata != null ? (
                        <Typeahead
                          id="basic-example"
                          labelKey="Mtrl_Code"
                          name="newSrlMaterial"
                          onChange={handleMtrlCodeTypeaheadChange}
                          // onChange={handleChange}
                          // selected={Material}
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
                      <select
                        className="ip-select"
                        id="strsource"
                        name="newSrlMtrlSrc"
                        onChange={selectMtrlSrc}
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
                    <div className="md-col-4">
                      <label className="form-label">Operation</label>
                      {procdata.length > 0 ? (
                        <select
                          className="ip-select"
                          id="strprocess"
                          name="newSrlOperation"
                          onChange={selectProc}
                        >
                          <option value="" disabled selected>
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
                                    required
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
                      name="newSrlQty"
                      id="Qty"
                      value={quantity}
                      onChangeCallback={setQuantity}
                      required
                    />
                    {/* <label className="form-label">Quantity</label>
                    <input
                      name="newSrlQty"
                      id="Qty"
                      value={quantity}
                      onChangeCallback={setQuantity}
                      required
                    /> */}
                  </div>
                  <div className="col-md-6">
                    <Form.Group controlId="rates">
                      <InputField
                        label="JW Rate"
                        name="newSrlJWRate"
                        id="Qty"
                        value={jwRate}
                        onChangeCallback={setJwRate}
                        required
                      />
                    </Form.Group>
                    {/* <label className="form-label">JW Rate</label>
                    <input
                      name="newSrlJWRate"
                      id="JWrate"
                      value={jwRate}
                      onChangeCallback={setJwRate}
                      required
                    /> */}
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <Form.Group controlId="rates">
                      <InputField
                        label="UnitPrice"
                        name="newSrlUnitPrice"
                        id="Qty"
                        value={unitPrice}
                        onChangeCallback={setUnitPrice}
                        required
                      />
                    </Form.Group>
                    {/* <label className="form-label">UnitPrice</label>
                    <input
                      name="newSrlUnitPrice"
                      id="UnitPrice"
                      defaultValue={unitPrice}
                      onChangeCallback={setUnitPrice}
                      required
                    /> */}
                  </div>
                  <div className="col-md-6">
                    {" "}
                    <Form.Group controlId="rates">
                      <InputField
                        label="MaterialRate"
                        id="Qty"
                        name="newSrlMaterialRate"
                        value={materialRate}
                        onChangeCallback={setMaterialRate}
                        required
                      />
                    </Form.Group>
                    {/* <label className="form-label">MaterialRate</label>
                    <input
                      id="MaterialRate"
                      name="newSrlMaterialRate"
                      value={materialRate}
                      onChangeCallback={setMaterialRate}
                      required
                    /> */}
                  </div>
                </div>

                <div className="row mt-1">
                  <div className="col-md-6">
                    <label className="form-label">Insp Level</label>
                    {inspdata.length > 0 ? (
                      <select
                        id="strinsp"
                        className="ip-select"
                        name="newSrlInspLvl"
                        onChange={selectInsp}
                      >
                        <option value="" disabled selected>
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
                        name="newSrlPkngLvl"
                        onChange={selectPack}
                      >
                        <option value="" disabled selected>
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
              // onClick={insertnewsrldata}
              onClick={() => PostOrderDetails(1)}
            >
              Save
            </button>
            <button
              className="button-style"
              style={{ width: "100px", backgroundColor: "gray" }}
              variant="secondary"
              onClick={() => handleCloseImportDwg()}
            >
              Close
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddNewSrlModal;
