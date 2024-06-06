import React, { useEffect, useState } from "react";
import { Tabs, Tab, Table, Form } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AlertModal from "../../../Components/Alert";
import { getRequest, postRequest } from "../../../../../../../api/apiinstance";
import { endpoints } from "../../../../../../../api/constants";
import { ToastContainer, toast } from "react-toastify";
import PackingNoteAndInvoice from "./Tabs/PackingNoteAndInvoice";
import { Create } from "@mui/icons-material";
import ServiceModal from "./Service/ServiceModal";

function ServiceOpenSchedule() {
  const location = useLocation(); // Access location object using useLocation hook
  const DwgNameList = location?.state || []; // Get DwgNameList from location state

  //  console.log("DwgNameList is", DwgNameList[0]);

  // Standardize the case of the property name
  const scheduleId = DwgNameList[0]?.ScheduleId || DwgNameList[0]?.ScheduleID;

  // Set initial state of newState to DwgNameList
  const [newState, setNewState] = useState(DwgNameList);
  const [scheduleDetailsRow, setScheduleDetailsRow] = useState({});

  useEffect(() => {
    postRequest(
      endpoints.ShiftDetails,
      { ScheduleId: scheduleId },
      (response) => {
        setNewState(response);
      }
    );
  }, []);

  let [profileOrder1, setProfileOrder1] = useState(false);
  let [profileOrder2, setProfileOrder2] = useState(false);
  let [fixtureOrder1, setFixtureOrder1] = useState(false);

  const [openTask, setOpenTask] = useState(false);

  let profileOrderOpen1 = (e) => {
    postRequest(
      endpoints.getProfileOrderStatus,
      { formdata },
      (response) => {
       if(response.status===true){
        if (response.data[0].Type === "Service") {
          navigate("/Orders/Service/ScheduleCreationForm", {
            state: response.data[0].Order_No,
          });
        } else if (response.data[0].Type === "Profile") {
          navigate("/Orders/Profile/ScheduleCreationForm", {
            state: response.data[0].Order_No,
          });
        } else if (response.data[0].Type === "Fabrication") {
          navigate("/Orders/Fabrication/ScheduleCreationForm", {
            state: response.data[0].Order_No,
          });
        }
       }
       else{
        setProfileOrder1(true);
      }
      }
    );
  };

  let profileOrderClose1 = () => {
    setProfileOrder1(false);
  };

  // let profileOrderOpen2 = () => {
  //   setProfileOrder1(false);
  //   setProfileOrder2(true);
  // };

  let profileOrderClose2 = () => {
    setProfileOrder2(false);
  };

  let fixtureOrderOpen1 = () => {
    postRequest(
      endpoints.getFixtureStatus,
      { formdata },
      (response) => {
       if(response.status===true){
        if (response.data[0].Type === "Service") {
          navigate("/Orders/Service/ScheduleCreationForm", {
            state: response.data[0].Order_No,
          });
        } else if (response.data[0].Type === "Profile") {
          navigate("/Orders/Profile/ScheduleCreationForm", {
            state: response.data[0].Order_No,
          });
        } else if (response.data[0].Type === "Fabrication") {
          navigate("/Orders/Fabrication/ScheduleCreationForm", {
            state: response.data[0].Order_No,
          });
        }
       }
       else{
         setFixtureOrder1(true);
       }
      }
    );
  };

  let fixtureOrderClose1 = () => {
    setFixtureOrder1(false);
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
    if (DwgNameList.length === 0) return; // Ensure DwgNameList is not empty

    postRequest(
      endpoints.getScheduleListgetFormDetails,
      {
        Cust_Code: DwgNameList[0]?.Cust_Code,
        ScheduleId: scheduleId,
      },
      (response) => {
        setFormdata(response);
        postRequest(
          endpoints.getAllPNAndInvRegisterbyOrderNo,
          { Order_No: response[0]?.Order_No },
          (PNAndInvData) => {
            setPNAndInvRegisterData(PNAndInvData.registerData);
            setPNAndInvDetailsData(PNAndInvData.detailsData);
          }
        );
      }
    );
  }, [DwgNameList[0]]);

  //get Sales Contact
  const [ProgramEngineer, setProgramEngineer] = useState([]);
  useEffect(() => {
    getRequest(endpoints.getSalesContact, (response) => {
      //  console.log("response is", response);
      setProgramEngineer(response);
    });
  }, []);

  // //Onclick of Table
  // const [scheduleDetailsRow, setScheduleDetailsRow] = useState({});
  // const onClickofScheduleDtails = (item, index) => {
  //   let list = { ...item, index: index };
  //   setScheduleDetailsRow(list);
  // };


  // console.log(scheduleDetailsRow);

  //get Task and Material Tab Data
  const [TaskMaterialData, setTaskMaterialData] = useState([]);
  useEffect(() => {
    if (scheduleDetailsRow) {
      postRequest(
        endpoints.getScheduleListTaskandMaterial,
        { scheduleDetailsRow },
        (response) => {
          setTaskMaterialData(response);
          setRowSelectTaskMaterial({ ...response[0], index: 0 });
        }
      );
    }
  }, [scheduleDetailsRow]); // Watch for changes in scheduleDetailsRow

  //row onClick of Task Material First Table
  const [rowselectTaskMaterial, setRowSelectTaskMaterial] = useState({});
  const [tmDwgList, setTmDwgList] = useState([]);
  const onRowSelectTaskMaterialTable = (item, index) => {
    let list = { ...item, index: index };
    setRowSelectTaskMaterial(list);
      postRequest(endpoints.getDwgListData, { list }, (response) => {
        // console.log("response is", response);
        setTmDwgList(response);
      });
  };

  //Default first row select for Task and Mterial
  useEffect(() => {
    if (TaskMaterialData.length > 0 && !rowselectTaskMaterial.TaskNo) {
      onRowSelectTaskMaterialTable(TaskMaterialData[0], 0); // Select the first row
    }
  }, [TaskMaterialData, rowselectTaskMaterial, onRowSelectTaskMaterialTable]);

  // console.log("rowselectTaskMaterial",rowselectTaskMaterial);

  //Onclick of Table
  const onClickofScheduleDtails = (item, index) => {
    let list = { ...item, index: index };
    setScheduleDetailsRow(list);
    postRequest(
      endpoints.getScheduleListTaskandMaterial,
      { scheduleDetailsRow: list },
      (response) => {
        setTaskMaterialData(response);
        setRowSelectTaskMaterial({ ...response[0], index: 0 });
      }
    );
  };
  
  useEffect(() => {
    if (rowselectTaskMaterial.length === undefined && TaskMaterialData[0]) {
      postRequest(endpoints.getDwgListData, { list: TaskMaterialData[0] }, (response) => {
        setTmDwgList(response);
      });
    } 
  }, [TaskMaterialData, rowselectTaskMaterial]);


  //Default first row select
  useEffect(() => {
    if (newState.length > 0 && !scheduleDetailsRow.TaskNo) {
      onClickofScheduleDtails(newState[0], 0); // Select the first row
    }
  }, [newState, scheduleDetailsRow, onClickofScheduleDtails]);

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
        postRequest(
          endpoints.getScheduleListgetFormDetails,
          {
            Cust_Code: DwgNameList[0]?.Cust_Code,
            ScheduleId: DwgNameList[0]?.ScheduleId,
          },
          (response) => {
            setFormdata(response);
          }
        );
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

  console.log("changedEngineer is",changedEngineer);

  //Onclick save Button
  const onClickSave = () => {
    console.log("changedEngineer is",changedEngineer);
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
        console.log("response is",response);
        toast.success("Saved", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    );
  };

  //Onclick Suspend
  const OnClickSuspend = () => {
    if (formdata[0]?.Schedule_Status === "Suspended") {
      postRequest(
        endpoints.releaseSuspended,
        {
          formdata,
        },
        (response) => {
          toast.success("Success", {
            position: toast.POSITION.TOP_CENTER,
          });
          postRequest(
            endpoints.getScheduleListgetFormDetails,
            {
              Cust_Code: DwgNameList[0]?.Cust_Code,
              ScheduleId: DwgNameList[0]?.ScheduleId,
            },
            (response) => {
              setFormdata(response);
            }
          );
        }
      );
    } else {
      postRequest(endpoints.onClickSuspend, { formdata }, (response) => {
        if (
          response.message ===
          "Clear Order Suspension of the order before trying to clear it for schedule"
        ) {
          toast.warning(
            "Clear Order Suspension of the order before trying to clear it for schedule",
            {
              position: toast.POSITION.TOP_CENTER,
            }
          );
        } else {
          toast.success("Suspended", {
            position: toast.POSITION.TOP_CENTER,
          });
          postRequest(
            endpoints.getScheduleListgetFormDetails,
            {
              Cust_Code: DwgNameList[0]?.Cust_Code,
              ScheduleId: DwgNameList[0]?.ScheduleId,
            },
            (response) => {
              setFormdata(response);
            }
          );
        }
      });
    }
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
        toast.success("Schedules cancelled successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
        postRequest(
          endpoints.getScheduleListgetFormDetails,
          {
            Cust_Code: DwgNameList[0]?.Cust_Code,
            ScheduleId: DwgNameList[0]?.ScheduleId,
          },
          (response) => {
            setFormdata(response);
          }
        );
      }
    });
  };

  //Scheduled
  const [openScheduleModal, setOpenScheduleModal] = useState(false);
  const [responseSchedule, setResponseSchedule] = useState("");
  const [delelteAskModal, setDeleteAskModal] = useState(false);
  const [deleteResponse, setDeleteResponse] = useState("");
  const onClickScheduled = () => {
    postRequest(
      endpoints.onClickScheduled,
      { scheduleDetailsRow, formdata, newState },
      (response) => {
        if (response.message === "Scheduled") {
          toast.success(response.message, {
            position: toast.POSITION.TOP_CENTER,
          });

          // Introducing a delay of 1000 milliseconds (1 second)
          setTimeout(() => {
            postRequest(
              endpoints.ShiftDetails,
              { ScheduleId: DwgNameList[0].ScheduleId },
              (response) => {
                setNewState(response);
              }
            );
          }, 3000);
        } else if (
          response.message.startsWith("Cannot Schedule Zero Quantity For")
        ) {
          setDeleteAskModal(true);
          setDeleteResponse(response.message);
        } else {
          setOpenScheduleModal(true);
          setResponseSchedule(response.message);
        }

        postRequest(
          endpoints.getScheduleListgetFormDetails,
          {
            Cust_Code: DwgNameList[0]?.Cust_Code,
            ScheduleId: DwgNameList[0]?.ScheduleId,
          },
          (response) => {
            setFormdata(response);
          }
        );
      }
    );
  };

  //onClick of yes Payment ALert Modal
  const onClickScheduleYes = () => {
    setOpenScheduleModal(false);
    toast.warning("Caution Customer for Payment ", {
      position: toast.POSITION.TOP_CENTER,
    });
    toast.warning("Not Scheduled", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  //onClick No For Payment ALert Modal
  const onClickScheduleNo = () => {
    setOpenScheduleModal(false);
    toast.warning("Unit Head needs to approve this personally", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  //Onclick of Yes for Zero Quantity(Delete Dwg)
  const onclickYes = () => {
    setDeleteAskModal(false);
    toast.warning("Deleted Sucessfully", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  //OnClick NCProgram
  const navigate = useNavigate();
  const onClickNCProgram = () => {
    console.log("rowselectTaskMaterial........",rowselectTaskMaterial)
    postRequest(
      endpoints.onClickNCProgram,
      { rowselectTaskMaterial },
      (response) => {
        console.log(" first response ......", response)
        postRequest(
          endpoints.getMachineList,
          { NCprogramForm: response },
          (responsedata) => {
            console.log("API second response:", responsedata);
            navigate("/Orders/Service/NCProgram", {
              state: { response: response, responsedata: responsedata },
            });
          }
        );
      }
    );
  };

  //onClick Tasked
  const onClickTasked = () => {
    //  console.log(scheduleDetailsRow);
    postRequest(endpoints.onClickTask, { scheduleDetailsRow }, (response) => {
      // console.log("response of Scheduled is",response);
      toast.success(response.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    });
  };

  //onClicked Performance
  const [Performancedata, setPerformancedata] = useState([]);
  const [showPerformancedata, setShowPerformance] = useState(false);
  const onClickPerformance = () => {
    postRequest(endpoints.onClickPerformance, { formdata }, (response) => {
      setPerformancedata(response);
      setShowPerformance(true);
      //  console.log(response);
    });
  };

  //OnClick Yes Fixture Order
  const [fixturedata, setFixtureData] = useState([]);
  const onClickYesFixtureOrder = () => {
    postRequest(endpoints.onClickFixtureOrder, { formdata }, (response) => {
      toast.success("Order Created", {
        position: toast.POSITION.TOP_CENTER,
      });
      setFixtureData(response);
      setFixtureOrder1(false);
      // console.log("response",response);
      if (response[0].Type === "Service") {
        navigate("/Orders/Service/ScheduleCreationForm", {
          state: response[0].Order_No,
        });
      } else if (response[0].Type === "Profile") {
        navigate("/Orders/Profile/ScheduleCreationForm", {
          state: response[0].Order_No,
        });
      } else if (response[0].Type === "Fabrication") {
        navigate("/Orders/Fabrication/ScheduleCreationForm", {
          state: response[0].Order_No,
        });
      }
    });
  };

  //onClick of Profile Orders
  const [profileOrders, setProfileOrders] = useState([]);
  const onClickYesProfileOrders = () => {
    postRequest(endpoints.onClickProfileOrder, { formdata }, (response) => {
      toast.success("Order Created", {
        position: toast.POSITION.TOP_CENTER,
      });
      setProfileOrders(response);
      setProfileOrder1(false);
      navigate("/Orders/Profile/ScheduleCreationForm", {
        state: response[0].Order_No,
      });
    });
  };

  //set OrderSchNo
  const ScheduleNo = formdata[0]?.ScheduleNo;
  const Orsch =
    formdata[0]?.Order_No +
    " " +
    (ScheduleNo != null && ScheduleNo !== "null" && ScheduleNo !== undefined
      ? ScheduleNo
      : "");

  //CHECK STATUS
  const checkstatus = () => {
    postRequest(
      endpoints.getScheduleListgetFormDetails,
      {
        Cust_Code: DwgNameList[0]?.Cust_Code,
        ScheduleId: DwgNameList[0]?.ScheduleId,
      },
      (response) => {
        setFormdata(response);
      }
    );
  };

  // Onclick MPdf Open
  const [serviceOpen, setServiceOpen] = useState(false);
  const OnclickPdfOpen = () => {
    setServiceOpen(true);
  };

  // console.log("formdata is",formdata);

  //
  const handleSchedulelist = (index, field, value) => {
    // console.log("value is",value);
    const updatedDwgdata = [...newState]; // Create a copy of the array
    // Update the specific item's field with the new value
    // console.log("updatedDwgdata",updatedDwgdata);
    updatedDwgdata[index] = {
      ...updatedDwgdata[index],
      [field]: value,
    };
    setNewState(updatedDwgdata);
  };

  // console.log("newState is",newState);

  
    // //Default first row select
    useEffect(() => {
      if (newState.length > 0 && !scheduleDetailsRow.TaskNo) {
        onClickofScheduleDtails(newState[0], 0); // Select the first row
      }
    }, [newState, scheduleDetailsRow, onClickofScheduleDtails]);
  

  return (
    <div>
      <h4 className="title">Order Schedule Details</h4>
      <label className="form-label ms-2">Service</label>

      <div className="row">
        <div
          className="d-flex field-gap col-md-4 sm-12"
          style={{ gap: "62px" }}
        >
          <label className="form-label">Customer</label>
          <input
            className="in-field"
            type="text"
            value={formdata[0]?.Cust_name}
            disabled
          />
        </div>

        <div
          className="d-flex field-gap col-md-4 sm-12"
          style={{ gap: "25px" }}
        >
          <label className="form-label label-space">Sales Contact</label>
          <input
            className="in-field"
            type="text"
            value={formdata[0]?.SalesContact}
            disabled
          />
        </div>

        <div
          className="d-flex field-gap col-md-4 sm-12"
          style={{ gap: "15px" }}
        >
          <label className="form-label label-space">Schedule No</label>
          <input
            className="in-field"
            type="text"
            value={
              formdata[0]?.Schedule_Status === "Created"
                ? Orsch
                : formdata[0]?.OrdSchNo
            }
            disabled
          />
        </div>
      </div>

      <div className="row mt-2">
        <div
          className="d-flex field-gap col-md-4 sm-12"
          style={{ gap: "35px" }}
        >
          <label className="form-label label-space">Schedule Type</label>
          <input
            className="in-field"
            type="text"
            value={formdata[0]?.ScheduleType}
            disabled
          />
        </div>

        <div className="d-flex field-gap col-md-4 sm-12">
          <label className="form-label label-space">Schedule Status</label>
          <input
            className="in-field"
            type="text"
            value={formdata[0]?.Schedule_Status}
            disabled
          />
        </div>

        <div
          className="d-flex field-gap col-md-4 sm-12"
          style={{ gap: "70px" }}
        >
          <label className="form-label">PO</label>
          <input
            className="in-field"
            type="text"
            value={formdata[0]?.PO}
            disabled
          />
        </div>
      </div>

      <div className="row mt-2">
        <div
          className="d-flex field-gap col-md-4 sm-12"
          style={{ gap: "12px" }}
        >
          <label className="form-label label-space">Program Engineer</label>
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

        <div
          className="d-flex field-gap col-md-4 sm-12"
          style={{ gap: "35px" }}
        >
          <label className="form-label label-space">Target Date</label>
          <input
            className="in-field"
            type="date"
            value={formatDate(formdata[0]?.schTgtDate)}
            disabled
          />
        </div>
        <div className="d-flex field-gap col-md-4 sm-12">
          <label className="form-label label-space">Delivery Date</label>
          <input
            className="in-field"
            type="date"
            value={deliveryDate}
            onChange={handleChangeDeliveryDate}
          />
        </div>
      </div>

      <div className="row mt-2">
        <div className="d-flex field-gap col-md-4 sm-12">
          <label className="form-label label-space">Special Instruction</label>
          <textarea
            className="in-field"
            onChange={handleChangeSpecialInstruction}
            id="exampleFormControlTextarea1"
            rows="3"
            style={{ width: "360px", height: "50px" }}
            value={formdata[0]?.Special_Instructions}
          ></textarea>
        </div>

        <div className="col-md-8 sm-12">
          <button
            className="button-style"
            onClick={OnClickSuspend}
            disabled={
              formdata[0]?.Schedule_Status === "Created" ||
              formdata[0]?.Schedule_Status === "Dispatched" ||
              formdata[0]?.Schedule_Status === "Completed" ||
              formdata[0]?.Schedule_Status === "Inspected" ||
              formdata[0]?.Schedule_Status === "Closed" ||
              formdata[0]?.Schedule_Status === "ShortClosed" ||
              formdata[0]?.Schedule_Status === "Cancelled"
            }
          >
            {formdata[0]?.Schedule_Status === "Suspended"
              ? "Release"
              : "Suspend"}
          </button>

          <button
            className="button-style"
            onClick={onClickShortClose}
            disabled={
              formdata[0]?.Schedule_Status === "Dispatched" ||
              formdata[0]?.Schedule_Status === "Cancelled" ||
              formdata[0]?.Schedule_Status === "Closed" ||
              formdata[0]?.Schedule_Status === "ShortClosed" ||
              formdata[0]?.Schedule_Status === "Suspended" ||
              formdata[0]?.Schedule_Status === "Created" ||
              formdata[0]?.Schedule_Status === "Scheduled" ||
              formdata[0]?.Schedule_Status === "Tasked"
            }
          >
            ShortClose
          </button>

          <button
            className="button-style"
            onClick={onClickCancel}
            disabled={
              formdata[0]?.Schedule_Status === "Dispatched" ||
              formdata[0]?.Schedule_Status === "Cancelled" ||
              formdata[0]?.Schedule_Status === "Closed" ||
              formdata[0]?.Schedule_Status === "ShortClosed" ||
              formdata[0]?.Schedule_Status === "Suspended" ||
              formdata[0]?.Schedule_Status === "Created" ||
              formdata[0]?.Schedule_Status === "Completed" ||
              formdata[0]?.Schedule_Status === "Inspected" ||
              formdata[0]?.Schedule_Status === "Ready" ||
              formdata[0]?.Schedule_Status === "Programmed" ||
              formdata[0]?.Schedule_Status === "Production"
            }
          >
            Cancel
          </button>

          <Link
            to={"/Orders/Service/ScheduleCreationForm"}
            state={formdata[0]?.Order_No}
          >
            <button className="button-style">Close</button>
          </Link>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12 col-sm-3">
          <button
            className="button-style"
            onClick={onClickScheduled}
            disabled={
              formdata[0]?.Schedule_Status === "Dispatched" ||
              formdata[0]?.Schedule_Status === "Cancelled" ||
              formdata[0]?.Schedule_Status === "Closed" ||
              formdata[0]?.Schedule_Status === "ShortClosed" ||
              formdata[0]?.Schedule_Status === "Suspended" ||
              formdata[0]?.Schedule_Status === "Scheduled" ||
              formdata[0]?.Schedule_Status === "Tasked" ||
              formdata[0]?.Schedule_Status === "Ready" ||
              formdata[0]?.Schedule_Status === "Programmed" ||
              formdata[0]?.Schedule_Status === "Production" ||
              formdata[0]?.Schedule_Status === "Completed" ||
              formdata[0]?.Schedule_Status === "Inspected"
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
            }
            `}
            </style>
          )}

          {/* <Link to={"/Orders/Service/NCProgram"}   state={scheduleDetailsRow}> */}
          <button
            className="button-style "
            onClick={onClickNCProgram}
            disabled={
              formdata[0]?.Schedule_Status === "Dispatched" ||
              formdata[0]?.Schedule_Status === "Cancelled" ||
              formdata[0]?.Schedule_Status === "Closed" ||
              formdata[0]?.Schedule_Status === "ShortClosed" ||
              formdata[0]?.Schedule_Status === "Suspended" ||
              formdata[0]?.Schedule_Status === "Created"
            }
          >
            NC Program
          </button>
          {/* </Link> */}

          <button
            className="button-style"
            onClick={onClickTasked}
            disabled={
              formdata[0]?.Schedule_Status === "Dispatched" ||
              formdata[0]?.Schedule_Status === "Cancelled" ||
              formdata[0]?.Schedule_Status === "Closed" ||
              formdata[0]?.Schedule_Status === "ShortClosed" ||
              formdata[0]?.Schedule_Status === "Suspended" ||
              formdata[0]?.Schedule_Status === "Created" ||
              formdata[0]?.Schedule_Status === "Tasked" ||
              formdata[0]?.Schedule_Status === "Ready" ||
              formdata[0]?.Schedule_Status === "Programmed" ||
              formdata[0]?.Schedule_Status === "Production" ||
              formdata[0]?.Schedule_Status === "Completed" ||
              formdata[0]?.Schedule_Status === "Inspected"
            }
          >
            Task
          </button>
          <style>
            {`
            .button-style[disabled] {
                background-color: grey;
            }
            `}
          </style>

          <button
            className="button-style"
            onClick={onClickSave}
            disabled={
              formdata[0]?.Schedule_Status === "Dispatched" ||
              formdata[0]?.Schedule_Status === "Cancelled" ||
              formdata[0]?.Schedule_Status === "Closed" ||
              formdata[0]?.Schedule_Status === "ShortClosed" ||
              formdata[0]?.Schedule_Status === "Suspended"
            }
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

          <button
            className="button-style"
            onClick={checkstatus}
            disabled={
              formdata[0]?.Schedule_Status === "Dispatched" ||
              formdata[0]?.Schedule_Status === "Cancelled" ||
              formdata[0]?.Schedule_Status === "Closed" ||
              formdata[0]?.Schedule_Status === "ShortClosed" ||
              formdata[0]?.Schedule_Status === "Suspended"
            }
          >
            Check Status
          </button>

          <button
            onClick={OnclickPdfOpen}
            className="button-style "
            disabled={
              formdata[0]?.Schedule_Status === "Dispatched" ||
              formdata[0]?.Schedule_Status === "Cancelled" ||
              formdata[0]?.Schedule_Status === "Closed" ||
              formdata[0]?.Schedule_Status === "ShortClosed" ||
              formdata[0]?.Schedule_Status === "Suspended" ||
              formdata[0]?.Schedule_Status === "Ready" ||
              formdata[0]?.Schedule_Status === "Programmed" ||
              formdata[0]?.Schedule_Status === "Production" ||
              formdata[0]?.Schedule_Status === "Completed" ||
              formdata[0]?.Schedule_Status === "Inspected" ||
              formdata[0]?.Schedule_Status === "Created"
            }
          >
            Print Schedule
          </button>

          {formdata.Type === "Profile" && (
            <button
              className="button-style"
              onClick={profileOrderOpen1}
              disabled={
                formdata[0]?.Schedule_Status !== "Scheduled" ||
                formdata[0]?.Schedule_Status !== "Tasked"
              }
            >
              Profile Order
            </button>
          )}

          <button
            className="button-style"
            onClick={fixtureOrderOpen1}
            disabled={
              formdata[0]?.Schedule_Status === "Dispatched" ||
              formdata[0]?.Schedule_Status === "Cancelled" ||
              formdata[0]?.Schedule_Status === "Closed" ||
              formdata[0]?.Schedule_Status === "ShortClosed" ||
              formdata[0]?.Schedule_Status === "Suspended" ||
              formdata[0]?.Schedule_Status === "Created" ||
              formdata[0]?.Schedule_Status === "Completed" ||
              formdata[0]?.Schedule_Status === "Ready"
            }
          >
            Fixture Order
          </button>

          {/* <button className="button-style" onClick={profileOrderOpen1}>
            Profile Order
          </button>

          <button className="button-style ">Show DXF</button> */}
        </div>
      </div>

      <div className="row">
        <Tabs className=" tab_font mt-1">
          <Tab eventKey="Schedule Details" title="Schedule Details">
            <div className="mt-1" style={{ overflow: "auto", height: "auto" }}>
              <Table
                striped
                className="table-data border table-space"
                style={{ border: "1px" }}
              >
                <thead className="tableHeaderBGColor table-space">
                  <tr>
                    <th>Srl</th>
                    <th>DwgName</th>
                    <th>Material</th>
                    <th>Source</th>
                    <th>Process</th>
                    {formdata[0]?.Schedule_Status === "Created" ? (
                      <th>To Schedule</th>
                    ) : null}
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
                        {formdata[0]?.Schedule_Status === "Created" ? (
                          <td>{item.QtyToSchedule}</td>
                        ) : null}
                        <td>
                          <input
                            className="table-cell-editor"
                            style={{
                              backgroundColor: "transparent",
                              border: "none",
                            }}
                            value={item.QtyScheduled}
                            onChange={(e) =>
                              handleSchedulelist(
                                key,
                                "QtyScheduled",
                                e.target.value
                              )
                            }
                          />
                        </td>
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

{/* Task and Material List */}
          <Tab eventKey="Task and Material List" title="Task and Material List">
            <div className="row">
              <div style={{ display: "flex", gap: "170px" }}>
                <label className="form-label mt-1">Task List</label>
                <button className="button-style" onClick={onClickPerformance}>
                  Performance
                </button>
              </div>
              <div className="col-md-6">
                <div
                  className="mt-1"
                  style={{ height: "auto", overflow: "auto" }}
                >
                  <Table
                    striped
                    className="table-data border table-space"
                    style={{
                      border: "1px",
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
                        {showPerformancedata && (
                          <>
                            <th>Machine Time</th>
                            <th>HourRate</th>
                            <th>TargetHourRate</th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody className="tablebody table-space">
                      {TaskMaterialData.map((value, key) => {
                        const performanceRow = Performancedata.find(
                          (item) => item.NcTaskId === value.NcTaskId
                        );
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
                              {showPerformancedata && performanceRow && (
                                <>
                                  <td>
                                    {typeof performanceRow.MachineTime ===
                                    "number"
                                      ? Number(
                                          performanceRow.MachineTime
                                        ).toFixed(1)
                                      : performanceRow.MachineTime}
                                  </td>
                                  <td>
                                    {typeof performanceRow.HourRate === "number"
                                      ? performanceRow.HourRate.toFixed(2)
                                      : performanceRow.HourRate}
                                  </td>
                                  <td>
                                    {typeof performanceRow.TargetHourRate ===
                                    "number"
                                      ? performanceRow.TargetHourRate.toFixed(2)
                                      : performanceRow.TargetHourRate}
                                  </td>
                                </>
                              )}
                            </tr>
                          </>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
              </div>
              <div className="col-md-6">
                <div
                  className="mt-1"
                  style={{ height: "auto", overflow: "auto" }}
                >
                  <Table
                    striped
                    className="table-data border table-space"
                    style={{
                      border: "1px",
                    }}
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
                    <tbody className="tablebody">
                      {tmDwgList.map((item, key) => {
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
            {/* <div className="row mt-4">
              <div
                className="col-md-6"
                style={{
                  overflowY: "scroll",
                }}
              >
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
                      <th>Length(mm)</th>
                      <th>Width(mm)</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody className="tablebody"></tbody>
                </Table>
              </div>
              <div
                className="col-md-2"
                style={{ width: "260px", marginLeft: "30px" }}
              >
              <div className="ip-box form-bg">
              <h5>
                    <b>Task Material</b>
                  </h5>

                  <label className="form-label">Task No</label>
                  <input
                    style={{ width: "200px" }}
                    type="number"
                    className="in-fields"
                  />
              
                  <label className="form-label">Length</label>
                  <input style={{ width: "200px" }} className="in-fields" />

                  <label className="form-label">Width</label>
                  <input style={{ width: "200px" }} className="in-fields" />

                  <label className="form-label">Quantity</label>
                  <input style={{ width: "200px" }} className="in-fields" />

              <div className="row justify-content-center mt-3 mb-3">
                    <button className="button-style" style={{ width: "120px" }}>
                      Save
                    </button>
                  </div>
              </div>
              </div>
            </div> */}
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
        firstbutton={onClickYesProfileOrders}
        secondbutton={profileOrderClose1}
        title="magod_Order"
        message="Do you wish to create or use internal order for this schedule."
        firstbuttontext="Yes"
        secondbuttontext="No"
      />
      {/* 
      <AlertModal
        show={profileOrder2}
        onHide={(e) => setProfileOrder2(e)}
        firstbutton={profileOrderClose2}
        title="magod_Order"
        message="Order Created"
        firstbuttontext="Ok"
      /> */}

      <AlertModal
        show={fixtureOrder1}
        onHide={(e) => setFixtureOrder1(e)}
        firstbutton={onClickYesFixtureOrder}
        secondbutton={fixtureOrderClose1}
        title="magod_Order"
        message="Do you wish to create or use internal order for this schedule?"
        firstbuttontext="Yes"
        secondbuttontext="No"
      />

      {/* Schedule Button */}
      <AlertModal
        show={openScheduleModal}
        onHide={(e) => setOpenScheduleModal(e)}
        firstbutton={onClickScheduleYes}
        secondbutton={onClickScheduleNo}
        title="magod_Order"
        message={responseSchedule}
        firstbuttontext="Yes"
        secondbuttontext="No"
      />

      {/* delete Modal */}
      <AlertModal
        show={delelteAskModal}
        onHide={(e) => setDeleteAskModal(e)}
        firstbutton={onclickYes}
        secondbutton={(e) => setDeleteAskModal(e)}
        title="magod_Order"
        message={deleteResponse}
        firstbuttontext="Yes"
        secondbuttontext="No"
      />

      <ServiceModal
        serviceOpen={serviceOpen}
        setServiceOpen={setServiceOpen}
        formdata={formdata}
      />
    </div>
  );
}

export default ServiceOpenSchedule;
