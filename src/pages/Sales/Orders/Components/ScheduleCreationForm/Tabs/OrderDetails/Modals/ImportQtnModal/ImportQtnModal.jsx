import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import IQMTable from "./elements/IQMTable";
import IQMFormHeader from "./elements/IQMFormHeader";
import {
  getRequest,
  postRequest,
} from "../../../../../../../../api/apiinstance";
import { endpoints } from "../../../../../../../../api/constants";

export default function ImportExcelModal(props) {
  const [qtnListData, setQtnListData] = useState([]);
  const [qtnItemListData, setQtnItemListData] = useState([]);
  const [selectedQtn, setSelectedQtn] = useState({});
  const [filteredQtnListData, setFilteredQtnListData] = useState([]);
  const closeModal = () => {
    props.setImportQtnMdl(false);
  };

  useEffect(() => {
    postRequest(endpoints.getQtnData, {}, (QtnData) => {
      let arr = [];

      for (let i = 0; i < QtnData.qtnList.length; i++) {
        const element = QtnData.qtnList[i];
        element.label = element.QtnNo;
        element.value = element.QtnNo;
        arr.push(element);
      }

      setQtnListData(arr);
      setQtnItemListData(QtnData.qtnItemList);
    });
  }, []);

  //  console.log("qtnListData", qtnListData);
  //  console.log("qtnItemListData", qtnItemListData);
  return (
    <>
      <Modal
        show={props.importQtnMdl}
        onHide={closeModal}
        style={{ background: "#4d4d4d57" }}
        fullscreen
      >
        <Modal.Header closeButton>
          <Modal.Title>Import Quotation Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <IQMFormHeader
            qtnListData={qtnListData}
            qtnItemListData={qtnItemListData}
            setSelectedQtn={setSelectedQtn}
            selectedQtn={selectedQtn}
            setFilteredQtnListData={setFilteredQtnListData}
          />
          <div className="p-1"></div>
          <div className="row">
            <div className="col-md-12">
              <IQMTable />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex flex-row justify-content-end">
          <button
            className="button-style m-0 me-3"
            style={{ width: "auto" }}
            //   onClick={yesClicked}
          >
            Load Quotation
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
    </>
  );
}
