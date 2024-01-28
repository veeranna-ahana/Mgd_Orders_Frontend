import React from "react";
import OrderList from "../../OrderList/OrderList";

export default function FabProduced() {
  return (
    <>
      <OrderList type={"Fabrication"} orderStatus={"Produced"} />
    </>
  );
}
