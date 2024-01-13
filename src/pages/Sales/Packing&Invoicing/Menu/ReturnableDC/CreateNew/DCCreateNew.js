import React, { Fragment, useState, useEffect } from "react";
import { PDFViewer, StyleSheet, Image } from "@react-pdf/renderer";

import { Table, Tabs, Tab, Modal } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import ConsigneeInfo from "../Tabs/ConsigneeInfo";
import DispatchDetails from "../Tabs/DispatchDetails";
import { toast } from "react-toastify";
import Axios from "axios";
import AddNew from "../Modals/AddNew";
import CreateNewJobWork from "../Modals/CreateNewJobWork";
import InspectionPackingForm from "../Modals/InspectionPackingForm";
import OpenRV from "../Modals/OpenRV";
import { Link, useLocation } from "react-router-dom";

import { apipoints } from "../../../../../api/PackInv_API/ReturnableDC/ReturnableDC";
import DeliveryChallan from "../PDFs/DeliveryChallan";
import DraftDetailsTable from "../Tables/DraftDetailsTable";
import ReceiveReturnsTable from "../Tables/ReceiveReturnsTable";
import CancelDCModal from "../Modals/CancelDCModal";
import EwayBillModal from "../Modals/EwayBill/EwayBillModal";
import EwayBillSaveModal from "../Modals/EwayBill/EwayBillSaveModal";
import EwayBillPrintModal from "../Modals/EwayBill/EwayBillPrintModal";
import EwayBillPdfModal from "../Modals/EwayBill/EwayBillPdfModal";

function DCCreateNew() {
  const location = useLocation();
  const dcSelectedRow = location.state?.dcSelectedRow || "";

  const [formData, setFormData] = useState({
    // Create New
    unitName: "Jigani",
    unitStateId: "29",
    UnitGSTNo: "29AABCM1970H1ZE",
    dcNo: "",
    dcInvNo: "",
    dcDate: "",
    dcType: "Returnable DC",
    dcStatus: "Draft",
    customerNames: [],
    selectedCustomer: null,
    custCode: "",
    custName: "",
    reference: "",
    custData: "",
    custAddress: "",
    custState: "",
    custCity: "",
    custPin: "",
    states: [],
    gstNo: "",
    deliveryAddress: "Consignee Address",
    deliveryState: "",
    custStateId: "",
    delStateId: "",
    taxDetails: [],
    dcListTaxes: [],
    tableData: [],
    selectedRow1: null,
    selectedRow2: null,
    taxableAmount: 0,
    taxAmt: 0,
    selectedTax: [],
    selectedRowData: {},
    dcCancel: "",
    isGovOrg: 0,

    // Add New
    partName: "",
    itemDescription: "",
    material: "",
    quantity: 0,
    uom: "",
    uomList: ["Unit", "Kg", "Mtr", "Ltr"],
    unitRate: 0,
    totalValue: 0,
    hsnCode: "",
    weight: 0,
    returned: 0,
    totalWeight: 0,
    materials: [],
    exciseClNos: [],
    srlType: "Sheets",
    tableData: [],
    rvId: "",

    // Dispatch Details
    inspectedBy: "",
    packedBy: "",
    modeList: ["By Road", "By Hand", "By Air", "By Courier"],
    selectedMode: "",
    scrapWeight: 0,
    vehicleDetails: "",
    eWayRef: "",
    deliveryContactName: "",
    deliveryContactNo: "",

    // Job Work Goods Receipt Voucher
    rvId: "",
    receiptDate: "",
    rvNo: "",
    rvDate: "",
    rvCustCode: "",
    rvCustomer: "",
    CustDocuNo: "",
    ewayBillNo: "",
    custKSTNo: "",
    CustGSTNo: "",
    RVStatus: "",
    rvTotalWeight: 0,
    UpDated: 0,
    Type: "",
    Ref_VrId: "",
    Ref_VrNo: "",
    CancelReason: "",
    firstTable: [],
    firstTableArray: [],
    secondTable: [],
    secondTableArray: [],
    receiveTable: [],
    updatedCount: 0,
  });

  const updateFormData = (data) => {
    setFormData(data);
  };

  const [showAddModal, setShowAddModal] = useState(false);
  const [showInspModal, setShowInspModal] = useState(false);
  const [showJobWorkModal, setShowJobWorkModal] = useState(false);
  const [showRVModal, setShowRVModal] = useState(false);
  const [cancelDC, setCancelDC] = useState(false);
  const [ewayBill, setEwayBill] = useState(false);
  const [ewayBillSave, setEwayBillSave] = useState(false);
  const [ewayBillPrint, setEwayBillPrint] = useState(false);
  const [ewayBillPdf, setEwayBillPdf] = useState(false);

  const openJobWorkModalReturns = () => {
    setShowJobWorkModal(true);
    updateFormData({
      ...formData,
      selectedRowData: {},
    });
  };

  const closeJobWorkModal = () => {
    setShowJobWorkModal(false);
    updateFormData({
      ...formData,
      selectedRow2: null,
      rvNo: "",
      rvDate: "",
      CustDocuNo: "",
      ewayBillNo: "",
      CancelReason: "",
    });
  };

  const openJobWorkModalRV = () => {
    if (formData.selectedRow2) {
      setShowRVModal(true);
      updateFormData((prevData) => ({
        ...prevData,
        selectedRow2: null,
      }));
    } else {
      toast.error("Select a row to Open RV");
    }
  };

  const closeJobWorkModalRV = () => {
    setShowRVModal(false);
    updateFormData({
      ...formData,

      rvNo: "",
      rvDate: "",
      CustDocuNo: "",
      ewayBillNo: "",
      CancelReason: "",
      selectedRowData: {},
    });
  };

  const openAddModal = () => {
    if (formData.selectedCustomer) {
      setShowAddModal(true);
    } else {
      toast.error("Select a customer before adding a new item.");
    }
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    updateFormData((prevData) => ({
      ...prevData,
      partName: "",
      itemDescription: "",
      material: "",
      quantity: 0,
      uom: "",
      unitRate: 0,
      totalValue: 0,
      weight: 0,
      hsnCode: "",
    }));
  };

  const openInspModal = () => {
    // Validate individual fields in tableData
    const quantityError = formData.tableData.some((row) => {
      return !row.Qty || Number(row.Qty) <= 0;
    });

    if (quantityError) {
      toast.error("Values Required in Quantity");
      return;
    }

    const unitRateError = formData.tableData.some((row) => {
      return !row.Unit_Rate || Number(row.Unit_Rate) <= 0;
    });

    if (unitRateError) {
      toast.error("Values Required in Unit Rate");
      return;
    }

    const weightError = formData.tableData.some((row) => {
      return !row.DC_Srl_Wt || Number(row.DC_Srl_Wt) <= 0;
    });

    if (weightError) {
      toast.error("Values Required in Total Weight");
      return;
    }

    // Additional validations
    const hasErrors = formData.tableData.some((row) => {
      const qty = parseFloat(row.Qty);
      const unitRate = parseFloat(row.Unit_Rate);
      const dcSrlWt = parseFloat(row.DC_Srl_Wt);

      return (
        isNaN(qty) ||
        isNaN(unitRate) ||
        isNaN(dcSrlWt) ||
        row.Qty === "" ||
        row.Unit_Rate === "" ||
        row.DC_Srl_Wt === ""
      );
    });

    if (hasErrors) {
      toast.error("Numeric Value Required");
      return;
    }

    if (formData.tableData.length === 0) {
      toast.error("Missing Details");
    } else if (!formData.selectedMode) {
      toast.error("Select Transport Mode");
    } else if (!formData.vehicleDetails) {
      toast.error("Enter Dispatch/ Vehicle Details");
    } else if (!formData.deliveryContactName) {
      toast.error("Enter Delivery Customer Name");
    } else if (!formData.deliveryContactNo) {
      toast.error("Enter Delivery Contact No");
    } else if (
      formData.isGovOrg !== 1 &&
      formData.gstNo !== formData.UnitGSTNo
    ) {
      if (formData.selectedTax.length === 0) {
        toast.error("Select taxes");
      }
    }

    // else if (formData.isGovOrg != 1 || formData.gstNo != formData.UnitGSTNo) {
    //   toast.error("Select taxes");
    // }
    else if (!formData.reference) {
      toast.error("Missing Reference");
    } else {
      setShowInspModal(true);
    }
  };

  // console.log("isGovOrg", formData.isGovOrg);
  // console.log("gstNo", formData.gstNo);
  // console.log("Unit GST No", formData.UnitGSTNo);

  const closeInspModal = (inspectedBy, packedBy) => {
    setShowInspModal(false);
    updateFormData((prevData) => ({
      ...prevData,
      inspectedBy,
      packedBy,
    }));
  };
  const openCancelDC = () => {
    if (!formData.dcInvNo) {
      toast.error("Select a Customer");
    } else if (!formData.dcCancel || formData.dcCancel.length < 10) {
      toast.error("Enter proper reason to cancel DC");
    } else {
      setCancelDC(true);
    }
  };
  const closeCancelDC = () => {
    setCancelDC(false);
  };

  const openEwayBill = () => {
    setEwayBill(true);
  };

  const closeEwayBill = () => {
    setEwayBill(false);
  };

  const openEwayBillSave = () => {
    setEwayBillSave(true);
    setEwayBill(false);
  };

  const closeEwayBillSave = () => {
    setEwayBillSave(false);
  };

  const openEwayBillPrint = () => {
    updateFormData((prevData) => ({
      ...prevData,
      ewayBillNo: formData.ewayBillNo,
    }));
    setEwayBill(false);
    setEwayBillSave(false);
    setEwayBillPrint(true);
  };

  const closeEwayBillPrint = () => {
    setEwayBillPrint(false);
  };

  const openEwayBillPdf = () => {
    setEwayBillPrint(false);
    setEwayBillPdf(true);
  };

  const closeEwayBillPdf = () => {
    setEwayBillPdf(false);
    updateFormData((prevData) => ({
      ...prevData,
      ewayBillNo: "",
    }));
  };

  const getHsnCode = (selectedMaterial) => {
    const index = formData.materials.indexOf(selectedMaterial);
    // console.log("index", index);
    return formData.exciseClNos[index];
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    updateFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "material") {
      const exciseClNo = getHsnCode(value);
      updateFormData((prevData) => ({
        ...prevData,
        hsnCode: exciseClNo,
      }));
    }
  };

  async function fetchCustomerNames() {
    try {
      const response = await Axios.get(apipoints.getAllCust);
      // console.log("response", response);
      if (response.status === 200) {
        const customerNames = response.data.map((customer) => {
          // console.log("customerNames", response.data);
          return {
            label: customer.Cust_name,
            ...customer,
          };
        });
        updateFormData((prevData) => ({
          ...prevData,
          customerNames,
          custData: response.data,
        }));
      } else {
        throw new Error("Failed");
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchCustomerNames();
  }, []);

  useEffect(() => {
    Axios.get(apipoints.getStates)
      .then((response) => {
        updateFormData((prevData) => ({
          ...prevData,
          states: response.data,
        }));
      })
      .catch((error) => {
        console.error("Error fetching states", error);
      });
  }, []);

  // const handleCustomerChange = async (selectedOption) => {
  //   if (selectedOption.length > 0) {
  //     try {
  //       const selectedCustomer = selectedOption[0];
  //       console.log("selectedCustomer", selectedCustomer);
  //       // console.log("ISGOVORG", selectedCustomer.IsGovtOrg);

  //       const customerDetails = await Axios.post(apipoints.getCustomerDetails, {
  //         custCode: selectedCustomer.Cust_Code,
  //       });

  //       // console.log("IsGovtOrg", customerDetails.data.IsGovtOrg);

  //       const dcInvNo = formData.dcInvNo;

  //       updateFormData((prevData) => ({
  //         ...prevData,
  //         selectedCustomer,
  //         custCode: customerDetails.data.Cust_Code,
  //         custName: customerDetails.data.Cust_name,
  //         // custAddress: `Branch - ${customerDetails.data.Address}` || "",
  //         custAddress:
  //           `Branch - ${
  //             customerDetails.data.Branch
  //               ? `${customerDetails.data.Branch}\n`
  //               : ""
  //           }${customerDetails.data.Address}` || "",

  //         custCity: customerDetails.data.City || "",
  //         custPin: customerDetails.data.Pin_Code || "",
  //         custState: customerDetails.data.State || "",
  //         gstNo: customerDetails.data.GSTNo || "",
  //         custStateId: customerDetails.data.StateId || "",
  //         isGovOrg: selectedCustomer.IsGovtOrg || "",
  //         isForiegn: selectedCustomer.IsForiegn || "",
  //       }));

  //       try {
  //         const taxResponse = await Axios.post(apipoints.loadTaxes, {
  //           stateId: selectedCustomer.StateId,
  //           isGovOrg: selectedCustomer.IsGovtOrg,
  //           isForiegn: selectedCustomer.isForiegn,
  //           gstNo: selectedCustomer.GSTNo,
  //           unitStateId: formData.unitStateId,
  //           UnitGSTNo: formData.UnitGSTNo,
  //         });

  //         const taxDetails = taxResponse.data;

  //         updateFormData((prevData) => ({
  //           ...prevData,
  //           taxDetails: taxDetails,
  //         }));
  //       } catch (error) {
  //         console.log("Error while loading taxes:", error);
  //       }

  //       try {
  //         const requestData = {
  //           Cust_Code: selectedCustomer.Cust_Code,
  //           Cust_Address: selectedCustomer.Address,
  //           dcStatus: formData.dcStatus,
  //         };

  //         if (!dcInvNo) {
  //           // Create new customer details
  //           const insertCustDetails = await Axios.post(
  //             apipoints.postCustDetails,
  //             requestData
  //           );

  //           const lastInsertedId = insertCustDetails.data.DcId;
  //           console.log("lastInsertedId", lastInsertedId);

  //           updateFormData((prevData) => ({
  //             ...prevData,
  //             dcInvNo: lastInsertedId,
  //           }));
  //         } else {
  //           // Update existing customer details
  //           await Axios.post(apipoints.updateCust, {
  //             Cust_Code: selectedCustomer.Cust_Code,
  //             Cust_Name: selectedCustomer.Cust_name,
  //             custState: selectedCustomer.State,
  //             custStateId: selectedCustomer.StateId,
  //             custAddress: selectedCustomer.Address,
  //             custCity: selectedCustomer.City,
  //             custPin: selectedCustomer.Pin_Code,
  //             deliveryAddress: formData.deliveryAddress,
  //             gstNo: selectedCustomer.GSTNo,
  //             dcInvNo: formData.dcInvNo,
  //             reference: formData.reference,
  //           });

  //           updateFormData((prevData) => ({
  //             ...prevData,
  //             selectedTax: [],
  //           }));
  //         }
  //       } catch (error) {
  //         console.log("Error while processing customer details:", error);
  //       }
  //     } catch (error) {
  //       console.log("Error in API request", error);
  //     }
  //   }
  // };

  const handleCustomerChange = async (selectedOption) => {
    if (selectedOption.length > 0) {
      try {
        const selectedCustomer = selectedOption[0];

        // Fetch customer details using an API call
        const customerDetails = await Axios.post(apipoints.getCustomerDetails, {
          custCode: selectedCustomer.Cust_Code,
        });
        console.log("IsForiegn", customerDetails.data.IsForiegn);

        // Update form data with customer details
        updateFormData((prevData) => ({
          ...prevData,
          selectedCustomer,
          custCode: customerDetails.data.Cust_Code,
          custName: customerDetails.data.Cust_name,
          custAddress:
            `Branch - ${
              customerDetails.data.Branch
                ? `${customerDetails.data.Branch}\n`
                : ""
            }${customerDetails.data.Address}` || "",
          custCity: customerDetails.data.City || "",
          custPin: customerDetails.data.Pin_Code || "",
          custState: customerDetails.data.State || "",
          gstNo: customerDetails.data.GSTNo || "",
          custStateId: customerDetails.data.StateId || "",
          isGovOrg: selectedCustomer.IsGovtOrg || "",
          isForiegn: selectedCustomer.IsForiegn || "",
        }));

        // Load taxes based on customer details
        const taxResponse = await Axios.post(apipoints.loadTaxes, {
          stateId: selectedCustomer.StateId,
          isGovOrg: selectedCustomer.IsGovtOrg,
          isForiegn: selectedCustomer.isForiegn,
          gstNo: selectedCustomer.GSTNo,
          unitStateId: formData.unitStateId,
          UnitGSTNo: formData.UnitGSTNo,
        });

        // Update form data with tax details
        const taxDetails = taxResponse.data;
        updateFormData((prevData) => ({
          ...prevData,
          taxDetails: taxDetails,
        }));

        // Process customer details
        const dcInvNo = formData.dcInvNo;
        const requestData = {
          Cust_Code: selectedCustomer.Cust_Code,
          Cust_Address: selectedCustomer.Address,
          dcStatus: formData.dcStatus,
        };

        if (!dcInvNo) {
          // Create new customer details if dcInvNo is not present
          const insertCustDetails = await Axios.post(
            apipoints.postCustDetails,
            requestData
          );

          const lastInsertedId = insertCustDetails.data.DcId;

          // Update form data with the last inserted ID
          updateFormData((prevData) => ({
            ...prevData,
            dcInvNo: lastInsertedId,
          }));
        } else {
          // Update existing customer details if dcInvNo is present
          await Axios.post(apipoints.updateCust, {
            Cust_Code: selectedCustomer.Cust_Code,
            Cust_Name: selectedCustomer.Cust_name,
            custState: selectedCustomer.State,
            custStateId: selectedCustomer.StateId,
            custAddress: selectedCustomer.Address,
            custCity: selectedCustomer.City,
            custPin: selectedCustomer.Pin_Code,
            deliveryAddress: formData.deliveryAddress,
            gstNo: selectedCustomer.GSTNo,
            dcInvNo: formData.dcInvNo,
            reference: formData.reference,
          });

          // Update form data by resetting selectedTax
          updateFormData((prevData) => ({
            ...prevData,
            selectedTax: [],
          }));
        }
      } catch (error) {
        console.log("Error in API request", error);
      }
    }
  };

  console.log("IsGovtOrg", formData.isGovOrg);

  useEffect(() => {
    const fetchData = async () => {
      const loadCustomerDetails = async (customerCode) => {
        try {
          const customerDetails = await Axios.post(
            apipoints.getCustomerDetails,
            {
              custCode: customerCode,
            }
          );

          // console.log("customerDetails", customerDetails.data);
          // console.log("isGovOrg", customerDetails.data.IsGovtOrg);
          // console.log("isForiegn", customerDetails.data.IsForiegn);

          const { IsGovtOrg, IsForiegn, GSTNo } = customerDetails.data;

          // Update customerDetails in formData state
          updateFormData((prevData) => ({
            ...prevData,
            customerDetails: customerDetails.data,
            isGovOrg: IsGovtOrg,
            isForiegn: IsForiegn,
            // gstNo: GSTNo,
          }));

          await loadTaxes(customerCode, IsGovtOrg, IsForiegn, GSTNo);
        } catch (error) {
          console.error("Error loading customer details:", error);
        }
      };

      const loadTaxes = async (customerCode, isGovOrg, isForiegn, gstNo) => {
        try {
          const taxResponse = await Axios.post(apipoints.loadTaxes, {
            stateId: formData.custStateId,
            unitStateId: formData.unitStateId,
            isGovOrg: isGovOrg,
            isForiegn: isForiegn,
            gstNo: formData.gstNo,
            UnitGSTNo: formData.UnitGSTNo,
          });

          const taxDetails = taxResponse.data;

          updateFormData((prevData) => ({
            ...prevData,
            taxDetails: taxDetails,
          }));
        } catch (error) {
          console.error("Error loading taxes:", error);
        }
      };

      if (dcSelectedRow) {
        await loadCustomerDetails(dcSelectedRow.custCode);
      }
    };

    fetchData();
  }, [dcSelectedRow.custStateId, formData.custStateId, dcSelectedRow.custCode]);

  const handleRowSelectTable1 = (srl) => {
    const selectedRowData = formData.tableData.find(
      (data) => data.DC_Inv_Srl === srl
    );

    updateFormData({
      ...formData,
      selectedRow1: formData.selectedRow1 === srl ? null : srl,
      selectedRowData: selectedRowData || {},
    });
  };

  const handleRowSelectTable2 = (srl) => {
    const selectedRowData = formData.receiveTable.find(
      (data) => data.RvID === srl
    );

    updateFormData({
      ...formData,
      selectedRow2: formData.selectedRow2 === srl ? null : srl,
      selectedRowData: selectedRowData || {},
    });
  };

  const handleDeleteClick = async (event, srl) => {
    event.preventDefault();

    if (!formData.selectedRow1) {
      toast.error("Select Row to delete");
      return;
    }

    try {
      const response = await Axios.post(apipoints.deleteRow, {
        dcInvNo: formData.dcInvNo,
        srl: formData.selectedRow1,
      });

      console.log("Updated data after deletion", response.data);
      updateFormData({
        ...formData,
        tableData: response.data,
        selectedRow1: null,
      });
      toast.success("Row Deleted");
    } catch (error) {
      console.error("Error deleting from backend", error);
    }
  };

  const handleDCCancel = async () => {
    try {
      const response = await Axios.post(apipoints.dcCancel, {
        dcInvNo: formData.dcInvNo,
        dcCancel: formData.dcCancel,
      });

      console.log("Updated data after deletion", response.data);
      updateFormData({
        ...formData,
        dcStatus: response.data[0].DCStatus,
      });
      toast.success("Returnable DC Cancelled");
      setCancelDC(false);
    } catch (error) {
      console.error("Error deleting from backend", error);
    }
  };

  const receiveReturns = async () => {
    try {
      const response = await Axios.post(apipoints.receiveReturns, {
        dcInvNo: formData.dcInvNo,
      });

      const date = new Date();
      const year = date.getFullYear();
      const getYear =
        date.getMonth() >= 3 ? `${year}-${year + 1}` : `${year - 1}-${year}`;
      const yearParts = getYear.split("-");
      const startYearShort = yearParts[0].slice(-2);

      updateFormData((prevData) => ({
        ...prevData,
        rvId: response.data[0].RvID,
        rvCustomer: response.data[0].Customer,
        rvCustCode: response.data[0].Cust_Code,
        rvTotalWeight: response.data[0].TotalWeight,
        Ref_VrNo: response.data[0].Ref_VrNo,
        CustGSTNo: response.data[0].CustGSTNo,
        RVStatus: response.data[0].RVStatus,
      }));
    } catch (error) {
      console.error("Error in receiveReturns function:", error);
    }
  };

  const calculateTotalWeight = () => {
    const total_wt = formData.tableData.reduce(
      (total, item) => total + parseFloat(item.DC_Srl_Wt || 0),
      0
    );

    updateFormData((prevData) => ({
      ...prevData,
      totalWeight: total_wt,
    }));
  };

  const calculateTotalValue = () => {
    const total_Amt = formData.tableData.reduce(
      (total, item) => total + parseFloat(item.DC_Srl_Amt),
      0
    );

    updateFormData({
      ...formData,
      taxableAmount: total_Amt,
    });

    const updatedSelectedTax = formData.selectedTax.map((tax) => ({
      ...tax,
      TaxableAmount: total_Amt,
      TaxAmt: parseFloat((total_Amt * tax.TaxPercent) / 100).toFixed(2),
    }));

    const totalTaxAmount = updatedSelectedTax.reduce(
      (total, tax) => total + parseFloat(tax.TaxAmt),
      0
    );

    updateFormData((prevData) => ({
      ...prevData,
      selectedTax: updatedSelectedTax,
      taxAmt: totalTaxAmount.toFixed(2),
    }));
  };

  useEffect(() => {
    calculateTotalValue();
    calculateTotalWeight();
  }, [formData.tableData]);

  const handleFieldChange = (index, field, newValue) => {
    updateFormData((prevData) => {
      const updatedTableData = [...prevData.tableData];

      const isNegative = parseFloat(newValue) < 0;
      newValue = isNegative ? 0 : newValue;

      updatedTableData[index][field] = newValue;

      const newQuantity = Math.max(
        parseFloat(updatedTableData[index].Qty) || 0,
        0
      );

      const newUnitRate = Math.max(
        parseFloat(updatedTableData[index].Unit_Rate) || 0,
        0
      );

      const newTotalWeight = Math.max(
        parseFloat(updatedTableData[index].DC_Srl_Wt) || 0,
        0
      );

      const newTotalValue = newQuantity * newUnitRate;

      updatedTableData[index].DC_Srl_Amt = newTotalValue.toFixed(2);

      return {
        ...prevData,
        tableData: updatedTableData,
        quantity: newQuantity,
        unitRate: newUnitRate,
        weight: newTotalWeight,
        totalValue: Math.max(newTotalValue, 0),
      };
    });
  };

  const handleSave = async () => {
    if (formData.dcInvNo) {
      try {
        const quantityError = formData.tableData.some((row) => {
          return !row.Qty || Number(row.Qty) <= 0;
        });

        if (quantityError) {
          toast.error("Values Required in Quantity ");
          return;
        }

        const unitRateError = formData.tableData.some((row) => {
          return !row.Unit_Rate || Number(row.Unit_Rate) <= 0;
        });

        if (unitRateError) {
          toast.error("Values Required in Unit Rate ");
          return;
        }

        const weightError = formData.tableData.some((row) => {
          return !row.DC_Srl_Wt || Number(row.DC_Srl_Wt) <= 0;
        });

        if (weightError) {
          toast.error("Values Required in Total Weight ");
          return;
        }
        const hasErrors = formData.tableData.some((row) => {
          const qty = parseFloat(row.Qty);
          const unitRate = parseFloat(row.Unit_Rate);
          const dcSrlWt = parseFloat(row.DC_Srl_Wt);

          return (
            isNaN(qty) ||
            isNaN(unitRate) ||
            isNaN(dcSrlWt) ||
            row.Qty === "" ||
            row.Unit_Rate === "" ||
            row.DC_Srl_Wt === ""
          );
        });

        const requestData = {
          // magodmis.draft_dc_inv_register
          unitName: formData.unitName,
          dcNo: formData.dcNo,
          dcInvNo: formData.dcInvNo,
          dcDate: formData.dcDate,
          dcType: formData.dcType,
          selectedCustomer: formData.selectedCustomer,
          custName: formData.custName,
          custCode: formData.custCode,
          reference: formData.reference,
          custAddress: formData.custAddress,
          custState: formData.custState,
          custCity: formData.custCity,
          custPin: formData.custPin,
          gstNo: formData.gstNo,
          deliveryAddress: formData.deliveryAddress,
          deliveryState: formData.deliveryState,
          inspectedBy: formData.inspectedBy,
          packedBy: formData.packedBy,
          selectedMode: formData.selectedMode,
          scrapWeight: formData.scrapWeight,
          totalWeight: formData.totalWeight,
          vehicleDetails: formData.vehicleDetails,
          deliveryContactName: formData.deliveryContactName,
          deliveryContactNo: formData.deliveryContactNo,
          eWayRef: formData.eWayRef,
          taxableAmount: formData.taxableAmount,
          taxAmt: formData.taxAmt,
          tableData: formData.tableData,
          selectedTax: formData.selectedTax,
        };

        const response = await Axios.post(apipoints.updateSave, requestData);

        toast.success("Data Saved");
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const getDCNo = async () => {
    const srlType = "ReturnableGoodDC";
    const ResetPeriod = "FinanceYear";
    const ResetValue = 0;
    const VoucherNoLength = 4;
    const prefix = `${formData.unitName.charAt(0).toUpperCase()}G`;
    try {
      const response = await Axios.post(apipoints.insertRunNoRow, {
        unit: formData.unitName,
        srlType: srlType,
        ResetPeriod: ResetPeriod,
        ResetValue: ResetValue,
        VoucherNoLength: VoucherNoLength,
        prefix: prefix,
      });

      console.log("getDCNo Response", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (dcSelectedRow) {
      const fetchData = async () => {
        try {
          const response = await Axios.post(apipoints.allCreateNewData, {
            dcInvNo: dcSelectedRow.dcInvNo,
            Del_StateId: dcSelectedRow.delStateId,
          });

          const {
            draft_dc_inv_details,
            material_receipt_register,
            dc_inv_taxtable,
            state_codelist,
            draft_dc_inv_register,
          } = response.data;

          console.log(
            "material_receipt_register",
            response.data.material_receipt_register
          );

          updateFormData((prevData) => ({
            ...prevData,
            dcNo: draft_dc_inv_register.length
              ? draft_dc_inv_register[0].DC_No
              : "",
            dcInvNo: draft_dc_inv_register.length
              ? draft_dc_inv_register[0].DC_Inv_No
              : "",
            custName: draft_dc_inv_register.length
              ? draft_dc_inv_register[0].Cust_Name
              : "",
            custAddress: draft_dc_inv_register.length
              ? draft_dc_inv_register[0].Cust_Address
              : "",
            custCode: draft_dc_inv_register.length
              ? draft_dc_inv_register[0].Cust_Code
              : "",

            custState: draft_dc_inv_register.length
              ? draft_dc_inv_register[0].Cust_State === "null"
                ? ""
                : draft_dc_inv_register[0].Cust_State
              : "",

            custCity: draft_dc_inv_register.length
              ? draft_dc_inv_register[0].Cust_Place
              : "",

            custPin: draft_dc_inv_register.length
              ? draft_dc_inv_register[0].PIN_Code === "null"
                ? ""
                : draft_dc_inv_register[0].PIN_Code
              : "",

            dcStatus: draft_dc_inv_register.length
              ? draft_dc_inv_register[0].DCStatus
              : "",

            gstNo: draft_dc_inv_register.length
              ? draft_dc_inv_register[0].GSTNo === "null"
                ? ""
                : draft_dc_inv_register[0].GSTNo
              : "",

            deliveryAddress: draft_dc_inv_register.length
              ? draft_dc_inv_register[0].Del_Address === "null" ||
                draft_dc_inv_register[0].Del_Address === "undefined"
                ? ""
                : draft_dc_inv_register[0].Del_Address
              : "",

            deliveryState: state_codelist.length ? state_codelist[0].State : "",
            custStateId: draft_dc_inv_register.length
              ? draft_dc_inv_register[0].Cust_StateId
              : "",
            delStateId: draft_dc_inv_register.length
              ? draft_dc_inv_register[0].Del_StateId
              : "",

            reference: draft_dc_inv_register.length
              ? draft_dc_inv_register[0].PO_No === "null" ||
                draft_dc_inv_register[0].PO_No === "undefined"
                ? ""
                : draft_dc_inv_register[0].PO_No
              : "",

            dcDate: draft_dc_inv_register.length
              ? draft_dc_inv_register[0].DC_Date
                ? new Date(draft_dc_inv_register[0].DC_Date).toLocaleDateString(
                    "en-GB"
                  )
                : ""
              : "",

            dcCancel:
              draft_dc_inv_register || draft_dc_inv_register.length
                ? draft_dc_inv_register[0].DC_CancelReason
                : "",

            inspectedBy: draft_dc_inv_register.length
              ? draft_dc_inv_register[0].InspBy === "null"
                ? ""
                : draft_dc_inv_register[0].InspBy
              : "",

            packedBy: draft_dc_inv_register.length
              ? draft_dc_inv_register[0].PackedBy === "null"
                ? ""
                : draft_dc_inv_register[0].PackedBy
              : "",

            selectedMode: draft_dc_inv_register.length
              ? draft_dc_inv_register[0].TptMode
              : "",

            scrapWeight: draft_dc_inv_register.length
              ? draft_dc_inv_register[0].ScarpWt
              : "",

            vehicleDetails: draft_dc_inv_register.length
              ? draft_dc_inv_register[0].VehNo === "null"
                ? ""
                : draft_dc_inv_register[0].VehNo
              : "",

            deliveryContactName: draft_dc_inv_register.length
              ? draft_dc_inv_register[0].Del_ContactName === "null"
                ? ""
                : draft_dc_inv_register[0].Del_ContactName
              : "",

            deliveryContactNo: draft_dc_inv_register.length
              ? draft_dc_inv_register[0].Del_ContactNo === "null"
                ? ""
                : draft_dc_inv_register[0].Del_ContactNo
              : "",

            eWayRef: draft_dc_inv_register.length
              ? draft_dc_inv_register[0].EWayBillRef === "null"
                ? ""
                : draft_dc_inv_register[0].EWayBillRef
              : "",

            taxAmt: draft_dc_inv_register.length
              ? draft_dc_inv_register[0].TaxAmt
              : "",

            taxableAmount: draft_dc_inv_register.length
              ? draft_dc_inv_register[0].Net_Total
              : "",

            tableData: draft_dc_inv_details.length ? draft_dc_inv_details : [],
            selectedCustomer:
              dcSelectedRow && dcSelectedRow.custName !== undefined
                ? [dcSelectedRow.custName]
                : [],
            partName: "",
            itemDescription: "",
            material: "",
            quantity: 0,
            uom: "",
            unitRate: 0,
            totalValue: 0,
            hsnCode: "",
            weight: 0,
            returned: 0,

            receiveTable: material_receipt_register.length
              ? material_receipt_register
              : [],

            selectedTax:
              draft_dc_inv_register[0].DCStatus === "Despatched" ||
              draft_dc_inv_register[0].DCStatus === "Closed"
                ? dc_inv_taxtable.length
                  ? dc_inv_taxtable
                  : []
                : [],
          }));
        } catch (error) {
          console.error("Error fetching data from API", error);
        }
      };

      fetchData();
    }
  }, []);

  const blockInvalidChar = (e) =>
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();

  const blockInvalidQtyChar = (e) =>
    ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault();

  return (
    <div>
      <div className="col-md-12">
        <AddNew
          showAddModal={showAddModal}
          setShowAddModal={setShowAddModal}
          closeAddModal={closeAddModal}
          handleInputChange={handleInputChange}
          formData={formData}
          updateFormData={updateFormData}
          calculateTotalValue={calculateTotalValue}
        />

        <InspectionPackingForm
          showInspModal={showInspModal}
          setShowInspModal={setShowInspModal}
          closeInspModal={closeInspModal}
          formData={formData}
          updateFormData={updateFormData}
          handleSave={handleSave}
        />

        <CreateNewJobWork
          showJobWorkModal={showJobWorkModal}
          closeJobWorkModal={closeJobWorkModal}
          formData={formData}
          handleInputChange={handleInputChange}
          updateFormData={updateFormData}
        />

        <OpenRV
          showRVModal={showRVModal}
          closeJobWorkModalRV={closeJobWorkModalRV}
          handleInputChange={handleInputChange}
          formData={formData}
          updateFormData={updateFormData}
        />

        <CancelDCModal
          cancelDC={cancelDC}
          closeCancelDC={closeCancelDC}
          handleDCCancel={handleDCCancel}
        />

        <EwayBillModal
          ewayBill={ewayBill}
          closeEwayBill={closeEwayBill}
          handleInputChange={handleInputChange}
          formData={formData}
          openEwayBillSave={openEwayBillSave}
        />

        <EwayBillSaveModal
          ewayBillSave={ewayBillSave}
          closeEwayBillSave={closeEwayBillSave}
          openEwayBillPrint={openEwayBillPrint}
        />

        <EwayBillPrintModal
          ewayBillPrint={ewayBillPrint}
          closeEwayBillPrint={closeEwayBillPrint}
          openEwayBillPdf={openEwayBillPdf}
        />

        <EwayBillPdfModal
          ewayBillPdf={ewayBillPdf}
          closeEwayBillPdf={closeEwayBillPdf}
          formData={formData}
          DeliveryChallan={DeliveryChallan}
        />

        <h4 className="title">Returnable Delivery Challan</h4>
      </div>

      <div className="row">
        <div className="col-md-2 col-sm-12">
          <label className="form-label">DC No</label>
          <input type="text" disabled value={formData.dcNo} />
        </div>
        <div className="col-md-2 col-sm-12">
          <label className="form-label">DC Type</label>
          <input type="text" disabled value={formData.dcType} />
        </div>
        <div className="col-md-2 col-sm-12">
          <label className="form-label">Vendor Code</label>
          <input type="number" value={formData.custCode} disabled />
        </div>

        <div className="col-md-2 col-sm-12">
          <label className="form-label">Status</label>
          <input type="text" disabled value={formData.dcStatus} />
        </div>

        <div className="col-md-3 col-sm-12">
          <label className="form-label">Reference</label>
          <input
            type="text"
            name="reference"
            value={formData.reference}
            onChange={handleInputChange}
            disabled={
              formData.dcStatus === "Despatched" ||
              formData.dcStatus === "Closed" ||
              formData.dcStatus === "Cancelled"
            }
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-4">
          <label className="form-label">Name</label>

          {formData.custData?.length > 0 && (
            <div>
              <Typeahead
                id="basic-example"
                placeholder="Select a customer..."
                options={formData.customerNames}
                onChange={handleCustomerChange}
                disabled={
                  formData.dcStatus === "Despatched" ||
                  formData.dcStatus === "Closed" ||
                  formData.dcStatus === "Cancelled"
                }
                defaultSelected={
                  dcSelectedRow && dcSelectedRow.custName !== undefined
                    ? [dcSelectedRow.custName]
                    : []
                }
              />
            </div>
          )}
        </div>
        <div className="col-md-2">
          <label className="form-label">Date</label>
          <input type="text" value={formData.dcDate} name="dcDate" disabled />
        </div>
        <div className="col-md-4">
          <label className="form-label">Reason</label>
          <input
            type="text"
            name="dcCancel"
            value={formData.dcCancel}
            onChange={handleInputChange}
            disabled={
              formData.dcStatus === "Cancelled" ||
              formData.dcStatus === "Closed" ||
              !formData.dcInvNo ||
              formData.receiveTable.length > 0
            }
          />
        </div>

        <div className="col-md-2 mt-3">
          <button
            className={
              formData.dcStatus === "Cancelled" ||
              !formData.dcInvNo ||
              formData.dcStatus === "Closed" ||
              formData.receiveTable.length > 0
                ? "button-style button-disabled"
                : "button-style"
            }
            disabled={
              formData.dcStatus === "Cancelled" ||
              formData.dcStatus === "Closed" ||
              !formData.dcInvNo ||
              formData.receiveTable.length > 0
            }
            onClick={openCancelDC}
          >
            Cancel DC
          </button>
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-md-2 col-sm-12">
          <button
            className={
              formData.dcStatus === "Despatched" ||
              formData.dcStatus === "Closed" ||
              formData.dcStatus === "Cancelled"
                ? "button-style button-disabled"
                : "button-style"
            }
            onClick={() => {
              if (formData.selectedCustomer) {
                openAddModal();
              } else {
                toast.error("Select Customer");
              }
            }}
            disabled={
              formData.dcStatus === "Despatched" ||
              formData.dcStatus === "Cancelled" ||
              formData.dcStatus === "Closed"
            }
          >
            Add New
          </button>
        </div>

        <div className="col-md-2  col-sm-12">
          <button
            className={
              formData.dcStatus === "Despatched" ||
              formData.dcStatus === "Closed" ||
              formData.dcStatus === "Cancelled"
                ? "button-style button-disabled"
                : "button-style"
            }
            // onClick={openInspModal}
            onClick={() => {
              getDCNo();
              openInspModal();
            }}
            disabled={
              formData.dcStatus === "Despatched" ||
              formData.dcStatus === "Closed" ||
              formData.dcStatus === "Cancelled"
            }
          >
            Create DC
          </button>
        </div>

        <div className="col-md-2 col-sm-12">
          <button
            className={
              formData.dcStatus === "Despatched" ||
              formData.dcStatus === "Closed" ||
              formData.dcStatus === "Cancelled"
                ? "button-style button-disabled"
                : "button-style"
            }
            disabled={
              formData.dcStatus === "Despatched" ||
              formData.dcStatus === "Closed" ||
              formData.dcStatus === "Cancelled"
            }
            onClick={handleSave}
          >
            Save
          </button>
        </div>

        <div className="col-md-2 col-sm-12">
          <button
            className={
              formData.dcStatus === "Despatched" ||
              formData.dcStatus === "Closed" ||
              formData.dcStatus === "Cancelled"
                ? "button-style button-disabled"
                : "button-style"
            }
            onClick={handleDeleteClick}
            disabled={
              formData.dcStatus === "Despatched" ||
              formData.dcStatus === "Closed" ||
              formData.dcStatus === "Cancelled"
            }
          >
            Delete
          </button>
        </div>

        <div className="col-md-2 col-sm-12">
          <button
            className={
              formData.dcStatus === "Draft" || formData.dcStatus === "Cancelled"
                ? "button-style button-disabled"
                : "button-style"
            }
            disabled={
              formData.dcStatus === "Draft" || formData.dcStatus === "Cancelled"
            }
            onClick={openEwayBill}
          >
            Print
          </button>
        </div>

        <div className="col-md-2 col-sm-12">
          <Link to="/PackingAndInvoices">
            <button className="button-style">Close</button>
          </Link>
        </div>
      </div>

      <Tabs className="mt-3">
        <Tab eventKey="consigneeInfo" title="Consignee Address">
          <ConsigneeInfo
            handleInputChange={handleInputChange}
            formData={formData}
            updateFormData={updateFormData}
          />
        </Tab>
        <Tab eventKey="Invoicing Info" title="Dispatch Details">
          <DispatchDetails
            handleInputChange={handleInputChange}
            formData={formData}
            updateFormData={updateFormData}
          />
        </Tab>
      </Tabs>

      <div className="row">
        <div className="col-md-6 col-sm-12 mt-3" style={{ height: "300px" }}>
          <DraftDetailsTable
            formData={formData}
            handleFieldChange={handleFieldChange}
            handleRowSelectTable1={handleRowSelectTable1}
            blockInvalidChar={blockInvalidChar}
            blockInvalidQtyChar={blockInvalidQtyChar}
          />
        </div>
        <div className="col-md-6 col-sm-12">
          <button
            className={
              formData.dcStatus === "Draft" ||
              formData.dcStatus === "Closed" ||
              formData.dcStatus === "Cancelled"
                ? "button-style button-disabled"
                : "button-style"
            }
            disabled={
              formData.dcStatus === "Draft" ||
              formData.dcStatus === "Closed" ||
              formData.dcStatus === "Cancelled"
            }
            onClick={() => {
              receiveReturns();
              openJobWorkModalReturns();
            }}
          >
            Receive Returns
          </button>

          <button
            className={
              formData.dcStatus === "Cancelled"
                ? "button-style button-disabled"
                : "button-style"
            }
            disabled={formData.dcStatus === "Cancelled"}
            onClick={() => {
              if (
                formData.selectedRowData &&
                formData.selectedRowData.RVStatus === "Received"
              ) {
                receiveReturns();
                openJobWorkModalReturns();
              } else {
                openJobWorkModalRV();
              }
            }}
          >
            Open RV
          </button>

          <ReceiveReturnsTable
            formData={formData}
            handleRowSelectTable2={handleRowSelectTable2}
          />
        </div>
      </div>
    </div>
  );
}

export default DCCreateNew;
