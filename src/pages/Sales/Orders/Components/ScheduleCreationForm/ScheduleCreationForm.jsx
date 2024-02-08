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
  console.log("props", props);

  // //console.log("location...", location?.state);

  const [orderNo, setorderNo] = useState(location?.state);
  const [OrderData, setOrderData] = useState({});
  const [OrderCustData, setOrderCustData] = useState({});
  const [OrdrDetailsData, setOrdrDetailsData] = useState([]);

  const [profarmaInvMain, setProfarmaInvMain] = useState([]);
  const [profarmaInvDetails, setProfarmaInvDetails] = useState([]);

  // console.log("order no", orderNo);
  // console.log("OrderCustData.Cust_Code", OrderCustData.Cust_Code);

  //console.log("props", props.Type);

  const fetchData = () => {
    postRequest(
      endpoints.getOrderDetailsByOrdrNoAndType,
      { orderNo: orderNo, orderType: props.Type },
      (orderData) => {
        //console.log("orderData.....", orderData);
        setOrderData(orderData.orderData[0]);
        setOrderCustData(orderData.custData[0]);
      }
    );
    postRequest(
      endpoints.PostNewSrlData,
      { custcode: OrderCustData.Cust_Code, OrderNo: orderNo },
      (ordrdtlsdata) => {
        // console.log("ordrdtlsdata", ordrdtlsdata);
        setOrdrDetailsData(ordrdtlsdata);
      }
    );
    postRequest(
      endpoints.getProfarmaMain,
      { OrderNo: orderNo },
      (profarmaMainData) => {
        // console.log("profarmaMainData", profarmaMainData);

        setProfarmaInvMain(profarmaMainData);
        // console.log("ordrdtlsdata", ordrdtlsdata);
        // setOrdrDetailsData(ordrdtlsdata);
      }
    );
    postRequest(
      endpoints.getProfarmaDetails,
      { OrderNo: orderNo },
      (profarmaDetailsData) => {
        // console.log("profarmaDetailsData", profarmaDetailsData);

        setProfarmaInvDetails(profarmaDetailsData);
        // console.log("ordrdtlsdata", ordrdtlsdata);
        // setOrdrDetailsData(ordrdtlsdata);
      }
    );
  };

  // console.log("OrdrDetailsData", OrdrDetailsData);

  useEffect(() => {
    fetchData();
  }, []);

  const [selectedItems, setSelectedItems] = useState([]);

  const selectItem = (OrdrDetailsItem) => {
    const isSelected = selectedItems.includes(OrdrDetailsItem);

    // Use the callback function to log the updated state after the update
    setSelectedItems((prevSelectedItems) => {
      const updatedSelectedItems = isSelected
        ? prevSelectedItems.filter((item) => item !== OrdrDetailsItem)
        : [...prevSelectedItems, OrdrDetailsItem];

      // Log the updated state
      console.log("Selected Order details Rows:", updatedSelectedItems);

      return updatedSelectedItems;
    });
  };

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
              <OrderDetails
                OrderData={OrderData}
                OrderCustData={OrderCustData}
                OrdrDetailsData={OrdrDetailsData}
                selectedItems={selectedItems}
                selectItem={selectItem}
              />
            </Tab>
            <Tab eventKey="scheduleList" title="Schedule List">
              <ScheduleList OrderData={OrderData} />
            </Tab>
            <Tab eventKey="profarmaInvoiceList" title="Profarma Invoice List">
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
