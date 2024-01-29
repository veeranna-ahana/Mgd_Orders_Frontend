import React from "react";
import OrderList from "../../../OrderList/OrderList";

export default function ProfileCreated() {
  return (
    <>
      <OrderList type={"Profile"} orderStatus={"Created"} />
    </>
  );
}
