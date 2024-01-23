import React from "react";
import OrderList from "../../../OrderList/OrderList";

export default function ServiceCreated() {
  return (
    <>
      <OrderList type={"Service"} orderType={"Created"} />
    </>
  );
}
