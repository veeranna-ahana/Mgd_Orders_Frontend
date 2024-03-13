import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import AddNewSrlModal from "../Modals/AddNewSrlModal";
import { Typeahead } from "react-bootstrap-typeahead";

function OrdrDtls(props) {
  const {
    OrderData,
    OrderCustData,
    OrdrDetailsData,
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
    selectItem,
    selectedItems,
    insertnewsrldata,
    importdwgshow,
    setImportDwgShow,
    handleImportDwg,
    handleCloseImportDwg,
    handleMtrlCodeTypeaheadChange,
    BomData,
    setBomData,
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
  } = props;

  const [materialCode, setMaterialCode] = useState(
    selectedItems[0]?.Mtrl_Code || ""
  );

  // console.log("BomData.......", BomData);

  // console.log("selectedItems.srlNo", selectedItems[0]?.Order_Srl);
  //   //console.log("mtrldata", mtrldata);
  // const [importdwgshow, setImportDwgShow] = useState(false);

  // const handleImportDwg = () => {
  //   //console.log("modal opend ");
  //   setImportDwgShow(true);
  // };
  // const handleCloseImportDwg = () => {
  //   setImportDwgShow(false);
  // };
  // const [SelectedPartId, setSelectedPartId] = useState();
  // const [BomArry, setBomArry] = useState([]);
  const handleMaterialCodeChange = (event) => {
    // Update the state when the dropdown value changes
    setMaterialCode(event.target.value);
  };

  useEffect(() => {
    setQuantity(LastSlctedRow?.Qty_Ordered || "");
  }, [LastSlctedRow]);
  useEffect(() => {
    // Set the default value from the array
    if (LastSlctedRow && LastSlctedRow.length > 0) {
      setQuantity(LastSlctedRow?.Qty_Ordered); // You can adjust this based on your array structure
    }
  }, [LastSlctedRow]);

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
    // Your other logic if needed
  };
  console.log("setQuantity", quantity);
  return (
    <div>
      <AddNewSrlModal
        OrderData={OrderData}
        OrderCustData={OrderCustData}
        OrdrDetailsData={OrdrDetailsData}
        importdwgshow={importdwgshow}
        setImportDwgShow={setImportDwgShow}
        handleImportDwg={handleImportDwg}
        handleCloseImportDwg={handleCloseImportDwg}
        mtrldata={mtrldata}
        selectMtrl={selectMtrl}
        strmtrlcode={strmtrlcode}
        procdata={procdata}
        selectProc={selectProc}
        selectMtrlSrc={selectMtrlSrc}
        tolerancedata={tolerancedata}
        selectTolerance={selectTolerance}
        inspdata={inspdata}
        selectInsp={selectInsp}
        packdata={packdata}
        selectPack={selectPack}
        InputField={InputField}
        quantity={quantity}
        setQuantity={setQuantity}
        jwRate={jwRate}
        setJwRate={setJwRate}
        materialRate={materialRate}
        setMaterialRate={setMaterialRate}
        unitPrice={unitPrice}
        setUnitPrice={setUnitPrice}
        DwgName={DwgName}
        handleDwgInputChange={handleDwgInputChange}
        PostSrlData={PostSrlData}
        insertnewsrldata={insertnewsrldata}
        handleMtrlCodeTypeaheadChange={handleMtrlCodeTypeaheadChange}
        PostOrderDetails={PostOrderDetails}
      />

      <div className="row">
        {/* {selectedItems.map((item, i) => ( */}
        <div className="col-md-8 col-sm-12">
          <div className="ip-box form-bg">
            <div className="row mt-3">
              <div className="col-md-6 col-sm-12">
                <h5>
                  <b>Order Details</b>
                </h5>
                <div className="row">
                  <div>
                    <label
                      className="form-label"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Srl No
                    </label>
                    <input
                      className="in-fields"
                      type="text"
                      value={LastSlctedRow?.Order_Srl || " "}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6 mt-4 col-sm-12">
                <button
                  className="button-style "
                  style={{ width: "135px" }}
                  onClick={handleImportDwg}
                  // onClick={() => PostOrderDetails(1)}
                >
                  Add New Serial
                </button>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 col-sm-12">
                <div className="row">
                  <div>
                    <label
                      className="form-label"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Drawing Name
                    </label>
                    <input
                      className="in-fields"
                      type="text"
                      value={
                        // selectedItems[0]?.DwgName || " "
                        LastSlctedRow?.DwgName || " "
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-sm-12">
                <div className="row">
                  <div>
                    {/* <label
                      className="form-label"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Job Work Rate
                    </label>
                    <input
                      className="in-fields"
                      type="text"
                      value={LastSlctedRow?.JWCost || " "}
                    /> */}
                    {/* <InputField
                      label="JW Rate"
                      id="jwrate"
                      value={jwRate}
                      onChangeCallback={setJwRate}
                      required
                    /> */}
                    <InputField
                      className="ip-select in-fields"
                      label="JW Rate"
                      id="jwrate"
                      value={jwRate}
                      onChangeCallback={setJwRate}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 col-sm-12">
                <div className="row">
                  <div>
                    <label className="form-label">Material</label>
                    {/* <input
                      className="in-fields"
                      type="text"
                      value={selectedItems[0]?.Mtrl_Code || " "}
                    /> */}
                    {mtrldata.length > 0 || mtrldata != null ? (
                      <Typeahead
                        className="ip-select in-fields"
                        id="basic-example"
                        labelKey="Mtrl_Code"
                        onChange={handleMtrlCodeTypeaheadChange}
                        selected={selectedItems}
                        options={mtrldata}
                        placeholder="Choose a Material..."
                        required
                      ></Typeahead>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-sm-12">
                <div className="row">
                  <div>
                    {/* <label
                      className="form-label"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Material Rate
                    </label> */}
                    {/* <input
                      className="in-fields"
                      type="text"
                      value={LastSlctedRow?.MtrlCost || " "}
                    /> */}

                    <InputField
                      className="ip-select in-fields"
                      label="Mtrl Rate"
                      id="mtrlRate"
                      value={materialRate}
                      onChangeCallback={setMaterialRate}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 col-sm-12">
                <div className="row">
                  <div>
                    <label
                      className="form-label"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Material Source
                    </label>
                    <input
                      className="in-fields"
                      type="text"
                      value={LastSlctedRow?.Mtrl_Source || " "}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-sm-12">
                <div className="row">
                  <div>
                    <label
                      className="form-label"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Unit Price
                    </label>
                    <input
                      className="in-fields"
                      type="text"
                      value={LastSlctedRow?.UnitPrice || " "}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 col-sm-12">
                <div className="row">
                  <div>
                    <label className="form-label">Operation</label>
                    <input
                      className="in-fields"
                      type="text"
                      value={LastSlctedRow?.Operation || " "}
                    />
                    {/* <select id="" className="ip-select dropdown-field ">
                      <option value="option1">option 1</option>
                      <option value="option2">option 2</option>
                      <option value="option3">option 3</option>
                    </select> */}
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-sm-12">
                <div className="row">
                  <div>
                    <label
                      className="form-label"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Inspection Level
                    </label>
                    <input
                      className="in-fields"
                      type="text"
                      value={LastSlctedRow?.InspLevel || " "}
                    />
                    {/* <select id="" className="ip-select dropdown-field ">
                      <option value="option1">option 1</option>
                      <option value="option2">option 2</option>
                      <option value="option3">option 3</option>
                    </select> */}
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 col-sm-12">
                <div className="row">
                  <div>
                    {/* <label className="form-label">Quantity</label> */}

                    <InputField
                      className="ip-select in-fields"
                      label="Quantity"
                      id="Qty"
                      value={quantity}
                      onChangeCallback={setQuantity}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-sm-12 mb-3">
                <div className="row">
                  <div>
                    <label
                      className="form-label"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Packing Level
                    </label>
                    <input
                      className="in-fields"
                      type="text"
                      value={LastSlctedRow?.PackingLevel || " "}
                    />
                    {/* <select id="" className="ip-select dropdown-field ">
                      <option value="option1">option 1</option>
                      <option value="option2">option 2</option>
                      <option value="option3">option 3</option>
                    </select> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ))} */}
        <div className="col-md-4 col-sm-12">
          <Form className="">
            <div
              className="ip-box form-bg"
              style={{ height: "552px", width: "180px" }}
            >
              <h5 className="mt-3">
                <b>Process details</b>
              </h5>
              <div className="row">
                <div>
                  <label className="form-label">Ordered</label>
                  <input
                    className="in-fields"
                    type="text"
                    value={LastSlctedRow?.Qty_Ordered || " "}
                  />
                </div>
              </div>
              <div className="row">
                <div>
                  <label className="form-label">Scheduled</label>
                  <input
                    className="in-fields"
                    type="text"
                    value={LastSlctedRow?.QtyScheduled || " "}
                  />
                </div>
              </div>
              <div className="row">
                <div>
                  <label className="form-label">Produced</label>
                  <input
                    className="in-fields"
                    type="text"
                    value={LastSlctedRow?.QtyProduced || " "}
                  />
                </div>
              </div>
              <div className="row">
                <div>
                  <label className="form-label">Packed</label>
                  <input
                    className="in-fields"
                    type="text"
                    value={LastSlctedRow?.QtyPacked || " "}
                  />
                </div>
              </div>
              <div className="row">
                <div>
                  <label className="form-label">Delivered</label>
                  <input
                    className="in-fields"
                    type="text"
                    value={LastSlctedRow?.QtyDelivered || " "}
                  />
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-6  col-sm-12 mt-1">
                  <label
                    className="form-label"
                    style={{
                      whiteSpace: "nowrap",
                      marginLeft: "4%",
                    }}
                  >
                    Has BOM
                  </label>
                </div>
                <div className="col-md-6 col-sm-12 mt-3">
                  <input
                    type="checkbox"
                    className="checkBoxStyle"
                    checked={HasBOM === 1}
                    onChange={(e) => setHasBOM(e.target.checked ? 1 : 0)}
                  />
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
      {/* <Form className="mt-2" style={{ marginLeft: "0px" }}> */}

      <div className="row">
        <div className="col-md-12">
          {" "}
          {props.OrderData?.Type === "Profile" ? (
            <div className="ip-box form-bg mb-3">
              <h5 className="">
                <b>Load Drawing</b>
              </h5>
              <div className="row">
                <div className="col-md-4">
                  {" "}
                  <label className="form-label">Part id</label>
                  {BomData?.length != 0 ? (
                    <Typeahead
                      className="in-fields"
                      selected={selectedPartId}
                      // id="basic-example"
                      options={options}
                      labelKey="label"
                      placeholder="Select ..."
                      onChange={handleSelectChange}
                    />
                  ) : null}
                  <button
                    className="button-style"
                    style={{ width: "195px", marginTop: "26%" }}
                    onClick={() => PostOrderDetails(3)}
                  >
                    Add Drawing to Order
                  </button>
                  <button
                    className="button-style "
                    style={{ width: "195px", marginTop: "23%" }}
                  >
                    Save to Customer Dwg
                  </button>
                </div>
                <div className="col-md-8">
                  <label className="form-label">{""}</label>

                  {/* <select
                  id=""
                  className="ip-select dropdown-field "
                  style={{ width: "230px" }}
                >
                  <option value="option1">option 1</option>
                  <option value="option2">option 2</option>
                  <option value="option3">option 3</option>
                </select> */}
                  <input className="in-fields " style={{ marginTop: "5.5%" }} />
                  <div className="row">
                    <div className="col-md-6">
                      <label className="form-label">LOC</label>
                      <input className="in-fields" type="text" />
                      <label className="form-label">Pierces</label>
                      <input className="in-fields" type="text" />
                      {/* <label className="form-label">Part Weight</label>
                  <input
                    className="in-fields"
                    type="text"
                    value={BomArry[0]?.Weight}
                  /> */}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Process</label>
                      <input className="in-fields" type="text" />
                      <label className="form-label"> Part Weight</label>{" "}
                      <input
                        className="in-fields"
                        type="text"
                        // value={BomArry[0]?.Weight}
                      />
                      {/* <label className="form-label">Material Cost</label>
                  <input
                    className="in-fields"
                    type="text"
                    value={BomArry?.MtrlCost}
                  /> */}
                    </div>
                  </div>
                </div>
                <div className="row mt-2 mb-3">
                  <div className="col-md-3">
                    <label className="form-label mt-2">J W Cost</label>
                  </div>
                  <div className="col-md-3">
                    {" "}
                    <input
                      className="in-fields"
                      type="text"
                      value={BomArry[0]?.JobWorkCost}
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label mt-2">Mtrl Cost</label>
                  </div>
                  <div className="col-md-3">
                    {" "}
                    <input
                      className="in-fields"
                      type="text"
                      value={BomArry[0]?.MtrlCost}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="ip-box form-bg mb-3">
              <div className="row">
                <div className="col-md-7">
                  {" "}
                  <h5 className="mt-2">
                    <b>Load Drawing</b>
                  </h5>
                </div>
                <div className="col-md-4">
                  {" "}
                  <button
                    className="button-style"
                    style={{ width: "195px" }}
                    onClick={() => PostOrderDetails(3)}
                  >
                    Add Drawing to Order
                  </button>
                </div>
              </div>

              <div className="row">
                <div className="col-md-2">
                  {" "}
                  <label className="form-label">Part id</label>
                </div>
                <div className="col-md-4">
                  {" "}
                  {BomData?.length != 0 ? (
                    <Typeahead
                      className="in-fields"
                      selected={selectedPartId}
                      // id="basic-example"
                      options={options}
                      placeholder="Select ..."
                      onChange={handleSelectChange}
                    />
                  ) : null}
                </div>
                <div className="col-md-6">
                  {mtrldata.length > 0 || mtrldata != null ? (
                    <Typeahead
                      className="ip-select in-fields"
                      id="basic-example"
                      labelKey="Mtrl_Code"
                      onChange={handleMtrlCodeTypeaheadChange}
                      // selected={Material}
                      options={mtrldata}
                      placeholder="Choose a Material..."
                      required
                    ></Typeahead>
                  ) : (
                    ""
                  )}
                </div>
                <div className="row mt-2 mb-3">
                  <div className="col-md-4">
                    <label className="form-label">Operation</label>
                    {procdata.length > 0 ? (
                      <select
                        className="ip-select in-fields"
                        id="strprocess"
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
                          } else if (props.OrderData?.Type === "Fabrication") {
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
                  <div className="col-md-4">
                    <label className="form-label ">J W Cost</label>
                    <input
                      className="in-fields"
                      type="text"
                      value={BomArry[0]?.JobWorkCost}
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label ">Mtrl Cost</label>
                    <input
                      className="in-fields"
                      type="text"
                      value={BomArry[0]?.MtrlCost}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* </Form> */}
    </div>
  );
}

export default OrdrDtls;
