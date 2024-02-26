import { React, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";

function ImportOldOrderModal(props) {
  const {
    importOldOrdrMdl,
    setImportOldOrdrMdl,
    handleImportOldOrdrMdl,
    handleCloseImportOldOrdrMdl,
  } = props;
  return (
    <div className="row mt-1">
      <Modal show={importOldOrdrMdl} size="lg">
        <Modal.Header
          className="justify-content-md-center"
          style={{
            paddingTop: "10px",
            backgroundColor: "#283E81",
            color: "#ffffff",
          }}
        >
          <Modal.Title>Old Orders Parameters for Import</Modal.Title>
        </Modal.Header>

        <Modal.Footer>
          {" "}
          <div className="row ">
            <button
              className="button-style"
              type="submit"
              style={{ width: "100px" }}
            >
              Save
            </button>

            <button
              className="button-style"
              style={{ width: "100px", backgroundColor: "gray" }}
              variant="secondary"
              onClick={() => handleCloseImportOldOrdrMdl()}
            >
              Close
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ImportOldOrderModal;
