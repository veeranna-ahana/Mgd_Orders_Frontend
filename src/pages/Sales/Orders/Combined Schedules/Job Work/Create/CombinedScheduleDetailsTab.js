import React from "react";
import { Form, Table } from "react-bootstrap";
import Popup from "../../Components/Popup";

export default function CombinedScheduleDetailsTab() {
  return (
    <div>
      <Form className="form mt-2">
        <div className="ip-box">
          <div className="row">
            <div className="col-md-4 mb-2 col-sm-12">
              <label className="form-label">No</label>
              <input class="" type="text" style={{ borderRadius: "0" }} />
            </div>
            <div className="col-md-4  mb-2 col-sm-12">
              <label className="form-label">Customer</label>
              <input class="" type="text" style={{ borderRadius: "0" }} />
            </div>
            <div className="col-md-4  mb-2 col-sm-12">
              <label className="form-label"> Sales Contact</label>
              <input class="" type="text" style={{ borderRadius: "0" }} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 mb-2 col-sm-12">
              <label className="form-label">Type</label>
              <input class="" type="text" style={{ borderRadius: "0" }} />
            </div>
            <div className="col-md-4  mb-2 col-sm-12">
              <label className="form-label">PO No</label>
              <input class="" type="text" style={{ borderRadius: "0" }} />
            </div>
            <div className="col-md-4  mb-2 col-sm-12">
              <label className="form-label"> Target Name</label>
              <input class="" type="text" style={{ borderRadius: "0" }} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 mb-2 col-sm-12">
              <label className="form-label">Status</label>
              <input class="" type="text" style={{ borderRadius: "0" }} />
            </div>
            <div className="col-md-4  mb-2 col-sm-12">
              <label className="form-label">Instruction</label>
              <input class="" type="text" style={{ borderRadius: "0" }} />
            </div>
            <div className="col-md-4  mb-2 col-sm-12">
              <label className="form-label"> Delivery Date</label>
              <input className="mt-1" name="UnistallDate" type="date" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 mb-2 col-sm-12">
              <label className="form-label"> Dealing Engineer</label>
              <select id="gstpan" className="ip-select">
                <option value="Select">option 1</option>

                <option value="GST">option 2</option>

                <option value="PAN">option 3</option>
              </select>
            </div>
          </div>
        </div>
      </Form>
      <div className="mt-3" style={{ height: "350px", overflowY: "scroll" }}>
        <Table striped className="table-data border" style={{ border: "1px" }}>
          <thead className="tableHeaderBGColor">
            <tr>
              <th>Dwg Name</th>
              <th>Mtrl_Code</th>
              <th>M Process</th>
              <th>Operation</th>
              <th>Mtrl_Source</th>
              <th>Insp Level</th>
              <th>Quantity Scheduled</th>
            </tr>
          </thead>
          <tbody className="tablebody"></tbody>
        </Table>
      </div>
    </div>
  );
}
