import React, { useEffect, useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";

export default function IQMFormHeader(props) {
  // useEffect(() => {
  //   // if (props.selectedQtn?.QtnID) {
  //   //   const arr = props.qtnItemListData?.filter(
  //   //     (obj) => obj.QtnID === 14132
  //   //   );

  //   //   console.log("arr", arr);
  //   // }
  //   const arr = props.qtnItemListData?.filter(
  //     (obj) => obj.QtnID === props.selectedQtn?.QtnID
  //   );

  //   console.log("props.selectedQtn", props.selectedQtn?.QtnID);

  //   console.log("arr", arr);
  // }, [props.selectedQtn]);

  return (
    <>
      <div className="row">
        <div className="col-md-3">
          <label className="form-label">Quotation No</label>
          <Typeahead
            // options={orderNoData.map((item) => ({
            //   label: item.Order_No,
            //   value: item.Order_No,
            // }))}
            id=""
            options={props.qtnListData}
            placeholder="Select any option"
            onChange={(selected) => {
              console.log("selected", selected[0]);
              props.setSelectedQtn(selected[0]);

              let arr = props.qtnItemListData?.filter(
                (obj) => obj.QtnID === selected[0]?.QtnID
              );

              console.log("props.selectedQtn", selected[0]?.QtnID);

              console.log("arr", arr);
            }}
          />
        </div>
        <div className="col-md-5">
          <label className="form-label">Customer Name</label>
          <input type="text" />
        </div>
        <div className="col-md-2">
          <label className="form-label">Quotation Type</label>
          <input type="text" />
        </div>
        <div className="col-md-2">
          <label className="form-label">Valid UpTo</label>
          <input type="text" />
        </div>
      </div>
    </>
  );
}
