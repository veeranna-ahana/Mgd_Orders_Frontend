import React, { useEffect, useState } from "react";
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
// import { Modal } from "react-bootstrap";
// import { Typeahead } from "react-bootstrap-typeahead";
// import { getRequest, postRequest } from "../../../../api/apiinstance";
// import { endpoints } from "../../../../api/constants";
// import AlertModal from "../Components/Alert";
// import { useOrderContext } from "../../../../../context/OrderContext";
export default function ScheduleCreationForm(props) {
  const location = useLocation();

  // console.log("location...", location?.state);

  const [orderNo, setorderNo] = useState(location?.state);
  const [OrderData, setOrderData] = useState({});
  const [OrderCustData, setOrderCustData] = useState({});

  console.log("order no", orderNo);

  console.log("props", props.Type);

  const fetchData = () => {
    postRequest(
      endpoints.getOrderDetailsByOrdrNoAndType,
      { orderNo: orderNo, orderType: props.Type },
      (orderData) => {
        console.log("orderData.....", orderData);
        setOrderData(orderData.orderData[0]);
        setOrderCustData(orderData.custData[0]);
      }
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  // console.log("propssss", props.Type);
  // const [alertModal, setAlertModal] = useState(false);
  // const [registerOrder, setRegisterOrder] = useState(false);
  // let navigate = useNavigate();

  // let { orders, setOrderState } = useOrderContext() || {};

  // const [orderStatus, setOrderStatus] = useState("Created");
  // const [orderSrl, setOrderSrl] = useState(0);

  // let [Orderno, setOrderno] = useState("");
  // let [ordertype, setOrdertype] = useState("");
  // let [ordDwgDetsData, setOrdDwgDetsData] = useState([]);
  // let [ordMatDimensData, setOrdMatDimensData] = useState([]);
  // let [ordRectDetsData, setOrdRectDetsData] = useState([]);
  // let [ordMtrlDetsData, setOrdMtrlDetsData] = useState([]);
  // let [ordDwgtskDetsData, setOrdDwgTskDetsData] = useState([]);
  // let [ordCustTaskData, setOrdCustTaskData] = useState([]);
  // let [ordDimensData, setOrdDimensData] = useState([]);
  // let [ordProformaData, setOrdProformaData] = useState([]);
  // let [ordProformaMatData, setOrdProformaMatData] = useState([]);
  // let [ordDetsDwgData, setOrdDetsdwg] = useState([]);
  // let [ordDetsData, setOrdDetsData] = useState([]);
  // let [custdata, setCustdata] = useState([]);
  // let [mtrldata, setMtrldata] = useState([]);
  // let [procdata, setProcdata] = useState([]);
  // let [mtrlsrcdata, setMtrlSrcdata] = useState([]);
  // let [inspdata, setInspdata] = useState([]);
  // let [packdata, setPackdata] = useState([]);
  // let [salesExecdata, setSalesExecdata] = useState([]);
  // let [quotationno, setQuotationNo] = useState("");

  // let [selectedDwgId, setSelectedDwgId] = useState("");
  // let [gradeid, setGradeID] = useState("");
  // let [thickness, setThickness] = useState("");
  // let [specificwt, setSpecificWt] = useState(0);
  // let [grade, setGrade] = useState("");
  // let [material, setMaterial] = useState("");
  // let [lengthOfCut, setLengthOfCut] = useState(0);
  // let [noOfPierces, setNoofPierces] = useState(0);
  // let [partNetArea, setPartNetArea] = useState(0);
  // let [outOpen, setOutOpen] = useState(0);
  // let [complexity, setComplexity] = useState(0);
  // let [hasOpenContour, setHasOpenContour] = useState(0);
  // let [partNetWeight, setPartNetWeight] = useState(0);
  // let [partOutArea, setPartOutArea] = useState(0);
  // let [partOutWeight, setPartOutWeight] = useState(0);
  // let [rectArea, setRectArea] = useState(0);
  // let [rectWeight, setRectWeight] = useState(0);

  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  // let [formDealingEngineer, setFormDealingEngineer] = useState("");
  // let [dxffiledata, setDxfFileData] = useState("");
  // let [tolerancedata, setTolerancedata] = useState([]);
  // let [OrdSchData, setOrdSchData] = useState([]);
  // let [orderdetailsdata, setOrderDetailsData] = useState([]);

  // let [salesExecContact, setSalesExecContact] = useState("");
  // let [dealingEngineer, setDealingEngineer] = useState("");
  // let [receivedby, setReceivedBy] = useState("");
  // let [purchaseorder, setPurchaseOrder] = useState("");
  // let [custdwgfiles, setCustDwgFiles] = useState([]);
  // let [Dwg, setDwg] = useState([]);
  // //let [Image, setImage] = useState([]);
  // let [customername, setCustomer] = useState("");
  // let [recordedby, setRecordedby] = useState("");
  // let [deliveryDate, setDeliveryDate] = useState("");
  // let [custCode, setCustCode] = useState("");

  // // For Import Dwg
  // let [strprocess, setStrProcess] = useState("");
  // let [strmtrlcode, setStrMtrlCode] = useState("");
  // let [strtolerance, setStrTolerance] = useState("");
  // let [mtrlcode, setMtrlCode] = useState("");
  // let [strMaterial, setStrMaterial] = useState("");
  // let [strGrade, setStrGrade] = useState("");
  // let [decThick, setDecThick] = useState(0);
  // let [dblSpWt, setDblSpWt] = useState(0);
  // let [dblCuttingRate, setDblCuttingRate] = useState(0);
  // let [dblPierceRate, setDblPierceRate] = useState(0);
  // let [strInsp, setStrInsp] = useState("");
  // let [strPkng, setStrPkng] = useState("");
  // let [strSource, setStrSource] = useState("");
  // let [strMtrlGrade, setStrMtrlGrade] = useState("");
  // let [Qty, setQty] = useState(0);
  // let [FormOk, setFormOk] = useState(false);
  // let [valOK, setValOK] = useState(false);
  // let [TMd, setTMd] = useState([]);
  // let [mtrl, setMtrl] = useState([]);
  // let [bolMtrl, setBolMtrl] = useState(false);
  // let [bolOperation, setBolOperation] = useState(false);
  // let [bolSource, setBolSource] = useState(false);
  // let [bolInsp, setBolInsp] = useState(false);
  // let [bolPkng, setBolPkng] = useState(false);
  // let [bolTolerance, setBolTolerance] = useState(false);
  // let [bolQty, setBolQty] = useState(false);

  // // let Oformat = searchParams.get("OrdType");

  // const openModal = (e) => {
  //   e.preventDefault();
  //   setAlertModal(true);
  // };

  // const closeModal = () => {
  //   setAlertModal(false);
  // };

  // const openRegisterOrder = (e) => {
  //   e.preventDefault();
  //   setRegisterOrder(true);
  // };

  // const closeRegisterOrder = () => {
  //   setRegisterOrder(false);
  // };

  // let ordno = "";
  // useEffect(() => {
  //   //Console.log(orders);
  //   // //Console.log(orders.orderno);
  //   // //Console.log(orders.ordertype);
  //   // //Console.log(orders.paymentterms);
  //   async function fetchData() {
  //     setOrderno(orders.orderno);
  //     setOrderno(orders.orderno);
  //     setCustCode(orders.custcode);
  //     setOrdertype(orders.ordertype);
  //     // setDeliveryDate(deliverydate);
  //     setDeliveryDate(orders.deliverydate);
  //     // let SlsContact =orders.salesContact;
  //     // setReceivedBy(orders.receivedby);
  //     // setRecordedby(orders.RecordedBy);
  //     setPurchaseOrder(orders.purchaseorder);
  //     setQuotationNo(orders.qtnno);
  //     //Console.log(" Quote No : " + orders.qtnno);
  //     setCustCode(orders.custCode);
  //     postRequest(
  //       endpoints.getCustomerDets,
  //       { custcode: orders.custcode },
  //       (custdata) => {
  //         setCustomer(custdata[0]["Cust_name"]);
  //         setCustdata(custdata);
  //       }
  //     );

  //     await postRequest(endpoints.getSalesExecLists, {}, (sdata) => {
  //       //Console.log(sdata);
  //       setSalesExecdata(sdata);
  //     });
  //     await postRequest(
  //       endpoints.getSalesIndiExecLists,
  //       { salesContact: orders.salesContact },
  //       (sdata) => {
  //         //Console.log(sdata[0]["Name"]);
  //         setSalesExecContact(sdata[0]["Name"]);
  //       }
  //     );
  //     // await postRequest(endpoints.getSalesIndiExecLists, { salesContact: order.DealingEngineer }, (ddata) => {
  //     //     setDealingEngineer(ddata[0]["Name"]);
  //     // });
  //     await postRequest(
  //       endpoints.getSalesIndiExecLists,
  //       { salesContact: orders.RecordedBy },
  //       (recdata) => {
  //         setRecordedby(recdata[0]["Name"]);
  //       }
  //     );
  //     await postRequest(
  //       endpoints.getSalesIndiExecLists,
  //       { salesContact: orders.receivedby },
  //       (rcvddata) => {
  //         setReceivedBy(rcvddata[0]["Name"]);
  //       }
  //     );
  //     getRequest(endpoints.getMaterials, (mtrdata) => {
  //       //Console.log(mtrdata);
  //       setMtrldata(mtrdata);
  //     });
  //     getRequest(endpoints.getProcessLists, (pdata) => {
  //       setProcdata(pdata);
  //     });

  //     getRequest(endpoints.getToleranceTypes, (ttdata) => {
  //       setTolerancedata(ttdata);
  //     });
  //     getRequest(endpoints.getInspectionLevels, (ildata) => {
  //       setInspdata(ildata);
  //     });
  //     getRequest(endpoints.getPackingLevels, (pckdata) => {
  //       setPackdata(pckdata);
  //     });
  //   }
  //   fetchData();
  // }, []);

  // const [importdwgshow, setImportDwgShow] = useState(false);
  // const handleImportDwg = () => setImportDwgShow(true);
  // const handleCloseImportDwg = () => setImportDwgShow(false);

  // let selectItem = (item) => {
  //   setDwg(item);
  // };

  // let selectMtrl = async (e) => {
  //   console.log("entering into select Mtrl");
  //   e.preventDefault();
  //   const value = e.target.value;
  //   console.log("Select Material" + e.target.value);
  //   setStrMtrlCode(e.target.value);

  //   postRequest(
  //     endpoints.getmtrldetsbymtrlcode,
  //     { mtrlcode: e.target.value },
  //     (mtrldata) => {
  //       if (mtrldata.length > 0) {
  //         setThickness(mtrldata[0]["Thickness"]);
  //         setGradeID(mtrldata[0]["MtrlGradeID"]);
  //         setMaterial(mtrldata[0]["Mtrl_Type"]);
  //         setGrade(mtrldata[0]["Grade"]);
  //         setSpecificWt(mtrldata[0]["Specific_Wt"]);

  //         locCalc(
  //           window.dxffile,
  //           mtrldata[0]["Mtrl_Type"],
  //           mtrldata[0]["Grade"],
  //           mtrldata[0]["Thickness"],
  //           (output) => {}
  //         );
  //       }
  //     }
  //   );
  // };

  // let selectProc = async (e) => {
  //   e.preventDefault();
  //   console.log(e.target.value);
  // };
  // let selectInsp = async (e) => {
  //   e.preventDefault();
  //   console.log(e.target.value);
  // };

  // let selectPack = async (e) => {
  //   e.preventDefault();
  //   console.log(e.target.value);
  // };

  // let selectTolerance = (e) => {
  //   e.preventDefault();
  //   console.log(e.target.value);
  //   let toltype;
  //   for (let i = 0; i < tolerancedata.length; i++) {
  //     if (tolerancedata[i]["ToleranceType"] === e.target.value) {
  //       toltype = tolerancedata[i];
  //       break;
  //     }
  //   }
  //   setStrTolerance(e.target.value);
  // };
  // let selectMtrlSrc = async (e) => {
  //   e.preventDefault();
  //   console.log(e.target.value);
  // };

  // let locCalc = async (drwfile, material, grade, thickness, cb) => {
  //   const formData = new FormData();
  //   //  window.dxffiles.forEach(async (dfile) => {
  //   formData.append("file", drwfile); //files[i]);
  //   formData.append("thickness", thickness);
  //   formData.append("specficWeight", specificwt); // resp[0].Specific_Wt);
  //   //  setSpecificWt(resp[0].Specific_Wt);
  //   //Console.log("Sending to Service");
  //   // const getCalcReq = await fetch('http://127.0.0.1:21341/getCalc', {
  //   const getCalcReq = await fetch("http://localhost:21341/getCalc", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //     },
  //     body: formData,
  //   });
  //   const res = await getCalcReq.json();
  //   //   const data = await res.json();
  //   //    //Console.log("Get Calc Response");
  //   //Console.log(res.data);
  //   //Console.log(res.data.partOutArea);

  //   setLengthOfCut(res.data.lengthOfCut);
  //   setNoofPierces(res.data.noOfPierces);
  //   setPartNetArea(res.data.partNetArea);
  //   setOutOpen(res.data.outOpen);
  //   setComplexity(res.data.complexity);
  //   setHasOpenContour(res.data.hasOpenContour);
  //   setPartNetWeight(res.data.partNetWeight);
  //   setPartOutArea(res.data.partOutArea);
  //   setPartOutWeight(res.data.partOutWeight);
  //   setRectArea(res.data.rectArea);
  //   setRectWeight(res.data.rectWeight);
  //   //  setSpecificWt(res.Specific_Wt)
  //   cb({
  //     lengthOfCut: res.data.lengthOfCut,
  //     noOfPierces: res.data.noOfPierces,
  //     partNetArea: res.data.partNetArea,
  //     complexity: res.data.complexity,
  //     hasOpenContour: res.data.hasOpenContour,
  //     outOpen: res.data.outOpen,
  //     partNetWeight: res.data.partNetWeight,
  //     partOutArea: res.data.partOutArea,
  //     partOutWeight: res.data.partOutWeight,
  //     rectArea: res.data.rectArea,
  //     rectWeight: res.data.rectWeight,
  //   });
  //   //, spWeight: res.data.Specific_Wt
  //   // setQtnProfileData((olddata) => [...olddata, { file: files[i], operation: process, material, grade, thickness, quantity, materialcode,loc }]);
  //   //});
  // };

  // async function dxfupload(files, destPath, response) {
  //   const data = new FormData();
  //   //Console.log(files);
  //   for (let i = 0; i < files.length; i++) {
  //     data.append("files", files[i]);
  //   }
  //   //Console.log(data);
  //   let API = "http://localhost:6001";
  //   const rawResponse = await fetch(`${API}/file/uploaddxf`, {
  //     method: "POST",
  //     headers: {
  //       Accept: "multipart/form-data",
  //       destinationPath: destPath,
  //       // 'Content-Type': 'multipart/form-data'
  //     },
  //     body: data,
  //   });
  //   const content = await rawResponse.json();
  //   response(content);
  // }

  // let importdrawings = async (e) => {
  //   e.preventDefault();
  //   //Console.log("Import Drawings");

  //   if (!(orderStatus === "Created" || orderStatus === "Recorded")) {
  //     alert("Cannot import after the Order is recorded");
  //     return;
  //   }

  //   ////Console.log(document.getElementById("mtrlcode").value);
  //   // let materialcode = mtrlcode; //e.target.elements.mtrlcode.value;
  //   let materialcode = strmtrlcode;
  //   //Console.log("materialcode", materialcode);
  //   let process = strprocess; //e.target.elements.processdescription.value;
  //   let quantity = quantity; // e.target.elements.quantity.value;
  //   let materialsource = strSource; // e.target.elements.materialsource.value;
  //   let tolerance = strtolerance; // e.target.elements.tolerance.value;
  //   let insplevel = strInsp; // e.target.elements.insplevel.value;
  //   let packinglevel = strPkng; // e.target.elements.packinglevel.value;
  //   let files = e.target.elements.files.files;
  //   setDblCuttingRate(dblCuttingRate);
  //   setDblPierceRate(dblPierceRate);

  //   for (let i = 0; i < files.length; i++) {
  //     //Console.log(files[i]);
  //     let drwfname = files[i];

  //     //Console.log(drwfname);
  //     locCalc(drwfname, material, grade, thickness, (output) => {
  //       //Console.log(output);
  //       //   //Console.log("Qtn Profile Data : ", typeof qtnProfileData);

  //       let olddata = Object.entries(orderdetailsdata).map(([key, value]) => ({
  //         key,
  //         value,
  //       }));
  //       //  let olddata = [...qtnProfileData];

  //       //Console.log("Old Data : " + olddata);
  //       if (olddata === null || olddata === undefined) {
  //         // Handle the case where olddata is null
  //         return;
  //       } else {
  //         setOrderDetailsData((olddata) => {
  //           // Append to existing olddata
  //           return [
  //             ...olddata,
  //             {
  //               file: files[i],
  //               operation: process,
  //               material,
  //               grade,
  //               thickness,
  //               quantity,
  //               mtrlcode,
  //               lengthOfCut: output.lengthOfCut,
  //               noOfPierces: output.noOfPierces, // ? 1 : 0,
  //               partNetArea: output.partNetArea,
  //               complexity: output.complexity,
  //               hasOpenContour: output.hasOpenContour,
  //               outOpen: output.outOpen,
  //               partNetWeight: output.partNetWeight,
  //               partOutArea: output.partOutArea,
  //               partOutWeight: output.partOutWeight,
  //               rectArea: output.rectArea,
  //               rectWeight: output.rectWeight,
  //             },
  //           ];
  //         });
  //       }
  //     });

  //     //  let LOC = parseFloat(CuttingLength * 0.001).tofixed(2)
  //     //  let Holes = PierceCount

  //     //  let JWCost = Math.Round(LOC * dblCuttingRate + Holes * dblPierceRate, 0)
  //     // .MtrlCost = 0
  //     // .delivery_date = DateTimePicker_DelDate.Value.ToString
  //   }

  //   // let qno = quotationNo.replaceAll("/", "_");
  //   // let month = qno.split("_")[1]
  //   // let monthName = ["January", "Febraury", "March", "April", "May", "June",
  //   //     "July", "August", "September", "October", "November", "December"][parseInt(month) - 1]

  //   let destPath = `\\Wo\\` + Orderno + "\\DXF\\"; //quotationNo;

  //   dxfupload(files, destPath, (res) => {
  //     //Console.log(res);
  //   });

  //   window.dxffiles = files;
  //   //Console.log(
  //   //   materialcode,
  //   //   material,
  //   //   grade,
  //   //   thickness,
  //   //   process,
  //   //   quantity,
  //   //   files
  //   // );
  //   setShow(false);
  // };

  return (
    <>
      <div>
        <FormHeader OrderData={OrderData} OrderCustData={OrderCustData} />

        <Tabs defaultActiveKey="orderinfo" id="uncontrolled-tab-example">
          <Tab eventKey="orderinfo" title="Order Info">
            <OrderInfo OrderData={OrderData} />
          </Tab>
          <Tab
            eventKey="productionschedulecreation"
            title="Production Schedule Creation"
          >
            <ProductionScheduleCreation OrderData={OrderData} />
          </Tab>
          <Tab eventKey="findoldpart" title="Find Old Part">
            <FindOldPart OrderData={OrderData} />
          </Tab>
          <Tab eventKey="materialinfo" title="Material Info">
            <MaterialInfo OrderData={OrderData} />
          </Tab>
        </Tabs>
        <div className="mt-5">
          <Tabs>
            <Tab eventKey="orderdetails" title="Order Details">
              <OrderDetails OrderData={OrderData} />
            </Tab>
            <Tab eventKey="scheduleList" title="Schedule List">
              <ScheduleList OrderData={OrderData} />
            </Tab>
            <Tab eventKey="profarmaInvoiceList" title="Profarma Invoice List">
              <ProfarmaInvoiceList OrderData={OrderData} />
            </Tab>
            {props.Type === "Profile" ? (
              <Tab eventKey="materialPlanner" title="Material Planner">
                <MaterialPlanner OrderData={OrderData} />
              </Tab>
            ) : null}
          </Tabs>
        </div>

        {/* <AlertModal
        show={alertModal}
        onHide={(e) => setAlertModal(e)}
        firstbutton={closeModal}
        title="magod_Order"
        message="Record Saved"
        firstbuttontext="Ok"
      /> */}

        {/* <AlertModal
        show={registerOrder}
        onHide={(e) => setRegisterOrder(e)}
        firstbutton={closeRegisterOrder}
        secondbutton={closeRegisterOrder}
        title="magod_Order"
        message="You can add New Serials, Change Quantity and Rates once you register an Open Order. Continue ?"
        firstbuttontext="Yes"
        secondbuttontext="No"
      /> */}
      </div>
    </>
  );
}

// {/* Import Drawings */}

// <div className="row mt-1" style={{ maxHeight: "600px" }}>
//   <Modal show={importdwgshow}>
//     <Modal.Header
//       className="justify-content-md-center"
//       style={{
//         paddingTop: "10px",
//         backgroundColor: "#283E81",
//         color: "#ffffff",
//       }}
//     >
//       <Modal.Title>Enter Default Parameters for Import</Modal.Title>
//     </Modal.Header>
//     <Modal.Body>
//       <div className="form-style">
//         <Form onSubmit={importdrawings} style={{ overflowY: "scroll" }}>
//           <div className="row mb-1">
//             <div className="col">
//               <div className="row">
//                 <Form.Group controlId="strmtrlcode">
//                   <div className="md-col-2">
//                     <Form.Label className="form-label">
//                       Material Code
//                     </Form.Label>
//                     {mtrldata.length > 0 || mtrldata != null ? (
//                       <Typeahead
//                         id="basic-example"
//                         labelKey="Mtrl_Code"
//                         onChange={selectMtrl}
//                         selected={strmtrlcode}
//                         options={mtrldata}
//                         placeholder="Choose a Material..."
//                       ></Typeahead>
//                     ) : (
//                       ""
//                     )}
//                   </div>
//                 </Form.Group>
//               </div>
//               <div className="row mt-1">
//                 <Form.Group controlId="strprocess">
//                   <div className="md-col-4">
//                     <label className="form-label">Process</label>
//                     {procdata.length > 0 ? (
//                       <select
//                         className="ip-select"
//                         id="strprocess"
//                         onChange={selectProc}
//                       >
//                         <option value="" disabled selected>
//                           ** Select **
//                         </option>
//                         {procdata.map((proc) => {
//                           return (
//                             <option value={proc["ProcessDescription"]}>
//                               {proc["ProcessDescription"]}
//                             </option>
//                           );
//                         })}
//                       </select>
//                     ) : (
//                       ""
//                     )}
//                   </div>
//                 </Form.Group>
//               </div>
//               <div className="row mt-1">
//                 <Form.Group controlId="source">
//                   <div className="md-col-4">
//                     <label className="form-label">Source</label>
//                     <select
//                       className="ip-select"
//                       id="strsource"
//                       onChange={selectMtrlSrc}
//                     >
//                       <option value="" disabled selected>
//                         ** Select **
//                       </option>
//                       <option value={"Customer"}>Customer</option>
//                       <option value={"Magod"}>Magod</option>
//                     </select>
//                   </div>
//                 </Form.Group>
//               </div>

//               <div className="row mt-1">
//                 <div className="md-col-4">
//                   <label className="form-label">Tolerance</label>
//                   {tolerancedata.length > 0 ? (
//                     <select
//                       className="ip-select"
//                       id="strtolerance"
//                       onChange={selectTolerance}
//                     >
//                       <option value="" disabled selected>
//                         ** Select **
//                       </option>
//                       {tolerancedata.map((toltype) => {
//                         return (
//                           <option value={toltype["ToleranceType"]}>
//                             {toltype["ToleranceType"]}
//                           </option>
//                         );
//                       })}
//                     </select>
//                   ) : (
//                     ""
//                   )}
//                 </div>
//               </div>

//               <div className="row mt-1">
//                 <div className="md-col-4">
//                   <label className="form-label">Insp Level</label>
//                   {inspdata.length > 0 ? (
//                     <select
//                       id="strinsp"
//                       className="ip-select"
//                       onChange={selectInsp}
//                     >
//                       <option value="" disabled selected>
//                         ** Select **
//                       </option>
//                       {inspdata.map((insplvl) => {
//                         return (
//                           <option value={insplvl["InspLevel"]}>
//                             {insplvl["InspLevel"]}
//                           </option>
//                         );
//                       })}
//                     </select>
//                   ) : (
//                     ""
//                   )}
//                 </div>
//               </div>
//               <div className="row mt-1">
//                 <div className="md-col-4">
//                   <label className="form-label">Packing Level</label>
//                   {packdata.length > 0 ? (
//                     <select
//                       id="strpkng"
//                       className="ip-select"
//                       onChange={selectPack}
//                     >
//                       <option value="" disabled selected>
//                         ** Select **
//                       </option>
//                       {packdata.map((packlvl) => {
//                         return (
//                           <option value={packlvl["PkngLevel"]}>
//                             {packlvl["PkngLevel"]}
//                           </option>
//                         );
//                       })}
//                     </select>
//                   ) : (
//                     ""
//                   )}
//                 </div>
//               </div>

//               <div className="row mt-1">
//                 <div className="md-col-4">
//                   <label className="form-label">Quantity </label>
//                   <input type="text" id="Qty" />
//                 </div>
//               </div>
//               <div className="row">
//                 <Form.Group controlId="rates">
//                   <div className="md-col-4">
//                     <Form.Label className="form-label">Rate </Form.Label>
//                   </div>
//                   <div className="md-col-4">
//                     <div className="row">
//                       <Form.Label className="form-label">
//                         Cutting{" "}
//                       </Form.Label>
//                       <input type="text" id="dblCuttingRate" />
//                       {/* </div>
//                                               <div className="row"> */}
//                       <Form.Label className="form-label">
//                         Piercing{" "}
//                       </Form.Label>
//                       <input type="text" id="dblPierceRate" />
//                     </div>
//                   </div>
//                 </Form.Group>
//               </div>
//               <div className="row mt-1">
//                 <Form.Group controlId="files">
//                   <div className="md-col-4">
//                     <Form.Label className="form-label">
//                       Select Files{" "}
//                     </Form.Label>
//                     <Form.Control
//                       type="file"
//                       multiple="multiple"
//                       accept=".dxf"
//                     />
//                   </div>
//                 </Form.Group>
//               </div>
//               <div className="row mt-2">
//                 <div className="col">
//                   <button
//                     className="button-style"
//                     type="submit"
//                     style={{ width: "120px" }}
//                   >
//                     Ok
//                   </button>
//                 </div>
//                 <div className="col">
//                   <button
//                     className="button-style"
//                     style={{ width: "120px" }}
//                     variant="secondary"
//                     // onClick={() => handleCloseImportDwg()}
//                   >
//                     Close
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </Form>
//       </div>
//     </Modal.Body>
//   </Modal>
// </div>
