import React, { useState } from "react";
import { Link } from "react-router-dom";

function FabFindOrder() {
  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <h4 className="title">Find Order</h4>
        </div>

        <div className="row mt-2">
          <div className="col-md-4 sm-12">
            <label className="form-label">Order No</label>

            <input type="text" />
          </div>

          <div className="col-md-2 sm-12 mt-3">
            <Link to={"/Orders/Fabrication/ScheduleCreationForm"}>
              <button className="button-style">Open</button>
            </Link>
          </div>

          <div className="col-md-1 sm-12 mt-3">
            <Link to="/Orders">
              <button className="button-style">Close</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FabFindOrder;
