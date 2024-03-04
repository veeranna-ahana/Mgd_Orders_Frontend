import React, { useEffect, useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";

export default function IQMFormHeader(props) {
  return (
    <>
      <div className="row">
        <div className="col-md-3">
          <label className="form-label">Quotation No</label>
          <Typeahead
            id=""
            options={props.qtnListData}
            placeholder="Select any option"
            onChange={(selected) => {
              props.setSelectedQtn(selected[0]);
              props.handleChangeQtn(selected[0]?.QtnID || "");
            }}
          />
        </div>
        <div className="col-md-5">
          <label className="form-label">Customer Name</label>
          <input
            value={props.selectedQtn?.CustomerName}
            disabled
            className="input-disabled"
          />
        </div>
        <div className="col-md-2">
          <label className="form-label">Quotation Type</label>
          <input
            value={props.selectedQtn?.QtnType}
            disabled
            className="input-disabled"
          />
        </div>
        <div className="col-md-2">
          <label className="form-label">Valid UpTo</label>
          <input
            value={props.selectedQtn?.Printable_ValidUpTo}
            disabled
            className="input-disabled"
          />
        </div>
      </div>
    </>
  );
}
