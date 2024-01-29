// import React from 'react'
// import { Table } from 'react-bootstrap'
// import { Link } from 'react-router-dom'

// export default function InternalCompleted() {
//   return (
//     <div>
//       <div className="row">
//         <h4 className="title">Internal Order List : Profile - Completed</h4>
//       </div>
//       <div className="row mt-2">
//         <div className="col-md-2 sm-12">
//           <h5>Task Pane</h5>
//           <div className="row">
//             <div className="col-md-6 sm-4">
//               <button className="button-style" style={{ width: "120px" }}>
//                 Open Order
//               </button>
//             </div>
//           </div>
//           <div className="row">
//             <div className="col-md-6 sm-4 mt-1">
//               <button className="button-style" style={{ width: "120px" }}>
//                 Exit
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="col-md-10 sm-12">
//           <h5>Search Order List</h5>
//           <div className="row">
//             <div className="col-md-6 sm-12">
//               <div className="row">
//                 <div className="col-md-4 sm-12">
//                   <label className="form-label">Customer</label>
//                 </div>
//                 <div className="col-md-8 sm-12">
//                   <select className="ip-select">
//                     <option>Option 1</option>
//                     <option>Option 2</option>
//                     <option>Option 3</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="row mt-2">
//                 <div
//                   className="col-md-6 sm-12"
//                   style={{ whiteSpace: "nowrap" }}
//                 >
//                   <label className="form-label">Order Type</label>
//                   <div className="mt-2">
//                     <div class="form-check form-check-inline">
//                       <input
//                         class="form-check-input"
//                         type="radio"
//                         name="inlineRadioOptions"
//                         id="inlineRadio1"
//                         value="Complete"
//                         style={{ marginTop: "12px" }}
//                       />
//                       <label class="form-check-label" for="inlineRadio1">
//                         Complete
//                       </label>
//                     </div>
//                     <div class="form-check form-check-inline">
//                       <input
//                         class="form-check-input"
//                         type="radio"
//                         name="inlineRadioOptions"
//                         id="inlineRadio2"
//                         value="Scheduled"
//                         style={{ marginTop: "12px" }}
//                       />
//                       <label class="form-check-label" for="inlineRadio2">
//                         Scheduled
//                       </label>
//                     </div>
//                     <div class="form-check form-check-inline">
//                       <input
//                         class="form-check-input"
//                         type="radio"
//                         name="inlineRadioOptions"
//                         id="inlineRadio3"
//                         value="Open"
//                         style={{ marginTop: "12px" }}
//                       />
//                       <label class="form-check-label" for="inlineRadio3">
//                         Open
//                       </label>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-6 sm-12">
//               <div className="row">
//                 <div className="col-md-4 sm-12">
//                   <label className="form-label">Order Status</label>
//                 </div>
//                 <div className="col-md-8 sm-12 ">
//                   <select className="ip-select">
//                     <option>Option 1</option>
//                     <option>Option 2</option>
//                     <option>Option 3</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="row mt-2">
//                 <div className="col-md-4 sm-12 mt-3">
//                   <button className="button-style" style={{ width: "120px" }}>
//                     Clear Filter
//                   </button>
//                 </div>
//                 <div className="col-md-4 sm-12 mt-3">
//                   <Link to={"/Orders"}><button className="button-style" style={{ width: "120px" }}>
//                     Close
//                   </button></Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="mt-3" style={{ overflowY: "scroll" }}>
//               <Table
//                 striped
//                 className="table-data border"
//                 style={{ border: "1px" }}
//               >
//                 <thead className="tableHeaderBGColor">
//                   <tr>
//                     <th>Status</th>
//                     <th>Order No</th>
//                     <th>Date</th>
//                     <th>Customer</th>
//                     <th>Delivery Date</th>
//                     <th>Contact Name</th>
//                     <th>PO No</th>
//                     <th>Special Instructions</th>
//                   </tr>
//                 </thead>

//                 <tbody className="tablebody"></tbody>
//               </Table>
//             </div>
//     </div>
//   )
// }

import React, { useState } from "react";
import InternalCompleted from "../../ZComponents/InternalCompleted";
function IntCompleted(props) {
  const [ProfileType, setProfileType] = useState("Profile");
  return (
    <div>
      <InternalCompleted Type={ProfileType} />
    </div>
  );
}

export default IntCompleted;
