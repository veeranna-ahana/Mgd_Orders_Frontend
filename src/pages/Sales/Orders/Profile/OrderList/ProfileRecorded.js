import React from "react";
import OrderList from "../../OrderList/OrderList";

export default function ProfileRecorded() {
  return (
    <>
      <OrderList type={"Profile"} orderStatus={"Recorded"} />
    </>
  );
}
