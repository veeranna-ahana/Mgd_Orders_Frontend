import React from "react";
import OrderList from "../../../Components/OrderList/OrderList";

export default function InternalReady() {
  return (
    <>
      <OrderList type={"Profile"} orderStatus={"Ready"} orderRef={"Profile"} />
    </>
  );
}
