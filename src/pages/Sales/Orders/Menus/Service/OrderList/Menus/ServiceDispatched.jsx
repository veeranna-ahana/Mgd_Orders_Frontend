import React from "react";
import OrderList from "../../../../OrderList/OrderList";

export default function ServiceDispatched() {
  return (
    <>
      <OrderList type={"Service"} orderStatus={"Dispatched"} />
    </>
  );
}
