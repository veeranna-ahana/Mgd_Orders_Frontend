// import { React, useState, useEffect } from "react";
// import { Tab, Table, Tabs, Form, Modal } from "react-bootstrap";

// function OrdrTable(props) {
//   const {
//     OrderData,
//     OrderCustData,
//     OrdrDetailsData,
//     selectedItems,
//     selectItem,
//     setDetailsColour,
//     calculateMinSrlStatus,
//     updateOrderStatus,
//     getStatusText,
//   } = props;

//   useEffect(() => {
//     // Call setDetailsColour after OrdrDetailsData changes
//     setDetailsColour();
//   }, [OrdrDetailsData]); // Run this effect whenever OrdrDetailsData changes

//   console.log("OrderData", OrderData);

//   // Function to determine background color based on conditions
//   const getRowBackgroundColor = (order) => {
//     if (order.Qty_Ordered === 0) return "lavender";
//     else if (order.QtyDelivered >= order.Qty_Ordered) return "lightgreen";
//     else if (order.QtyDelivered > 0 && order.QtyPacked >= order.Qty_Ordered)
//       return "orange";
//     else if (order.QtyPacked >= order.Qty_Ordered) return "lightgreen";
//     else if (order.QtyPacked > 0 && order.QtyProduced >= order.Qty_Ordered)
//       return "greenyellow";
//     else if (order.QtyProduced >= order.Qty_Ordered) return "yellow";
//     else if (order.QtyProduced > 0 && order.QtyScheduled >= order.Qty_Ordered)
//       return "greenyellow";
//     else if (order.QtyScheduled >= order.Qty_Ordered) return "lightyellow";
//     else if (order.QtyScheduled > 0) return "lightcoral";
//     else return "lightblue";
//   };

//   return (
//     <div style={{ overflow: "auto", height: "480px" }}>
//       <Table className="table-data border" style={{ border: "1px" }}>
//         <thead
//           className="tableHeaderBGColor"
//           style={{
//             textAlign: "center",
//             position: "sticky",
//             top: "-1px",
//             whiteSpace: "nowrap",
//           }}
//         >
//           <tr>
//             <th>Drawing/Part Name</th>
//             {props.OrderData?.Type === "Profile" ? (
//               <th style={{ whiteSpace: "nowrap" }}>Dwg Exists</th>
//             ) : null}{" "}
//             <th>Material</th>
//             <th>Operation</th>
//             <th>Source</th>
//             <th>Insp Level</th>
//             <th>Tolerance</th>
//             <th>Packing Level</th>
//             {/* <th>LOC</th> */}
//             {/* <th>Pierces</th> */}
//             <th>JW Cost</th>
//             <th>Mtrl Cost</th>
//             <th>Unit Rate</th>
//             <th>Qty Ordered</th>
//             <th>Total</th>
//           </tr>
//         </thead>
//         <tbody style={{ textAlign: "center" }}>
//           {OrdrDetailsData.map((OrdrDetailsItem, i) => {
//             const isSelected = selectedItems?.includes(OrdrDetailsItem);
//             const backgroundColor = getRowBackgroundColor(OrdrDetailsItem);
//             return (
//               <tr
//                 key={i}
//                 onClick={() => selectItem(OrdrDetailsItem)}
//                 style={{
//                   cursor: "pointer",
//                   backgroundColor: isSelected ? "#98a8f8" : backgroundColor,
//                 }}
//                 // key={order.id}
//                 className="order-details-row"
//                 data-srlstatus={OrdrDetailsItem.SrlStatus}
//               >
//                 <td>{OrdrDetailsItem.DwgName}</td>
//                 {props.OrderData?.Type === "Profile" ? (
//                   <td>
//                     <Form.Check type="checkbox" id="selected" />
//                   </td>
//                 ) : null}
//                 <td>{OrdrDetailsItem.Mtrl_Code}</td>
//                 <td>{OrdrDetailsItem.Operation}</td>
//                 <td>{OrdrDetailsItem.Mtrl_Source}</td>
//                 <td>{OrdrDetailsItem.InspLevel}</td>
//                 <td>{OrdrDetailsItem.tolerance}</td>
//                 <td>{OrdrDetailsItem.PackingLevel}</td>
//                 {/* <td>{OrdrDetailsItem.LOC}</td> */}
//                 {/* <td>{OrdrDetailsItem.Holes}</td> */}
//                 <td>{OrdrDetailsItem.JWCost}</td>
//                 <td>{OrdrDetailsItem.MtrlCost}</td>
//                 <td>{OrdrDetailsItem.UnitPrice}</td>
//                 <td>{OrdrDetailsItem.Qty_Ordered}</td>
//                 <td>{OrdrDetailsItem.Total}</td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </Table>
//     </div>
//   );
// }

// export default OrdrTable;
// import { React, useState, useEffect } from "react";
// import { Tab, Table, Tabs, Form, Modal } from "react-bootstrap";

// function OrdrTable(props) {
//   const {
//     OrderData,
//     OrderCustData,
//     OrdrDetailsData,
//     selectedItems,
//     selectItem,
//     setDetailsColour,
//     calculateMinSrlStatus,
//     updateOrderStatus,
//     getStatusText,
//   } = props;

//   useEffect(() => {
//     // Call setDetailsColour after OrdrDetailsData changes
//     setDetailsColour();
//   }, [OrdrDetailsData]); // Run this effect whenever OrdrDetailsData changes

//   console.log("OrderData", OrderData);

//   // Function to determine background color based on conditions
//   const getRowBackgroundColor = (order) => {
//     if (order.Qty_Ordered === 0) return "lavender";
//     else if (order.QtyDelivered >= order.Qty_Ordered) return "lightgreen";
//     else if (order.QtyDelivered > 0 && order.QtyPacked >= order.Qty_Ordered)
//       return "orange";
//     else if (order.QtyPacked >= order.Qty_Ordered) return "lightgreen";
//     else if (order.QtyPacked > 0 && order.QtyProduced >= order.Qty_Ordered)
//       return "greenyellow";
//     else if (order.QtyProduced >= order.Qty_Ordered) return "yellow";
//     else if (order.QtyProduced > 0 && order.QtyScheduled >= order.Qty_Ordered)
//       return "greenyellow";
//     else if (order.QtyScheduled >= order.Qty_Ordered) return "lightyellow";
//     else if (order.QtyScheduled > 0) return "lightcoral";
//     else return "lightblue";
//   };

//   return (
//     <div style={{ overflow: "auto", height: "480px" }}>
//       <Table striped bordered hover className="table-data border">
//         <thead
//           className="tableHeaderBGColor"
//           style={{
//             textAlign: "center",
//             position: "sticky",
//             top: "-1px",
//             whiteSpace: "nowrap",
//           }}
//         >
//           <tr>
//             <th>Drawing/Part Name</th>
//             {props.OrderData?.Type === "Profile" ? (
//               <th style={{ whiteSpace: "nowrap" }}>Dwg Exists</th>
//             ) : null}{" "}
//             <th>Material</th>
//             <th>Operation</th>
//             <th>Source</th>
//             <th>Insp Level</th>
//             <th>Tolerance</th>
//             <th>Packing Level</th>
//             {/* <th>LOC</th> */}
//             {/* <th>Pierces</th> */}
//             <th>JW Cost</th>
//             <th>Mtrl Cost</th>
//             <th>Unit Rate</th>
//             <th>Qty Ordered</th>
//             <th>Total</th>
//           </tr>
//         </thead>
//         <tbody style={{ textAlign: "center" }}>
//           {OrdrDetailsData.map((OrdrDetailsItem, i) => {
//             const isSelected = selectedItems?.includes(OrdrDetailsItem);
//             const backgroundColor = getRowBackgroundColor(OrdrDetailsItem);
//             return (
//               <tr
//                 key={i}
//                 onClick={() => selectItem(OrdrDetailsItem)}
//                 style={{
//                   cursor: "pointer",
//                   backgroundColor: isSelected ? "#98a8f8" : backgroundColor,
//                 }}
//                 // key={order.id}
//                 className="order-details-row"
//                 data-srlstatus={OrdrDetailsItem.SrlStatus}
//               >
//                 <td>{OrdrDetailsItem.DwgName}</td>
//                 {props.OrderData?.Type === "Profile" ? (
//                   <td>
//                     <Form.Check type="checkbox" id="selected" />
//                   </td>
//                 ) : null}
//                 <td>{OrdrDetailsItem.Mtrl_Code}</td>
//                 <td>{OrdrDetailsItem.Operation}</td>
//                 <td>{OrdrDetailsItem.Mtrl_Source}</td>
//                 <td>{OrdrDetailsItem.InspLevel}</td>
//                 <td>{OrdrDetailsItem.tolerance}</td>
//                 <td>{OrdrDetailsItem.PackingLevel}</td>
//                 {/* <td>{OrdrDetailsItem.LOC}</td> */}
//                 {/* <td>{OrdrDetailsItem.Holes}</td> */}
//                 <td>{OrdrDetailsItem.JWCost}</td>
//                 <td>{OrdrDetailsItem.MtrlCost}</td>
//                 <td>{OrdrDetailsItem.UnitPrice}</td>
//                 <td>{OrdrDetailsItem.Qty_Ordered}</td>
//                 <td>{OrdrDetailsItem.Total}</td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </Table>
//     </div>
//   );
// }

// export default OrdrTable;

import { React, useState, useEffect } from "react";
import { Tab, Table, Tabs, Form, Modal } from "react-bootstrap";

function OrdrTable(props) {
  const {
    OrderData,
    OrderCustData,
    OrdrDetailsData,
    selectedItems,
    selectItem,
    setDetailsColour,
    calculateMinSrlStatus,
    updateOrderStatus,
    getStatusText,
  } = props;

  useEffect(() => {
    // Call setDetailsColour after OrdrDetailsData changes
    setDetailsColour();
  }, [OrdrDetailsData]); // Run this effect whenever OrdrDetailsData changes

  console.log("OrderData", OrderData);

  // Function to determine background color based on conditions
  const getRowBackgroundColor = (order) => {
    if (order.Qty_Ordered === 0) return "lavender";
    else if (order.QtyDelivered >= order.Qty_Ordered) return "lightgreen";
    else if (order.QtyDelivered > 0 && order.QtyPacked >= order.Qty_Ordered)
      return "orange";
    else if (order.QtyPacked >= order.Qty_Ordered) return "lightgreen";
    else if (order.QtyPacked > 0 && order.QtyProduced >= order.Qty_Ordered)
      return "greenyellow";
    else if (order.QtyProduced >= order.Qty_Ordered) return "yellow";
    else if (order.QtyProduced > 0 && order.QtyScheduled >= order.Qty_Ordered)
      return "greenyellow";
    else if (order.QtyScheduled >= order.Qty_Ordered) return "lightyellow";
    else if (order.QtyScheduled > 0) return "lightcoral";
    else return "lightblue";
  };

  return (
    <div style={{ overflow: "auto", height: "480px" }}>
      <Table bordered hover className="table-data border">
        <thead
          className="tableHeaderBGColor"
          style={{
            textAlign: "center",
            position: "sticky",
            top: "-1px",
            whiteSpace: "nowrap",
          }}
        >
          <tr>
            <th>Drawing/Part Name</th>
            {props.OrderData?.Type === "Profile" ? (
              <th style={{ whiteSpace: "nowrap" }}>Dwg Exists</th>
            ) : null}{" "}
            <th>Material</th>
            <th>Operation</th>
            <th>Source</th>
            <th>Insp Level</th>
            <th>Tolerance</th>
            <th>Packing Level</th>
            {/* <th>LOC</th> */}
            {/* <th>Pierces</th> */}
            <th>JW Cost</th>
            <th th>Mtrl Cost</th>
            <th>Unit Rate</th>
            <th>Qty Ordered</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody style={{ textAlign: "center" }}>
          {OrdrDetailsData.map((OrdrDetailsItem, i) => {
            const backgroundColor = getRowBackgroundColor(OrdrDetailsItem);
            return (
              <tr
                key={i}
                onClick={() => selectItem(OrdrDetailsItem)}
                style={{
                  cursor: "pointer",
                  backgroundColor: selectedItems?.includes(OrdrDetailsItem)
                    ? "#98a8f8"
                    : backgroundColor,
                }}
                // className="order-details-row"

                data-srlstatus={OrdrDetailsItem.SrlStatus}
              >
                <td>{OrdrDetailsItem.DwgName}</td>
                {props.OrderData?.Type === "Profile" ? (
                  <td>
                    <Form.Check type="checkbox" id="selected" />
                  </td>
                ) : null}
                <td>{OrdrDetailsItem.Mtrl_Code}</td>
                <td>{OrdrDetailsItem.Operation}</td>
                <td>{OrdrDetailsItem.Mtrl_Source}</td>
                <td>{OrdrDetailsItem.InspLevel}</td>
                <td>{OrdrDetailsItem.tolerance}</td>
                <td>{OrdrDetailsItem.PackingLevel}</td>
                {/* <td>{OrdrDetailsItem.LOC}</td> */}
                {/* <td>{OrdrDetailsItem.Holes}</td> */}
                <td>{OrdrDetailsItem.JWCost}</td>
                <td>{OrdrDetailsItem.MtrlCost}</td>
                <td>{OrdrDetailsItem.UnitPrice}</td>
                <td>{OrdrDetailsItem.Qty_Ordered}</td>
                <td>{OrdrDetailsItem.Total}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default OrdrTable;
