import React, { useState, useEffect } from "react";
import Axios from "axios";

import { Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { apipoints } from "../../../api/OrderList/OrderList";
import { Typeahead } from "react-bootstrap-typeahead";

import Header from "./Header/Header";
import OLTable from "./OLTable/OLTable";

export default function OrderList(props) {
  const [OrderListData, setOrderListData] = useState([]);

  const fetchData = () => {
    Axios.post(apipoints.getOrderListByType, { type: props.type }).then(
      (res) => {
        setOrderListData(res.data);
      }
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log("propssss", props);
  console.log("OrderListData", OrderListData);
  return (
    <>
      <div>
        <div className="row">
          <h4 className="title">Order List : Service - All</h4>
        </div>
        <div>
          <Header />
          <div className="p-1"></div>
          <OLTable />
        </div>
      </div>
    </>
  );
}
