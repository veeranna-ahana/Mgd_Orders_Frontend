import React from "react";
import OrderList from "../../OrderList/OrderList";

export default function ProfileProcessing() {
  return (
    <>
      <OrderList type={"Profile"} orderStatus={"Processing"} />
    </>
  );
}
