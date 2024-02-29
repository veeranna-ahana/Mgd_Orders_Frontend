import React from "react";

export default function IEFormHeader() {
  return (
    <>
      <div className="row">
        <b>Order Total</b>
        <input disabled />
      </div>
      <div className="d-flex justify-content-center">
        <button className="button-style m-1">Update Para</button>
        <button className="button-style m-1">Set Material</button>
        <button className="button-style m-1">Set Operation</button>
        <button className="button-style m-1">Load Excel</button>
        <button className="button-style m-1">Compare</button>
        <button className="button-style m-1">Load to Order</button>
      </div>
    </>
  );
}
