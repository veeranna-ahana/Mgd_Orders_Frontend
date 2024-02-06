import React from "react";
import OrderList from "../../../Components/OrderList/OrderList";

export default function IntCompleted() {
  return (
    <>
      <OrderList
        type={"Profile"}
        orderStatus={"Completed"}
        orderRef={"Profile"}
      />
    </>
  );
}
