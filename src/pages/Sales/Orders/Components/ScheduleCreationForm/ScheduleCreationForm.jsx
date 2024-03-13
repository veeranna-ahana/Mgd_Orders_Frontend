import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Tab, Table, Tabs, Form } from "react-bootstrap";
import FindOldPart from "./Tabs/FindOldPart/FindOldPart";
import MaterialInfo from "./Tabs/MaterialInfo/MaterialInfo";
import MaterialPlanner from "./Tabs/MaterialPlanner/MaterialPlanner";
import OrderDetails from "./Tabs/OrderDetails/OrderDetails";
import OrderInfo from "./Tabs/OrderInfo/OrderInfo";
import ProductionScheduleCreation from "./Tabs/ProductionScheduleCreation/ProductionScheduleCreation";
import ProfarmaInvoiceList from "./Tabs/ProfarmaInvoiceList/ProfarmaInvoiceList";
import ScheduleList from "./Tabs/ScheduleList/ScheduleList";
import FormHeader from "./FormHeader";
import { endpoints } from "../../../../api/constants";
import { getRequest, postRequest } from "../../../../api/apiinstance";
import { toast } from "react-toastify";
import AlertModal from "../Components/Alert";

export default function ScheduleCreationForm(props) {
  const location = useLocation();
  console.log("props", props);

  const [newSerial, setNewSerial] = useState({
    DrawingName: "",
    Material: "",
    MtrlSrc: "",
    Operation: "",
    Quantity: 0,
    JW_Rate: 0.0,
    Mtrl_Rate: 0.0,
    UnitPrice: 0.0,
    InspLvl: 0,
    PkngLvl: 0,
  });
  const [imprtDwg, setImprtDwg] = useState({
    custcode: "",
    OrderNo: 0,
    newOrderSrl: 0,
    Material: "",
    MtrlSrc: "",
    tolerance: "",
    Operation: "",
    Quantity: 0,
    JW_Rate: 0.0,
    Mtrl_Rate: 0.0,
    UnitPrice: 0.0,
    InspLvl: 0,
    PkngLvl: 0,
  });

  const [orderNo, setorderNo] = useState(location?.state);
  const [OrderData, setOrderData] = useState({});
  const [OrderCustData, setOrderCustData] = useState({});
  const [OrdrDetailsData, setOrdrDetailsData] = useState([]);
  const [BomData, setBomData] = useState([]);
  const [findOldpart, setfindOldpart] = useState();
  //profarmaInvDetail data
  const [profarmaInvMain, setProfarmaInvMain] = useState([]);
  const [profarmaInvDetails, setProfarmaInvDetails] = useState([]);
  // row selection data
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedSrl, setSelectedSrl] = useState([]);
  const [LastSlctedRow, setLastSlctedRow] = useState([]);
  //getScheduleList Table Data
  const [scheduleListData, setScheduleListData] = useState([]);
  // Register button
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  // Alert Modals
  const [alertModal, setAlertModal] = useState(false);
  const [registerOrder, setRegisterOrder] = useState(false);
  const fetchData = () => {
    postRequest(
      endpoints.getOrderDetailsByOrdrNoAndType,
      { orderNo: orderNo, orderType: props.Type },
      (orderData) => {
        // console.log("orderDetails.....", orderData);
        setOrderData(orderData?.orderData[0]);
        setOrderCustData(orderData?.custData[0]);

        postRequest(
          endpoints.GetBomData,
          { custcode: orderData?.custData[0]?.Cust_Code },
          (bomdata) => {
            console.log("bomdata......", bomdata);
            setBomData(bomdata);
          }
        );
        postRequest(
          endpoints.GetFindOldpartData,
          { custcode: orderData?.custData[0]?.Cust_Code },
          (findOldpartData) => {
            ////  console.log("findOldpartData......", findOldpartData);
            setfindOldpart(findOldpartData);
          }
        );

        postRequest(
          endpoints.PostNewSrlData,
          { custcode: orderData?.custData[0]?.Cust_Code, OrderNo: orderNo },
          (ordrdtlsdata) => {
            // ////console.log("ordrdtlsdata", ordrdtlsdata);
            setOrdrDetailsData(ordrdtlsdata);
          }
        );
      }
    );
    postRequest(
      endpoints.getProfarmaMain,
      { OrderNo: orderNo },
      (profarmaMainData) => {
        // console.log("profarmaMainData", profarmaMainData);

        setProfarmaInvMain(profarmaMainData);
        // console.log("ordrdtlsdata", ordrdtlsdata);
        // setOrdrDetailsData(ordrdtlsdata);
      }
    );
    postRequest(
      endpoints.getProfarmaDetails,
      { OrderNo: orderNo },
      (profarmaDetailsData) => {
        // console.log("profarmaDetailsData", profarmaDetailsData);

        setProfarmaInvDetails(profarmaDetailsData);
        // console.log("ordrdtlsdata", ordrdtlsdata);
        // setOrdrDetailsData(ordrdtlsdata);
      }
    );

    setSelectedItems([]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setOrderData(props.OrersData);
  }, [props.OrersData]);

  // alert modals for register and save
  const openModal = (e) => {
    e.preventDefault();
    setAlertModal(true);
  };
  const closeModal = () => {
    setAlertModal(false);
  };
  const openRegisterOrder = (e) => {
    e.preventDefault();
    setRegisterOrder(true);
  };
  const closeRegisterOrder = () => {
    setRegisterOrder(false);
  };

  // Register Button
  const handleRegisterBtn = () => {
    postRequest(
      endpoints.registerOrder,
      { Order_No: orderNo, Order_Status: "Recorded" },
      (registerOrderData) => {
        console.log("registerOrderData......", registerOrderData);

        setOrderData({ ...OrderData, Order_Status: "Recorded" });
        toast.success("Order Registered Successfully");
        closeRegisterOrder();
      }
    );
    setButtonDisabled(true);
  };
  // Save Button
  const handleSaveBtn = () => {
    toast.success("Order Saved Successfully");
  };
  // Row selection in orderDetails tab
  const selectItem = (OrdrDetailsItem) => {
    const isSelected = selectedItems.includes(OrdrDetailsItem);
    // callback function to log the updated state after the update
    setSelectedItems((prevSelectedItems) => {
      const updatedSelectedItems = isSelected
        ? prevSelectedItems.filter((item) => item !== OrdrDetailsItem)
        : [...prevSelectedItems, OrdrDetailsItem];
      // console.log("Selected Order details Rows:", updatedSelectedItems);
      const selectedOrderSrl = updatedSelectedItems.map(
        (item) => item.Order_Srl
      );
      console.log("selectedOrderSrl", selectedOrderSrl);
      setSelectedSrl(selectedOrderSrl);
      const lastSelectedRow =
        updatedSelectedItems[updatedSelectedItems.length - 1];
      // console.log("Last Selected Row:", lastSelectedRow);
      setLastSlctedRow(lastSelectedRow);
      return updatedSelectedItems;
    });
  };
  // selectAll button
  const handleSelectAll = () => {
    setSelectedItems(OrdrDetailsData);
  };
  // reverse Button
  const handleReverseSelection = () => {
    if (selectedItems.length === 0) {
      handleSelectAll();
    } else {
      const newArray = [];

      for (let i = 0; i < OrdrDetailsData.length; i++) {
        const element = OrdrDetailsData[i];

        if (selectedItems.includes(element)) {
          // the element is selected, needs to be removed
        } else {
          // not selected, needs to be added to the newArray
          newArray.push(element);
        }
      }
      // Update the selected rows with the newArray
      setSelectedItems(newArray);
    }
  };

  // NOT USED
  let insertnewsrldata = () => {
    postRequest(
      endpoints.InsertNewSrlData,
      { custcode: OrderCustData.Cust_Code, OrderNo: orderNo },
      (InsertedNewSrlData) => {
        console.log(" InsertedNewSrlDataRes", InsertedNewSrlData);
      }
    );
  };

  return (
    <>
      <div>
        <FormHeader
          OrderData={OrderData}
          OrderCustData={OrderCustData}
          handleRegisterBtn={handleRegisterBtn}
          handleSaveBtn={handleSaveBtn}
          isButtonDisabled={isButtonDisabled}
          openRegisterOrder={openRegisterOrder}
          closeRegisterOrder={closeRegisterOrder}
          openModal={openModal}
          closeModal={closeModal}
        />

        <Tabs defaultActiveKey="orderinfo" id="uncontrolled-tab-example">
          <Tab eventKey="orderinfo" title="Order Info">
            <OrderInfo OrderData={OrderData} />
          </Tab>
          <Tab
            eventKey="productionschedulecreation"
            title="Production Schedule Creation"
          >
            <ProductionScheduleCreation
              OrderData={OrderData}
              selectedItems={selectedItems}
              setScheduleListData={setScheduleListData}
            />
          </Tab>
          <Tab eventKey="findoldpart" title="Find Old Part">
            <FindOldPart
              OrderData={OrderData}
              findOldpart={findOldpart}
              setfindOldpart={setfindOldpart}
            />
          </Tab>
          <Tab eventKey="materialinfo" title="Material Info">
            <MaterialInfo OrderData={OrderData} />
          </Tab>
        </Tabs>
        <div className="mt-5">
          <Tabs>
            <Tab eventKey="orderdetails" title="Order Details">
              <OrderDetails
                OrderData={OrderData}
                OrderCustData={OrderCustData}
                OrdrDetailsData={OrdrDetailsData}
                setOrdrDetailsData={setOrdrDetailsData}
                selectedItems={selectedItems}
                selectItem={selectItem}
                LastSlctedRow={LastSlctedRow}
                setLastSlctedRow={setLastSlctedRow}
                // handleBulkCngBtn={handleBulkCngBtn}
                fetchData={fetchData}
                BomData={BomData}
                setBomData={setBomData}
                findOldpart={findOldpart}
                setfindOldpart={setfindOldpart}
                handleSelectAll={handleSelectAll}
                handleReverseSelection={handleReverseSelection}
                selectedSrl={selectedSrl}
                // insertnewsrldata={insertnewsrldata}
              />
            </Tab>
            <Tab eventKey="scheduleList" title="Schedule List">
              <ScheduleList
                OrderData={OrderData}
                OrderCustData={OrderCustData}
                scheduleListData={scheduleListData}
                setScheduleListData={setScheduleListData}
              />
            </Tab>
            <Tab eventKey="profarmaInvoiceList" title="Proforma Invoice List">
              <ProfarmaInvoiceList
                OrderData={OrderData}
                OrderCustData={OrderCustData}
                selectedItems={selectedItems}
                profarmaInvMain={profarmaInvMain}
                profarmaInvDetails={profarmaInvDetails}
                fetchData={fetchData}
              />
            </Tab>
            {props.Type === "Profile" ? (
              <Tab eventKey="materialPlanner" title="Material Planner">
                <MaterialPlanner OrderData={OrderData} />
              </Tab>
            ) : null}
          </Tabs>
        </div>

        <AlertModal
          show={alertModal}
          onHide={(e) => setAlertModal(e)}
          firstbutton={closeModal}
          title="magod_Order"
          message="Record Saved"
          firstbuttontext="Ok"
        />

        <AlertModal
          show={registerOrder}
          onHide={(e) => setRegisterOrder(e)}
          firstbutton={handleRegisterBtn}
          secondbutton={closeRegisterOrder}
          title="magod_Order"
          // message="You can add New Serials, Change Quantity and Rates once you register an Open Order. Continue ?"
          message="No Change for Quantity, PackingLevels and Rates once you register. Proceed ?"
          firstbuttontext="Yes"
          secondbuttontext="No"
        />
      </div>
    </>
  );
}
