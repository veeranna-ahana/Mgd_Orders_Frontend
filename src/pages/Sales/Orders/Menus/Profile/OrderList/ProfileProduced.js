import React from "react";
import OrderList from "../../../OrderList/OrderList";

export default function ProfileProduced() {
  return (
    <>
      <OrderList type={"Profile"} orderStatus={"Produced"} />
    </>
  );
}
