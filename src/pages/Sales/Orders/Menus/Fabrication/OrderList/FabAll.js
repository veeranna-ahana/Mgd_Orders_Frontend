import React from "react";
import OrderList from "../../../OrderList/OrderList";

export default function FabAll() {
  return (
    <>
      <OrderList type={"Fabrication"} orderStatus={"All"} />
    </>
  );
}
