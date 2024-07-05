import React, { useState ,Fragment} from 'react';
import Modal from 'react-bootstrap/Modal';
// import ProfileJobWorkPrint from '../Profile_JobWork/ProfileJobWorkPrint';

import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import ServicePDF from './ServicePDF';

 export default function ServiceModal({setServiceOpen, serviceOpen,setOpenPrintModal,formdata}) {
   // console.log("in Print Modal",selectedWeek)

  const [fullscreen, setFullscreen] = useState(true);


  return (
    <div>
      <Modal show={serviceOpen} fullscreen={fullscreen} onHide={() => setServiceOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Service</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Fragment>
            <PDFViewer width="1200" height="600" filename="somename.pdf">
           <ServicePDF formdata={formdata}/>
            </PDFViewer>
          </Fragment>

        </Modal.Body>
      </Modal>
    </div>
  );
}

