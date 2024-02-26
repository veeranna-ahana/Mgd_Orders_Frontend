import React, { useEffect, useState } from "react";
import { Tabs, Tab, Table, Form } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AlertModal from "../../../Components/Alert";
import { getRequest, postRequest } from "../../../../../../../api/apiinstance";
import { endpoints } from "../../../../../../../api/constants";
import { ToastContainer, toast } from "react-toastify";
import PackingNoteAndInvoice from "./Tabs/PackingNoteAndInvoice";
import { Create } from "@mui/icons-material";

function ServiceOpenSchedule() {
  const location = useLocation(); // Access location object using useLocation hook
  const DwgNameList = location?.state || []; // Get DwgNameList from location state

  //  console.log("DwgNameList is", DwgNameList[0]);

  // Set initial state of newState to DwgNameList
  const [newState, setNewState] = useState(DwgNameList);
  const [scheduleDetailsRow, setScheduleDetailsRow] = useState({});

  useEffect(() => {
    setNewState(DwgNameList);
  }, [DwgNameList]); // Dependency array containing DwgNameList

  let [schedule, setSchedule] = useState(false);
  let [profileOrder1, setProfileOrder1] = useState(false);
  let [profileOrder2, setProfileOrder2] = useState(false);
  let [fixtureOrder1, setFixtureOrder1] = useState(false);
  let [fixtureOrder2, setFixtureOrder2] = useState(false);

  const [openTask, setOpenTask] = useState(false);

  const openSchedule = (e) => {
    e.preventDefault();
    setSchedule(true);
  };

  const closeSchedule = () => {
    setSchedule(false);
  };

  let profileOrderOpen1 = (e) => {
    e.preventDefault();
    setProfileOrder1(true);
  };

  let profileOrderClose1 = () => {
    setProfileOrder1(false);
  };

  let profileOrderOpen2 = () => {
    setProfileOrder1(false);
    setProfileOrder2(true);
  };

  let profileOrderClose2 = () => {
    setProfileOrder2(false);
  };

  let fixtureOrderOpen1 = () => {
    setFixtureOrder1(true);
  };

  let fixtureOrderClose1 = () => {
    setFixtureOrder1(false);
  };

  let fixtureOrderOpen2 = () => {
    setFixtureOrder1(false);
    setFixtureOrder2(true);
  };

  let fixtureOrderClose2 = () => {
    setFixtureOrder2(false);
  };

  //date format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
    const day = date.getDate().toString().padStart(2, "0");
    // Use template literals to format the date
    return `${year}-${month}-${day}`;
  };

  const [formdata, setFormdata] = useState({});
  const [PNAndInvRegisterData, setPNAndInvRegisterData] = useState([]);
  const [PNAndInvDetailsData, setPNAndInvDetailsData] = useState([]);

  useEffect(() => {
    postRequest(
      endpoints.getScheduleListgetFormDetails,
      {
        Cust_Code: DwgNameList[0]?.Cust_Code,
        ScheduleId: DwgNameList[0]?.ScheduleId,
      },
      (response) => {
        // console.log("response is", response);
        setFormdata(response);
        postRequest(
          endpoints.getAllPNAndInvRegisterbyOrderNo,
          { Order_No: response[0]?.Order_No },
          (PNAndInvData) => {
            // console.log("PNAndInvData is", PNAndInvData);
            setPNAndInvRegisterData(PNAndInvData.registerData);
            setPNAndInvDetailsData(PNAndInvData.detailsData);
            // setTaskMaterialData(response);
          }
        );
      }
    );
  }, [DwgNameList[0]?.ScheduleId]);

  //  console.log("formdata......", formdata);

  // console.log("PNAndInvRegisterData", PNAndInvRegisterData);
  // console.log("PNAndInvDetailsData", PNAndInvDetailsData);
  //get Sales Contact
  const [ProgramEngineer, setProgramEngineer] = useState([]);
  useEffect(() => {
    getRequest(endpoints.getSalesContact, (response) => {
      console.log("response is", response);
      setProgramEngineer(response);
    });
  }, []);

  // //Onclick of Table
  // const [scheduleDetailsRow, setScheduleDetailsRow] = useState({});
  // const onClickofScheduleDtails = (item, index) => {
  //   let list = { ...item, index: index };
  //   setScheduleDetailsRow(list);
  // };

  // //Default first row select
  // useEffect(() => {
  //   if (newState.length > 0 && !scheduleDetailsRow.TaskNo) {
  //     onClickofScheduleDtails(newState[0], 0); // Select the first row
  //   }
  // }, [newState, scheduleDetailsRow, onClickofScheduleDtails]);

  // console.log(scheduleDetailsRow);

  //get Task and Material Tab Data
  const [TaskMaterialData, setTaskMaterialData] = useState([]);
  useEffect(() => {
    postRequest(
      endpoints.getScheduleListTaskandMaterial,
      { scheduleDetailsRow },
      (response) => {
        // console.log("response is", response);
        setTaskMaterialData(response);
      }
    );
  }, [scheduleDetailsRow]); // Watch for changes in OrderData

  //row onClick of Task Material First Table
  const [rowselectTaskMaterial, setRowSelectTaskMaterial] = useState({});
  const onRowSelectTaskMaterialTable = (item, index) => {
    let list = { ...item, index: index };
    setRowSelectTaskMaterial(list);
  };

  //Default first row select
  useEffect(() => {
    if (TaskMaterialData.length > 0 && !rowselectTaskMaterial.TaskNo) {
      onRowSelectTaskMaterialTable(TaskMaterialData[0], 0); // Select the first row
    }
  }, [TaskMaterialData, rowselectTaskMaterial, onRowSelectTaskMaterialTable]);

  //Onclick of Table
  const onClickofScheduleDtails = (item, index) => {
    let list = { ...item, index: index };
    setScheduleDetailsRow(list);
  };

  //Default first row select
  useEffect(() => {
    if (newState.length > 0 && !scheduleDetailsRow.TaskNo) {
      onClickofScheduleDtails(newState[0], 0); // Select the first row
    }
  }, [newState, scheduleDetailsRow, onClickofScheduleDtails]);

  //  console.log(scheduleDetailsRow);

  //Onclick of ShortClose
  const onClickShortClose = () => {
    postRequest(
      endpoints.onClickShortClose,
      { scheduleDetailsRow },
      (response) => {
        // console.log("response is",response);
        if (response.message === "Success") {
          toast.success(response.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        } else
          toast.warning(response.message, {
            position: toast.POSITION.TOP_CENTER,
          });
      }
    );
  };

  //Hanlechange
  const [changedEngineer, setChangedEngineer] = useState("");
  const handleChangeProgramEngineer = (e) => {
    setChangedEngineer(e.target.value);
  };

  //handleChange DeliveryDate
  const [deliveryDate, setDeliveryDate] = useState(formatDate(""));
  const handleChangeDeliveryDate = (e) => {
    setDeliveryDate(e.target.value);
  };

  useEffect(() => {
    if (formdata[0]?.Delivery_Date) {
      setDeliveryDate(formatDate(formdata[0].Delivery_Date));
    }
  }, [formdata]);

  //OnChange Special Instruction
  const [SpclInstruction, setSpecialInstruction] = useState("");
  const handleChangeSpecialInstruction = (e) => {
    setSpecialInstruction(e.target.value);
  };

  useEffect(() => {
    setChangedEngineer(formdata[0]?.Dealing_Engineer);
    // setDeliveryDate(formdata[0]?.Delivery_Date);
    setSpecialInstruction(formdata[0]?.Special_Instructions);
  }, [formdata]);

  //Onclick save Button
  const onClickSave = () => {
    postRequest(
      endpoints.onClickSave,
      {
        scheduleDetailsRow,
        formdata,
        SpclInstruction: SpclInstruction,
        deliveryDate: deliveryDate,
        changedEngineer: changedEngineer,
      },
      (response) => {
        toast.success("Saved", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    );
  };

  //Onclick Suspend
  const OnClickSuspend = () => {
    postRequest(
      endpoints.onClickSuspend,
      { scheduleDetailsRow },
      (response) => {
        // console.log("response",response.message)
        if (
          response.message ===
          "Clear Order Suspension of the order before trying to clear it for schedule"
        ) {
          toast.success(
            "Clear Order Suspension of the order before trying to clear it for schedule",
            {
              position: toast.POSITION.TOP_CENTER,
            }
          );
        } else {
          toast.success("Suspended", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      }
    );
  };

  //Onclick of Cancel
  const onClickCancel = () => {
    postRequest(endpoints.onClickCancel, { scheduleDetailsRow }, (response) => {
      // console.log("response cancel is",response.message)
      if (response.message === "Cannot Cancel Schedules Once Programmed") {
        toast.error("Cannot Cancel Schedules Once Programmed", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.error("Schedules cancelled successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    });
  };

  //Scheduled
  const onClickScheduled = () => {
    postRequest(
      endpoints.onClickScheduled,
      { scheduleDetailsRow, formdata },
      (response) => {
        // console.log("response of Scheduled is",response);
        toast.success(response.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    );
  };

  console.log(scheduleDetailsRow);

  //OnClick NCProgram
  const navigate = useNavigate();
  const onClickNCProgram = () => {
    postRequest(
      endpoints.onClickNCProgram,
      { rowselectTaskMaterial },
      (response) => {
        postRequest(
          endpoints.getMachineList,
          { NCprogramForm: response },
          (responsedata) => {
            // console.log("API response:", responsedata);
            navigate("/Orders/Service/NCProgram", {
              state: { response: response, responsedata: responsedata },
            });
          }
        );
      }
    );
  };

  const onClickTasked = () => {
    console.log(scheduleDetailsRow);
    postRequest(endpoints.onClickTask, { scheduleDetailsRow }, (response) => {
      // console.log("response of Scheduled is",response);
      toast.success(response.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    });
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <h4 className="title">Order Schedule Details</h4>
        </div>
      </div>
      <div className="row">
        <h4>Service</h4>
        <div className="col-md-4 sm-12 ">
          <label className="form-label">Customer</label>
          <input type="text" value={formdata[0]?.Cust_name} disabled />
        </div>

        <div className="col-md-4 sm-12">
          <label className="form-label">Sales Contact</label>
          <input type="text" value={formdata[0]?.SalesContact} disabled />
        </div>

        <div className="col-md-4 sm-12">
          <label className="form-label">Schedule No</label>
          <input type="text" value={formdata[0]?.OrdSchNo} disabled />
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-md-4 sm-12 ">
          <label className="form-label">Schedule Type</label>
          <input type="text" value={formdata[0]?.ScheduleType} disabled />
        </div>

        <div className="col-md-4 sm-12">
          <label className="form-label">Schedule Status</label>
          <input type="text" value={formdata[0]?.Schedule_Status} disabled />
        </div>

        <div className="col-md-4 sm-12">
          <label className="form-label">PO</label>
          <input type="text" value={formdata[0]?.PO} disabled />
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-md-4 sm-12 ">
          <label className="form-label">Program Engineer</label>
          <select
            id=""
            className="ip-select"
            onChange={handleChangeProgramEngineer}
          >
            <option value={formdata[0]?.Dealing_Engineer}>
              {formdata[0]?.Dealing_Engineer}
            </option>
            {ProgramEngineer.map((item, key) => {
              return (
                <>
                  <option value={item.Name}>{item.Name}</option>
                </>
              );
            })}
          </select>
        </div>

        <div className="col-md-4 sm-12">
          <label className="form-label">Target Date</label>
          <input
            type="date"
            value={formatDate(formdata[0]?.schTgtDate)}
            disabled
          />
        </div>
        <div className="col-md-4 sm-12">
          <label className="form-label">Delivery Date</label>
          <input
            type="date"
            value={deliveryDate}
            onChange={handleChangeDeliveryDate}
          />
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-md-4 sm-12">
          <label className="form-label">Special Instruction</label>
          <textarea
            onChange={handleChangeSpecialInstruction}
            id="exampleFormControlTextarea1"
            rows="3"
            style={{ width: "360px" }}
            value={formdata[0]?.Special_Instructions}
          ></textarea>
        </div>

        <div className="col-md-8 sm-12 mt-5">
          <button
            className="button-style"
            onClick={OnClickSuspend}
            disabled={
              formdata[0]?.Schedule_Status === "Created" ||
              formdata[0]?.Schedule_Status === "Dispatched"
            }
          >
            Suspend
          </button>

          <button
            className="button-style"
            onClick={onClickShortClose}
            disabled={
              formdata[0]?.Schedule_Status === "Tasked" ||
              formdata[0]?.Schedule_Status === "Dispatched"
            }
          >
            ShortClose
          </button>

          <button
            className="button-style"
            onClick={onClickCancel}
            disabled={
              formdata[0]?.Schedule_Status === "Created" ||
              formdata[0]?.Schedule_Status === "Dispatched"
            }
          >
            Cancel
          </button>

          <Link to="/Orders/Service/ScheduleCreationForm">
            <button className="button-style">Close</button>
          </Link>
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-md-2 col-sm-3">
          <button
            className="button-style"
            onClick={onClickScheduled}
            disabled={
              formdata[0]?.Schedule_Status === "Tasked" ||
              formdata[0]?.Schedule_Status === "Dispatched"
            }
          >
            Schedule
          </button>
          {(formdata[0]?.Schedule_Status === "Tasked" ||
            formdata[0]?.Schedule_Status === "Dispatched") && (
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

        <div className="col-md-2 col-sm-3">
          <button className="button-style" onClick={onClickTasked} disabled>
            Task
          </button>
        </div>

        <div className="col-md-2 col-sm-3">
          <button
            className="button-style"
            onClick={onClickSave}
            disabled={formdata[0]?.Schedule_Status === "Dispatched"}
          >
            Save
          </button>
          {formdata[0]?.Schedule_Status === "Dispatched" && (
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

        <div className="col-md-2 col-sm-3">
          <button
            className="button-style"
            disabled={
              formdata[0]?.Schedule_Status === "Created" ||
              formdata[0]?.Schedule_Status === "Dispatched"
            }
          >
            Check Status
          </button>
        </div>

        <div className="col-md-2 col-sm-3">
          <button
            className="button-style "
            disabled={
              formdata[0]?.Schedule_Status === "Created" ||
              formdata[0]?.Schedule_Status === "Dispatched"
            }
          >
            Print Schedule
          </button>
        </div>

        <div className="col-md-2 col-sm-3">
          {/* <Link to={"/Orders/Service/NCProgram"}   state={scheduleDetailsRow}> */}
          <button className="button-style " onClick={onClickNCProgram}>
            NC Program
          </button>
          {/* </Link> */}
        </div>

        {/* <div className="col-md-2 col-sm-3">
          <button className="button-style" onClick={profileOrderOpen1}>
            Profile Order
          </button>
        </div> */}

        <div className="col-md-2 col-sm-3">
          <button className="button-style" onClick={fixtureOrderOpen1}>
            Fixture Order
          </button>
        </div>

        {/* <div className="col-md-2 col-sm-3">
          <button className="button-style ">Show DXF</button>
        </div> */}
      </div>

      <div className="row">
        <Tabs className=" tab_font mt-4">
          <Tab eventKey="Schedule Details" title="Schedule Details">
            <div className="mt-3" style={{ overflowY: "scroll" }}>
              <Table
                striped
                className="table-data border"
                style={{ border: "1px", height: "350px" }}
              >
                <thead className="tableHeaderBGColor table-space">
                  <tr>
                    <th>Srl</th>
                    <th>DwgName</th>
                    <th>Material</th>
                    <th>Source</th>
                    <th>Process</th>
                    <th>Scheduled</th>
                    <th>Programmed</th>
                    <th>Produced</th>
                    <th>Cleared</th>
                    <th>Packed</th>
                    <th>Delivered</th>
                    <th>JWCost</th>
                    <th>MtrlCost</th>
                  </tr>
                </thead>

                <tbody className="tablebody table-space">
                  {newState.map((item, key) => {
                    return (
                      <tr
                        onClick={() => onClickofScheduleDtails(item, key)}
                        className={
                          key === scheduleDetailsRow?.index
                            ? "selcted-row-clr"
                            : ""
                        }
                      >
                        <td>{key + 1}</td>
                        <td>{item.DwgName}</td>
                        <td>{item.Mtrl_Code}</td>
                        <td>{item.Mtrl_Source}</td>
                        <td>{item.Operation}</td>
                        <td>{item.QtyScheduled}</td>
                        <td>{item.QtyProgrammed}</td>
                        <td>{item.QtyProduced}</td>
                        <td>{item.QtyCleared}</td>
                        <td>{item.QtyPacked}</td>
                        <td>{item.QtyDelivered}</td>
                        <td>{item.JWCost}</td>
                        <td>{item.MtrlCost}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </Tab>

          <Tab eventKey="Task and Material List" title="Task and Material List">
            <div className="row mt-3">
              <div style={{ display: "flex", gap: "170px" }}>
                <h5 className="mt-3">Task List</h5>
                <button className="button-style mb-2">Performance</button>
              </div>
              <div className="col-md-6">
                <div style={{ overflowY: "scroll" }}>
                  <Table
                    striped
                    className="table-data border mt-2"
                    style={{
                      border: "1px",
                      height: "300px",
                      overflowY: "scroll",
                    }}
                  >
                    <thead className="tableHeaderBGColor table-space">
                      <tr>
                        <th>Task No</th>
                        <th>Material</th>
                        <th>Source</th>
                        <th>Operation</th>
                        <th>Dwgs</th>
                        <th>Total Parts</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Machine</th>
                      </tr>
                    </thead>
                    <tbody className="tablebody">
                      {TaskMaterialData.map((value, key) => {
                        return (
                          <>
                            <tr
                              onClick={() =>
                                onRowSelectTaskMaterialTable(value, key)
                              }
                              className={
                                key === rowselectTaskMaterial?.index
                                  ? "selcted-row-clr"
                                  : ""
                              }
                            >
                              <td>{value.TaskNo}</td>
                              <td>{value.Mtrl_Code}</td>
                              <td>{value.CustMtrl}</td>
                              <td>{value.Operation}</td>
                              <td>{value.NoOfDwgs}</td>
                              <td>{value.TotalParts}</td>
                              <td>{value.Priority}</td>
                              <td>{value.TStatus}</td>
                              <td>{value.Machine}</td>
                            </tr>
                          </>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
              </div>
              <div className="col-md-6">
                <div style={{ overflowY: "scroll" }}>
                  <Table
                    striped
                    className="table-data border mt-2"
                    style={{
                      border: "1px",
                      height: "300px",
                      overflowY: "scroll",
                    }}
                  >
                    <thead className="tableHeaderBGColor table-space">
                      <tr>
                        <th>Dwg Part Name</th>
                        <th>Quantity</th>
                        <th>Nested</th>
                        <th>Produced</th>
                        <th>Cleared</th>
                      </tr>
                    </thead>
                    <tbody className="tablebody">
                      {newState.map((item, key) => {
                        return (
                          <tr>
                            <td>{item.DwgName}</td>
                            <td>{item.QtyScheduled}</td>
                            <td>{item.QtyPacked}</td>
                            <td>{item.QtyProduced}</td>
                            <td>{item.QtyCleared}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div
                className="col-md-6"
                style={{
                  overflowY: "scroll",
                }}
              >
                {/* <Table
                  striped
                  className="table-data border mt-2"
                  style={{
                    border: "1px",
                    height: "300px",
                    overflowY: "scroll",
                  }}
                >
                  <thead className="tableHeaderBGColor table-space">
                    <tr>
                      <th>Length(mm)</th>
                      <th>Width(mm)</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody className="tablebody"></tbody>
                </Table> */}
              </div>
              {/* <div
                className="col-md-2"
                style={{ width: "260px", marginLeft: "30px" }}
              > */}
              {/* <div className="ip-box form-bg"> */}
              {/* <h5>
                    <b>Task Material</b>
                  </h5>

                  <label className="form-label">Task No</label>
                  <input
                    style={{ width: "200px" }}
                    type="number"
                    className="in-fields"
                  /> */}
              {/* 
                  <label className="form-label">Length</label>
                  <input style={{ width: "200px" }} className="in-fields" />

                  <label className="form-label">Width</label>
                  <input style={{ width: "200px" }} className="in-fields" />

                  <label className="form-label">Quantity</label>
                  <input style={{ width: "200px" }} className="in-fields" /> */}

              {/* <div className="row justify-content-center mt-3 mb-3">
                    <button className="button-style" style={{ width: "120px" }}>
                      Save
                    </button>
                  </div> */}
              {/* </div> */}
              {/* </div> */}
            </div>
          </Tab>

          {/* <Tab eventKey="Material Planner" title="Material Planner">
            <div className="row mt-3">
              <div className="col-md-2 col-sm-12">
                <button className="button-style ">Create DXF WS</button>
              </div>

              <div className="col-md-2 col-sm-12">
                <button className="button-style ">Create Parts WS</button>
              </div>

              <div className="col-md-2 col-sm-12">
                <button className="button-style ">Read WS</button>
              </div>

              <div className="col-md-2 col-sm-12">
                <button className="button-style ">Print Estimate</button>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-md-7 col-sm-12">
                <div
                  className=""
                  style={{ overflowX: "scroll", overflowY: "scroll" }}
                >
                  <Table
                    striped
                    className="table-data border"
                    style={{ border: "1px", height: "200px" }}
                  >
                    <thead className="tableHeaderBGColor">
                      <tr>
                        <th style={{ whiteSpace: "nowrap" }}>Task No</th>
                        <th>Material</th>
                        <th>Source</th>
                        <th>Operation</th>
                        <th>Dwgs</th>
                        <th style={{ whiteSpace: "nowrap" }}>Total Parts</th>
                        <th style={{ whiteSpace: "nowrap" }}>Nc Task Id</th>
                        <th style={{ whiteSpace: "nowrap" }}>Task No</th>
                        <th style={{ whiteSpace: "nowrap" }}>Schedule ID</th>
                      </tr>
                    </thead>

                    <tbody className="tablebody"></tbody>
                  </Table>
                </div>

                <div className="row mt-2">
                  <div
                    className="col-md-8 col-sm-12"
                    style={{ overflowX: "scroll", overflowY: "scroll" }}
                  >
                    <Table
                      striped
                      className="table-data border"
                      style={{ border: "1px", height: "190px" }}
                    >
                      <thead className="tableHeaderBGColor">
                        <tr>
                          <th>Length(mm)</th>
                          <th>Width(mm)</th>
                          <th>Quantity</th>
                          <th>Id</th>
                          <th style={{ whiteSpace: "nowrap" }}>Nc Task Id</th>
                          <th style={{ whiteSpace: "nowrap" }}>Task No</th>
                          <th>Length</th>
                          <th>Width</th>
                          <th>Quantity</th>
                          <th style={{ whiteSpace: "nowrap" }}>Limit To Qty</th>
                        </tr>
                      </thead>

                      <tbody className="tablebody"></tbody>
                    </Table>
                  </div>

                  <div className="col-md-4 col-sm-12">
                    <Form style={{ width: "214px" }}>
                      <div className="ip-box form-bg">
                        <h4>
                          <b>Task No</b>
                        </h4>

                        <div className="row">
                          <div className="col-md-5 col-sm-12">
                            <label className=" form-label mt-2">Length</label>
                            <label className="form-label mt-3">Width</label>
                            <label
                              className=" form-label mt-3"
                              // style={{ marginLeft: "-12px" }}
                            >
                              Quantity
                            </label>
                          </div>

                          <div className="col-md-7 col-sm-12">
                            <input className="mt-2 in-fields" type="text" />
                            <input className="mt-3 in-fields" type="text" />
                            <input
                              className="mt-3 mb-5 in-fields"
                              type="text"
                            />
                          </div>
                        </div>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>

              <div
                className="col-md-5 col-sm-12"
                style={{ overflowX: "scroll" }}
              >
                <Table
                  striped
                  className="table-data border"
                  style={{ border: "1px" }}
                >
                  <thead className="tableHeaderBGColor">
                    <tr>
                      <th>Dwg Part Name</th>
                      <th>Quantity</th>
                      <th>Nested</th>
                      <th>Produced</th>
                      <th>Cleared</th>
                    </tr>
                  </thead>

                  <tbody className="tablebody"></tbody>
                </Table>
              </div>
            </div>
          </Tab> */}

          <Tab eventKey="Packing Notes/Invoices" title="Packing Notes/Invoices">
            <PackingNoteAndInvoice
              PNAndInvRegisterData={PNAndInvRegisterData}
              PNAndInvDetailsData={PNAndInvDetailsData}
            />
          </Tab>
        </Tabs>
      </div>

      <AlertModal
        show={profileOrder1}
        onHide={(e) => setProfileOrder1(e)}
        firstbutton={profileOrderOpen2}
        secondbutton={profileOrderClose1}
        title="magod_Order"
        message="Do you wish to create or use internal order for this schedule."
        firstbuttontext="Yes"
        secondbuttontext="No"
      />

      <AlertModal
        show={profileOrder2}
        onHide={(e) => setProfileOrder2(e)}
        firstbutton={profileOrderClose2}
        title="magod_Order"
        message="Order Created"
        firstbuttontext="Ok"
      />

      <AlertModal
        show={fixtureOrder1}
        onHide={(e) => setFixtureOrder1(e)}
        firstbutton={fixtureOrderOpen2}
        secondbutton={fixtureOrderClose1}
        title="magod_Order"
        message="Do you wish to create or use internal order for this schedule"
        firstbuttontext="Yes"
        secondbuttontext="No"
      />

      <AlertModal
        show={fixtureOrder2}
        onHide={(e) => setFixtureOrder2(e)}
        firstbutton={fixtureOrderClose2}
        title="magod_Order"
        message="Order Created"
        firstbuttontext="Ok"
      />

      <AlertModal
        show={schedule}
        onHide={(e) => setSchedule(e)}
        firstbutton={closeSchedule}
        title="magod_Order"
        message="Scheduled"
        firstbuttontext="Ok"
      />
    </div>
  );
}

export default ServiceOpenSchedule;
