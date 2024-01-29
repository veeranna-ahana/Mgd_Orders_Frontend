import React from "react";
import OrderList from "../../../OrderList/OrderList";

export default function FabCreated() {
  return (
    <>
      <OrderList type={"Fabrication"} orderStatus={"Created"} />
    </>
  );
}
