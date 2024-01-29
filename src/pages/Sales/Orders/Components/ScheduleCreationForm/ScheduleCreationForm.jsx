import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

export default function ScheduleCreationForm(props) {
  return (
    <>
      <div>
        <FormHeader />

        <Tabs defaultActiveKey="orderinfo" id="uncontrolled-tab-example">
          <Tab eventKey="orderinfo" title="Order Info">
            <OrderInfo />
          </Tab>
          <Tab
            eventKey="productionschedulecreation"
            title="Production Schedule Creation"
          >
            <ProductionScheduleCreation />
          </Tab>
          <Tab eventKey="findoldpart" title="Find Old Part">
            <FindOldPart />
          </Tab>
          <Tab eventKey="materialinfo" title="Material Info">
            <MaterialInfo />
          </Tab>
        </Tabs>
        <div className="mt-5">
          <Tabs>
            <Tab eventKey="orderdetails" title="Order Details">
              <OrderDetails />
            </Tab>
            <Tab eventKey="scheduleList" title="Schedule List">
              <ScheduleList />
            </Tab>
            <Tab eventKey="profarmaInvoiceList" title="Profarma Invoice List">
              <ProfarmaInvoiceList />
            </Tab>
            {props.Type === "Profile" ? (
              <Tab eventKey="materialPlanner" title="Material Planner">
                <MaterialPlanner />
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
