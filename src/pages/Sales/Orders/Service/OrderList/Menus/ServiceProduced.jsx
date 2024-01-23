import React from "react";
import OrderList from "../../../OrderList/OrderList";

export default function ServiceProduced() {
  return (
    <>
      <OrderList type={"Service"} orderType={"Produced"} />
    </>
  );
}
