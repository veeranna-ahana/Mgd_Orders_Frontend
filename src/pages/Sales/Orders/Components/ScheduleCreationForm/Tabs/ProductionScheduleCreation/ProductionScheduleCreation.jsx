import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Tab, Table, Tabs, Form } from "react-bootstrap";
import { endpoints } from "../../../../../../api/constants";
import { postRequest } from "../../../../../../api/apiinstance";
import AlertModal from "../../../../Menus/Service/Components/Alert";
import { ToastContainer, toast } from "react-toastify";

export default function ProductionScheduleCreation({ OrderData,selectedItems,setScheduleListData}) {
  console.log("OrderData",OrderData);

  console.log("selectedItems",selectedItems);

  const [scheduleType, setScheduleType] = useState("Job Work");
  const [scheduleOption, setScheduleOption] = useState("Full Order");

  // Handle change for schedule type radio buttons
  const handleScheduleTypeChange = (event) => {
    const { value } = event.target;
    setScheduleType(value);
    console.log("Schedule Type:", value);
    if (OrderData) {
      fetchScheduleList(value);
    }
  };

  // API call to fetch schedule list
  const fetchScheduleList = (type) => {
    postRequest(endpoints.scheduleListbasedOnScheduleType,
      { OrderData, scheduleType: type },
      (response) => {
        // console.log("schedulelist response ", response);
        setScheduleListData(response);
      });
  };

  useEffect(() => {
    if (OrderData && scheduleType) {
      fetchScheduleList(scheduleType);
    }
  }, [OrderData, scheduleType]); 
  
  // Handle change for schedule option radio buttons
  const handleScheduleOptionChange = (event) => {
    const { value } = event.target;
    setScheduleOption(value);
    console.log("Schedule Option:", value);
    if(value==='Partial Order'){
      toast.warning("Only Selected Serials will be included in the Schedule", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    else{
      toast.warning("All Serials will be included in the Schedule", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  console.log("selected Schedule type is ",scheduleType,"selected schedule option is",scheduleOption);

  //onclick Refresh Status
  const onClickRefreshStatus = () => {
    toast.success("Status Updated", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  //Onclick Create Schedule
  const createSchedule=()=>{
    // console.log(selectedItems.length,scheduleOption);
  if(selectedItems.length===0 && scheduleOption==='Partial Order'){
    toast.warning('Select Parts to add to Schedule', {
      position: toast.POSITION.TOP_CENTER,
    });
  }
  else{
    postRequest(endpoints.CreateSchedule,
       { OrderData,scheduleType:scheduleType,selectedItems,scheduleOption:scheduleOption }, 
       (response) => {
        // console.log("response is",response);
        if(response.message==='Successfully Inserted'){
          toast.success(response.message, {
            position: toast.POSITION.TOP_CENTER,
          });
          postRequest(
            endpoints.getScheduleListData,
            { Order_No: OrderData.Order_No },
            (response) => {
              setScheduleListData(response);
            }
          );
        }
        else{
          toast.warning(response.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
    });
  }
  }

  //Onclick of ShortClose
  const [openShortClose, setOpenShortClose] = useState(false);
  const onClickShortClose = () => {
    if (OrderData?.Order_Status === "ShortClosed") {
      setOpenShortClose(true);
    } else {
      toast.warning("Cancel Schedule No {0} before short closing the order", {
        position: toast.POSITION.TOP_CENTER,
      });
      postRequest(endpoints.shortcloseOrder, { OrderData }, (response) => {
        console.log(response.message);
        toast.success(response.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
    }
  };

  //onclick of yes in Shortclose
  const onClickYes = () => {
    postRequest(endpoints.shortclosetoRecorded, { OrderData }, (response) => {
      setOpenShortClose(false);
      toast.success(response.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    });
  };

  //cancel Order
  const onClickCancel = () => {
    if (OrderData?.Order_Status === "Cancelled") {
      postRequest(endpoints.canceltoRecorded, { OrderData }, (response) => {
        // console.log(response.message);
        toast.success(response.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
    } else {
      postRequest(endpoints.cancelOrder, { OrderData }, (response) => {
        // console.log(response.message);
        if (response.message === "Order cancelled successfully") {
          toast.success(response.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          toast.warning(response.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
    }
  };

  //onClick Suspend Order
  const onClickSuspendOrder = () => {
    postRequest(endpoints.suspendOrder, { OrderData }, (response) => {
      toast.success(response.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    });
  };

  //open Folder
  const openFolder = () => {};

  return (
    <>
      <div className="">
        <div className="row mt-2">
          <div className="col-md-2 col-sm-12">
            <button className="button-style" onClick={onClickSuspendOrder}
            disabled={OrderData?.Order_Status==='Closed'|| OrderData?.Order_Status==='Cancelled' || OrderData?.Order_Status==='Dispatched' || OrderData?.Order_Status==='ShortClosed' || OrderData?.Order_Status==='Created' ||  OrderData?.Order_Status==='Recorded' || OrderData?.Order_Status==='Packed'|| OrderData?.Order_Status==='Produced'}
            >
              Suspended Order
            </button>

            <button className="button-style mt-2 " onClick={onClickCancel}
            disabled={OrderData?.Order_Status==='Closed'|| OrderData?.Order_Status==='Cancelled' || OrderData?.Order_Status==='Dispatched' || OrderData?.Order_Status==='Suspended'  ||  OrderData?.Order_Status==='Recorded' || OrderData?.Order_Status==='Packed'|| OrderData?.Order_Status==='Produced' || OrderData?.Order_Status==='ShortClosed'}
            >
              Cancel Order
            </button>

            <button className="button-style mt-2 " onClick={onClickShortClose}
             disabled={OrderData?.Order_Status==='Closed'|| OrderData?.Order_Status==='Cancelled' || OrderData?.Order_Status==='Dispatched' || OrderData?.Order_Status==='Suspended'  ||  OrderData?.Order_Status==='Recorded' || OrderData?.Order_Status==='Packed'|| OrderData?.Order_Status==='Produced' || OrderData?.Order_Status==='Created' }
            >
              Short Close
            </button>
          </div>

          <div className="col-md-4 col-sm-12">
            <h5 className="mt-2">
              <b>Schedule Type</b>
            </h5>
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <div className="row">
                  <div className="col-md-2 mt-2 col-sm-12">
                    <input
                    class="form-check-input"
                      type="radio"
                      name="scheduleType"
                      value="Sales"
                      onChange={handleScheduleTypeChange}
                    />
                  </div>
                  <div className="col-md-2 col-sm-12">
                    <label className="form-label">Sales</label>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-sm-12">
                <div className="row">
                  <div className="col-md-2 mt-2 col-sm-12">
                    <input
                    class="form-check-input"
                      type="radio"
                      name="scheduleType"
                      checked={scheduleType === "Job Work"}
                      value="Job Work"
                      onChange={handleScheduleTypeChange}
                    />
                  </div>
                  <div className="col-md-2 col-sm-12">
                    <label
                      className="form-label"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Job Work
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <h5 className="mt-2">
              <b>Schedule Option</b>
            </h5>
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <div className="row">
                  <div className="col-md-2 mt-2 col-sm-12">
                    <input
                    class="form-check-input"
                      type="radio"
                      name="scheduleOption"
                      value="Full Order"
                      checked={scheduleOption === "Full Order"}
                      onChange={handleScheduleOptionChange}
                    />
                  </div>
                  <div className="col-md-2 col-sm-12">
                    <label
                      className="form-label"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Full Order
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-sm-12">
                <div className="row">
                  <div className="col-md-2 mt-2 col-sm-12">
                    <input
                      type="radio"
                      class="form-check-input"
                      name="scheduleOption"
                      value="Partial Order"
                      onChange={handleScheduleOptionChange}
                    />
                  </div>
                  <div className="col-md-2 col-sm-12">
                    <label
                      className="form-label"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Partial Order
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-2 col-sm-12">
            <button className="button-style " onClick={onClickRefreshStatus}>
              Refresh Status
            </button>

            <button className="button-style mt-3 ">Clear Filter</button>

            <button className="button-style mt-3 " onClick={createSchedule}
             disabled={OrderData?.Order_Status==='Closed'|| OrderData?.Order_Status==='Cancelled' || OrderData?.Order_Status==='Dispatched' || OrderData?.Order_Status==='Suspended'  ||  OrderData?.Order_Status==='Packed'|| OrderData?.Order_Status==='Produced' || OrderData?.Order_Status==='Created' ||  OrderData?.Order_Status==='ShortClosed' }
            >Create Schedule</button>
          </div>
        </div>

        <div className="col-md-12 row">
          <div className="col-md-1"></div>

          <div className="col-md-6">
            <div className="row">
              <div className="col-md-4 mt-3 col-sm-12">
                <button className="button-style" onClick={openFolder}>
                  Open Folder
                </button>
              </div>
{/* 
              <div className="col-md-4 mt-3 col-sm-12">
                <button className="button-style">Check DXF</button>
              </div>

              <div className="col-md-4 mt-3 col-sm-12">
                <button className="button-style">Copy DXF</button>
              </div> */}
            </div>
          </div>

          <div className="col-md-5"></div>
        </div>
      </div>

      <AlertModal
        show={openShortClose}
        onHide={(e) => setOpenShortClose(e)}
        firstbutton={onClickYes}
        secondbutton={(e) => setOpenShortClose(e)}
        title="magod_Orders"
        message={`Do you wish to Reopen the Order?`}
        firstbuttontext="Yes"
        secondbuttontext="No"
      />
    </>
  );
}
