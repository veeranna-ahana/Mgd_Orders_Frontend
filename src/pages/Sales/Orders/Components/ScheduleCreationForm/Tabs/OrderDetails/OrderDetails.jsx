import React, { useEffect, useState } from "react";
import { useOrderContext } from "../../../../../../../context/OrderContext";
import OrdrTable from "./Table/OrdrTable";
import Drawings from "./Tabs/Drawings";
import OrdrDtls from "./Tabs/OrdrDtls";
import { Tab, Tabs } from "react-bootstrap";
import ImportDwgModal from "./Modals/ImportDwgModal";
import ImportOldOrderModal from "./Modals/ImportOldOrderModal";
import ImportQtnModal from "./Modals/ImportQtnModal/ImportQtnModal";
import { toast } from "react-toastify";
import ImportExcelModal from "./Modals/ImportExcelModal/ImportExcelModal";
import BulkChangeModal from "./Modals/BulkChangeModal";
import ConfirmationModal from "../../../../Modal/ConfirmationModal";
import { Profiler } from "react";
// import { propTypes } from "react-bootstrap/esm/Image";
// import { Link, useNavigate } from "react-router-dom";
const {
  getRequest,
  postRequest,
} = require("../../../../../../api/apiinstance");
const { endpoints } = require("../../../../../../api/constants");

export default function OrderDetails(props) {
  const {
    OrderData,
    OrderCustData,
    OrdrDetailsData,
    setOrdrDetailsData,
    selectItem,
    selectedItems,
    fetchData,
    BomData,
    setBomData,
    handleSelectAll,
    handleReverseSelection,
    LastSlctedRow,
    setLastSlctedRow,
    handleBulkCngBtn,
    selectedSrl,
    //---NEW ---------
    // handleMtrlCodeTypeaheadChange,
    newSerial,
    setNewSerial,
    ordrDetailsChange,
    setordrDetailsChange,
    blkChange,
    setBlkChange,
    imprtDwgObj,
    setImprtDwgObj,
    handleChange,
    InputField,
  } = props;

  const [ConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  // import from excel
  const [importExcelModal, setImportExcelModal] = useState(false);
  // import qoutation
  const [importQtnMdl, setImportQtnMdl] = useState(false);

  function importExcelFunc() {
    setImportExcelModal(true);
  }

  let lastOrderSrl = 0;

  for (let i = 0; i < OrdrDetailsData.length; i++) {
    const element = OrdrDetailsData[i];

    if (element.Order_Srl > lastOrderSrl) {
      lastOrderSrl = element.Order_Srl;
    }
  }

  var newOrderSrl = lastOrderSrl + 1;

  var Cust_Code = props.OrderCustData?.Cust_Code;
  var OrderNo = props.OrderData?.Order_No;
  var Type = props.OrderData?.Type;
  var QtnNo = props.OrderData?.QtnNo;
  var SalesContact = props.OrderData?.SalesContact;
  var Delivery_Date = props.OrderData?.Delivery_Date;
  var RecordedBy = props.OrderData?.RecordedBy;
  var Order_Received_By = props.OrderData?.Order_Received_By;
  var Purchase_Order = props.OrderData?.Purchase_Order;
  var Payment = props.OrderData?.Payment;

  const [mtrldata, setMtrldata] = useState([]);
  const [procdata, setProcdata] = useState([]);
  const [inspdata, setInspdata] = useState([]);
  const [packdata, setPackdata] = useState([]);
  const [tolerancedata, setTolerancedata] = useState([]);
  const [salesExecdata, setSalesExecdata] = useState([]);
  const [strtolerance, setStrTolerance] = useState("");
  const [gradeid, setGradeID] = useState("");
  const [strmtrlcode, setStrMtrlCode] = useState("");
  const [material, setMaterial] = useState("");
  const [DwgName, setDwgName] = useState("");
  const [quantity, setQuantity] = useState(0.0);
  const [jwRate, setJwRate] = useState(0.0);
  const [materialRate, setMaterialRate] = useState(0.0);
  const [unitPrice, setUnitPrice] = useState(0.0);
  const [Operation, setOperation] = useState("");
  const [thickness, setThickness] = useState("");
  const [specificwt, setSpecificWt] = useState(0);
  const [grade, setGrade] = useState("");
  const [HasBOM, setHasBOM] = useState(0);
  const [Dwg, setDwg] = useState(0);
  const [blkCngCheckBox, setBlkCngCheckBox] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  // //console.log("first", quantity);
  // //console.log("second", jwRate);
  // //console.log("third", materialRate);
  // //console.log("fourth", unitPrice);
  //console.log("blkCngCheckBox", blkCngCheckBox);

  const [NewSrlFormData, setNewSrlFormData] = useState({
    DrawingName: "",
    Material: "",
    MtrlSrc: "",
    Operation: "",
    Quantity: quantity,
    JW_Rate: jwRate,
    Mtrl_Rate: materialRate,
    UnitPrice: unitPrice,
    InspLvl: 0,
    PkngLvl: 0,
  });

  useEffect(() => {
    async function fetchData() {
      postRequest(
        endpoints.getCustomerDets,
        { custcode: Cust_Code },
        (custdata) => {
          // setCustomer(custdata[0]["Cust_name"]);
          // setCustdata(custdata);
        }
      );
      // await postRequest(
      //   endpoints.PostNewSrlData,
      //   { custcode: Cust_Code, OrderNo: OrderNo },
      //   (srldata) => {
      //     //////////console.log("srl data", srldata);
      //     setSerailData(srldata);
      //   }
      // );

      await postRequest(endpoints.getSalesExecLists, {}, (sdata) => {
        setSalesExecdata(sdata);
      });
      await postRequest(
        endpoints.getSalesIndiExecLists,
        { salesContact: SalesContact },
        (sdata) => {
          ////console.log(sdata[0]["Name"]);
          // setSalesExecContact(sdata[0]["Name"]);
        }
      );
      // await postRequest(endpoints.getSalesIndiExecLists, { salesContact: order.DealingEngineer }, (ddata) => {
      //     setDealingEngineer(ddata[0]["Name"]);
      // });
      // await postRequest(
      //   endpoints.getSalesIndiExecLists,
      //   { salesContact: RecordedBy },
      //   (recdata) => {
      //     setRecordedby(recdata[0]["Name"]);
      //   }
      // );
      await postRequest(
        endpoints.getSalesIndiExecLists,
        { salesContact: Order_Received_By },
        (rcvddata) => {
          // setReceivedBy(rcvddata[0]["Name"]);
        }
      );
      getRequest(endpoints.getMaterials, (mtrldata) => {
        setMtrldata(mtrldata);
      });
      getRequest(endpoints.getProcessLists, (pdata) => {
        setProcdata(pdata);
      });

      getRequest(endpoints.getToleranceTypes, (ttdata) => {
        setTolerancedata(ttdata);
      });
      getRequest(endpoints.getInspectionLevels, (ildata) => {
        setInspdata(ildata);
      });
      getRequest(endpoints.getPackingLevels, (pckdata) => {
        setPackdata(pckdata);
      });
    }
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const handleDwgInputChange = (event) => {
    const newValue = event.target.value;
    setDwgName(newValue);

    setNewSrlFormData({
      ...NewSrlFormData,
      DrawingName: newValue,
    });
  };

  const handleblkCngCheckBox = (index) => {
    const newCheckboxValues = [...blkCngCheckBox];
    newCheckboxValues[index] = !newCheckboxValues[index];
    setBlkCngCheckBox(newCheckboxValues);
  };

  const insertnewsrldata = () => {
    postRequest(
      endpoints.InsertNewSrlData,
      {
        OrderNo: OrderNo,
        newOrderSrl: newOrderSrl,
        custcode: Cust_Code,
        DwgName: DwgName,
        Dwg_Code: "",
        dwg: Dwg,
        tolerance: "",
        HasBOM: HasBOM,
        Qty_Ordered: quantity,
        JwCost: jwRate,
        mtrlcost: materialRate,
        strmtrlcode: strmtrlcode,
        material: material,
        Operation: Operation,

        NewSrlFormData: NewSrlFormData,
      },
      (InsertedNewSrlData) => {
        //////console.log(" InsertedNewSrlDataRes", InsertedNewSrlData);
        if (InsertedNewSrlData.affectedRows != 0) {
          fetchData();
          toast.success("Added serial successfully");
          handleCloseImportDwg();
        } else {
          toast.warning("Serial not added check once");
          handleCloseImportDwg();
        }
      }
    );
  };

  let blkCngCheckBoxx = blkCngCheckBox;

  let updateblkcngOrdrData = () => {
    postRequest(
      endpoints.bulkChangeUpdate,
      {
        selectedItems: selectedItems,
        OrderNo: OrderNo,
        custcode: Cust_Code,
        OrderSrl: selectedSrl,
        DwgName: blkChange.DwgName,
        // strmtrlcode: blkChange.strmtrlcode,
        // MtrlSrc: blkChange.MtrlSrc,
        quantity: blkChange.quantity,
        JwCost: blkChange.jwRate,
        mtrlcost: blkChange.materialRate,
        // unitPrice: blkChange.unitPrice,
        unitPrice:
          parseFloat(blkChange.jwRate) + parseFloat(blkChange.materialRate),
        Operation: blkChange.Operation,
        InspLvl: blkChange.InspLvl,
        PkngLvl: blkChange.PkngLvl,
        blkChange: blkChange,
        blkCngCheckBox: blkCngCheckBoxx,
        //quantity: quantity,
        //blkCngCheckBox: blkCngCheckBox,
      },
      (blkChngData) => {
        //console.log("RES", blkChngData);
        if (blkChngData.affectedRows != 0) {
          toast.success("Updated successfully");
          fetchData();
          handleClosesetBulkChnangMdl();
        } else {
          toast.warning("Serial not updated check once");
        }
      }
    );
  };

  let singleupdateOrdrData = () => {
    postRequest(
      endpoints.singleChangeUpdate,
      {
        OrderNo: OrderNo,
        custcode: Cust_Code,
        quantity: quantity,
        OrderSrl: selectedSrl,
        JwCost: jwRate,
        mtrlcost: materialRate,
      },
      (singleChngData) => {
        ////console.log(" blkChngData", blkChngData);
        if (singleChngData.affectedRows != 0) {
          toast.success("Updated successfully");
          fetchData();
        } else {
          toast.warning("Serial not updated check once");
        }
      }
    );
  };

  const handleMtrlCodeTypeaheadChange = (selectedOptions) => {
    const selectedValue =
      selectedOptions.length > 0 ? selectedOptions[0] : null;
    setStrMtrlCode(selectedValue?.Mtrl_Code);
  };

  const selectMtrl = async (e) => {
    e.preventDefault();
    setStrMtrlCode(e.target.value);
    setNewSrlFormData({
      ...NewSrlFormData,
      Material: e.target.value,
    });

    postRequest(
      endpoints.getmtrldetsbymtrlcode,
      { mtrlcode: e.target.value },
      (mtrldata) => {
        if (mtrldata.length > 0) {
          setThickness(mtrldata[0]["Thickness"]);
          setGradeID(mtrldata[0]["MtrlGradeID"]);
          setMaterial(mtrldata[0]["Mtrl_Type"]);
          setGrade(mtrldata[0]["Grade"]);
          setSpecificWt(mtrldata[0]["Specific_Wt"]);

          locCalc(
            window.dxffile,
            mtrldata[0]["Mtrl_Type"],
            mtrldata[0]["Grade"],
            mtrldata[0]["Thickness"],
            (output) => {}
          );
        }
      }
    );
  };

  const selectProc = async (e) => {
    e.preventDefault();
    setOperation(e.target.value);
    setNewSrlFormData({
      ...NewSrlFormData,
      Operation: e.target.value,
    });
    //////////console.log(e.target.value);
  };
  const selectInsp = async (e) => {
    e.preventDefault();
    setNewSrlFormData({
      ...NewSrlFormData,
      InspLvl: e.target.value,
    });
  };

  const selectPack = async (e) => {
    e.preventDefault();
    setNewSrlFormData({
      ...NewSrlFormData,
      PkngLvl: e.target.value,
    });
  };

  const selectTolerance = (e) => {
    e.preventDefault();
    let toltype;
    for (let i = 0; i < tolerancedata.length; i++) {
      if (tolerancedata[i]["ToleranceType"] === e.target.value) {
        toltype = tolerancedata[i];
        break;
      }
    }
    setStrTolerance(e.target.value);
    //////////console.log(e.target.value);
  };
  const selectMtrlSrc = async (e) => {
    e.preventDefault();
    setNewSrlFormData({
      ...NewSrlFormData,
      MtrlSrc: e.target.value,
    });
  };

  const [importdwgshow, setImportDwgShow] = useState(false);

  const handleImportDwg = () => {
    setImportDwgShow(true);
  };
  const handleCloseImportDwg = () => {
    setImportDwgShow(false);
    setNewSerial((prevState) => ({
      ...prevState,
      DwgName: "",
      material: "",
      strmtrlcode: "",
      Operation: "",
      InspLvl: "",
      PkngLvl: "",
      MtrlSrc: "",
    }));
    setNewSrlFormData({
      ...NewSrlFormData,
      Quantity: 0.0,
      JW_Rate: 0.0,
      Mtrl_Rate: 0.0,
      UnitPrice: 0.0,
    });
    //console.log("closeddddd");
  };

  // IMPORT DWG MODAL
  const [importdwgmdlshow, setImportDwgmdlShow] = useState(false);

  const handleImportDwgmdl = () => {
    setImportDwgmdlShow(true);
  };
  const handleCloseImportDwgmdl = () => {
    setImportDwgmdlShow(false);
  };
  // IMPORT OLD ORDER MODAL
  const [importOldOrdrMdl, setImportOldOrdrMdl] = useState(false);

  const handleImportOldOrdrMdl = () => {
    setImportOldOrdrMdl(true);
  };
  const handleCloseImportOldOrdrMdl = () => {
    setImportOldOrdrMdl(false);
  };
  // BULK CHANGE MODAL
  const [bulkChnangMdl, setBulkChnangMdl] = useState(false);

  const handlebulkChnangMdl = () => {
    setBulkChnangMdl(true);
  };
  const handleClosesetBulkChnangMdl = () => {
    setBulkChnangMdl(false);
    setBlkChange((prevState) => ({
      ...prevState,
      DwgName: "",
      material: "",
      strmtrlcode: "",
      Operation: "",
      InspLvl: "",
      PkngLvl: "",
      MtrlSrc: "",
      quantity: 0.0,
      jwRate: 0.0,
      materialRate: 0.0,
      unitPrice: 0.0,
    }));
    setBlkCngCheckBox([
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ]);
  };

  function deleteRowsByOrderNoFunc() {
    postRequest(
      endpoints.postDeleteDetailsByOrderNo,
      { Order_No: props.OrderData.Order_No },
      (deleteData) => {
        if (deleteData.affectedRows > 0) {
          setOrdrDetailsData([]);
          toast.success("Delete the serials sucessfully");
          setConfirmationModalOpen(false);
          setImportQtnMdl(true);
        } else {
          toast.warning(deleteData);
        }
      }
    );
  }
  // ImportQtnMdl
  const handleImportQtnMdl = () => {
    if (props.OrdrDetailsData.length > 0) {
      setConfirmationModalOpen(true);
    } else {
      setImportQtnMdl(true);
    }
  };

  // PartId DROPDOWN
  const [selectedPartId, setSelectedPartId] = useState([]);
  const [BomArry, setBomArry] = useState([]);
  const handleSelectChange = (selected) => {
    const arr = BomData.filter(
      (obj) => obj.UniqueColumn === selected[0]?.label
    );
    setBomArry(arr);
    setSelectedPartId(selected);
  };
  const options = BomData?.map((item) => ({
    // label: item.PartId,
    // label: item.AssyCust_PartId,
    label: item.UniqueColumn,
  }));

  // INSERT ORDER DETAILS FALG 1,2,3
  const PostOrderDetails = (flag) => {
    let requestData = {};
    if (flag === 1) {
      requestData = {
        OrderNo: OrderNo,
        newOrderSrl: newOrderSrl,
        custcode: Cust_Code,
        // DwgName: DwgName,
        DwgName: newSerial.DwgName,
        Dwg_Code: "",
        dwg: Dwg,
        HasBOM: HasBOM,
        Qty_Ordered: quantity,
        JwCost: jwRate,
        mtrlcost: materialRate,
        // UnitPrice: unitPrice,
        UnitPrice: parseFloat(jwRate) + parseFloat(materialRate),
        strmtrlcode: strmtrlcode,
        material: material,
        Operation: Operation,
        NewSrlFormData: NewSrlFormData,
        tolerance: "Standard(+/-0.1mm)- 100 Microns",
      };
    } else if (flag === 2) {
      // if (props.OrderData?.Order_Status === "Recorded") {
      //   toast.warning("Cannot import after the Order is recorded");
      // } else {
      //   handleImportDwgmdl();
      // }
      requestData = {
        OrderNo: OrderNo,
        newOrderSrl: newOrderSrl,
        custcode: Cust_Code,

        dwg: imprtDwgObj.Dwg,
        tolerance: imprtDwgObj.StrTolerance,
        Qty_Ordered: imprtDwgObj.quantity,
        JwCost: imprtDwgObj.jwRate,
        mtrlcost: imprtDwgObj.materialRate,
        strmtrlcode: imprtDwgObj.strmtrlcode,
        material: imprtDwgObj.material,
        Operation: imprtDwgObj.Operation,
        NewSrlFormData: NewSrlFormData,
      };
    } else if (flag === 3) {
      setHasBOM(1);
      requestData = {
        OrderNo: OrderNo,
        newOrderSrl: newOrderSrl,
        custcode: Cust_Code,
        DwgName: selectedPartId[0].label,
        Dwg_Code: "",
        dwg: Dwg,
        tolerance: "Standard(+/-0.1mm)- 100 Microns",
        HasBOM: 1,
        Qty_Ordered: 0,
        JwCost: BomArry[0]?.JobWorkCost,
        mtrlcost: BomArry[0]?.MtrlCost,
        UnitPrice: parseFloat(jwRate) + parseFloat(materialRate),
        strmtrlcode: strmtrlcode,
        material: material,
        Operation: Operation,
        insplevel: "Insp1",
        packinglevel: "Pkng1",
        delivery_date: "",
        NewSrlFormData: NewSrlFormData,
      };
    } else {
    }

    postRequest(
      endpoints.InsertNewSrlData,

      { requestData: requestData },
      (InsertedNewSrlData) => {
        if (InsertedNewSrlData.affectedRows != 0) {
          toast.success("Added serial successfully");
          fetchData();
          handleCloseImportDwg();
        } else {
          toast.warning("Serial not adde");
          handleCloseImportDwg();
        }
      }
    );
  };

  const PostSrlData = () => {};
  const locCalc = () => {};

  return (
    <>
      <ConfirmationModal
        confirmModalOpen={ConfirmationModalOpen}
        setConfirmModalOpen={setConfirmationModalOpen}
        yesClickedFunc={deleteRowsByOrderNoFunc}
        message={
          "There are other serials in this order, \n You must delete them to copy the old order, \n Delete Now?"
        }
      />

      <ImportDwgModal
        importdwgmdlshow={importdwgmdlshow}
        setImportDwgmdlShow={setImportDwgmdlShow}
        handleImportDwgmdl={handleImportDwgmdl}
        handleCloseImportDwgmdl={handleCloseImportDwgmdl}
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
        selectedItems={selectedItems}
        selectItem={selectItem}
        handleMtrlCodeTypeaheadChange={handleMtrlCodeTypeaheadChange}
        PostOrderDetails={PostOrderDetails}
        // ----NEW------
        imprtDwgObj={imprtDwgObj}
        setImprtDwgObj={setImprtDwgObj}
        handleChange={handleChange}
      />
      <ImportOldOrderModal
        importOldOrdrMdl={importOldOrdrMdl}
        setImportOldOrdrMdl={setImportOldOrdrMdl}
        handleImportOldOrdrMdl={handleImportOldOrdrMdl}
        handleCloseImportOldOrdrMdl={handleCloseImportOldOrdrMdl}
      />
      <ImportQtnModal
        importQtnMdl={importQtnMdl}
        setImportQtnMdl={setImportQtnMdl}
        OrderData={props.OrderData}
        // table data
        OrdrDetailsData={props.OrdrDetailsData}
        setOrdrDetailsData={props.setOrdrDetailsData}
        // handleImportQtnMdl={handleImportQtnMdl}
        // handleCloseImportQtnMdl={handleCloseImportQtnMdl}
      />

      <ImportExcelModal
        setImportExcelModal={setImportExcelModal}
        importExcelModal={importExcelModal}
      />
      <BulkChangeModal
        bulkChnangMdl={bulkChnangMdl}
        setBulkChnangMdl={setBulkChnangMdl}
        handlebulkChnangMdl={handlebulkChnangMdl}
        handleClosesetBulkChnangMdl={handleClosesetBulkChnangMdl}
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
        BomData={BomData}
        setBomData={setBomData}
        handleSelectChange={handleSelectChange}
        selectedPartId={selectedPartId}
        setSelectedPartId={setSelectedPartId}
        options={options}
        BomArry={BomArry}
        setBomArry={setBomArry}
        HasBOM={HasBOM}
        setHasBOM={setHasBOM}
        LastSlctedRow={LastSlctedRow}
        setLastSlctedRow={setLastSlctedRow}
        selectedItems={selectedItems}
        handleblkCngCheckBox={handleblkCngCheckBox}
        blkCngCheckBox={blkCngCheckBox}
        setBlkCngCheckBox={setBlkCngCheckBox}
        //---NEW

        blkChange={blkChange}
        setBlkChange={setBlkChange}
        imprtDwgObj={imprtDwgObj}
        setImprtDwgObj={setImprtDwgObj}
        handleChange={handleChange}
        updateblkcngOrdrData={updateblkcngOrdrData}
      />
      <div>
        <div className="row justify-content-left">
          <div className="col-md-12">
            {props.OrderData?.Type === "Profile" ? (
              <button
                className="button-style"
                onClick={() => handleImportDwgmdl()}
              >
                Import Dwg
              </button>
            ) : null}

            <button className="button-style" onClick={importExcelFunc}>
              Import EXCEL
            </button>
            <button className="button-style" onClick={handleImportQtnMdl}>
              Import Qtn
            </button>
            <button className="button-style" onClick={handleImportOldOrdrMdl}>
              Import Old Order
            </button>
            <button className="button-style">Delete</button>
            <button className="button-style" onClick={handlebulkChnangMdl}>
              Bulk Change
            </button>
            <button className="button-style" onClick={handleSelectAll}>
              Select All
            </button>
            <button className="button-style" onClick={handleReverseSelection}>
              Reverse
            </button>
            {Type === "Profile" ? (
              <button className="button-style">Edit DXF</button>
            ) : null}
            {/* <button
            className="button-style"
            style={{ width: "100px", marginLeft: "4px" }}
            onClick={singleupdateOrdrData}
          >
            Update
          </button> */}
          </div>
        </div>
        <div className="row mt-1">
          <div className="col-md-6">
            <OrdrTable
              OrderData={OrderData}
              OrderCustData={OrderCustData}
              OrdrDetailsData={OrdrDetailsData}
              selectedItems={selectedItems}
              selectItem={selectItem}
            />
          </div>
          <div className="col-md-6">
            <Tabs className="nav-tabs tab_font">
              {props.OrderData?.Type === "Profile" ? (
                <Tab eventKey="drawing" title="Drawing">
                  <Drawings />
                </Tab>
              ) : null}
              <Tab eventKey="orderDetailsForm" title="Order Details">
                <OrdrDtls
                  OrderData={OrderData}
                  OrderCustData={OrderCustData}
                  OrdrDetailsData={OrdrDetailsData}
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
                  selectedItems={selectedItems}
                  selectItem={selectItem}
                  insertnewsrldata={insertnewsrldata}
                  importdwgshow={importdwgshow}
                  setImportDwgShow={setImportDwgShow}
                  handleImportDwg={handleImportDwg}
                  handleCloseImportDwg={handleCloseImportDwg}
                  handleMtrlCodeTypeaheadChange={handleMtrlCodeTypeaheadChange}
                  BomData={BomData}
                  setBomData={setBomData}
                  PostOrderDetails={PostOrderDetails}
                  handleSelectChange={handleSelectChange}
                  selectedPartId={selectedPartId}
                  setSelectedPartId={setSelectedPartId}
                  options={options}
                  BomArry={BomArry}
                  setBomArry={setBomArry}
                  HasBOM={HasBOM}
                  setHasBOM={setHasBOM}
                  LastSlctedRow={LastSlctedRow}
                  setLastSlctedRow={setLastSlctedRow}
                  //----
                  newSerial={newSerial}
                  setNewSerial={setNewSerial}
                  ordrDetailsChange={ordrDetailsChange}
                  setordrDetailsChange={setordrDetailsChange}
                  handleChange={handleChange}
                />
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}
