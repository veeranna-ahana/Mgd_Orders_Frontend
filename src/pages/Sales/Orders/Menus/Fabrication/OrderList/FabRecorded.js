import React from "react";
import OrderList from "../../../OrderList/OrderList";

export default function FabRecorded() {
  return (
    <>
      <OrderList type={"Fabrication"} orderStatus={"Recorded"} />
    </>
  );
}
