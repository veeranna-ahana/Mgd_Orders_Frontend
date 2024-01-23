import React from "react";
import OrderList from "../../../OrderList/OrderList";

export default function ServiceProcessing() {
  return (
    <>
      <OrderList type={"Service"} orderType={"Processing"} />
    </>
  );
}
