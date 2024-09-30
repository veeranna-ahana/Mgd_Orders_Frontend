import React, { useEffect, useState } from "react";
import { Modal, Table } from "react-bootstrap";
import {
  getRequest,
  postRequest,
} from "../../../../../../../../api/apiinstance";
import { endpoints } from "../../../../../../../../api/constants";
import { toast } from "react-toastify";
import ConfirmationModal from "../../../../../../Modal/ConfirmationModal";

// ConfirmationModal

export default function ImportOldOrderModal(props) {
  const [selectedOldOrder, setSelectedOldOrder] = useState({});
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const closeModal = () => {
    props.setImportOldOrdrMdl(false);
    setSelectedOldOrder({});
    // setSelectedQtn({});
    // setFilteredQtnListData([]);
  };

  // console.log("props...", props);

  function loadOldOrder() {
    const newArray = props.oldOrderDetailsData?.filter(
      (obj) => obj.Order_No === selectedOldOrder.Order_No
    );

    // console.log("newArray", newArray);
    props.setOrdrDetailsData(newArray);
    closeModal();
    toast.success("Import old order successfull");
  }

  function loadOldOrderValidations() {
    if (selectedOldOrder.Order_No) {
      setConfirmModalOpen(true);
    } else {
      toast.warning("Please select the order to import");
    }
  }

  return (
    <>
      <Modal
        show={props.importOldOrdrMdl}
        onHide={closeModal}
        style={{ background: "#4d4d4d57" }}
        fullscreen
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "14px" }}>
            Import Old Order
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ paddingTop: "0px" }}>
          <Table
            striped
            className="table-data border"
            // style={{ border: "1px" }}
          >
            <thead className="tableHeaderBGColor">
              <tr>
                <th>SL No</th>
                <th>Order No</th>
                <th>PO No</th>
              </tr>
            </thead>
            <tbody className="tablebody">
              {props.oldOrderListData?.length > 0 ? (
                props.oldOrderListData?.map((val, key) => (
                  <>
                    <tr
                      key={key}
                      onClick={(e) => {
                        setSelectedOldOrder(val);
                      }}
                      className={
                        selectedOldOrder.Order_No === val.Order_No
                          ? "rowSelectedClass"
                          : ""
                      }
                    >
                      <td>{key + 1}</td>
                      <td>{val.Order_No}</td>
                      <td>{val.Purchase_Order}</td>
                    </tr>
                  </>
                ))
              ) : (
                <tr
                // key={key}
                // onClick={(e) => {
                //   setSelectedOldOrder(val);
                // }}
                // className={
                //   selectedOldOrder.Order_No === val.Order_No
                //     ? "rowSelectedClass"
                //     : ""
                // }
                >
                  <td></td>
                  <td>No old order found</td>
                  <td></td>
                </tr>
              )}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer className="d-flex flex-row justify-content-end">
          <button
            className="button-style m-0 me-3"
            style={{ width: "auto" }}
            onClick={loadOldOrderValidations}
          >
            Load
          </button>

          <button
            className="button-style m-0"
            style={{ width: "60px", background: "rgb(173, 173, 173)" }}
            onClick={closeModal}
          >
            Exit
          </button>
        </Modal.Footer>
      </Modal>

      <ConfirmationModal
        confirmModalOpen={confirmModalOpen}
        setConfirmModalOpen={setConfirmModalOpen}
        message="Are you sure to import the selected order"
        yesClickedFunc={loadOldOrder}
      />
    </>
  );
}
