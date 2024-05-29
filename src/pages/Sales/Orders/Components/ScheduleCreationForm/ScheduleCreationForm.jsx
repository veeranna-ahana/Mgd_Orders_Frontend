import React, { useEffect, useState, Profiler } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Tab, Table, Tabs, Form } from "react-bootstrap";
import FindOldPart from "./Tabs/FindOldPart/FindOldPart";
import MaterialInfo from "./Tabs/MaterialInfo/MaterialInfo";
import MaterialPlanner from "./Tabs/MaterialPlanner/MaterialPlanner";
import OrderDetails from "./Tabs/OrderDetails/OrderDetails";
import OrderInfo from "./Tabs/OrderInfo/OrderInfo";
import ProductionScheduleCreation from "./Tabs/ProductionScheduleCreation/ProductionScheduleCreation";
import ProfarmaInvoiceList from "./Tabs/ProfarmaInvoiceList/ProfarmaInvoiceList";
import ScheduleList from "./Tabs/ScheduleList/ScheduleList";
import FormHeader from "./FormHeader";
import { endpoints } from "../../../../api/constants";
import { getRequest, postRequest } from "../../../../api/apiinstance";
import { toast } from "react-toastify";
import AlertModal from "../Components/Alert";

const InputField = ({
  label,
  id,
  value,
  onChangeCallback,
  required,
  disabled,
  style,
  className,
  onCheckboxChange,
  isChecked,
  checkboxIndex,
  showCheckbox,
}) => {
  const [isValid, setIsValid] = useState(true);

  const handleInputChange = (e) => {
    // const inputValue = e.target.value;
    const inputValue = e.target.value.replace(/[^0-9.]/g, "");

    // const isValidNumber =
    //   /^\d*\.?\d+$/.test(inputValue) && parseFloat(inputValue) >= 0;

    // setIsValid(isValidNumber);
    onChangeCallback(inputValue);
  };

  return (
    <div className="md-col-4">
      <div className="row">
        {/* <div className="col-md-9">
          <label className="form-label">{label}</label>
        </div> */}
        <div className="col-md-3">
          {/* <input
            type="checkbox"
            onChange={() => onCheckboxChange(checkboxIndex)}
            checked={isChecked}
          /> */}
          <div className="col-md-3">
            {showCheckbox && ( // Conditionally render the checkbox
              <input
                type="checkbox"
                className="custom-checkbox in-field"
                // className="in-field"
                onChange={() => onCheckboxChange(checkboxIndex)}
                checked={isChecked}
                required
              />
            )}
          </div>
        </div>
      </div>

      <input
        type="text"
        id={id}
        value={value}
        onChange={handleInputChange}
        // style={{ borderColor: isValid ? "initial" : "red" }}
        disabled={disabled}
        className={className}
      />
      {/* {!isValid && (
        // <p style={{ color: "red" }}>
        //   Please enter a valid positive number for {label}.
        // </p>
        toast.warning("Please enter a valid positive number")
      )} */}
    </div>
  );
};
export default function ScheduleCreationForm(props) {
  const location = useLocation();
  // ////console.log("props", props.OrersData);
  // //////console.log("props", props.OrersData);
  //////console.log("ocation.state", location.state);
  // state for order_status change
  const [intSchStatus, setIntSchStatus] = useState(0);

  const [mtrldata, setMtrldata] = useState([]);
  const [procdata, setProcdata] = useState([]);
  const [inspdata, setInspdata] = useState([]);
  const [packdata, setPackdata] = useState([]);
  const [tolerancedata, setTolerancedata] = useState([]);
  const [salesExecdata, setSalesExecdata] = useState([]);
  const [gradeid, setGradeID] = useState("");
  const [material, setMaterial] = useState("");
  const [DwgName, setDwgName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [jwRate, setJwRate] = useState("");
  const [materialRate, setMaterialRate] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [Operation, setOperation] = useState("");
  const [thickness, setThickness] = useState("");
  const [specificwt, setSpecificWt] = useState(0);
  const [grade, setGrade] = useState("");
  const [HasBOM, setHasBOM] = useState(0);
  const [Dwg, setDwg] = useState(0);

  const [newSerial, setNewSerial] = useState({
    DwgName: "",
    material: "",
    strmtrlcode: "",
    Operation: "",
    StrTolerance: "", // NOT USED
    InspLvl: "",
    PkngLvl: "",
    MtrlSrc: "",
    custcode: props.OrderCustData?.Cust_Code,
    OrderNo: 0,
    newOrderSrl: 0,
    quantity: 0.0,
    jwRate: 0.0,
    materialRate: 0.0,
    unitPrice: 0.0,
    Dwg_Code: "",
    dwg: "",
  });
  const [ordrDetailsChange, setordrDetailsChange] = useState({
    custcode: props.OrderCustData?.Cust_Code,
    DwgName: "",
    material: "",
    strmtrlcode: "",
    Operation: "",
    StrTolerance: "", // NOT USED
    InspLvl: "",
    PkngLvl: "",
    MtrlSrc: "",
    quantity: 0.0,
    jwRate: 0.0,
    materialRate: 0.0,
    unitPrice: 0.0,
  });
  // const [blkCngCheckBox, setBlkCngCheckBox] = useState([
  //   false,
  //   false,
  //   false,
  //   false,
  //   false,
  //   false,
  //   false,
  //   false,
  //   false,
  //   false,
  // ]);
  const [blkChange, setBlkChange] = useState({
    custcode: props.OrderCustData?.Cust_Code,
    DwgName: "",
    material: "",
    strmtrlcode: "",
    Operation: "",
    StrTolerance: "", // NOT USED
    InspLvl: "",
    PkngLvl: "",
    MtrlSrc: "",
    quantity: 0.0,
    jwRate: 0.0,
    materialRate: 0.0,
    unitPrice: 0.0,
    blkCngCheckBox: false,
  });

  const [imprtDwgObj, setImprtDwgObj] = useState({
    custcode: props.OrderCustData?.Cust_Code,
    material: "",
    strmtrlcode: "",
    Operation: "",
    MtrlSrc: "",
    StrTolerance: "",
    InspLvl: "",
    PkngLvl: "",
    quantity: 0.0,
  });
  let [orderdetailsdata, setOrderDetailsData] = useState([]);
  let [Orderno, setOrderno] = useState(location.state);
  // LOC AND DXF
  let [lengthOfCut, setLengthOfCut] = useState(0);
  let [noOfPierces, setNoofPierces] = useState(0);
  let [partNetArea, setPartNetArea] = useState(0);
  let [outOpen, setOutOpen] = useState(0);
  let [complexity, setComplexity] = useState(0);
  let [hasOpenContour, setHasOpenContour] = useState(0);
  let [partNetWeight, setPartNetWeight] = useState(0);
  let [partOutArea, setPartOutArea] = useState(0);
  let [partOutWeight, setPartOutWeight] = useState(0);
  let [rectArea, setRectArea] = useState(0);
  let [rectWeight, setRectWeight] = useState(0);

  const [orderStatus, setOrderStatus] = useState("Created");

  //IMPORT DWG
  let [strprocess, setStrProcess] = useState("");
  let [strmtrlcode, setStrMtrlCode] = useState("");
  let [strtolerance, setStrTolerance] = useState("");
  let [mtrlcode, setMtrlCode] = useState("");
  let [strMaterial, setStrMaterial] = useState("");
  let [strGrade, setStrGrade] = useState("");
  let [decThick, setDecThick] = useState(0);
  let [dblSpWt, setDblSpWt] = useState(0);
  let [dblCuttingRate, setDblCuttingRate] = useState(0);
  let [dblPierceRate, setDblPierceRate] = useState(0);
  let [strInsp, setStrInsp] = useState("");
  let [strPkng, setStrPkng] = useState("");
  let [strSource, setStrSource] = useState("");
  let [strMtrlGrade, setStrMtrlGrade] = useState("");
  let [Qty, setQty] = useState(0);
  let [FormOk, setFormOk] = useState(false);
  let [valOK, setValOK] = useState(false);
  let [TMd, setTMd] = useState([]);
  let [mtrl, setMtrl] = useState([]);
  let [bolMtrl, setBolMtrl] = useState(false);
  let [bolOperation, setBolOperation] = useState(false);
  let [bolSource, setBolSource] = useState(false);
  let [bolInsp, setBolInsp] = useState(false);
  let [bolPkng, setBolPkng] = useState(false);
  let [bolTolerance, setBolTolerance] = useState(false);
  let [bolQty, setBolQty] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // LOC CACLULATION AND DXF FILE
  let locCalc = async (drwfile, material, grade, thickness, cb) => {
    const formData = new FormData();
    //  window.dxffiles.forEach(async (dfile) => {
    formData.append("file", drwfile); //files[i]);
    formData.append("thickness", thickness);
    formData.append("specficWeight", specificwt); // resp[0].Specific_Wt);
    //  setSpecificWt(resp[0].Specific_Wt);
    //// //////console.log("Sending to Service");
    // const getCalcReq = await fetch('http://127.0.0.1:21341/getCalc', {
    const getCalcReq = await fetch("http://localhost:21341/getCalc", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    });
    const res = await getCalcReq.json();
    //   const data = await res.json();
    //    //// //////console.log("Get Calc Response");
    //// //////console.log(res.data);
    //// //////console.log(res.data.partOutArea);

    setLengthOfCut(res.data.lengthOfCut);
    setNoofPierces(res.data.noOfPierces);
    setPartNetArea(res.data.partNetArea);
    setOutOpen(res.data.outOpen);
    setComplexity(res.data.complexity);
    setHasOpenContour(res.data.hasOpenContour);
    setPartNetWeight(res.data.partNetWeight);
    setPartOutArea(res.data.partOutArea);
    setPartOutWeight(res.data.partOutWeight);
    setRectArea(res.data.rectArea);
    setRectWeight(res.data.rectWeight);
    //  setSpecificWt(res.Specific_Wt)
    cb({
      lengthOfCut: res.data.lengthOfCut,
      noOfPierces: res.data.noOfPierces,
      partNetArea: res.data.partNetArea,
      complexity: res.data.complexity,
      hasOpenContour: res.data.hasOpenContour,
      outOpen: res.data.outOpen,
      partNetWeight: res.data.partNetWeight,
      partOutArea: res.data.partOutArea,
      partOutWeight: res.data.partOutWeight,
      rectArea: res.data.rectArea,
      rectWeight: res.data.rectWeight,
    });
    //, spWeight: res.data.Specific_Wt
    // setQtnProfileData((olddata) => [...olddata, { file: files[i], operation: process, material, grade, thickness, quantity, materialcode,loc }]);
    //});
  };

  async function dxfupload(files, destPath, response) {
    const data = new FormData();
    //// //////console.log(files);
    for (let i = 0; i < files.length; i++) {
      data.append("files", files[i]);
    }
    //// //////console.log(data);
    let API = "http://localhost:6001";
    const rawResponse = await fetch(`${API}/file/uploaddxf`, {
      method: "POST",
      headers: {
        Accept: "multipart/form-data",
        destinationPath: destPath,
        // 'Content-Type': 'multipart/form-data'
      },
      body: data,
    });
    const content = await rawResponse.json();
    response(content);
  }

  let importdrawings = async (e) => {
    e.preventDefault();
    //// //////console.log("Import Drawings");

    if (!(orderStatus === "Created" || orderStatus === "Recorded")) {
      alert("Cannot import after the Order is recorded");
      return;
    }

    ////// //////console.log(document.getElementById("mtrlcode").value);
    // let materialcode = mtrlcode; //e.target.elements.mtrlcode.value;
    let materialcode = strmtrlcode;
    //// //////console.log("materialcode", materialcode);
    let process = strprocess; //e.target.elements.processdescription.value;
    let quantity = quantity; // e.target.elements.quantity.value;
    let materialsource = strSource; // e.target.elements.materialsource.value;
    let tolerance = strtolerance; // e.target.elements.tolerance.value;
    let insplevel = strInsp; // e.target.elements.insplevel.value;
    let packinglevel = strPkng; // e.target.elements.packinglevel.value;
    let files = e.target.elements.files.files;
    setDblCuttingRate(dblCuttingRate);
    setDblPierceRate(dblPierceRate);

    for (let i = 0; i < files.length; i++) {
      //// //////console.log(files[i]);
      let drwfname = files[i];

      //// //////console.log(drwfname);
      locCalc(drwfname, material, grade, thickness, (output) => {
        //// //////console.log(output);
        //   //// //////console.log("Qtn Profile Data : ", typeof qtnProfileData);

        let olddata = Object.entries(orderdetailsdata).map(([key, value]) => ({
          key,
          value,
        }));
        //  let olddata = [...qtnProfileData];

        //// //////console.log("Old Data : " + olddata);
        if (olddata === null || olddata === undefined) {
          // Handle the case where olddata is null
          return;
        } else {
          setOrderDetailsData((olddata) => {
            // Append to existing olddata
            return [
              ...olddata,
              {
                file: files[i],
                operation: process,
                material,
                grade,
                thickness,
                quantity,
                mtrlcode,
                lengthOfCut: output.lengthOfCut,
                noOfPierces: output.noOfPierces, // ? 1 : 0,
                partNetArea: output.partNetArea,
                complexity: output.complexity,
                hasOpenContour: output.hasOpenContour,
                outOpen: output.outOpen,
                partNetWeight: output.partNetWeight,
                partOutArea: output.partOutArea,
                partOutWeight: output.partOutWeight,
                rectArea: output.rectArea,
                rectWeight: output.rectWeight,
              },
            ];
          });
        }
      });

      //  let LOC = parseFloat(CuttingLength * 0.001).tofixed(2)
      //  let Holes = PierceCount

      //  let JWCost = Math.Round(LOC * dblCuttingRate + Holes * dblPierceRate, 0)
      // .MtrlCost = 0
      // .delivery_date = DateTimePicker_DelDate.Value.ToString
    }

    // let qno = quotationNo.replaceAll("/", "_");
    // let month = qno.split("_")[1]
    // let monthName = ["January", "Febraury", "March", "April", "May", "June",
    //     "July", "August", "September", "October", "November", "December"][parseInt(month) - 1]

    let destPath = `\\Wo\\` + Orderno + "\\DXF\\"; //quotationNo;

    dxfupload(files, destPath, (res) => {
      //// //////console.log(res);
    });

    window.dxffiles = files;
    //// //////console.log(
    //   materialcode,
    //   material,
    //   grade,
    //   thickness,
    //   process,
    //   quantity,
    //   files
    // );
    setShow(false);
  };

  //  const handleMtrlCodeTypeaheadChange = (selectedOptions) => {
  //   console.log("selectedOptions.........",selectedOptions)
  //   setSelectedItems(selectedOptions);
  //   const selectedValue = selectedOptions.length > 0 ? selectedOptions[0].Mtrl_Code : "";
  //   // if (selectedValue) {
  //   //   setStrMtrlCode(selectedValue.Mtrl_Code);
  //   // }
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // DWG NAME
    if (name === "newSrlDwgname") {
      setNewSerial((prevState) => ({
        ...prevState,
        DwgName: value,
      }));
    } else if (name === "blkCngDwgname") {
      setBlkChange((prevState) => ({
        ...prevState,
        DwgName: value,
        blkCngCheckBox: true,
      }));
    } else if (name === "odrDtlDwgName") {
      setordrDetailsChange((prevState) => ({
        ...prevState,
        DwgName: value,
      }));
    }
    // MATERIAL
    if (name === "newSrlMaterial") {
      setNewSerial((prevState) => ({
        ...prevState,
        material: value,
      }));
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
    } else if (name === "odrDtlMaterial") {
      setordrDetailsChange((prevState) => ({
        ...prevState,
        material: value,
      }));
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
    } else if (name === "blkCngMaterial") {
      setBlkChange((prevState) => ({
        ...prevState,
        material: value,
      }));
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
    } else if (name === "impDwgMaterial") {
      setImprtDwgObj((prevState) => ({
        ...prevState,
        material: value,
      }));
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
    }
    // MATERIAL CODE [ Feild name is material]

    // const handleMtrlCodeTypeaheadChange = (selectedOptions) => {
    //   const selectedValue =
    //     selectedOptions.length > 0 ? selectedOptions[0] : null;
    //   setStrMtrlCode(selectedValue?.Mtrl_Code);
    // };

    const handleMtrlCodeTypeaheadChange = (selectedOptions) => {
      setSelectedItems(selectedOptions); // Update the state with the selected options
      const selectedValue =
        selectedOptions.length > 0 ? selectedOptions[0] : null;
      if (selectedValue) {
        setStrMtrlCode(selectedValue.Mtrl_Code);
      }
    };

    if (name === "newSrlMaterial") {
      setNewSerial((prevState) => ({
        ...prevState,
        strmtrlcode: value,
      }));
    } else if (name === "odrDtlMaterial") {
      setordrDetailsChange((prevState) => ({
        ...prevState,
        strmtrlcode: value,
      }));
    } else if (name === "blkCngMaterial") {
      setBlkChange((prevState) => ({
        ...prevState,
        strmtrlcode: value,
      }));
    } else if (name === "impDwgMaterial") {
      setImprtDwgObj((prevState) => ({
        ...prevState,
        strmtrlcode: value,
      }));
    }

    // PROCESS OR OPERATION
    if (name === "newSrlOperation") {
      setNewSerial((prevState) => ({
        ...prevState,
        Operation: value,
      }));
    } else if (name === "odrDtlOperation") {
      setordrDetailsChange((prevState) => ({
        ...prevState,
        Operation: value,
      }));
    } else if (name === "blkCngOperation") {
      setBlkChange((prevState) => ({
        ...prevState,
        Operation: value,
      }));
    } else if (name === "impDwgProcess") {
      setImprtDwgObj((prevState) => ({
        ...prevState,
        Operation: value,
      }));
    }
    // TOLERENCE
    if (name === "impDwgTolerance") {
      setImprtDwgObj((prevState) => ({
        ...prevState,
        StrTolerance: value,
      }));
    }
    // INSP LVL
    if (name === "newSrlInspLvl") {
      setNewSerial((prevState) => ({
        ...prevState,
        InspLvl: value,
      }));
    } else if (name === "odrDtlInspLvl") {
      setordrDetailsChange((prevState) => ({
        ...prevState,
        InspLvl: value,
      }));
    } else if (name === "blkCngInspLvl") {
      setBlkChange((prevState) => ({
        ...prevState,
        InspLvl: value,
      }));
    } else if (name === "impDwgInspLvl") {
      setImprtDwgObj((prevState) => ({
        ...prevState,
        InspLvl: value,
      }));
    }
    // PKNG LVL
    if (name === "newSrlPkngLvl") {
      setNewSerial((prevState) => ({
        ...prevState,
        PkngLvl: value,
      }));
    } else if (name === "odrDtlPkngLvl") {
      setordrDetailsChange((prevState) => ({
        ...prevState,
        PkngLvl: value,
      }));
    } else if (name === "blkCngPkngLvl") {
      setBlkChange((prevState) => ({
        ...prevState,
        PkngLvl: value,
      }));
    } else if (name === "impDwgPkngLvl") {
      setImprtDwgObj((prevState) => ({
        ...prevState,
        PkngLvl: value,
      }));
    }
    // MATERIAL SOURSE
    if (name === "newSrlMtrlSrc") {
      setNewSerial((prevState) => ({
        ...prevState,
        MtrlSrc: value,
      }));
    } else if (name === "odrDtlMtrlSrc") {
      console.log("e.target.value---", e.target.value);
      setordrDetailsChange((prevState) => ({
        ...prevState,
        MtrlSrc: value,
      }));
    } else if (name === "blkCngMtrlSrc") {
      setBlkChange((prevState) => ({
        ...prevState,
        MtrlSrc: value,
      }));
    }
    // QUANTITY
    if (name === "newSrlQty") {
      const mvalue = e.target.value.replace(/[^0-9.]/g, "");
      setNewSerial((prevState) => ({
        ...prevState,
        quantity: mvalue,
      }));
    } else if (name === "odrDtlQuantity") {
      const mvalue = e.target.value.replace(/[^0-9.]/g, "");
      setordrDetailsChange((prevState) => ({
        ...prevState,
        quantity: mvalue,
      }));
    } else if (name === "blkCngQty") {
      const mvalue = e.target.value.replace(/[^0-9.]/g, "");
      setBlkChange((prevState) => ({
        ...prevState,
        quantity: mvalue,
      }));
    } else if (name === "impDwgQty") {
      const mvalue = e.target.value.replace(/[^0-9.]/g, "");
      setImprtDwgObj((prevState) => ({
        ...prevState,
        quantity: mvalue,
      }));
    }
    // JW RATE
    if (name === "newSrlJWRate") {
      const mvalue = e.target.value.replace(/[^0-9.]/g, "");
      setNewSerial((prevState) => ({
        ...prevState,
        jwRate: mvalue,
      }));
    } else if (name === "odrDtljwrate") {
      const mvalue = e.target.value.replace(/[^0-9.]/g, "");
      setordrDetailsChange((prevState) => ({
        ...prevState,
        jwRate: mvalue,
      }));
    } else if (name === "blkCngJWRate") {
      const mvalue = e.target.value.replace(/[^0-9.]/g, "");
      setBlkChange((prevState) => ({
        ...prevState,
        jwRate: mvalue,
      }));
    }
    // MTRL RATE
    if (name === "newSrlMaterialRate") {
      const mvalue = e.target.value.replace(/[^0-9.]/g, "");
      setNewSerial((prevState) => ({
        ...prevState,
        materialRate: mvalue,
      }));
    } else if (name === "odrDtlMtrlRate") {
      const mvalue = e.target.value.replace(/[^0-9.]/g, "");
      setordrDetailsChange((prevState) => ({
        ...prevState,
        materialRate: mvalue,
      }));
    } else if (name === "blkCngMrate") {
      const mvalue = e.target.value.replace(/[^0-9.]/g, "");
      setBlkChange((prevState) => ({
        ...prevState,
        materialRate: mvalue,
      }));
    }
    // UNIT PRICE
    if (name === "newSrlUnitPrice") {
      setNewSerial((prevState) => ({
        ...prevState,
        unitPrice: value,
      }));
    } else if (name === "odrDtlUnitPrice") {
      setordrDetailsChange((prevState) => ({
        ...prevState,
        unitPrice: value,
      }));
    } else if (name === "blkCngUnitPrice") {
      setBlkChange((prevState) => ({
        ...prevState,
        unitPrice: value,
      }));
    }
  };

  ////console.log("ordrDetailsChange.MtrlSrc", ordrDetailsChange.MtrlSrc);
  console.log("newserial.quantity", newSerial.quantity);
  let updateOrdrData = () => {
    postRequest(
      endpoints.singleChangeUpdate,
      {
        OrderNo: Orderno,
        custcode: props.OrderCustData?.Cust_Code,
        DwgName: ordrDetailsChange.DwgName,
        MtrlSrc: ordrDetailsChange.MtrlSrc,
        quantity: ordrDetailsChange.quantity,
        OrderSrl: selectedSrl,
        JwCost: ordrDetailsChange.jwRate,
        mtrlcost: ordrDetailsChange.materialRate,
        // unitPrice: ordrDetailsChange.unitPrice,

        unitPrice:
          parseFloat(ordrDetailsChange.jwRate) +
          parseFloat(ordrDetailsChange.materialRate),
        Operation: ordrDetailsChange.Operation,
        InspLvl: ordrDetailsChange.InspLvl,
        PkngLvl: ordrDetailsChange.PkngLvl,
      },
      (singleChngData) => {
        ////////console.log(" blkChngData", blkChngData);
        if (singleChngData.affectedRows != 0) {
          toast.success("Updated successfully");
          fetchData();
        } else {
          toast.warning("Serial not updated check once");
        }
      }
    );
  };

  const [orderNo, setorderNo] = useState(location?.state);
  const [OrderData, setOrderData] = useState({});
  const [OrderCustData, setOrderCustData] = useState({});
  const [OrdrDetailsData, setOrdrDetailsData] = useState([]);
  const [BomData, setBomData] = useState([]);
  const [findOldpart, setfindOldpart] = useState();
  //profarmaInvDetail data
  const [profarmaInvMain, setProfarmaInvMain] = useState([]);
  const [profarmaInvDetails, setProfarmaInvDetails] = useState([]);
  // row selection data
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedSrl, setSelectedSrl] = useState([]);
  const [LastSlctedRow, setLastSlctedRow] = useState([]);
  //getScheduleList Table Data
  const [scheduleListData, setScheduleListData] = useState([]);
  const [oldOrderListData, setOldOrderListData] = useState([]);
  const [oldOrderDetailsData, setOldOrderDetailsData] = useState([]);

  // Register button
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  // Alert Modals
  const [alertModal, setAlertModal] = useState(false);
  const [registerOrder, setRegisterOrder] = useState(false);
  const fetchData = () => {
    postRequest(
      endpoints.getOrderDetailsByOrdrNoAndType,
      { orderNo: orderNo, orderType: props.Type },
      (orderData) => {
        ////console.log("orderDetails.....", orderData);
        setOrderData(orderData?.orderData[0]);
        setOrderCustData(orderData?.custData[0]);

        postRequest(
          endpoints.GetBomData,
          { custcode: orderData?.custData[0]?.Cust_Code },
          (bomdata) => {
            // //////console.log("bomdata......", bomdata);
            setBomData(bomdata);
          }
        );
        postRequest(
          endpoints.GetFindOldpartData,
          { custcode: orderData?.custData[0]?.Cust_Code },
          (findOldpartData) => {
            ////  // //////console.log("findOldpartData......", findOldpartData);
            setfindOldpart(findOldpartData);
          }
        );

        postRequest(
          endpoints.PostNewSrlData,
          { custcode: orderData?.custData[0]?.Cust_Code, OrderNo: orderNo },
          (ordrdtlsdata) => {
            // ////// //////console.log("ordrdtlsdata", ordrdtlsdata);
            setOrdrDetailsData(ordrdtlsdata);
          }
        );

        postRequest(
          endpoints.getOldOrderByCustCodeAndOrderNo,
          {
            Cust_Code: orderData?.orderData[0].Cust_Code,
            Order_No: orderData?.orderData[0].Order_No,
          },

          (oldOrderData) => {
            // ////console.log("dataqwqw...", oldOrderData);
            setOldOrderListData(oldOrderData.orderListData);
            setOldOrderDetailsData(oldOrderData.orderDetailsData);
          }
        );
      }
    );
    postRequest(
      endpoints.getProfarmaMain,
      { OrderNo: orderNo },
      (profarmaMainData) => {
        // // //////console.log("profarmaMainData", profarmaMainData);

        setProfarmaInvMain(profarmaMainData);
        // // //////console.log("ordrdtlsdata", ordrdtlsdata);
        // setOrdrDetailsData(ordrdtlsdata);
      }
    );
    postRequest(
      endpoints.getProfarmaDetails,
      { OrderNo: orderNo },
      (profarmaDetailsData) => {
        // // //////console.log("profarmaDetailsData", profarmaDetailsData);

        setProfarmaInvDetails(profarmaDetailsData);
        // // //////console.log("ordrdtlsdata", ordrdtlsdata);
        // setOrdrDetailsData(ordrdtlsdata);
      }
    );

    setSelectedItems([]);
  };
  const calculateMinSrlStatus = () => {
    if (OrdrDetailsData.length === 0) return 0;

    return Math.min(
      ...OrdrDetailsData.map((order) => {
        if (order.Qty_Ordered === 0) return 0;
        else if (order.QtyDelivered >= order.Qty_Ordered) return 8;
        else if (order.QtyDelivered > 0 && order.QtyPacked >= order.Qty_Ordered)
          return 7;
        else if (order.QtyPacked >= order.Qty_Ordered) return 6;
        else if (order.QtyPacked > 0 && order.QtyProduced >= order.Qty_Ordered)
          return 5;
        else if (order.QtyProduced >= order.Qty_Ordered) return 4;
        else if (
          order.QtyProduced > 0 &&
          order.QtyScheduled >= order.Qty_Ordered
        )
          return 5;
        else if (order.QtyScheduled >= order.Qty_Ordered) {
          return 3;
        } else if (order.QtyScheduled > 0) return 2;
        else return 1;
      })
    );
  };

  const updateOrderStatus = () => {
    const status = getStatusText(intSchStatus);
    // Update order status here
    ////console.log("Order Status:", status);
  };

  const getStatusText = (status) => {
    switch (status) {
      case 8:
        return "Dispatched";
      case 7:
        return "Packed";
      case 6:
        return "Packed";
      case 5:
        return "Produced";
      case 4:
        return "Produced";
      case 3:
        return "Processing";
      case 2:
        return "Recorded";
      case 1:
        return "Recorded";
      case 0:
        return "Recorded";
      default:
        return "Confused";
    }
  };

  const setDetailsColour = () => {
    ////console.log("entering into the setDetailsColour");
    const rows = document.querySelectorAll(".order-details-row");
    rows.forEach((row) => {
      const srlStatus = parseInt(row.getAttribute("data-srlstatus"));
      ////console.log("srlStatus..........", srlStatus);
      let backgroundColor = ""; // Define backgroundColor here
      switch (srlStatus) {
        case 0:
          backgroundColor = "lavender";
          break;
        case 1:
          backgroundColor = "lightblue";
          break;
        case 2:
          backgroundColor = "lightcoral";
          break;
        case 3:
          ////console.log("entering into case 3, light yellow");
          backgroundColor = "lightyellow";
          break;
        case 4:
          backgroundColor = "yellow";
          break;
        case 5:
          backgroundColor = "greenyellow";
          break;
        case 6:
          backgroundColor = "lightgreen";
          break;
        case 7:
          backgroundColor = "orange";
          break;
        case 8:
          backgroundColor = "lightgreen";
          break;
        case 9:
          backgroundColor = "olivedrab";
          break;
        case 10:
          backgroundColor = "green";
          break;
        default:
          backgroundColor = "";
      }
      row.style.backgroundColor = backgroundColor; // Use backgroundColor here
      ////console.log(
      // `Row with srlStatus ${srlStatus} has background color: ${backgroundColor}`
      // );
    });
  };

  // ////console.log("selectedItems", selectedItems[0]?.Mtrl_Code);
  // ////console.log("Ordr_Status", OrdrDetailsData[0]?.Order_Status);
  // ////console.log("Order_Type", OrderData.Order_Type);

  // let orderType = OrderData.Order_Type;

  // const setOrderDetails = (setDetails) => {
  //   ////console.log("setDetails", setDetails);
  //   switch (setDetails) {
  //     case "Created":
  //       // Enable order details editing
  //       // Assuming you have state variables to manage these conditions
  //       setOrderDetailsEnabled(true);
  //       setBulkChangeEnabled(true);
  //       setAddSrlVisible(true);
  //       // Set specific columns as readOnly
  //       // You may need to manage column states in the component's state
  //       setColumnsReadOnly({
  //         Dwg: true,
  //         Operation: false,
  //         QtyOrdered: false,
  //         JWCost: false,
  //         MtrlCost: false,
  //       });
  //       break;
  //     case "Processing":
  //       // Disable bulk change and hide Add Srl
  //       setBulkChangeEnabled(false);
  //       setAddSrlVisible(false);
  //       // Set columns readOnly based on orderType
  //       // Assuming orderType is managed by state
  //       switch (orderType) {
  //         case "Complete":
  //           // Set specific columns as readOnly
  //           setColumnsReadOnly({
  //             Dwg: true,
  //             MtrlSource: true,
  //             MtrlCode: true,
  //             Operation: true,
  //             QtyOrdered: true,
  //             JWCost: true,
  //             MtrlCost: true,
  //             InspLevel: true,
  //             PackingLevel: true,
  //             Tolerance: true,
  //           });
  //           break;
  //         case "Scheduled":
  //           // Set specific columns as readOnly
  //           setColumnsReadOnly({
  //             Dwg: true,
  //             MtrlSource: true,
  //             MtrlCode: true,
  //             Operation: true,
  //             QtyOrdered: false,
  //             JWCost: true,
  //             MtrlCost: true,
  //             InspLevel: true,
  //             PackingLevel: true,
  //             Tolerance: true,
  //           });
  //           break;
  //         case "Open":
  //           // Set specific columns as readOnly
  //           setColumnsReadOnly({
  //             QtyOrdered: false,
  //             JWCost: false,
  //             MtrlCost: false,
  //           });
  //           break;
  //         default:
  //           break;
  //       }
  //       break;
  //     case "Nochange":
  //       // Disable bulk change, hide Add Srl, set all columns as readOnly
  //       setBulkChangeVisible(false);
  //       setAddSrlVisible(false);
  //       setColumnsReadOnly({
  //         Dwg: true,
  //         MtrlSource: true,
  //         MtrlCode: true,
  //         Operation: true,
  //         QtyOrdered: false,
  //         JWCost: true,
  //         MtrlCost: true,
  //         InspLevel: true,
  //         PackingLevel: true,
  //         Tolerance: true,
  //       });
  //       break;
  //     default:
  //       break;
  //   }
  // };

  // Assuming you have state variables and setters for the conditions below
  const [orderDetailsEnabled, setOrderDetailsEnabled] = useState(false);
  const [bulkChangeEnabled, setBulkChangeEnabled] = useState(false);
  const [addSrlVisible, setAddSrlVisible] = useState(false);
  const [bulkChangeVisible, setBulkChangeVisible] = useState(false);
  const [columnsReadOnly, setColumnsReadOnly] = useState({
    Dwg: true,
    Operation: false,
    QtyOrdered: false,
    JWCost: false,
    MtrlCost: false,
  });
  // ////console.log("selectedItems", selectedItems[0]?.Mtrl_Code);
  useEffect(() => {
    fetchData();
    setIntSchStatus(calculateMinSrlStatus());
    updateOrderStatus();
    setDetailsColour();
    // setOrderDetails();
  }, []);

  useEffect(() => {
    setOrderData(props.OrersData);
  }, [props.OrersData]);

  // alert modals for register and save
  const openModal = (e) => {
    e.preventDefault();
    setAlertModal(true);
  };
  const closeModal = () => {
    setAlertModal(false);
  };
  const openRegisterOrder = (e) => {
    e.preventDefault();
    setRegisterOrder(true);
  };
  const closeRegisterOrder = () => {
    setRegisterOrder(false);
  };

  // Register Button
  const handleRegisterBtn = () => {
    postRequest(
      endpoints.registerOrder,
      { Order_No: orderNo, Order_Status: "Recorded" },
      (registerOrderData) => {
        setOrderData({ ...OrderData, Order_Status: "Recorded" });
        toast.success("Order Registered Successfully");
        closeRegisterOrder();
      }
    );
    setButtonDisabled(true);
  };
  // Save Button
  const handleSaveBtn = () => {
    toast.success("Order Saved Successfully");
  };
  // Row selection in orderDetails tab
  const selectItem = (OrdrDetailsItem) => {
    const isSelected = selectedItems.includes(OrdrDetailsItem);
    // callback function to log the updated state after the update
    setSelectedItems((prevSelectedItems) => {
      const updatedSelectedItems = isSelected
        ? prevSelectedItems.filter((item) => item !== OrdrDetailsItem)
        : [...prevSelectedItems, OrdrDetailsItem];
      console.log("Selected Order details Rows:", updatedSelectedItems);
      const selectedOrderSrl = updatedSelectedItems.map(
        (item) => item.Order_Srl
      );

      console.log("selectedOrderSrl", selectedOrderSrl);
      setSelectedSrl(selectedOrderSrl);
      const lastSelectedRow =
        updatedSelectedItems[updatedSelectedItems.length - 1];
      ////console.log("Last Selected Row:", lastSelectedRow);
      setLastSlctedRow(lastSelectedRow);
      setordrDetailsChange((prevState) => ({
        ...prevState,
        DwgName: lastSelectedRow?.DwgName || "",
        MtrlSrc: lastSelectedRow?.Mtrl_Source || "",
        jwRate: lastSelectedRow?.JWCost || "",
        quantity: lastSelectedRow?.Qty_Ordered || "",
        materialRate: lastSelectedRow?.MtrlCost || "",
        unitPrice: lastSelectedRow?.UnitPrice || "",
        Operation: lastSelectedRow?.Operation || "",
        InspLvl: lastSelectedRow?.InspLevel || "",
        PkngLvl: lastSelectedRow?.PackingLevel || "",
      }));

      return updatedSelectedItems;
    });
  };

  // selectAll button
  const handleSelectAll = () => {
    setSelectedItems(OrdrDetailsData);
  };
  // reverse Button
  const handleReverseSelection = () => {
    if (selectedItems.length === 0) {
      handleSelectAll();
    } else {
      const newArray = [];

      for (let i = 0; i < OrdrDetailsData.length; i++) {
        const element = OrdrDetailsData[i];

        if (selectedItems.includes(element)) {
          // the element is selected, needs to be removed
        } else {
          // not selected, needs to be added to the newArray
          newArray.push(element);
        }
      }
      // Update the selected rows with the newArray
      setSelectedItems(newArray);
    }
  };
  // let insertnewsrldata = () => {
  //   ////////console.log("entering into insertnewsrldata");
  //   postRequest(
  //     endpoints.InsertNewSrlData,
  //     { custcode: OrderCustData.Cust_Code, OrderNo: orderNo },
  //     (InsertedNewSrlData) => {
  //       ////////console.log(" InsertedNewSrlDataRes", InsertedNewSrlData);
  //     }
  //   );
  // };

  // useEffect(()=>{
  //   setorderNo(props.OrersData[0].Order_No);
  // },[props.OrersData]);

  // ////console.log("location.state is",location.state);

  // NOT USED
  let insertnewsrldata = () => {
    postRequest(
      endpoints.InsertNewSrlData,
      { custcode: OrderCustData.Cust_Code, OrderNo: orderNo },
      (InsertedNewSrlData) => {
        // //////console.log(" InsertedNewSrlDataRes", InsertedNewSrlData);
      }
    );
  };

  return (
    <>
      <div>
        {/* <div>
          <div className="row mb-3">
            <label>feild1</label>
            <input
              name="feild1"
              value={newSerial.quantity}
              onChange={handleChange}
            />
          </div>
          <div className="row mb-3">
            <label>feild2</label>
            <input
              name="feild2"
              value={imprtDwgObj.quantity}
              onChange={handleChange}
            />
          </div>
        </div> */}
        <FormHeader
          OrderData={OrderData}
          OrderCustData={OrderCustData}
          handleRegisterBtn={handleRegisterBtn}
          handleSaveBtn={handleSaveBtn}
          isButtonDisabled={isButtonDisabled}
          openRegisterOrder={openRegisterOrder}
          closeRegisterOrder={closeRegisterOrder}
          openModal={openModal}
          closeModal={closeModal}
          updateOrdrData={updateOrdrData}
        />

        <Tabs className="nav-tabs tab_font">
          <Tab eventKey="orderinfo" title="Order Info">
            <OrderInfo OrderData={OrderData} />
          </Tab>
          <Tab
            eventKey="productionschedulecreation"
            title="Production Schedule Creation"
          >
            <ProductionScheduleCreation
              OrderData={OrderData}
              selectedItems={selectedItems}
              setScheduleListData={setScheduleListData}
            />
          </Tab>
          <Tab eventKey="findoldpart" title="Find Old Part">
            <FindOldPart
              OrderData={OrderData}
              findOldpart={findOldpart}
              setfindOldpart={setfindOldpart}
            />
          </Tab>
          <Tab eventKey="materialinfo" title="Material Info">
            <MaterialInfo OrderData={OrderData} />
          </Tab>
        </Tabs>
        <div className="mt-1">
          <Tabs className="nav-tabs tab_font">
            <Tab eventKey="orderdetails" title="Order Details">
              <OrderDetails
                OrderData={OrderData}
                OrderCustData={OrderCustData}
                OrdrDetailsData={OrdrDetailsData}
                setOrdrDetailsData={setOrdrDetailsData}
                selectedItems={selectedItems}
                selectItem={selectItem}
                LastSlctedRow={LastSlctedRow}
                setLastSlctedRow={setLastSlctedRow}
                // handleBulkCngBtn={handleBulkCngBtn}
                fetchData={fetchData}
                BomData={BomData}
                setBomData={setBomData}
                findOldpart={findOldpart}
                setfindOldpart={setfindOldpart}
                handleSelectAll={handleSelectAll}
                handleReverseSelection={handleReverseSelection}
                selectedSrl={selectedSrl}
                // insertnewsrldata={insertnewsrldata}
                oldOrderListData={oldOrderListData}
                oldOrderDetailsData={oldOrderDetailsData}
                //---------new
                newSerial={newSerial}
                setNewSerial={setNewSerial}
                ordrDetailsChange={ordrDetailsChange}
                setordrDetailsChange={setordrDetailsChange}
                blkChange={blkChange}
                setBlkChange={setBlkChange}
                imprtDwgObj={imprtDwgObj}
                setImprtDwgObj={setImprtDwgObj}
                handleChange={handleChange}
                InputField={InputField}
                setDetailsColour={setDetailsColour}
                calculateMinSrlStatus={calculateMinSrlStatus}
                updateOrderStatus={updateOrderStatus}
                getStatusText={getStatusText}
              />
            </Tab>
            <Tab eventKey="scheduleList" title="Schedule List">
              <ScheduleList
                OrderData={OrderData}
                OrderCustData={OrderCustData}
                scheduleListData={scheduleListData}
                setScheduleListData={setScheduleListData}
              />
            </Tab>
            <Tab eventKey="profarmaInvoiceList" title="Proforma Invoice List">
              <ProfarmaInvoiceList
                OrderData={OrderData}
                OrderCustData={OrderCustData}
                selectedItems={selectedItems}
                profarmaInvMain={profarmaInvMain}
                profarmaInvDetails={profarmaInvDetails}
                fetchData={fetchData}
              />
            </Tab>
            {props.Type === "Profile" ? (
              <Tab eventKey="materialPlanner" title="Material Planner">
                <MaterialPlanner OrderData={OrderData} />
              </Tab>
            ) : null}
          </Tabs>
        </div>

        <AlertModal
          show={alertModal}
          onHide={(e) => setAlertModal(e)}
          firstbutton={closeModal}
          title="magod_Order"
          message="Record Saved"
          firstbuttontext="Ok"
        />

        <AlertModal
          show={registerOrder}
          onHide={(e) => setRegisterOrder(e)}
          firstbutton={handleRegisterBtn}
          secondbutton={closeRegisterOrder}
          title="magod_Order"
          // message="You can add New Serials, Change Quantity and Rates once you register an Open Order. Continue ?"
          message="No Change for Quantity, PackingLevels and Rates once you register. Proceed ?"
          firstbuttontext="Yes"
          secondbuttontext="No"
        />
      </div>
    </>
  );
}
