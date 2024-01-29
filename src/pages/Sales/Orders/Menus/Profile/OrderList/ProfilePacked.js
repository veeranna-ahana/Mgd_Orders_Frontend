import React from "react";
import OrderList from "../../../OrderList/OrderList";

export default function ProfilePacked() {
  return (
    <>
      <OrderList type={"Profile"} orderStatus={"Packed"} />
    </>
  );
}
