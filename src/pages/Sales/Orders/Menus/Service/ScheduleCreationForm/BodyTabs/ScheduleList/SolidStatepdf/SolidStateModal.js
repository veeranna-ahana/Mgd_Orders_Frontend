import React, { useState, Fragment } from "react";
import Modal from "react-bootstrap/Modal";
import { PDFViewer, StyleSheet, Image } from "@react-pdf/renderer";
import SolidStatePdf from "./SolidStatePdf";

export default function SolidStateModal({
  solidStateFormOpen,
  setSolidStateFormOpen,
  formData,
}) {
  const [fullscreen, setFullscreen] = useState(true);

  const handleClose = () => {
    setSolidStateFormOpen(false);
  };

  return (
    <div>
      <Modal
        show={solidStateFormOpen}
        fullscreen={fullscreen}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title> Parameter Sheet - Solid State Laser</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Fragment>
            <PDFViewer
              width="1200"
              height="600"
              filename="ParameterSolidState.pdf"
            >
              <SolidStatePdf formData={formData} />
            </PDFViewer>
          </Fragment>
        </Modal.Body>
      </Modal>
    </div>
  );
}
