import React, { Fragment, useState } from "react";
import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import Modal from "react-bootstrap/Modal";
import TaskSheetPdf from "./TaskSheetPdf";

export default function TaskSheetModal({
  openPrintModal,
  formData,
  setOpenPrintModal,
}) {
  const handleClose = () => setOpenPrintModal(false);

  console.log("formData is",formData);

  return (
    <div>
      <Modal fullscreen show={openPrintModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Task Sheet Form</Modal.Title>
        </Modal.Header>
        <Modal.Body className="m-0 p-1">
          <Fragment>
            <PDFViewer width="1200" height="600" filename="TaskSheet.pdf">
              <TaskSheetPdf formData={formData} />
            </PDFViewer>
          </Fragment>
        </Modal.Body>
      </Modal>
    </div>
  );
}
