import React from "react";
import OrderList from "../../../OrderList/OrderList";

export default function FabDispatched() {
  return (
    <>
      <OrderList type={"Fabrication"} orderStatus={"Dispatched"} />
    </>
  );
}
