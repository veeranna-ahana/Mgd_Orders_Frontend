import React from "react";
import OrderList from "../../OrderList/OrderList";

export default function ProfileAll() {
  return (
    <>
      <OrderList type={"Profile"} orderStatus={"All"} />
    </>
  );
}
