import React from "react";
import OrderList from "../../OrderList/OrderList";

export default function ProfileDispatched() {
  return (
    <>
      <OrderList type={"Profile"} orderStatus={"Dispatched"} />
    </>
  );
}
