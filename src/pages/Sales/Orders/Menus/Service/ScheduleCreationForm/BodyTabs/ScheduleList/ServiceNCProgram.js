import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { endpoints } from "../../../../../../../api/constants";
import { postRequest } from "../../../../../../../api/apiinstance";
import AlertModal from "../../../Components/Alert";
import { ToastContainer, toast } from "react-toastify";

function ServiceNCProgram() {
  const location = useLocation(); // Access location object using useLocation hook
  const response = location?.state.response || [];
  const MachineList = location?.state.responsedata || [];

  const [NCprogramForm, setNCProgramForm] = useState([]);
  const [machineList, setMachineList] = useState([]);

  const [selectedMachine, setSelectedMachine] = useState("");
  const handleChangeMachine = (e) => {
    setSelectedMachine(e.target.value);
  };

  useEffect(() => {
    setNCProgramForm(response);
    setMachineList(MachineList);
    setSelectedMachine(NCprogramForm[0]?.Machine);
  }, []);

  //getNCProgram
  const [NCProramData, setNCProgramData] = useState([]);
  const getNCProgramData = () => {
    postRequest(endpoints.getNCPrograms, { NCprogramForm }, (response) => {
      // console.log("NCProgramList is", response);
      setNCProgramData(response);
    });
  };

  //get PartsData
  const [partsData, setPartsData] = useState([]);
  const getPartsData = () => {
    postRequest(endpoints.getPartsData, { NCprogramForm }, (response) => {
      // console.log("NCProgramList is", response);
      setPartsData(response);
    });
  };

  useEffect(() => {
    getNCProgramData();
    getPartsData();
  }, [NCprogramForm]);

  console.log("partsData is", partsData);

  //row select
  const [selectedNCprogram, setSelectedNCProgram] = useState({});
  const onClickSelectedNCprogram = (item, index) => {
    let list = { ...item, index: index };
    setSelectedNCProgram(list);
  };

  //Default first row select
  useEffect(() => {
    if (NCProramData.length > 0 && !selectedNCprogram.NCProgramNo) {
      onClickSelectedNCprogram(NCProramData[0], 0); // Select the first row
    }
  }, [NCProramData, selectedNCprogram, onClickSelectedNCprogram]);

  console.log("selectedNCprogram", selectedNCprogram);

  //ADD NCPROGRAM
  const OnclickAddNCProgram = () => {
    postRequest(endpoints.addNCProgram, { NCprogramForm }, (response) => {
      if (response.message === "Success")
        toast.success(response.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      else {
        toast.warning(response.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      getNCProgramData();
    });
  };

  //Send MTrl Issue Modal
  const [showModal, setShowModal] = useState(false);
  const openMtrlIssueModal = () => {
    setShowModal(true);
  };

  //ONCLICK OF YES BUTTON IN MTRL ISSUE
  const OnclickMtrlIssueYes = () => {
    postRequest(endpoints.sendMtrlIssue, { selectedNCprogram }, (response) => {
      setShowModal(false);
      toast.success(response.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      getNCProgramData();
    });
  };

  //Delete Modal
  const [openDelete, setOpenDelete] = useState(false);
  const openDeleteModal = () => {
    setOpenDelete(true);
  };

  //Onclick of Yes Button
  const OnclickDeleteNCProgram = () => {
    postRequest(
      endpoints.DeleteNCProgram,
      { selectedNCprogram },
      (response) => {
        setOpenDelete(false);
        toast.success(response.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        getNCProgramData();
      }
    );
  };

  //save Button
  const OnclickButtonSave = () => {
    postRequest(
      endpoints.SaveButton,
      { selectedMachine: selectedMachine, NCprogramForm },
      (response) => {
        // console.log("response of Scheduled is",response);
        toast.success("Saved", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    );
  };



  return (
    <div>
      <div className="row">
        <h4 className="title">Production Program No Allotment Form</h4>
        <div className="row">
          <h4>Production Program No Manager</h4>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8 sm-12">
          <div className="row mt-2">
            <div className="col-md-6 sm-12 ">
              <label className="form-label">Task No</label>
              <input type="text" value={NCprogramForm[0]?.TaskNo} />
            </div>

            <div className="col-md-6 sm-12">
              <label className="form-label">Status</label>
              <input type="text" value={NCprogramForm[0]?.TStatus} />
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-md-6 sm-12 ">
              <label className="form-label">Assy Name</label>
              <input type="text" value={NCprogramForm[0]?.AssyName} />
            </div>

            <div className="col-md-6 sm-12">
              <label className="form-label">Operation</label>
              <input type="text" value={NCprogramForm[0]?.Operation} />
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-md-6 sm-12 ">
              <label className="form-label">Task Quantity</label>
              <input type="text" value={NCprogramForm[0]?.TotalParts} />
            </div>

            <div className="col-md-6 sm-12">
              <label className="form-label">Material</label>
              <input
                type="text"
                value={`${NCprogramForm[0]?.CustMtrl}/${NCprogramForm[0]?.Mtrl_Code}`}
              />
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-md-6 sm-12 ">
              <label className="form-label">Machine</label>
              <select
                id=""
                className="ip-select"
                onChange={handleChangeMachine}
              >
                <option value={NCprogramForm[0]?.Machine}>
                  {NCprogramForm[0]?.Machine}
                </option>
                {machineList.map((item, key) => {
                  return (
                    <>
                      <option value={item.refName}>{item.refName}</option>
                    </>
                  );
                })}
              </select>
            </div>

            {/* <div className="col-md-6 sm-12 mt-3">
              <Link to="/Orders/Service/OrderSchedule">
                <button className="button-style">Close</button>
              </Link>
            </div> */}
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-2">
            <button className="button-style" onClick={OnclickAddNCProgram}>
              Add Program
            </button>
          </div>
          <div className="col-md-2">
            <button
              className="button-style"
              onClick={openDeleteModal}
              disabled={selectedNCprogram.PStatus !== "Created"}
            >
              Delete Program
            </button>
            {selectedNCprogram.PStatus !== "Created" && (
              <style>
                {`
            .button-style[disabled] {
                background-color: grey;
                cursor: not-allowed;
            }
            `}
              </style>
            )}
          </div>

          <div className="col-md-2">
            <button className="button-style" onClick={OnclickButtonSave}>
              Save
            </button>
          </div>

          <div className="col-md-3">
            <button
              className="button-style"
              style={{ width: "250px" }}
              onClick={openMtrlIssueModal}
              disabled={selectedNCprogram.PStatus !== "Created"}
            >
              Send to Material Issue
            </button>
            {selectedNCprogram.PStatus !== "Created" && (
              <style>
                {`
            .button-style[disabled] {
                background-color: grey;
                cursor: not-allowed;
            }
            `}
              </style>
            )}
          </div>

          <div className="col-md-3">
            <Link to="/Orders/Service/OrderSchedule">
              <button className="button-style">Close</button>
            </Link>
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-md-4 sm-12 mt-3" style={{ overflowY: "scroll" }}>
            <Table
              striped
              className="table-data border"
              style={{ border: "1px", height: "200px" }}
            >
              <thead className="tableHeaderBGColor">
                <tr>
                  <th style={{ whiteSpace: "nowrap" }}>PartId</th>
                  <th style={{ whiteSpace: "nowrap" }}>Qty/Assy</th>
                  <th style={{ whiteSpace: "nowrap" }}>Required</th>
                  <th style={{ whiteSpace: "nowrap" }}>Available</th>
                </tr>
              </thead>
              <tbody className="tablebody">
                {partsData.length > 0 ? (
                  partsData.map((item, key) => (
                    <tr key={key}>
                      <td>{item.PartID}</td>
                      <td>{item.QtyPerAssy}</td>
                      <td>{item.QtyRequired}</td>
                      <td>{item.QtyAvialable}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No data to show</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>

          <div
            className="col-md-8 mt-3"
            style={{
              overflowX: "scroll",
              width: "600px",
              msOverflowY: "scroll",
            }}
          >
            <Table
              striped
              className="table-data border"
              style={{ border: "1px" }}
            >
              <thead className="tableHeaderBGColor">
                <tr>
                  <th style={{ whiteSpace: "nowrap" }}>Program No</th>
                  <th style={{ whiteSpace: "nowrap" }}>Machine</th>
                  <th style={{ whiteSpace: "nowrap" }}>Source</th>
                  <th style={{ whiteSpace: "nowrap" }}>Quantity</th>
                  <th style={{ whiteSpace: "nowrap" }}>Estimated Time</th>
                  <th style={{ whiteSpace: "nowrap" }}>Total LOC</th>
                  <th style={{ whiteSpace: "nowrap" }}>Total Holes</th>
                  <th style={{ whiteSpace: "nowrap" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {NCProramData.map((item, key) => {
                  return (
                    <>
                      <tr
                        onClick={() => onClickSelectedNCprogram(item, key)}
                        className={
                          key === selectedNCprogram?.index
                            ? "selcted-row-clr"
                            : ""
                        }
                      >
                        {" "}
                        <td>{item.NCProgramNo}</td>
                        <td>{item.Machine}</td>
                        <td>{item.CustMtrl}</td>
                        <td>{item.Qty}</td>
                        <td>{item.EstimatedTime}</td>
                        <td>{item.TotalLOC}</td>
                        <td>{item.TotalHoles}</td>
                        <td style={{ whiteSpace: "nowrap" }}>{item.PStatus}</td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>

      {/* Send  MTrlIssue Modal */}
      <AlertModal
        show={showModal}
        onHide={(e) => setShowModal(e)}
        firstbutton={OnclickMtrlIssueYes}
        secondbutton={(e) => setShowModal(e)}
        title="magod_Order"
        message={`Do you wish to release program no ${selectedNCprogram.NCProgramNo} to Material Issue?`}
        firstbuttontext="Yes"
        secondbuttontext="No"
      />

      {/* Delete NCProgram Button */}
      <AlertModal
        show={openDelete}
        onHide={(e) => setOpenDelete(e)}
        firstbutton={OnclickDeleteNCProgram}
        secondbutton={(e) => setOpenDelete(e)}
        title="magod_Order"
        message={`Do you wish to Delete program no ${selectedNCprogram.NCProgramNo}?`}
        firstbuttontext="Yes"
        secondbuttontext="No"
      />
    </div>
  );
}

export default ServiceNCProgram;
