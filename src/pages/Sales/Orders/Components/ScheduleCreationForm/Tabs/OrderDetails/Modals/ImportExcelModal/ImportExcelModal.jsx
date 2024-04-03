import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import IETable from "./elements/IETable";
import IEFormHeader from "./elements/IEFormHeader";

export default function ImportExcelModal(props) {
  const [importedExcelData, setImportedExcelData] = useState([]);

  const closeModal = () => {
    props.setImportExcelModal(false);
  };

  return (
    <>
      <Modal
        show={props.importExcelModal}
        onHide={closeModal}
        style={{ background: "#4d4d4d57" }}
        fullscreen
      >
        <Modal.Header closeButton>
          <Modal.Title>Import from Excel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <IEFormHeader
            setImportedExcelData={setImportedExcelData}
            importedExcelData={importedExcelData}
          />
          <IETable importedExcelData={importedExcelData} />
        </Modal.Body>
        <Modal.Footer className="d-flex flex-row justify-content-end">
          {/* <button
            className="button-style m-0 me-3"
            style={{ width: "60px" }}
            //   onClick={yesClicked}
          >
            Yes
          </button> */}

          <button
            className="button-style m-0"
            style={{ width: "60px", background: "rgb(173, 173, 173)" }}
            onClick={closeModal}
          >
            Exit
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
