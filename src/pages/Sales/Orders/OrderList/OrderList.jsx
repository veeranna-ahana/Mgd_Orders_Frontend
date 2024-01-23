import React, { useState, useEffect } from "react";
import Axios from "axios";
import { apipoints } from "../../../api/OrderList/OrderList";

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
      <div>OrderList</div>
    </>
  );
}
