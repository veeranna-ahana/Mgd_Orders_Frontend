import React, { useEffect, useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";

import Modal from "react-bootstrap/Modal";
import ConfirmationModal from "../../../../../../../Modal/ConfirmationModal";

import { toast } from "react-toastify";

export default function Set(props) {
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const [selectedData, setSelectedData] = useState({
    Mtrl_Code: "",
    Operation: "",
  });

  const closeModal = () => {
    setSelectedData({
      Mtrl_Code: "",
      Operation: "",
    });
    props.setSettingModal(false);
  };

  const changeHandle = (name, val) => {
    setSelectedData({ ...selectedData, [name]: val });
    // console.log("name", name);
    // console.log("val", val);
  };

  const onSave = () => {
    let arr = [];

    for (let i = 0; i < props.importedExcelData.length; i++) {
      let element = props.importedExcelData[i];
      if (props.selectedRows.includes(i)) {
        if (selectedData.Mtrl_Code != "") {
          element.Mtrl_Code = selectedData.Mtrl_Code;
          element.materialError = false;
        }

        if (selectedData.Operation != "") {
          element.Operation = selectedData.Operation;
          element.operationError = false;
        }
      }
      arr.push(element);
    }

    // console.log("save clicked", arr);

    props.setImportedExcelData(arr);

    toast.success("Set Material and Operation.");

    props.setSelectedRows([]);

    closeModal();
  };

  //   console.log("selectedData", selectedData);

  // console.log("importedExcelData", props.importedExcelData);
  return (
    <>
      <Modal
        show={props.settingModal}
        onHide={closeModal}
        style={{ background: "#4d4d4d57" }}
        // fullscreen
      >
        <Modal.Header closeButton>
          <Modal.Title>Set Material and Operation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div>
              <b>Select Material</b>
              <Typeahead
                options={props.mtrldata}
                // className={
                //   val.materialError
                //     ? "border rounded border-1 border-danger typeaheadClass"
                //     : "typeaheadClass"
                // }
                // // className="ip-select"
                id="Mtrl_Code"
                // name="Mtrl_Code"
                // // labelKey="Mtrl_Code"
                onChange={(e) => {
                  changeHandle("Mtrl_Code", e.length > 0 ? e[0].label : "");
                }}
                // options={props.mtrldata}
                // defaultSelected={[{ label: val.Mtrl_Code }]}
                placeholder="Choose a Material..."
              />
            </div>
            <div>
              <b>Select Operation</b>
              <Typeahead
                options={props.procdata}
                // className={
                //   val.materialError
                //     ? "border rounded border-1 border-danger typeaheadClass"
                //     : "typeaheadClass"
                // }
                // // className="ip-select"
                id="Operation"
                // name="Mtrl_Code"
                // // labelKey="Mtrl_Code"
                onChange={(e) => {
                  changeHandle("Operation", e.length > 0 ? e[0].label : "");
                }}
                // options={props.mtrldata}
                // defaultSelected={[{ label: val.Mtrl_Code }]}
                placeholder="Choose a Operation..."
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex flex-row justify-content-between">
          <button
            className="button-style m-0"
            style={{ width: "auto", background: "rgb(173, 173, 173)" }}
            // onClick={exportModifiedExcel}
            // disabled={importedExcelData.length < 1}
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className="button-style m-0"
            style={{ width: "auto" }}
            onClick={(e) => {
              setConfirmModalOpen(true);
            }}
          >
            Save
          </button>
        </Modal.Footer>
      </Modal>
      <ConfirmationModal
        setConfirmModalOpen={setConfirmModalOpen}
        confirmModalOpen={confirmModalOpen}
        yesClickedFunc={onSave}
        message={"Are you sure to set the material and operation?"}
      />
    </>
  );
}
