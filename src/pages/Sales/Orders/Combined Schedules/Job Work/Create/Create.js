import React from "react";
import PrepareScheduleTab from "./PrepareScheduleTab";
import CombinedScheduleDetailsTab from "./CombinedScheduleDetailsTab";
import { Form, Tab, Tabs } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import Popup from "../../Components/Popup";
export default function Create() {
  const [selected, setSelected] = React.useState();

  let dummydata = [
    {
      label: "Alabama",
      population: 4780127,
      capital: "Montgomery",
      region: "South",
    },

    { label: "Alaska", population: 710249, capital: "Juneau", region: "West" },

    {
      label: "Arizona",
      population: 6392307,
      capital: "Phoenix",
      region: "West",
    },

    {
      label: "Arkansas",
      population: 2915958,
      capital: "Little Rock",
      region: "South",
    },
  ];
  return (
    <div>
      <h5 className="title">Combined Schedule Creator</h5>
      <div className="row mt-3">
        <div className="col-md-4">
          {" "}
          <div>
            <label className="form-label">Customer Name</label>
            <label
              style={{
                color: "#f20707",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              *
            </label>
            {1 > 0 ? (
              <Typeahead
                id="basic-example"
                onChange={setSelected}
                options={dummydata}
                placeholder="Select Customer"
                selected={selected}
              />
            ) : (
              ""
            )}
          </div>
          <h5 style={{ marginLeft: "130px", marginTop: "15px" }}>
            Selected Schedules{" "}
          </h5>
        </div>
        <div className="col-md-4">
          <label className="form-label">Sales Contact</label>
          <select id="gstpan" className="ip-select mt-1">
            <option value="Select">option 1</option>

            <option value="GST">option 2</option>

            <option value="PAN">option 3</option>
          </select>
        </div>
        <div className="col-md-4">
          {" "}
          <label className="form-label">Completion Date</label>
          <input name="Completion Date" type="date" />{" "}
        </div>
      </div>

      <Tabs className=" tab_font mt-4">
        <Tab eventKey="prepareSchedule" title="Prepare Schedule">
          <PrepareScheduleTab />
        </Tab>
        <Tab
          eventKey="combinedScheduleDetails"
          title="Combine Schedule Details"
        >
          <CombinedScheduleDetailsTab />
        </Tab>
      </Tabs>
    </div>
  );
}
