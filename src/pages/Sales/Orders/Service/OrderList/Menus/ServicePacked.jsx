import React from "react";
import OrderList from "../../../OrderList/OrderList";

export default function ServicePacked() {
  return (
    <>
      <OrderList type={"Service"} orderType={"Packed"} />
    </>
  );
}
