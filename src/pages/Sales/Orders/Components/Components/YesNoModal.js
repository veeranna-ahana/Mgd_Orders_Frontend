import React, { useState } from "react";
import { Modal, Table } from "react-bootstrap";
import { toast } from "react-toastify";
// import Axios from "axios";
// import { apipoints } from "../../../../../../api/PackInv_API/Inspection/InspProfi";
export default function YesNoModal(props) {
  const { SmShow, setSmShow, onOkButtonClick, onHide, actionType, SaveOrder } =
    props;

  return (
    <div>
      {" "}
      <Modal
        {...props}
        size="sm"
        show={SmShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">New Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>Order Created successfully</Modal.Body>
        <Modal.Footer>
          <button
            className="button-style "
            style={{ width: "75px" }}
            onClick={(e) => SaveOrder(e)}
          >
            OK
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
