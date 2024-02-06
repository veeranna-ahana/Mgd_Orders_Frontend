import React from "react";
import OrderList from "../../../Components/OrderList/OrderList";

export default function FixturesRecorded() {
  return (
    <>
      <OrderList
        type={"Profile"}
        orderStatus={"Recorded"}
        orderRef={"Fixture"}
      />
    </>
  );
}
