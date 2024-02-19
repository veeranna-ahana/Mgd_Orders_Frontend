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
import { Button, Modal } from "react-bootstrap";
import PrintProfarmaInvoice from "./PrintProfarmaInvoice";
// import MLLogo from "../../../../../../../ML-LOGO.png";
// PrintInvoice

export default function ModalProfarmaInvoice(props) {
  const handleClose = () => props.setPrintInvoiceModal(false);

  return (
    <>
      <Modal fullscreen show={props.printInvoiceModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Print Proforma Invoice</Modal.Title>
        </Modal.Header>
        <Modal.Body className="m-0 p-1">
          <Fragment>
            <PDFViewer width="1358" height="595" filename="Invoice.pdf">
              <PrintProfarmaInvoice
                rowLimit={props.rowLimit}
                profarmaMainData={props.profarmaMainData}
                profarmaDetailsData={props.profarmaDetailsData}
                profarmaTaxData={props.profarmaTaxData}
              />
            </PDFViewer>
          </Fragment>
        </Modal.Body>
      </Modal>
    </>
  );
}
