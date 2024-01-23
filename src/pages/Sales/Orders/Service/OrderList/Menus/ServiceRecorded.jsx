import React from "react";
import OrderList from "../../../OrderList/OrderList";

export default function ServiceRecorded() {
  return (
    <>
      <OrderList type={"Service"} orderType={"Recorded"} />
    </>
  );
}
