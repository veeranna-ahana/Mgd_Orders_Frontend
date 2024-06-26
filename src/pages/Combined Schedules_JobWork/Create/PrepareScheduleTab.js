import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { postRequest } from "../../api/apiinstance";
import { endpoints } from "../../api/constants";
import Popup from "../Components/Popup";

export default function PrepareScheduleTab({
  oderSchedule,
  custCode,
  rowselectleft,
  setRowSelectLeft,
  handleCheckboxChangeLeft,
  beforecombine,
  setBeforeCombine,
  onclickofLeftShiftButton,
  selectedRows,
  setSelectedRows,
  handleCheckboxChange,
  preapreScheduleData,
  setPrepareScheduleData,
  onclickpreapreScheduleButton,
  selectedSalesContact,
  storedDate,
  type,
}) {
  const [openCombinedSchedule, setOpenCombinedSchedule] = useState(false);
  const [openTasked, setOpenTasked] = useState(false);
  const [validationpopup, setValidationPopup] = useState();

  //open CombineSchedule Modal
  const openCombineScheduleModal = () => {
    setOpenCombinedSchedule(true);
  };

  //open Tasked Modal
  const openTaskedModal = () => {
    setOpenTasked(true);
  };

  //close CombineSchedule Modal
  const closeCombineScheduleModal = () => {
    setOpenCombinedSchedule(false);
    openTaskedModal();
  };

  //close Task Modal
  const closeTaskModal = () => {
    setOpenTasked(false);
  };

  //validation
  const validationModal = () => {
    setValidationPopup(true);
  };
  const validationModalClose = () => {
    setValidationPopup(false);
  };

  //get ScheduleDate
  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day} 00:00:00`;
  }
  const [ScheduleDate, setScheduleDate] = useState(getTodayDate());
  useEffect(() => {
    // You can use todayDate in any way you need
    console.log("Today's Date:", ScheduleDate);
  }, [ScheduleDate]);

  console.log(ScheduleDate);

  //select ALL for Right Table
  // const [selectAllChecked, setSelectAllChecked] = useState(false);
  const onClickSelectAllRight = () => {
    const updatedSelectedRows =
      selectedRows.length === 0 ? [...oderSchedule] : [...oderSchedule];
    setSelectedRows(updatedSelectedRows);
  };

  const onClickReverse1 = () => {
    // Create a reversed array of selected rows
    const reversedSelection1 = oderSchedule
      .map((value) => {
        const isSelected = selectedRows.some(
          (selectedItem) => selectedItem.ScheduleId === value.ScheduleId
        );
        return isSelected ? undefined : value;
      })
      .filter((value) => value !== undefined);
    // Update the rowselectleft state with the reversed selection
    setSelectedRows(reversedSelection1);
  };

  ///////////////////////////////////////////

  //set  data for first table as null (right shift)
  const onClickRightShiftButton = () => {
    // Remove items from beforecombine that are present in rowselectleft
    const updatedBeforeCombine = beforecombine.filter(
      (item) =>
        !rowselectleft.some(
          (selectedItem) => selectedItem.ScheduleId === item.ScheduleId
        )
    );
    // Update the state with the filtered array
    setBeforeCombine(updatedBeforeCombine);
    console.log(updatedBeforeCombine);
    // Clear the rowselectleft array
    setRowSelectLeft([]);
  };

  //select ALL FOR LEFT TABLE
  // const [selectAllChecked1, setSelectAllChecked1] = useState(false);
  const onClickSelectAllLeft = () => {
    // If no rows are selected, select all rows; otherwise, do nothing
    const updatedSelectedRows1 =
      rowselectleft.length === 0 ? [...beforecombine] : [...beforecombine];
    setRowSelectLeft(updatedSelectedRows1);
  };

  const onClickReverse = () => {
    // Create a reversed array of selected rows
    const reversedSelection = beforecombine
      .map((value) => {
        const isSelected = rowselectleft.some(
          (selectedItem) => selectedItem.ScheduleId === value.ScheduleId
        );
        return isSelected ? undefined : value;
      })
      .filter((value) => value !== undefined);
    // Update the rowselectleft state with the reversed selection
    setRowSelectLeft(reversedSelection);
  };

  //Create Schedule
  const [combinedScheduleNo, setCombinedScheduleNo] = useState("");
  const [disablebutton, setDisableButton] = useState(false);
  const onClickCreateSchedule = () => {
    console.log("type is",type);
    console.log("rowselectleft",rowselectleft,"custCode",custCode,"selectedSalesContact",selectedSalesContact,"ScheduleDate",ScheduleDate);
    if (rowselectleft.length <= 1) {
      validationModal();
    } else {
      if (type === "JobWork") {
        postRequest(endpoints.CreateSchedule, {
          rowselectleft,
          custCode: custCode,
          selectedSalesContact: selectedSalesContact,
          Date: storedDate,
          ScheduleDate: ScheduleDate,
        },(response) => {
          setDisableButton(true);
          setCombinedScheduleNo(response.combinedScheduleNos[0]);
          openCombineScheduleModal();
        });
      } else {
        postRequest(endpoints.CreateScheduleforSales, {
          rowselectleft,
          custCode: custCode,
          selectedSalesContact: selectedSalesContact,
          Date: storedDate,
          ScheduleDate: ScheduleDate,
        },(response) => {
          setDisableButton(true);
          setCombinedScheduleNo(response.combinedScheduleNos[0]);
          openCombineScheduleModal();
        });
      }
    }
  };

  const getAlldataAfterCombineSchedule = () => {
    postRequest(endpoints.afterCombinedSchedule, {
      combinedScheduleNo,
    },(response) => {
      setBeforeCombine(response);
    });
  };

  useEffect(() => {
    getAlldataAfterCombineSchedule();
  }, [combinedScheduleNo]);

  return (
    <div>
      <div className="row">
        <div className="col-md-8 col-sm-12">
          <div className="">
            <div className="col-md-8 col-sm-12">
              <button
                className="button-style  group-button"
                onClick={onClickSelectAllLeft}
              >
                Select All
              </button>
              <button
                className="button-style  group-button"
                onClick={onClickReverse}
              >
                Revers
              </button>
              <button
                className="button-style  group-button"
                onClick={onClickRightShiftButton}
              >
                {">>"}{" "}
              </button>
              <button
                className="button-style  group-button"
                onClick={onclickpreapreScheduleButton}
              >
                Prepare Schedule
              </button>
              <button
                className={`button-style group-button ${
                  disablebutton ? "disabledButton" : ""
                }`}
                onClick={onClickCreateSchedule}
                disabled={disablebutton}
              >
                Create Schedule
              </button>
            </div>
          </div>
          <div className="mt-1" style={{ overflowY: "scroll" }}>
            <Table
              striped
              className="table-data border"
              style={{ border: "1px", height: "200px" }}
            >
              <thead className="tableHeaderBGColor table-space">
                <tr>
                  <th>Select</th>
                  <th>Order Schedule No</th>
                  <th>PO</th>
                  <th>Target Date</th>
                </tr>
              </thead>
              <tbody className="tablebody table-space">
                {beforecombine.map((value, key) => {
                  const isChecked = rowselectleft.some(
                    (selectedItem) =>
                      selectedItem.ScheduleId === value.ScheduleId
                  );

                  return (
                    <tr
                      key={key}
                      className={
                        key === selectedRows?.index ? "selcted-row-clr" : ""
                      }
                    >
                      <td>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleCheckboxChangeLeft(key, value)}
                        />
                      </td>
                      <td>{value.OrdSchNo}</td>
                      <td>{value.PO}</td>
                      <td>{value.schTgtDate}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
          <div
            className="mt-1"
            style={{
              height: "200px",
              overflowY: "scroll",
              overflowX: "scroll",
            }}
          >
            <Table
              striped
              className="table-data border"
              style={{ height: "200px" }}
            >
              <thead className="tableHeaderBGColor">
                <tr>
                  <th>Dwg Name</th>
                  <th>Quantity</th>
                  <th>MProcess</th>
                  <th>Operation</th>
                </tr>
              </thead>
              <tbody className="tablebody table-space">
                {preapreScheduleData?.map((data, key) => {
                  return (
                    <>
                      <tr>
                        <td>{data.DwgName}</td>
                        <td>{data.QtyScheduled}</td>
                        <td>{data.MProcess}</td>
                        <td>{data.Operation}</td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
        <div className="col-md-4 col-sm-12">
          <div className="">
            <div className="col-md-8 col-sm-12">
              <button
                className="button-style  group-button"
                onClick={onclickofLeftShiftButton}
              >
                {"<<"}
              </button>
              <button
                className="button-style  group-button"
                onClick={onClickSelectAllRight}
              >
                Select All
              </button>
              <button
                className="button-style group-button"
                onClick={onClickReverse1}
              >
                Revers
              </button>
            </div>
          </div>
          <div className="mt-1" style={{ overflowY: "scroll" }}>
            <Table
              striped
              className="table-data border"
              style={{ border: "1px", height: "400px" }}
            >
              <thead className="tableHeaderBGColor table-space">
                <tr>
                  <th>Select</th>
                  <th>Order Schedule No</th>
                  <th>PO</th>
                  <th>Target Date</th>
                </tr>
              </thead>
              <tbody className="tablebody table-space">
                {oderSchedule.map((item, key) => {
                  const isChecked = selectedRows.some(
                    (selectedItem) =>
                      selectedItem.ScheduleId === item.ScheduleId
                  );

                  return (
                    <>
                      <tr
                        key={key}
                        className={
                          key === selectedRows?.index ? "selcted-row-clr" : ""
                        }
                      >
                        <td>
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleCheckboxChange(key, item)}
                          />
                        </td>
                        <td>{item.OrdSchNo}</td>
                        <td>{item.PO}</td>
                        <td>{item.schTgtDate}</td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </Table>
          </div>

          <Popup
            show={openCombinedSchedule}
            onHide={(e) => setOpenCombinedSchedule(e)}
            firstbutton={closeCombineScheduleModal}
            title="Magod Order"
            message={
              <>
                Combined order{" "}
                <span style={{ fontWeight: "bold" }}>{combinedScheduleNo}</span>{" "}
                created
              </>
            }
            firstbuttontext="OK"
          />

          <Popup
            show={openTasked}
            onHide={(e) => setOpenTasked(e)}
            firstbutton={closeTaskModal}
            // secondbutton={secbtnc}
            title="Magod Order"
            message="Combined Schedule Tasked"
            firstbuttontext="OK"
          />

          <Popup
            show={validationpopup}
            onHide={(e) => setValidationPopup(e)}
            firstbutton={validationModalClose}
            // secondbutton={secbtnc}
            title="Magod Order"
            message="Cannot Combine One Schedule, select more than one"
            firstbuttontext="OK"
          />
        </div>
      </div>
    </div>
  );
}
