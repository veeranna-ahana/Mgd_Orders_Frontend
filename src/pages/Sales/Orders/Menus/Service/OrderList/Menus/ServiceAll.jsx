import React from "react";
import OrderList from "../../../../OrderList/OrderList";

export default function ServiceAll() {
  return (
    <>
      <OrderList type={"Service"} orderStatus={"All"} />
    </>
  );
}
