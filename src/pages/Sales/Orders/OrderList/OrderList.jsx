import React, { useState, useEffect } from "react";
import Axios from "axios";

import { Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { apipoints } from "../../../api/OrderList/OrderList";
import { Typeahead } from "react-bootstrap-typeahead";

import Header from "./Header/Header";
import OLTable from "./OLTable/OLTable";

export default function OrderList(props) {
  // const [OrderListData, setOrderListData] = useState([]);

  const [OriginalOrderListData, setOriginalOrderListData] = useState([]);
  const [FilteredOrderListData, setFilteredOrderListData] = useState([]);
  const [CustData, setCustData] = useState([]);

  const fetchData = () => {
    Axios.post(apipoints.getOrderListByType, { type: props.type }).then(
      (res) => {
        setOriginalOrderListData(res.data);
        setFilteredOrderListData(res.data);
        Axios.post(apipoints.getOrderListByTypeGroupedCustomer, {
          type: props.type,
        }).then((res) => {
          // let arr = [{ label: "All", Cust_Code: "All" }];
          let arr = [];
          for (let i = 0; i < res.data.length; i++) {
            res.data[i].label = res.data[i].Cust_name;
            arr.push(res.data[i]);
          }
          setCustData(arr);
        });
      }
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCustomerChange = (e) => {
    console.log("eeeeeeeee", e[0]);

    if (
      e.length > 0 &&
      (e[0].Cust_Code != undefined ||
        e[0].Cust_Code != null ||
        // e[0].Cust_Code != "All" ||
        e[0].Cust_Code != "")
    ) {
      const arr = OriginalOrderListData?.filter(
        (obj) => obj.Cust_Code === e[0]?.Cust_Code
      );

      setFilteredOrderListData(arr);
    } else {
      setFilteredOrderListData(OriginalOrderListData);
    }
  };
  // console.log("propssss", props);
  // console.log("OriginalOrderListData", OriginalOrderListData);
  return (
    <>
      <div>
        <div className="row">
          <h4 className="title">Order List : Service - All</h4>
        </div>
        <div>
          <Header
            CustData={CustData}
            handleCustomerChange={handleCustomerChange}
          />
          <div className="p-1"></div>
          <OLTable FilteredOrderListData={FilteredOrderListData} />
        </div>
      </div>
      <div className="p-3"></div>
    </>
  );
}
