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
  } = props;

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
                      value={selectedItems[0]?.Order_Srl || " "}
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
                      value={selectedItems[0]?.DwgName || " "}
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
                      Job Work Rate
                    </label>
                    <input
                      className="in-fields"
                      type="text"
                      value={selectedItems[0]?.JWCost || " "}
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
                    <input
                      className="in-fields"
                      type="text"
                      value={selectedItems[0]?.Mtrl_Code || " "}
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
                      Material Rate
                    </label>
                    <input
                      className="in-fields"
                      type="text"
                      value={selectedItems[0]?.MtrlCost || " "}
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
                      value={selectedItems[0]?.Mtrl_Source || " "}
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
                      Unit Price
                    </label>
                    <input
                      className="in-fields"
                      type="text"
                      value={selectedItems[0]?.UnitPrice || " "}
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
                      value={selectedItems[0]?.Operation || " "}
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
                      value={selectedItems[0]?.InspLevel || " "}
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
                    <label className="form-label">Quantity</label>
                    <input
                      className="in-fields"
                      type="text"
                      value={selectedItems[0]?.Qty_Ordered || " "}
                    />
                    {/* <div className="row">
                      <div className="col-md-8  col-sm-12 mt-1">
                        <label
                          className="form-label"
                          style={{
                            whiteSpace: "nowrap",
                            marginLeft: "-10px",
                          }}
                        >
                          Has BOM
                        </label>
                      </div>
                      <div className="col-md-4 col-sm-12 mt-2 mb-1">
                        <input type="checkbox" className="checkBoxStyle" />
                      </div>
                    </div> */}
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
                      value={selectedItems[0]?.PackingLevel || " "}
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

        <div className="col-md-4 col-sm-12">
          <Form className="">
            <div
              className="ip-box form-bg"
              style={{ height: "550px", width: "180px" }}
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
                    value={selectedItems[0]?.Qty_Ordered || " "}
                  />
                </div>
              </div>
              <div className="row">
                <div>
                  <label className="form-label">Scheduled</label>
                  <input
                    className="in-fields"
                    type="text"
                    value={selectedItems[0]?.QtyScheduled || " "}
                  />
                </div>
              </div>
              <div className="row">
                <div>
                  <label className="form-label">Produced</label>
                  <input
                    className="in-fields"
                    type="text"
                    value={selectedItems[0]?.QtyProduced || " "}
                  />
                </div>
              </div>
              <div className="row">
                <div>
                  <label className="form-label">Packed</label>
                  <input
                    className="in-fields"
                    type="text"
                    value={selectedItems[0]?.QtyPacked || " "}
                  />
                </div>
              </div>
              <div className="row">
                <div>
                  <label className="form-label">Delivered</label>
                  <input
                    className="in-fields"
                    type="text"
                    value={selectedItems[0]?.QtyDelivered || " "}
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
      <div className="ip-box form-bg mb-3">
        <h5 className="">
          <b>Load Drawing</b>
        </h5>
        <div className="row">
          <div className="col-md-4">
            {" "}
            <label className="form-label">Part id</label>
            {/* {console.log(BomData.bomdata)} */}
            {BomData?.length != 0 ? (
              <Typeahead
                className="in-fields"
                selected={selectedPartId}
                // id="basic-example"
                options={options}
                placeholder="Select ..."
                onChange={handleSelectChange}
                // onChange={(selected) => {
                //   // Handle the selected item
                //   console.log("Selected PartId", selected[0]?.label);
                //   console.log("Selected...", selected);

                //   const arr = BomData.filter(
                //     (obj) => obj.PartId === selected[0]?.label
                //   );
                //   console.log("arr", arr);
                //   setBomArry(arr);
                // }}
              />
            ) : null}
            {/* ----- */}
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
      {/* </Form> */}
    </div>
  );
}

export default OrdrDtls;
