import React, { Fragment, useState, useEffect } from "react";
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
import { endpoints } from "../../../../api/constants";
import Axios from "axios";

export default function ModalProfarmaInvoice(props) {
  const [PDFData, setPDFData] = useState({});

  const handleClose = () => props.setPrintInvoiceModal(false);

  function fetchPDFData() {
    Axios.post(endpoints.getPDFData, {}).then((res) => {
      setPDFData(res.data[0]);
    });
  }

  useEffect(() => {
    fetchPDFData();
  }, []);

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
                PDFData={PDFData}
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
