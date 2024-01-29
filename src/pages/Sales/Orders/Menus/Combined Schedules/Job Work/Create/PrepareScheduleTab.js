import React from "react";
import { Table } from "react-bootstrap";
import Popup from "../../Components/Popup";

export default function PrepareScheduleTab() {
  const [pop, setPop] = React.useState();
  const [nestpop, setNestPop] = React.useState();

  let fstbtnc = () => {
    setPop(false);
    setNestPop(true);
  };
  let nestfstbtnc = () => {
    setNestPop(false);
  };

  let PopupFunction = () => {
    setPop(true);
  };
  return (
    <div>
      <div className="row">
        <div className="col-md-8 col-sm-12">
          <div className="row">
            <div className="col-md-2 col-sm-12">
              <button
                className="button-style  group-button"
                style={{ width: "120px" }}
              >
                Select All
              </button>
            </div>
            <div className="col-md-2 col-sm-12">
              <button
                className="button-style  group-button"
                style={{ width: "120px" }}
              >
                Revers
              </button>
            </div>
            <div className="col-md-2 col-sm-12">
              <button
                className="button-style  group-button"
                style={{ width: "120px" }}
              >
                {">>"}{" "}
              </button>
            </div>
            <div className="col-md-3 col-sm-12">
              <button
                className="button-style  group-button"
                style={{ width: "185px" }}
              >
                Prepare Schedule
              </button>
            </div>
            <div className="col-md-3 col-sm-12">
              <button
                className="button-style mb-3 group-button"
                style={{ width: "175px" }}
                onClick={PopupFunction}
              >
                Create Schedule
              </button>
            </div>
          </div>
          <div style={{ overflowY: "scroll" }}>
            <Table
              striped
              className="table-data border mt-2"
              style={{ border: "1px", height: "200px", overflowY: "scroll" }}
            >
              <thead className="tableHeaderBGColor">
                <tr>
                  <th>Select</th>
                  <th>Order Schedule No</th>
                  <th>PO</th>
                  <th>Target Date</th>
                </tr>
              </thead>
              <tbody className="tablebody"></tbody>
            </Table>
          </div>
          <div style={{ overflowY: "scroll" }}>
            <Table
              striped
              className="table-data border mt-2"
              style={{ border: "1px", height: "200px" }}
            >
              <thead className="tableHeaderBGColor">
                <tr>
                  <th>Dwg Name</th>
                  <th>Quantity</th>
                  <th>M Process</th>
                  <th>Operation</th>
                </tr>
              </thead>
              <tbody className="tablebody"></tbody>
            </Table>
          </div>
        </div>
        <div className="col-md-4 col-sm-12">
          <div className="row">
            <div className="col-md-4 col-sm-12">
              <button
                className="button-style  group-button"
                style={{ width: "110px" }}
              >
                {"<<"}
              </button>
            </div>
            <div className="col-md-4 col-sm-12">
              <button
                className="button-style  group-button"
                style={{ width: "110px" }}
              >
                Select All
              </button>
            </div>
            <div className="col-md-1 col-sm-12">
              <button
                className="button-style mb-3  group-button"
                style={{ width: "110px" }}
              >
                Revers
              </button>
            </div>
          </div>
          <div style={{ overflowY: "scroll" }}>
            <Table
              striped
              className="table-data border mt-2"
              style={{ border: "1px", height: "400px" }}
            >
              <thead className="tableHeaderBGColor">
                <tr>
                  <th>Select</th>
                  <th>Order Schedule No</th>
                  <th>PO</th>
                  <th>Target Date</th>
                </tr>
              </thead>
              <tbody className="tablebody"></tbody>
            </Table>
          </div>
          <Popup
            show={pop}
            onHide={(e) => setPop(e)}
            firstbutton={fstbtnc}
            // secondbutton={secbtnc}
            title="Magod Order"
            message="Combined order 1234567890 created "
            firstbuttontext="Okay"
          />
          <Popup
            show={nestpop}
            onHide={(e) => setNestPop(e)}
            firstbutton={nestfstbtnc}
            // secondbutton={secbtnc}
            title="Magod Order"
            message="Combined Schedule Tasked "
            firstbuttontext="Okay"
          />
        </div>
      </div>
    </div>
  );
}
