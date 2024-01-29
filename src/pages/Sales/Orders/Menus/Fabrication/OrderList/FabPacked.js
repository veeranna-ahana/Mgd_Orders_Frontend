import React from "react";
import OrderList from "../../../OrderList/OrderList";

export default function FabPacked() {
  return (
    <>
      <OrderList type={"Fabrication"} orderStatus={"Packed"} />
    </>
  );
}
