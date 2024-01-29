import React from "react";
import OrderList from "../../OrderList/OrderList";

export default function FabCompleted() {
  return (
    <>
      <OrderList type={"Fabrication"} orderStatus={"Completed"} />
    </>
  );
}
