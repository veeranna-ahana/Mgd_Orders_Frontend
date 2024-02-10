import React from "react";
import { Button, Table } from "react-bootstrap";

export default function TaxTable(props) {
  return (
    <>
      <Table striped className="table-data border" style={{ border: "1px" }}>
        <thead className="tableHeaderBGColor">
          <tr>
            <th>Tax Name</th>
            <th>Taxable Amount</th>
            <th>Tax Percent</th>
            <th>Tax Amount</th>
          </tr>
        </thead>
        <tbody className="tablebody">
          {props.profarmaTaxData?.map((val, key) => (
            <>
              <tr>
                <th>{val.Tax_Name}</th>
                <th>{val.TaxableAmount}</th>
                <th>{val.TaxPercent}</th>
                <th>{val.TaxAmt}</th>
              </tr>
            </>
          ))}
        </tbody>
      </Table>
    </>
  );
}
